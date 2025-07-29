const nodemailer = require("nodemailer");
require("dotenv").config();
// console.log("ENV VARIABLES:", process.env);


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL,
    pass: process.env.ADMIN_PASSWORD, // App Password recommandé
  },
});

async function sendAdminAlertEmail({ to, subject, message }) {
  // console.log("📧 sendAdminAlertEmail appelée avec :", { to, subject, message });
  // console.log("⚙ ENV:", { ADMIN_EMAIL: process.env.ADMIN_EMAIL, ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? "OK" : "MISSING" });


  //  console.log("Valeurs actuelles :", {
  //   ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  //   ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? "********" : undefined,
  // });

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

  //  --greylight: #F3F4F6;
  // --greyverylight: #FBFBFB;

const htmlContent = `
<div style="background-color: #f7f7f7; padding: 40px 0; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">

    <div style="text-align: center;">
      <img src="${process.env.FRONTEND_URL}/images/ViarteLogo.png" alt="Logo" style="display: block; max-height: 40px; margin-bottom: 20px;" />
      <img src="${process.env.FRONTEND_URL}/images/Validate.png" alt="Validate Icon" style="display: block; max-height: 60px; margin-bottom: 20px;" />
      <h1 style="margin: 10px 0;">Merci pour votre commande</h1>
      <p style="color: #555;">Nous avons bien reçu votre réservation</p>
      <p style="font-size: 12px; color: #999;">Vous recevrez un email contenant votre ticket numérique</p>
    </div>

    <div style="margin: 30px 0; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="padding: 20px; background-color: #fafafa; border-bottom: 1px solid #eee;">
        <strong>Détails de la commande</strong>
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td><strong>Numéro de réservation :</strong></td>
            <td style="text-align: right;">#RES-80</td>
          </tr>
          <tr>
            <td><strong>Date :</strong></td>
            <td style="text-align: right;">29 juillet 2025</td>
          </tr>
          ${
            reservation.payment_method !== "Inconnu" ? 
            `<tr>
              <td><strong>Méthode de paiement :</strong></td>
              <td style="text-align: right;">${reservation.payment_method}</td>
            </tr>`
            : ""
          }
          <tr><td colspan="2"><hr style="border: none; border-top: 1px solid #eee;"></td></tr>
          <tr>
  <td><strong>×${reservation.nb_adult} Adulte${reservation.nb_adult>1 ? "s" : ""}</strong></td>
  <td style="text-align: right;">200,00 €</td>
  </tr>
  ${reservation.nb_reduced > 0 ?
    `
    <tr>
    <td><strong>×${reservation.nb_adult} Réduit${reservation.nb_reduced > 1 ? "s" : ""}</strong></td>
    <td style="text-align: right;">250,00 €</td>
  </tr>
  ` : ""
  }
  <tr>
    <td colspan="2"><hr style="border: none; border-top: 1px solid #eee;"></td>
  </tr>
  <tr>
    <td><strong>Total :</strong></td>
    <td style="text-align: right;"><strong>450,00 €</strong></td>
  </tr>
  <tr>
    <td colspan="2" style="text-align: right; font-size: 12px; color: #666; padding-top: 5px;">
      <em>Toutes taxes comprises (TTC)</em>
    </td>
  </tr>

        </table>
      </div>
    </div>

    <h3 style="margin: 30px 0 10px; font-size: 16px;">Activités réservées</h3>
    <div style="font-size: 14px; line-height: 1.6;">
      <p><strong>${reservation.title}</strong><br>
      <a href="${process.env.FRONTEND_URL}/offer-page/${reservation.offerSlug}">Voir les détails</a><br>
<div style="text-align: center; margin: 40px 0;">
  <a href="${process.env.FRONTEND_URL}/reservations/${reservation.reservation_id}"
     target="_blank"
     style="
       display: inline-block;
       padding: 14px 28px;
       font-size: 16px;
       color: white;
       background: linear-gradient(180deg, rgb(83, 83, 83), rgb(55, 55, 55));
       border-radius: 6px;
       text-decoration: none;
       letter-spacing: 0.5px;
       font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
     ">
    Voir ma réservation
  </a>
</div>

    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 30px; flex-wrap: wrap; font-size: 14px; width: 100%;">
      <div style="flex: 1 1 45%;">
        <h4>Détails client</h4>
        <p style="color: #555;">Cette réservation a été effectuée au nom de <strong>${reservation.name}</strong>.</p>
        <p>
          <strong>Contact</strong><br>
          Email : ${reservation.email}<br>
          Téléphone : ${reservation.phone}
        </p>
      </div>
    </div>

    <div style="text-align: center; font-size: 12px; color: #999; margin-top: 40px;">
      <p>Viarte – Des expériences locales inoubliables.</p>
      <p style="margin: 20px 0;">
        <a href="${process.env.FRONTEND_URL}/legal-notice" style="margin: 0 5px;">Mentions légales</a> |
        <a href="${process.env.FRONTEND_URL}/terms-and-conditions-of-sal" style="margin: 0 5px;">Conditions Générales de Vente</a> |
        <a href="${process.env.FRONTEND_URL}/privacy-policy" style="margin: 0 5px;">Politique de confidentialité</a>
        </p>
      <p style="color: #ccc;">© 2025 Viarte. Tous droits réservés.</p>
    </div>

  </div>
</div>
`;




  const mailOptions = {
    from: `"Viarte" <${process.env.ADMIN_EMAIL}>`,
    // to: reservation.email,
    to: reservation.email,
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




// if (require.main === module) {
//   const path = require("path");

//   const testReservation = {
//     reservation_id: 82,
//     title: "Balade en bateau à Nice",
//     offerSlug: "2c09a43a-c524-4dbb-bbfa-6b7598ca950b",
//     date: "2025-08-10",
//     start_hour: "10:00",
//     adresse: "Port de Nice",
//     nb_adult: 2,
//     nb_reduced: 1,
//     total_price: 90,
//     name: "Jean Dupont",
//     email: "tompayan1710@gmail.com", // <-- à remplacer
//     phone: "+33600000000",
//     payment_method: "VISA - XXXX 4242"
//   };

//   const testPDFPath = path.join(__dirname, "Viarte_Reservation_undefined_2025-07-26.pdf"); // Tu dois mettre un PDF réel ici (par exemple copie manuelle)

//   sendReservationEmail(testReservation, testPDFPath)
//     .then(() => console.log("✅ Mail de test envoyé avec succès"))
//     .catch(err => console.error("❌ Erreur d'envoi du mail :", err));
// }



module.exports = { sendAdminAlertEmail, sendReservationEmail };
