const express = require("express");
const router = express.Router();

// Importe les sous-routes
const authRoutes = require('../../auth/authRoutes');
const offerRoutes = require('./offer/offerRoutes');
const qrcodeRoutes = require('./qrcode/qrcodeRoutes');
const hoteRoutes = require('./hote/hoteRoutes');
const map2DRoutes = require('./map2D/map2DRoutes');
const providerRoutes = require('./provider/providerRoutes');
const locationRoutes = require('./location/locationRoutes');
const translate = require('./translate/translate');

router.use('/auth', authRoutes);
router.use('/offer', offerRoutes);
router.use('/qrcode', qrcodeRoutes);
router.use('/hote', hoteRoutes);
router.use('/maps', map2DRoutes);
router.use('/provider', providerRoutes);
router.use('/location', locationRoutes);
router.use('/translate', translate);


 
 
module.exports = router;
