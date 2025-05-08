const express = require("express");
const router = express.Router();
const {
    createScan,
    getAllScans,
    hasRecentScan
} = require("../../db/Models/scanModel");

// Liste tous les scans
router.get("/", async (req, res) => {
  const placements = await getAllScans();
  res.json(placements);
});


// Supprimer un scan
router.delete("/:id", async (req, res) => {
  await deletePlacement(req.params.id);
  res.sendStatus(204);
});

// router.get("/recent-scan:qr_code_id:ip", async (req, res) => {
//     const placement = await hasRecentScan(req.params.qr_code_id, req.params.ip)
//     res.json(placement)
// })

module.exports = router;
