const express = require("express");
const router = express.Router();
const {
  getAllPlacements,
  addPlacement,
  deletePlacement
} = require("../../db/Models/qrPlacementModel");

// Liste tous les placements
router.get("/", async (req, res) => {
  const placements = await getAllPlacements();
  res.json(placements);
});

// Ajouter un placement
router.post("/", async (req, res) => {
  const placement = await addPlacement(req.body);
  res.status(201).json(placement);
});

// Supprimer un placement
router.delete("/:id", async (req, res) => {
  await deletePlacement(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
