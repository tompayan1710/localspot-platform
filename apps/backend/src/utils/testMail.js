const fs = require("fs");
const path = require("path");
const { renderToFile } = require("@react-pdf/renderer");
const TicketDocument = require("../routes/api/payment/Ticket/TicketDocument");
const { sendReservationEmail } = require("./email");

async function main() {
  const fakeReservation = {
    reservation_id: 103,
    offerSlug: "01bd532b-0eac-4c79-a2a2-bbdb6a98b172",
    title: "Conduire un cabriolet d'Antibes à Monaco",
    adresse: "7 Bd du Président Wilson, 06600 Antibes, France7 Bd du Président Wilson, 06600 Antibes, France",
    date: "2025-08-13",
    start_hour: "07:00",
    end_hour: "08:00",
    nb_adult: 2,
    nb_child: 1,
    nb_infant: 1,
    unit_price_adult: 75,
    unit_price_child: 75,
    unit_price_infant: 75,
    gross_amount: 225,
    total_price_eur: 225,
    name: "Cabriolet",
    email: "tompayan1710@gmail.com",
    phone: "+33765594097",
    payment_method: "Inconnu",
    reservation_status: "confirmed",
  };

  const outputPath = path.join(__dirname, `ticket_${fakeReservation.reservation_id}.pdf`);

  console.log("📄 Génération du PDF...");
  await renderToFile(
    TicketDocument({ reservation: fakeReservation }),
    outputPath
  );
  console.log("✅ PDF généré :", outputPath);

  console.log("📧 Envoi de l'email...");
  await sendReservationEmail(fakeReservation, outputPath);
  console.log("✅ Email envoyé !");
}

main().catch(err => {
  console.error("❌ Erreur :", err);
});
