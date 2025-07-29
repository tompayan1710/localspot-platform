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
      <img src="${process.env.FRONTEND_URL}/images/Validate.png" alt="Logo" style="max-height: 40px; margin-bottom: 20px;" />
      <div style="font-size: 40px; color: #4CAF50;">✔️</div>
      <h1 style="margin: 10px 0;">Thank you</h1>
      <p style="color: #555;">Your order has been received</p>
      <p style="font-size: 12px; color: #999;">You will receive an email with your download link</p>
    </div>

    <div style="margin: 30px 0; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
      <div style="padding: 20px; background-color: #fafafa; border-bottom: 1px solid #eee;">
        <strong>Order details</strong>
      </div>
      <div style="padding: 20px;">
        <table style="width: 100%; font-size: 14px;">
          <tr>
            <td><strong>Order number:</strong></td>
            <td style="text-align: right;">#86</td>
          </tr>
          <tr>
            <td><strong>Date:</strong></td>
            <td style="text-align: right;">May 6, 2017</td>
          </tr>
          <tr>
            <td><strong>Payment method:</strong></td>
            <td style="text-align: right;">Credit card</td>
          </tr>
          <tr><td colspan="2"><hr style="border: none; border-top: 1px solid #eee;"></td></tr>
          <tr>
            <td><strong>Subtotal:</strong></td>
            <td style="text-align: right;">$69.00</td>
          </tr>
          <tr>
            <td><strong>Taxes VAT(20%):</strong></td>
            <td style="text-align: right;">$16.00</td>
          </tr>
          <tr>
            <td><strong>Total:</strong></td>
            <td style="text-align: right;"><strong>$87.00</strong></td>
          </tr>
        </table>
      </div>
    </div>

    <h3 style="margin: 30px 0 10px; font-size: 16px;">Products</h3>
    <div style="font-size: 14px; line-height: 1.6;">
      <p><strong>1 x Maker Agency Theme</strong><br>
      <a href="#">Download link 1</a><br>
      <a href="#">Download link 2</a></p>

      <p><strong>Corporate UI Kit</strong><br>
      <a href="#">Download link 1</a><br>
      <a href="#">Download link 2</a></p>

      <p><strong>Dashboard admin panel</strong><br>
      <a href="#">Download link 1</a><br>
      <a href="#">Download link 2</a></p>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 30px; flex-wrap: wrap; font-size: 14px;">
      <div style="flex: 1 1 45%;">
        <h4>Customer details</h4>
        <p>
          <strong>Contact</strong><br>
          Email: dorin007@gmail.com<br>
          Phone: 0724266676
        </p>
        <p>
          <strong>Bank accounts and cards</strong><br>
          Credit card: <span style="white-space: nowrap;">💳 Visa -x 0987</span>
        </p>
      </div>
      <div style="flex: 1 1 45%;">
        <h4>Billing address</h4>
        <p>
          André Dorin<br>
          Dorin & Associati SRLD<br>
          Str Fortunei, 28, Bucharest sector 6<br>
          0623145<br>
          Romania
        </p>
      </div>
    </div>

    <div style="text-align: center; font-size: 12px; color: #999; margin-top: 40px;">
      <p>Premium UI Kits – A great marketplace full with well designed products for web designers and their upcoming projects.</p>
      <p style="margin: 20px 0;">
        <a href="#" style="margin: 0 5px;">Submit</a> |
        <a href="#" style="margin: 0 5px;">FAQ</a> |
        <a href="#" style="margin: 0 5px;">License</a> |
        <a href="#" style="margin: 0 5px;">Support</a> |
        <a href="#" style="margin: 0 5px;">Contact</a>
      </p>
      <p style="color: #ccc;">© 2017 PremiumUIKits.com. All rights reserved.</p>
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




if (require.main === module) {
  const path = require("path");

  const testReservation = {
    reservation_id: 9999,
    title: "Balade en bateau à Nice",
    date: "2025-08-10",
    start_hour: "10:00",
    adresse: "Port de Nice",
    nb_adult: 2,
    nb_reduced: 1,
    total_price: 90,
    name: "Jean Dupont",
    email: "tompayan1710@gmail.com", // <-- à remplacer
    phone: "+33600000000"
  };

  const testPDFPath = path.join(__dirname, "Viarte_Reservation_undefined_2025-07-26.pdf"); // Tu dois mettre un PDF réel ici (par exemple copie manuelle)

  sendReservationEmail(testReservation, testPDFPath)
    .then(() => console.log("✅ Mail de test envoyé avec succès"))
    .catch(err => console.error("❌ Erreur d'envoi du mail :", err));
}



module.exports = { sendAdminAlertEmail, sendReservationEmail };
