// routes/testRoutes.js
const express = require("express");
const router = express.Router();
const { sendReservationEmail } = require("../../../../utils/email");
const fs = require("fs");
const { generateTicketPDF } = require("./TicketFunctions");



router.post("/send-email-invoice", async (req, res) => {
  const reservation_individual = req.body;

  console.log("🔔 /send-email-invoice hit with body:", reservation_individual);

  
  let pdfPath;
  try {
    pdfPath = await generateTicketPDF(reservation_individual);

    await sendReservationEmail(reservation_individual, pdfPath);
    res.json({ success: true, message: "Email envoyé !" });
  } catch (error) {
    console.error("Erreur email:", error);
    res.status(500).json({ success: false, error: "Échec envoi email" });
  } finally {
    if (pdfPath) {
      fs.promises.unlink(pdfPath).catch(err =>
        console.warn("Impossible de supprimer le PDF temporaire :", err)
      );
    }
  }
});



router.post("/download-ticket", async (req, res) => {
    const { reservation_id, date, title, start_hour, adresse, name,
                email, phone, reservation_status, nb_adult, nb_reduced,
                price_per_person, total_price
    } = req.body;;

    const reservation = {
            reservation_id: reservation_id, 
            date: date, 
            title: title, 
            start_hour: start_hour,
            adresse: adresse, 
            name: name,
            email: email, 
            phone: phone, 
            reservation_status: reservation_status, 
            nb_adult: nb_adult, 
            nb_reduced: nb_reduced,
            price_per_person: price_per_person, 
            total_price: total_price
    }

  try {
    const pdfPath = await generateTicketPDF(reservation);
    const fileBuffer = await fs.promises.readFile(pdfPath);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="ticket_${reservation_id}.pdf"`);
    res.send(fileBuffer);

    fs.unlink(pdfPath, () => {}); // Supprimer après envoi
  } catch (error) {
    console.error("Erreur PDF :", error);
    res.status(500).json({ success: false, error: "Impossible de générer le PDF" });
  }
});


module.exports = router;
