const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
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
      offerSlug,
      name,
      email,
      phone,
      title,
      price_per_person,
      provider_id,
      OfferIsCancellable,
      nb_adult,
      nb_reduced,
      total_participants,
      start_hour,
      end_hour,
      date,
      adresse,
      total_capacity,
    } = req.body;

  console.log("Montant reçu (backend):", amount);
  console.log(!amount)
  console.log(amount < 50)
  if (!amount || amount < 50) {  // Sécurité : min 0.50€
    console.log("Le amount est invalide");
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
        offerSlug,
        name,
        email,
        phone,
        title,
        price_per_person,
        provider_id,
        OfferIsCancellable,
        nb_adult,
        nb_reduced,
        total_participants,
        start_hour,
        end_hour,
        date,
        adresse: adresse || "CreatePayementNoAdresse",
        total_capacity,
        mode: process.env.NODE_ENV
      },

      // payment_method_types: ['card', 'bancontact'], 
    });

    console.log("✅ PaymentIntent créé avec succès :", paymentIntent.id);

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    console.error("❌ ERREUR Stripe lors de createPaymentIntent :", e.message);
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

module.exports = router;
