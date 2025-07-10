const express = require("express");
const router = express.Router();
const pool = require("../../../db/index");
require("dotenv").config();


router.get("/getall", async (req, res) => {
  const { offer_slug } = req.query;

  if (!offer_slug) {
    return res.status(400).json({ error: "Slug manquant." });
  }

  try {
    const query = `
      SELECT * 
      FROM reservation_slots 
      WHERE offer_slug = $1
    `;
    const values = [offer_slug];
    const result = await pool.query(query, values);

    // C'est CETTE ligne qui manque dans ton code :
    return res.json({ success: true, data: result.rows });  // ✅ Corrigé
  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/get", async (req, res) => {
  const { offer_slug, date, start_hour, end_hour } = req.body;

  if (!offer_slug || !date || !start_hour || !end_hour) {
    return res.status(400).json({ error: "Paramètres manquants." });
  }

  try {
    const query = `
      SELECT * 
      FROM reservation_slots 
      WHERE offer_slug = $1 
        AND date = $2 
        AND start_hour = $3 
        AND end_hour = $4
      LIMIT 1;
    `;
    const values = [offer_slug, date, start_hour, end_hour];
    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      return res.json({ found: true, slot: result.rows[0] });
    } else {
      return res.json({ found: false });
    }
  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});



module.exports = router;
