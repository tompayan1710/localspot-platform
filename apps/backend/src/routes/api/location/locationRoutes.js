// api/location.js
const express = require("express");
const router = express.Router();
const { findOrCreateCityByName } = require("../../../db/Models/AdresseModel");

router.post("/get-or-create-city", async (req, res) => {
  const { ville, departement } = req.body;

  if (!ville || !departement) {
    return res.status(400).json({ success: false, message: "Ville ou département manquant." });
  }

  try {
    const { city_id, departement_id } = await findOrCreateCityByName(ville, departement);
    res.status(200).json({ success: true, city_id, departement_id });
  } catch (err) {
    console.error("❌ Erreur lors de la recherche/creation ville :", err.message);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});

module.exports = router;
