const express = require("express");
const router = express.Router();
const { sendAdminAlertEmail } = require("../../../utils/email");

// Envoie un mail simple
router.post("/sendmail", async (req, res) => {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
        return res.status(400).json({
            success: false,
            error: "to, subject et message sont requis"
        });
    }
    console.log("Je Send un Email");
    try {
        await sendAdminAlertEmail({ to, subject, message });
        return res.json({ success: true });
    } catch (err) {
        console.error("Erreur sendmail:", err);
        return res.status(500).json({
            success: false,
            error: "Erreur interne lors de l’envoi"
        });
    }
});

module.exports = router;
