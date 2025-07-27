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

module.exports = router;
