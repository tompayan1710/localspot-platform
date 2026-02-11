const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateAvisDeVirementPDF } = require("./generateInvoicePDF");
const pool = require("../../../../db/index");
require("dotenv").config();



router.post("/download-avis-virement", async (req, res) => {
  try {
    const { virementId } = req.body;

    if (!virementId) {
      return res.status(400).json({ error: "virementId manquant" });
    }

    // 1️⃣ Récupération du virement
    const withdrawalRes = await pool.query(
      "SELECT * FROM withdrawals WHERE id = $1",
      [virementId]
    );
    const payout = withdrawalRes.rows[0];

    if (!payout) {
      return res.status(404).json({ error: "Virement introuvable" });
    }

    // 2️⃣ ENTREPRISE = TA PLATEFORME (UNE SEULE LIGNE)
    const enterpriseRes = await pool.query(
      "SELECT * FROM enterprise LIMIT 1"
    );
    const enterprise = enterpriseRes.rows[0];

    if (!enterprise) {
      return res.status(500).json({ error: "Entreprise non configurée" });
    }

    // 3️⃣ Génération du PDF (SANS réservations)
    const pdfPath = await generateAvisDeVirementPDF({
      payout,
      enterprise,
    });

    const fileBuffer = await fs.promises.readFile(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="avis_virement_${payout.id}.pdf"`
    );

    res.send(fileBuffer);

    fs.promises.unlink(pdfPath).catch(() => {});
  } catch (err) {
    console.error("❌ Erreur PDF :", err);
    res.status(500).json({ error: "Impossible de générer l'avis de virement" });
  }
});



// Récupération d'un type de virement (hôte OU provider)
router.get("/get-all-virement", async (req, res) => {
  const { hote_id, provider_id } = req.query;

  console.log("Je rentre dans get-all-virement ! : ", hote_id, provider_id);
  // Vérifie qu'un seul des deux est fourni
  if ((!hote_id && !provider_id) || (hote_id && provider_id)) {
    return res.status(400).json({ error: "Fournir uniquement hote_id OU provider_id." });
  }

  try {
    // Choix de la colonne selon la valeur envoyée
    const field = hote_id ? "hote_id" : "provider_id";
    const value = hote_id || provider_id;

    const query = `
      SELECT *
      FROM withdrawals
      WHERE ${field} = $1 AND status = 'completed';
    `;

    const result = await pool.query(query, [value]);

    return res.json({ success: true, virements: result.rows });

  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
