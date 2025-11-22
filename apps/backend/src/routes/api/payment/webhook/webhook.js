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



    const nb_adult = parseInt(meta.nb_adult || "0", 10) || 0;
    const nb_child = parseInt(meta.nb_child || "0", 10) || 0;
    const nb_infant = parseInt(meta.nb_infant || "0", 10) || 0;

    const adult_counts_toward_capacity = meta.adult_counts_toward_capacity === "true";
    const child_counts_toward_capacity = meta.child_counts_toward_capacity === "true";
    const infant_counts_toward_capacity = meta.infant_counts_toward_capacity === "true";


    const idHoteNormalized =
      meta.id_hote && meta.id_hote !== "null" && meta.id_hote !== ""
        ? parseInt(meta.id_hote, 10)
        : null;

    const total_price_eur = (paymentIntent.amount_received ?? paymentIntent.amount) / 100;
    const total_places_used =
      (adult_counts_toward_capacity ? nb_adult : 0) +
      (child_counts_toward_capacity ? nb_child : 0) +
      (infant_counts_toward_capacity ? nb_infant : 0);

    const labels = meta.labels ? JSON.parse(meta.labels) : {};

    const reservation = {
      user_id: meta.user_id && meta.user_id !== "guest" ? parseInt(meta.user_id, 10) : 1,
      provider_id: parseInt(meta.provider_id || "0", 10),
      offerSlug: meta.offerSlug || "",
      id_hote: idHoteNormalized,
      date: meta.date || "",
      start_hour: meta.start_hour || "",
      end_hour: meta.end_hour || "",
      adresse: meta.adresse || "No_Adresse",
      nb_adult,
      nb_child,
      nb_infant,
      unit_price_adult: parseFloat(meta.unit_price_adult) || 0,
      unit_price_child: parseFloat(meta.unit_price_child) || 0,
      unit_price_infant: parseFloat(meta.unit_price_infant) || 0,
      total_places_used: total_places_used,
      total_price_eur: total_price_eur,
      name: meta.name || "",
      email: meta.email || "",
      phone: meta.phone || "",
      title: meta.title || "",
      payment_intent_id: paymentIntent.id,
      payment_method, 
      reservation_created_at: new Date(),
      
      lang: meta.lang,
    };

    console.log("💥✅Reservation :", reservation);
    console.log("💥Essaye d'entre dans saveCreneau :", reservation);

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

