const express = require("express");
const router = express.Router();

// Importe les sous-routes
const payouts = require('./Payouts/payouts');
const clients = require('./Clients/clients');
const tickets = require("./Ticket/Ticket");
const transactions = require("./Transactions/transactions");

router.use('/payouts', payouts);
router.use('/clients', clients);
router.use("/tickets", tickets);
router.use('/transactions', transactions);

 
module.exports = router;
