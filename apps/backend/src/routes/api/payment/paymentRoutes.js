const express = require("express");
const router = express.Router();

// Importe les sous-routes
const payouts = require('./Payouts/payouts');
const clients = require('./Clients/clients');

router.use('/payouts', payouts);
router.use('/clients', clients);

 
module.exports = router;
