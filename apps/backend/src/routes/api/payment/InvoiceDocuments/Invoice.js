const express = require("express");
const router = express.Router();
const fs = require("fs");
const { generateAvisDeVirementPDF } = require("./generateInvoicePDF");
const pool = require("../../../../db/index");
require("dotenv").config();


router.post("/download-avis-virement", async (req, res) => {
  try {
    const {
      payout,
      reservations,
      enterprise
    } = req.body;

    if (!payout || !reservations || !enterprise) {
      return res.status(400).json({
        success: false,
        error: "Champs manquants : payout, reservations, enterprise"
      });
    }

    // Génère le PDF
    const pdfPath = await generateAvisDeVirementPDF({ payout, reservations, enterprise });

    // Lit le PDF
    const fileBuffer = await fs.promises.readFile(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="avis_virement_${payout.id}.pdf"`
    );

    res.send(fileBuffer);

    // Suppression du fichier temporaire
    fs.promises.unlink(pdfPath).catch(() => {});

  } catch (error) {
    console.error("❌ Erreur PDF :", error);
    res.status(500).json({
      success: false,
      error: "Impossible de générer l'avis de virement"
    });
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
      WHERE ${field} = $1;
    `;

    const result = await pool.query(query, [value]);

    return res.json({ success: true, virements: result.rows });

  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
