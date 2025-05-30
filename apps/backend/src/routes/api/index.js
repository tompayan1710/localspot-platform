const express = require("express");
const router = express.Router();

// Importe les sous-routes
const authRoutes = require('../../auth/authRoutes');
const offerRoutes = require('./offer/offerRoutes');
const qrcodeRoutes = require('./qrcode/qrcodeRoutes');

router.use('/auth', authRoutes);
router.use('/offer', offerRoutes);
router.use('/qrcode', qrcodeRoutes);

 
module.exports = router;
