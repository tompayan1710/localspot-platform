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
const googleRoutes = require('./google/googleRoutes');
const availibilityRoutes = require('./availibility/availibilityRoutes');
const reservationRoutes = require('./reservations/reservationsRoutes');
const reservationIndividualRoutes = require('./reservations/reservationIndividualRoutes');
const paymentRoutes = require('./payment/paymentRoutes');
const commentsRoutes = require('./comments/commentsRoutes');
const userRoutes = require('./user/userRoutes');
const invitationRoutes = require('./invitation/invitationRoutes');
const presentoirsRoutes = require('./presentoirs/presentoirsRoutes');


router.use('/auth', authRoutes);
router.use('/offer', offerRoutes);
router.use('/qrcode', qrcodeRoutes);
router.use('/hote', hoteRoutes);
router.use('/maps', map2DRoutes);
router.use('/provider', providerRoutes);
router.use('/location', locationRoutes);
router.use('/translate', translate);
router.use('/google', googleRoutes);
router.use('/availibility', availibilityRoutes);
router.use('/reservations', reservationRoutes);
router.use('/reservation_individual', reservationIndividualRoutes);
router.use('/payment', paymentRoutes);
router.use('/comments', commentsRoutes);
router.use('/user', userRoutes);
router.use('/invitation', invitationRoutes);
router.use('/presentoirs', presentoirsRoutes);


module.exports = router;
