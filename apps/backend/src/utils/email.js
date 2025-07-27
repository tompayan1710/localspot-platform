const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD, // App Password recommandé
  },
});

async function sendAdminAlertEmail({ to, subject, message }) {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
}


async function sendReservationEmail(reservation, pdfPath) {
  console.log("J'ENVOIE LE MAIL !!!!!!!")
  const dateStr = new Date(reservation.date).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; color:#333; max-width:600px; margin:auto;">
      <h2 style="color:#4CAF50;">Merci pour votre réservation 🎉</h2>
      <p>Votre ticket a été émis avec succès.</p>

      <h3>Détails :</h3>
      <ul>
        <li><strong>Réservation :</strong> #RES-${reservation.reservation_id}</li>
        <li><strong>Activité :</strong> ${reservation.title}</li>
        <li><strong>Date :</strong> ${dateStr}</li>
        <li><strong>Adresse :</strong> ${reservation.adresse}</li>
        <li><strong>Participants :</strong> Adultes ×${reservation.nb_adult} ${reservation.nb_reduced ? `+ Réduits ×${reservation.nb_reduced}` : ""}</li>
      </ul>

      <p><strong>Total :</strong> ${reservation.total_price}€</p>
      <hr>
      <p style="font-size:12px; color:#666;">Cet e-mail tient lieu de ticket numérique.</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    // to: reservation.email,
    to: process.env.ADMIN_EMAIL,
    subject: `Votre réservation #RES-${reservation.reservation_id}`,
    html: htmlContent,
    attachments: [
      {
        filename: `ticket_${reservation.reservation_id}.pdf`,
        path: pdfPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
  console.log("Email avec ticket PDF envoyé !");
}


module.exports = { sendAdminAlertEmail, sendReservationEmail };
