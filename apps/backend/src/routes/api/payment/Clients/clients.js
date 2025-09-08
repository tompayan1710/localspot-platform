const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
});

router.post("/create-payment-intent", async (req, res) => {
  const {
      user_id,
      offerSlug,
      name,
      email,
      phone,
      title,
      provider_id,
      id_hote,
      OfferIsCancellable,
      nb_adult,
      nb_child,
      nb_infant,
      unit_price_adult,
      unit_price_child,
      unit_price_infant,
      adult_counts_toward_capacity,
      child_counts_toward_capacity,
      infant_counts_toward_capacity,
      pricing,
      start_hour,
      end_hour,
      date,
      adresse,
      total_capacity,
    } = req.body;


  // const totalEur =
  //   ((Number(pricing?.adult?.price)  || 0) * (Number(nb_adult)  || 0)) +
  //   ((Number(pricing?.child?.price)  || 0) * (Number(nb_child)  || 0)) +
  //   ((Number(pricing?.infant?.price) || 0) * (Number(nb_infant) || 0));

  const totalEur =
    ((Number(unit_price_adult)  || 0) * (Number(nb_adult)  || 0)) +
    ((Number(unit_price_child)  || 0) * (Number(nb_child)  || 0)) +
    ((Number(unit_price_infant) || 0) * (Number(nb_infant) || 0));

  const amount = Math.round(totalEur * 100); // en centimes
    if (!amount || amount < 50) {
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
        user_id: String(user_id ?? ""),
        offerSlug: String(offerSlug ?? ""),
        name: String(name ?? ""),
        email: String(email ?? ""),
        phone: String(phone ?? ""),
        title: String(title ?? ""),
        provider_id: String(provider_id ?? ""),
        id_hote: id_hote ? String(id_hote) : "",
        OfferIsCancellable: String(!!OfferIsCancellable),
        nb_adult: String(nb_adult),
        nb_child: String(nb_child),
        nb_infant: String(nb_infant),
        unit_price_adult: String(unit_price_adult ?? pricing?.adult?.price ?? ""),
        unit_price_child: String(unit_price_child ?? pricing?.child?.price ?? ""),
        unit_price_infant: String(unit_price_infant ?? pricing?.infant?.price ?? ""),
        adult_counts_toward_capacity: String(adult_counts_toward_capacity ?? true),
        child_counts_toward_capacity: String(child_counts_toward_capacity ?? true),
        infant_counts_toward_capacity: String(infant_counts_toward_capacity ?? true),
        total_price_eur: String(totalEur ?? ""),
        start_hour: String(start_hour ?? ""),
        end_hour: String(end_hour ?? ""),
        date: String(date ?? ""),
        adresse: String(adresse ?? "CreatePayementNoAdresse"),
        total_capacity: String(total_capacity ?? ""),
        mode: String(process.env.NODE_ENV),
      },

      // payment_method_types: ['card', 'bancontact'], 
    });

    console.log("✅ PaymentIntent créé avec succès :", paymentIntent.id);
    console.log(paymentIntent.metadata);
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
