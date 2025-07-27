const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const { sendReservationEmail } = require("../../../api/../../utils/email");
const { saveCreneau } = require("../../../../db/Models/CreneauModel");
const { generateTicketPDF } = require("../Ticket/TicketFunctions");
const fs = require("fs");


router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
});

router.post("/create-payment-intent", async (req, res) => {
  const {
      amount,
      user_id,
      provider_id,
      offerSlug,
      date,
      start_hour,
      end_hour,
      location,
      nb_adult,
      nb_reduced,
      price_per_person,
      total_participants,
      name,
      email,
      phone
    } = req.body;

  if (!amount || amount < 50) {  // Sécurité : min 0.50€
    return res.status(400).send({ error: { message: "Invalid amount" } });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: amount,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        user_id: user_id || "guest",
        provider_id,
        offerSlug,
        date,
        start_hour,
        end_hour,
        location,
        nb_adult,
        nb_reduced,
        total_participants,
        price_per_person,
        name,
        email,
        phone,
      },

      // payment_method_types: ['card', 'bancontact'], 
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});


// ----------------------
// 3. Webhook Stripe
// ----------------------
router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error("❌ Erreur signature webhook Stripe:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Vérification du type d'événement
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("✅ Paiement réussi:", paymentIntent.id);

      const meta = paymentIntent.metadata;
      console.log("🎯 Metadata reçue:", meta);

      try {
        // 1. Sauvegarde du créneau
        const reservation = await saveCreneau({
          // user_id: parseInt(meta.user_id),
          user_id: meta.user_id && meta.user_id !== "guest" ? parseInt(meta.user_id, 10) : 1,//Null

          provider_id: parseInt(meta.provider_id),
          offerSlug: meta.offerSlug,
          date: meta.date,
          start_hour: meta.start_hour,
          end_hour: meta.end_hour,
          location: meta.location,
          nb_adult: parseInt(meta.nb_adult, 10),
          nb_reduced: parseInt(meta.nb_reduced, 10),
          total_participants: parseInt(meta.total_participants, 10),
          price_per_person: parseFloat(meta.price_per_person),
          name: meta.name,
          email: meta.email,
          phone: meta.phone,
        });

        if (!reservation) {
          console.error("❌ Erreur saveCreneau: reservation null");
          return res.status(500).send("Erreur lors de l'enregistrement du créneau");
        }
        console.log("Réservation enregistrée :", reservation);

        // 2. Génération du PDF
        const pdfPath = await generateTicketPDF(reservation);

        // 3. Envoi de l'email avec le PDF
        await sendReservationEmail(reservation, pdfPath);
        console.log("📧 Email envoyé avec ticket PDF !");

        // Supprimer le PDF après envoi (optionnel)
        fs.promises.unlink(pdfPath).catch(err => console.warn("Impossible de supprimer le PDF temporaire:", err));

      } catch (error) {
        console.error("❌ Erreur dans le traitement du webhook:", error);
        return res.status(500).send("Erreur interne lors du traitement");
      }
    } else {
      console.log(`⚠️ Événement Stripe ignoré : ${event.type}`);
    }

    res.status(200).send("ok");
  }
);


module.exports = router;
