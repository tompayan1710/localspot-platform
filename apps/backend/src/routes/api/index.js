const express = require("express");
const router = express.Router();

// Importe les sous-routes
const authRoutes = require('../../auth/authRoutes');
const offerRoutes = require('./offer/offerRoutes');
const qrcodeRoutes = require('./qrcode/qrcodeRoutes');
const providerRoutes = require('./provider/providerRoutes');
const locationRoutes = require('./location/locationRoutes');

router.use('/auth', authRoutes);
router.use('/offer', offerRoutes);
router.use('/qrcode', qrcodeRoutes);
router.use('/provider', providerRoutes);
router.use('/location', locationRoutes);

 
module.exports = router;
