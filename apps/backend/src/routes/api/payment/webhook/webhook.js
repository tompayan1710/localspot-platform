const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const { sendReservationEmail, sendAdminAlertEmail } = require("../../../api/../../utils/email");
const { saveCreneau } = require("../../../../db/Models/CreneauModel");
const { generateTicketPDF } = require("../Ticket/TicketFunctions");
const fs = require("fs");



// ----------------------
// 3. Webhook Stripe
// ----------------------
// router.post(
//   "/webhook",
//   bodyParser.raw({ type: "application/json" }),
//   async (req, res) => {
//     console.log("Je RENTRE DANS LE WEBHOOK")
    
//     const sig = req.headers["stripe-signature"];
//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(
//         req.body,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
//     } catch (err) {
//       console.error("❌ Erreur signature webhook Stripe:", err.message);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Vérification du type d'événement
//     if (event.type === "payment_intent.succeeded") {
//       const paymentIntent = event.data.object;
//       console.log("✅ Paiement réussi:", paymentIntent.id);

//       const meta = paymentIntent.metadata;
//       console.log("🎯 Metadata reçue:", meta);

//       try {
//         // 1. Sauvegarde du créneau
//         const reservation = await saveCreneau({
//           // user_id: parseInt(meta.user_id),
//           user_id: meta.user_id && meta.user_id !== "guest" ? parseInt(meta.user_id, 10) : 1,//Null

//           provider_id: parseInt(meta.provider_id),
//           offerSlug: meta.offerSlug,
//           date: meta.date,
//           start_hour: meta.start_hour,
//           end_hour: meta.end_hour,
//           location: meta.location,
//           nb_adult: parseInt(meta.nb_adult, 10),
//           nb_reduced: parseInt(meta.nb_reduced, 10),
//           total_participants: parseInt(meta.total_participants, 10),
//           price_per_person: parseFloat(meta.price_per_person),
//           name: meta.name,
//           email: meta.email,
//           phone: meta.phone,
//         });

//         if (!reservation) {
//           console.error("❌ Erreur saveCreneau: reservation null");
//           return res.status(500).send("Erreur lors de l'enregistrement du créneau");
//         }
//         console.log("Réservation enregistrée :", reservation);

//         // 2. Génération du PDF
//         const pdfPath = await generateTicketPDF(reservation);

//         // 3. Envoi de l'email avec le PDF
//         await sendReservationEmail(reservation, pdfPath);
//         console.log("📧 Email envoyé avec ticket PDF !");

//         // Supprimer le PDF après envoi (optionnel)
//         fs.promises.unlink(pdfPath).catch(err => console.warn("Impossible de supprimer le PDF temporaire:", err));

//       } catch (error) {
//         console.error("❌ Erreur dans le traitement du webhook:", error);
//         return res.status(500).send("Erreur interne lors du traitement");
//       }
//     } else {
//       console.log(`⚠️ Événement Stripe ignoré : ${event.type}`);
//     }

//     res.status(200).send("ok");
//   }
// );


//stripe trigger payment_intent.succeeded
//stripe listen --forward-to localhost:3000/api/stripe/webhook


const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

router.post('/webhook',  bodyParser.raw({ type: "application/json" }), async (request, response) => {
  console.log("➡️  Stripe webhook hit");
  
//   let event = request.body;
let event;
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = request.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        request.body,
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return response.sendStatus(400);
    }
  }
  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': 
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      console.log("✅ PaymentIntent successful:", paymentIntent.id);

      const meta = paymentIntent.metadata;

      console.log("Webhook metadata:", event.data.object.metadata);
      // forcer le vidage du buffer stdout
      process.stdout.write('');


      const reservation = {
        user_id: meta.user_id && meta.user_id !== "guest" ? parseInt(meta.user_id, 10) : 1,
        provider_id: parseInt(meta.provider_id, 10),
        offerSlug: meta.offerSlug,
        date: meta.date,
        start_hour: meta.start_hour,
        end_hour: meta.end_hour,
        adresse: meta.adresse || `PasDAdresse`, // ⚠️ metadata key = "adresse", mais attendu ici = "location"
        nb_adult: parseInt(meta.nb_adult, 10),
        nb_reduced: parseInt(meta.nb_reduced, 10),
        total_participants: parseInt(meta.total_participants, 10),
        price_per_person: parseFloat(meta.price_per_person),
        total_price: parseInt(meta.total_participants, 10) * parseFloat(meta.price_per_person),
        name: meta.name,
        email: meta.email,
        phone: meta.phone,
        title: meta.title
      };

      console.log("💥✅Reservation :");
      console.error(reservation);
      process.stdout.write("✅ Log direct\n"); // flush immédiat

      console.log("Envoie de l'email");
      // sendAdminAlertEmail({
      //   to: "tompayan1710@gmail.com",
      //   subject: "Payement SUCCESS",
      //   message: "Ceci signifie que mon payement à bien été réalisé",
      // });
      // console.log("Réservation enregistrée :", reservation);

        // 2. Génération du PDF
      const savedReservation = await saveCreneau(reservation);
      const completeReservation = { ...reservation, ...savedReservation };

      console.log("💥✅savedReservation :");
      console.error(savedReservation);
      process.stdout.write("✅ Log direct\n");

      console.log("💥✅completeReservation :");
      console.error(completeReservation);
      process.stdout.write("✅ Log direct\n");


      const pdfPath = await generateTicketPDF(completeReservation);

      sendReservationEmail(completeReservation, pdfPath)
      console.log("Email envoyé avec succé");


      break;
    case 'payment_method.attached': 
      // const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

module.exports = router;
