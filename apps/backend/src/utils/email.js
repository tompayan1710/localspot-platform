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

module.exports = { sendAdminAlertEmail };
