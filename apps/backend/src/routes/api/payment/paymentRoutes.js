const express = require("express");
const router = express.Router();

// Importe les sous-routes
const payouts = require('./Payouts/payouts');
const clients = require('./Clients/clients');
const tickets = require("./Ticket/Ticket");
const transactions = require("./Transactions/transactions");
const invoiceDocuments = require("./InvoiceDocuments/Invoice");

router.use('/payouts', payouts);
router.use('/clients', clients);
router.use("/tickets", tickets);
router.use('/transactions', transactions);
router.use('/invoice-documents', invoiceDocuments);

 
module.exports = router;
