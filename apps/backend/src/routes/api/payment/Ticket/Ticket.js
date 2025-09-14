// routes/testRoutes.js
const express = require("express");
const router = express.Router();
const { sendReservationEmail } = require("../../../../utils/email");
const fs = require("fs");
const { generateTicketPDF } = require("./generateTicketPDF");


// 📨 Envoi d'email avec le ticket en pièce jointe
router.post("/send-email-invoice", async (req, res) => {
  const reservation = req.body;
  console.log("🔔 /send-email-invoice hit with body:", reservation);

  let pdfPath;
  try {
    pdfPath = await generateTicketPDF(reservation);
    await sendReservationEmail(reservation, pdfPath);
    res.json({ success: true, message: "Email envoyé !" });
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);
    res.status(500).json({ success: false, error: "Échec envoi email" });
  } finally {
    if (pdfPath) {
      fs.promises.unlink(pdfPath).catch(err =>
        console.warn("⚠️ Impossible de supprimer le PDF temporaire :", err)
      );
    }
  }
});




router.post("/download-ticket", async (req, res) => {
  const {
    reservation_id,
    title,
    reservation_created_at,
    reservation_created_at_hour,
    start_date,
    start_hour,
    adresse,
    name,
    email,
    phone,
    reservation_status,
    nb_adult,
    nb_child,
    nb_infant,
    unit_price_adult,
    unit_price_child,
    unit_price_infant,
    gross_amount,
    labels 
  } = req.body;

  const reservation = {
    reservation_id,
    title,
    reservation_created_at,
    reservation_created_at_hour,
    start_date,
    start_hour,
    adresse,
    name,
    email,
    phone, 
    reservation_status,
    nb_adult,
    nb_child,
    nb_infant,
    unit_price_adult,
    unit_price_child,
    unit_price_infant,
    gross_amount,
    labels 
  };

  try {
    const pdfPath = await generateTicketPDF(reservation);
    const fileBuffer = await fs.promises.readFile(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="ticket_${reservation_id}.pdf"`);
    res.send(fileBuffer);

    fs.promises.unlink(pdfPath).catch(() => {});
  } catch (error) {
    console.error("❌ Erreur PDF :", error);
    res.status(500).json({ success: false, error: "Impossible de générer le PDF" });
  }
});


module.exports = router;
