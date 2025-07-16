


const express = require("express");
const router = express.Router();
const pool = require("../../../../db/index");

router.post("/request", async (req, res) => {
  const { provider_id, amount, method, details } = req.body;

  if (!provider_id || !amount || !method || !details) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    await pool.query(
      `INSERT INTO withdrawals (provider_id, amount, method, details) VALUES ($1, $2, $3, $4)`,
      [provider_id, amount, method, details]
    );

    res.json({ success: true, message: "Demande de retrait enregistrée" });
  } catch (err) {
    console.error("❌ Erreur BDD retrait :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/method", async (req, res) => {
  const { provider_id, method, details } = req.body;

  if (!provider_id || !method || !details) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  try {
    // Supprime l'ancien si existant (optionnel)
    await pool.query("DELETE FROM withdrawal_methods WHERE provider_id = $1", [provider_id]);

    // Insère le nouveau
    await pool.query(`
      INSERT INTO withdrawal_methods (provider_id, method, details)
      VALUES ($1, $2, $3)
    `, [provider_id, method, details]);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur sauvegarde méthode :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


module.exports = router;