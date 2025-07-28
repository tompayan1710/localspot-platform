require("dotenv").config(); // Charge le .env
const { sendAdminAlertEmail } = require("./email");

// (async () => {
//   try {
//     // Vérification des variables

//     console.log("✅ Test d'envoi de mail en cours...");

//     // Appel de la fonction pour envoyer un mail
//     await sendAdminAlertEmail({
//       to: "tompayan1710@gmail.com", // L'email de test
//       subject: "Test de Mail depuis Node.js",
//       message: "Ceci est un test d'email envoyé via la fonction sendAdminAlertEmail()",
//     });

//     console.log("✅ Email de test envoyé avec succès !");
//   } catch (err) {
//     console.error("❌ Erreur lors de l'envoi du mail :", err);
//   }
// })();
