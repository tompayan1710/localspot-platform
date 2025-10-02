const nodemailer = require("nodemailer");
require("dotenv").config();
// console.log("ENV VARIABLES:", process.env);
const translations = require("../utils/translation_dic");
const { formatDateYYYYMMDD, formatHumanAtTime } = require("./helpers");

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
  console.log("J'ENVOIE LE MAIL !!!!!!!");

  const lang = reservation.lang || "fr"; // fallback fr
  const l = translations[lang];

  const labels = translations[lang] || translations.fr;
  console.log("DATE DE MA RESERVATION :", reservation.date, " à : ",reservation.start_hour);

  const startDateTime = new Date(`${reservation.date}T${reservation.start_hour}:00`);

  const htmlContent = `
    <div style="background-color: #f7f7f7; padding: 20px 0; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: auto; background: white; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05);">

        <div style="text-align: center;">
          <h1 style="margin: 10px 0;">${l.email_title_thank_you_for_order}</h1>
          <p style="color: #555;">${l.email_subtitle_reservation_received}</p>
        </div>

        <div style="margin: 15px 0; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="padding: 20px; background-color: #fafafa; border-bottom: 1px solid #eee;">
            <strong>${l.email_section_order_details}</strong>
            <strong></strong>
          </div>
          <div style="padding: 20px;">
            <table style="width: 100%; font-size: 14px;">
              <tr>
                <td><strong>${l.email_label_reservation_number}&nbsp;:</strong></td>
                <td style="text-align: right;">#RES-${reservation.reservation_id}</td>
              </tr>
              

              <tr>
                <td><strong>${l.Done_at}&nbsp;:</strong></td>
                <td style="text-align: right;">${formatDateYYYYMMDD(reservation.reservation_created_at)}</td>
              </tr>

              <tr><td colspan="2"><hr style="border: none; border-top: 1px solid #eee;"></td></tr>

              <tr>
                <td><strong>${l.Start}&nbsp;:</strong></td>
                <td style="text-align: right;">${formatHumanAtTime(reservation.date, lang, reservation.start_hour)}</td>
              </tr>

              ${
                reservation.payment_method !== "Inconnu" ? 
                `<tr>
                  <td><strong>${l.email_label_payment_method}&nbsp;:</strong></td>
                  <td style="text-align: right;">${reservation.payment_method}</td>
                </tr>` : ""
              }
              
              <tr><td colspan="2"><hr style="border: none; border-top: 1px solid #eee;"></td></tr>
              ${reservation.nb_adult > 0 ? `
                <tr>
                  <td><strong>×${reservation.nb_adult} ${reservation.nb_adult>1 ? labels.adults : labels.adult}</strong></td>
                  <td style="text-align: right;">${(Number(reservation.unit_price_adult * reservation.nb_adult)).toFixed(2)} €</td>
                </tr>` : ""
              }
              ${reservation.nb_child > 0 ? `
                <tr>
                  <td><strong>×${reservation.nb_child} ${reservation.nb_child>1 ? labels.children : labels.child}</strong></td>
                  <td style="text-align: right;">${(Number(reservation.unit_price_child * reservation.nb_child)).toFixed(2)} €</td>
                </tr>` : ""
              }
              ${reservation.nb_infant > 0 ? `
                <tr>
                  <td><strong>×${reservation.nb_infant} ${reservation.nb_infant>1 ? labels.infants : labels.infant}</strong></td>
                  <td style="text-align: right;">${(Number(reservation.unit_price_infant * reservation.nb_infant)).toFixed(2)} €</td>
                </tr>` : ""
              }
              <tr>
                <td colspan="2"><hr style="border: none; border-top: 1px solid #eee;"></td>
              </tr>
              <tr>
                <td><strong>${l.email_label_total}&nbsp;:</strong></td>
                <td style="text-align: right;"><strong>${(Number(reservation.total_price_eur)).toFixed(2)} €</strong></td>
              </tr>
              <tr>
                <td colspan="2" style="text-align: right; font-size: 12px; color: #666; padding-top: 5px;">
                  <em>${l.email_label_all_taxes_included}</em>
                </td>
              </tr>
            </table>
          </div>
        </div>
        
        <h3 style="margin: 30px 0px 0 15px; font-size: 16px;">${l.email_section_reserved_activities}</h3>
        <div style="font-size: 14px; line-height: 1.6; margin: 0 10px 0 0">
          <p><strong>${reservation.title}</strong></p>
          <p>${reservation.adresse}</p>
          <a href="${process.env.FRONTEND_URL}/offer-page/${reservation.offerSlug}">${l.email_link_view_details}</a><br>
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
              ${l.email_button_view_reservation}
            </a>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; margin-top: 30px; flex-wrap: wrap; font-size: 14px; width: 100%;">
          <div style="flex: 1 1 45%;">
            <h3 style="margin: 30px 0 10px; font-size: 16px;">${l.email_section_client_details}</h3>
            <p style="color: #555;">${l.email_text_reservation_made_for} ${reservation.name}.</p>
            <h3 style="margin: 30px 0 10px; font-size: 16px;">${l.email_section_contact}</h3>
            <p style="color: #555;">
              Email : ${reservation.email}<br>
              ${labels.Phone} : ${reservation.phone}
            </p>
          </div>
        </div>
      </div>

      <div style="text-align: center; font-size: 12px; color: #999; margin-top: 40px;">
        <p>${l.email_footer_signature}</p>
        <p style="margin: 20px 0;">
          <a href="${process.env.FRONTEND_URL}/legal-notice" style="margin: 0 5px;">${l.email_footer_legal_notice}</a> |
          <a href="${process.env.FRONTEND_URL}/terms-and-conditions-of-sale" style="margin: 0 5px;">${l.email_footer_terms_conditions}</a> |
          <a href="${process.env.FRONTEND_URL}/privacy-policy" style="margin: 0 5px;">${l.email_footer_privacy_policy}</a>
        </p>
        <p style="color: #ccc;">${l.email_footer_rights_reserved}</p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Viarte" <${process.env.ADMIN_EMAIL}>`,
    to: reservation.email,
    subject: `${l.email_title_thank_you_for_order} #RES-${reservation.reservation_id}`,
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
