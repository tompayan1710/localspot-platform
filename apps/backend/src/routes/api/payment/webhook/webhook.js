const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { sendReservationEmail } = require("../../../api/../../utils/email");
const { saveCreneau } = require("../../../../db/Models/CreneauModel");
// const { generateTicketPDF } = require("../Ticket/TicketFunctions");
const fs = require("fs");

const { generateTicketPDF } = require("../Ticket/generateTicketPDF");

module.exports = async function stripeWebhook(req, res) {
  console.log("➡️  Stripe webhook hit", req.method, req.originalUrl);
  console.log("sig:", (req.headers["stripe-signature"] || "").slice(0, 30));
  console.log("raw isBuffer:", Buffer.isBuffer(req.body), "len:", Buffer.isBuffer(req.body) ? req.body.length : 0);

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // <- TEST uniquement
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    // ⚠️ utiliser req.body (buffer), pas request.body
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log("⚠️  Webhook signature verification failed:", err.message);
    return res.sendStatus(400); // <- utiliser res, pas response
  }

  if (event.type === "payment_intent.succeeded") {
    
    const paymentIntent = event.data.object;
    console.log("✅ PaymentIntent successful:", paymentIntent.id);


    
    // moyen de paiement (optionnel)
    let payment_method = "Inconnu";
    const charge = paymentIntent.charges?.data?.[0];
    if (charge?.payment_method_details?.card) {
      const { brand, last4 } = charge.payment_method_details.card;
      payment_method = `${brand?.toUpperCase?.() || "CARD"} - XXXX ${last4}`;
    }

    const meta = paymentIntent.metadata || {};


    if (meta.mode !== process.env.NODE_ENV) {
      console.warn("⛔ Webhook ignoré car mode différent :", meta.mode, "vs", process.env.NODE_ENV);
      return res.status(200).send("Webhook ignoré - mauvais environnement");
    }
    // 💡 tant que tu es en TEST, enlève ce garde-fou d’environnement
    // if (meta.mode !== process.env.NODE_ENV) {
    //   console.warn("⛔ Webhook ignoré car mode différent :", meta.mode, "vs", process.env.NODE_ENV);
    //   return res.status(200).send("Webhook ignoré - mauvais environnement");
    // }

    const idHoteNormalized =
    meta.id_hote && meta.id_hote !== "null" && meta.id_hote !== ""
      ? parseInt(meta.id_hote, 10)
      : null;

    const reservation = {
      user_id: meta.user_id && meta.user_id !== "guest" ? parseInt(meta.user_id, 10) : 1,
      provider_id: parseInt(meta.provider_id, 10),
      offerSlug: meta.offerSlug,
      id_hote: idHoteNormalized,
      date: meta.date,
      start_hour: meta.start_hour,
      end_hour: meta.end_hour,
      adresse: meta.adresse || "PasDAdresse",
      nb_adult: parseInt(meta.nb_adult, 10),
      nb_reduced: parseInt(meta.nb_reduced, 10),
      total_participants: parseInt(meta.total_participants, 10),
      price_per_person: parseFloat(meta.price_per_person),
      total_price: parseInt(meta.total_participants, 10) * parseFloat(meta.price_per_person),
      name: meta.name,
      email: meta.email,
      phone: meta.phone,
      title: meta.title,
      payment_intent_id: paymentIntent.id,
      payment_method,
    };

    console.log("💥✅Reservation :", reservation);

    const savedReservation = await saveCreneau(reservation);
    const completeReservation = { ...reservation, ...savedReservation };

    console.log("💥✅savedReservation :", savedReservation);
    console.log("💥✅completeReservation :", completeReservation);

    const pdfPath = await generateTicketPDF(completeReservation);
    await sendReservationEmail(completeReservation, pdfPath);
    await fs.promises.unlink(pdfPath);

    console.log("Email envoyé avec succès");
  } else {
    console.log("Unhandled event type", event.type);
  }

  return res.json({ received: true });
};






//  const paymentIntent = event.data.object;
//       // Then define and call a method to handle the successful payment intent.
//       // handlePaymentIntentSucceeded(paymentIntent);
//       console.log("✅ PaymentIntent successful:", paymentIntent.id);

//       // Infos sur le moyen de paiement
//       const charge = paymentIntent.charges?.data?.[0];

//       let payment_method = "Inconnu";

//       // Vérifie si une charge existe
//       if (paymentIntent.charges && paymentIntent.charges.data && paymentIntent.charges.data.length > 0) {
//         const charge = paymentIntent.charges.data[0];

//         // Vérifie que la charge contient bien une carte
//         if (charge.payment_method_details && charge.payment_method_details.card) {
//           const { brand, last4 } = charge.payment_method_details.card;
//           payment_method = `${brand.toUpperCase()} - XXXX ${last4}`;
//         } else {
//           console.warn("⚠️ Pas de détails de carte dans la charge :", charge.payment_method_details);
//         }
//       } else {
//         console.warn("⚠️ Aucune charge trouvée dans PaymentIntent :", paymentIntent.charges);
//       }


//       const meta = paymentIntent.metadata;

//       if (meta.mode !== process.env.NODE_ENV) {
//         console.warn("⛔ Webhook ignoré car mode différent :", meta.mode, "vs", process.env.NODE_ENV);
//         return response.status(200).send("Webhook ignoré - mauvais environnement");
//       }