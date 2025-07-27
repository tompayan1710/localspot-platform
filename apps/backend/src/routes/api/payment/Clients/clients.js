const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const { sendReservationEmail } = require("../../../api/../../utils/email");

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


// ATTENTION : Stripe envoie du raw body, il faut utiliser `bodyParser.raw`
router.post( "/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;
    console.log("Je RENTRE DANS LE WEBHOOK")
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET // Clé `whsec_...` de Stripe
      );
    } catch (err) {
      console.error("❌ Erreur signature webhook Stripe :", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ----------------------
    // 1. Vérification du type d'événement
    // ----------------------
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("✅ Paiement réussi :", paymentIntent.id);

      const meta = paymentIntent.metadata;

      console.log("🎯 Metadata reçue:", meta);

      try {
        // Ici tu enregistres ta réservation dans la BDD
        console.log("Je save le créneau")
        // const reservation = await saveCreneauDirect({
        //   user_id: meta.user_id,
        //   provider_id: meta.provider_id,
        //   offerSlug: meta.offerSlug,
        //   date: meta.date,
        //   start_hour: meta.start_hour,
        //   end_hour: meta.end_hour,
        //   location: meta.location,
        //   nb_adult: meta.nb_adult,
        //   nb_reduced: meta.nb_reduced,
        //   total_participants: meta.total_participants,
        //   price_per_person: meta.price_per_person,
        //   name: meta.name,
        //   email: meta.email,
        //   phone: meta.phone,
        // });

        // // Envoi d'email
        // await sendReservationEmail(reservation, reservation.pdfPath);
        console.log("📧 j'envoie le mail !");
      } catch (error) {
        console.error("❌ Erreur dans le traitement du webhook :", error);
        return res.status(500).send("Erreur interne lors du traitement");
      }
    } else {
      console.log(`⚠️ Événement Stripe ignoré : ${event.type}`);
    }

    // Réponds toujours 200 à Stripe pour confirmer la réception
    res.status(200).send("ok");
  }
);

module.exports = router;


module.exports = router;
