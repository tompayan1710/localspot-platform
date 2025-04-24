const express = require("express");
const router = express.Router();

// Importe les sous-routes
const qrPlacementsRoutes = require("./qr-placements");

// Monte les routes sur leur chemin respectif
router.use("/qr-placements", qrPlacementsRoutes);

module.exports = router;
