const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // ou un autre selon ton fournisseur
  auth: {
    user: "tompayan1710@gmail.com",
    pass: "vkix wjmo onya rifg",
  },
});
async function sendPermitStatusEmail(candidate) {
  console.log("📧 Envoi d'un faux mail concernant l'examen du code...");

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f2f2f2; padding: 40px;">
      <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #333; margin-top: 15px;">Résultat de l’examen du Code de la Route</h2>
        </div>

        <p>Bonjour <strong>${candidate.name}</strong>,</p>

        <p>Nous vous informons que vous n'avez malheureusement <strong>pas obtenu votre examen du Code de la Route</strong>.</p>

        <p>Votre score est de <strong>34 bonnes réponses sur 40</strong>. Le seuil requis pour valider l’examen est de <strong>35/40</strong>.</p>

        <p>Vous avez la possibilité de vous réinscrire à une prochaine session. Pour cela, merci de <strong>faire une nouvelle demande</strong> via votre espace candidat ou en nous contactant directement.</p>

        <p style="margin-top: 30px;">Nous restons à votre disposition pour toute information complémentaire.</p>

        <p style="margin-top: 40px;">Cordialement,</p>

        <hr style="margin: 40px 0; border: none; border-top: 1px solid #ddd;" />

        <p style="font-size: 12px; color: #999; text-align: center;">
          Ce message est généré automatiquement. Merci de ne pas y répondre directement.
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Auto écol" <${process.env.ADMIN_EMAIL}>`,
    to: candidate.email,
    subject: "Résultat de l’examen du Code de la Route",
    html: htmlContent,
  };

  await transporter.sendMail(mailOptions);
  console.log("✅ Faux mail envoyé !");
}


// Si tu veux tester direct :
if (require.main === module) {
  const fakeCandidate = {
    name: "Clara",
    email: "clarascipione1@gmail.com", // à remplacer
  };

  sendPermitStatusEmail(fakeCandidate)
    .then(() => console.log("✅ Test terminé"))
    .catch((err) => console.error("❌ Erreur d'envoi :", err));
}

module.exports = { sendPermitStatusEmail };
