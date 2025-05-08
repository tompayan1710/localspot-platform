const express = require("express");
const router = express.Router();

// Importe les sous-routes
const qrPlacementsRoutes = require("./qr-placements");
const scansRoutes = require("./scan");
const authRoutes = require('../../auth/authRoutes');

// Monte les routes sur leur chemin respectif
router.use("/qr-placements", qrPlacementsRoutes);
 router.use("/scans", scansRoutes);

router.use('/auth', authRoutes);

 
module.exports = router;
