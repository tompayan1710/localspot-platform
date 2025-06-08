const express = require("express");
const router = express.Router();
const { getHoteById } = require("../../../db/Models/HoteModel");

// (optionnel) Récupère une offre par son ID
router.get("/get", async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ success: false, error: "Recupération de l'hote id manquant" });
  }

  try {
    const hote = await getHoteById(id);
    if (!hote) {
      return res.status(404).json({ success: false, error: "hote non trouvée" });
    }
    res.json({ success: true, hote: hote.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

module.exports = router;