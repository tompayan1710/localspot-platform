// /reservation_individual
const express = require("express");
const router = express.Router();
const pool = require("../../../db/index");


router.get("/getall", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "user_id manquant." });
  }

  try {
      // const query = `
      //   SELECT
      //     i.id              AS reservation_id,
      //     i.user_id,
      //     i.total_places_used,
      //     i.gross_amount,
      //     i.payment_status,
      //     i.created_at      AS reservation_created_at,
      //     i.nb_adult,
      //     i.nb_child,
      //     i.nb_infant,

      //     s.id              AS slot_id,
      //     s.date,
      //     s.start_hour,
      //     s.end_hour,
      //     s.offer_slug,
      //     s.status          AS slot_status,

      //     COALESCE(c.comment_i18n->>$2, c.comment_i18n->>'fr') AS comment

      //   FROM reservations_individuals AS i
      //   JOIN reservation_slots AS s ON i.slot_id = s.id
      //   WHERE i.user_id = $1
      //   ORDER BY i.created_at DESC;
      //   `
    const query = `
        SELECT
          i.id              AS reservation_id,
          i.user_id,
          i.total_places_used,
          i.gross_amount,
          i.payment_status,
          i.created_at      AS reservation_created_at,
          i.nb_adult,
          i.nb_child,
          i.nb_infant,

          s.offer_slug

        FROM reservations_individuals AS i
        JOIN reservation_slots AS s ON i.slot_id = s.id
        WHERE i.user_id = $1
        ORDER BY i.created_at DESC;
        `
    const values = [user_id];
    const result = await pool.query(query, values);

    // C'est CETTE ligne qui manque dans ton code :
    return res.json({ success: true, reservations: result.rows });  // ✅ Corrigé
  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({success: false, error: "Erreur serveur" });
  }
});



router.get("/get", async (req, res) => {
  const { reservation_id, lang } = req.query;

  if (!reservation_id) {
    return res.status(400).json({ error: "reservation_id manquant." });
  }

  try {
      const query = `
        SELECT
          i.id              AS reservation_id,
          i.user_id,
          i.total_places_used,
          i.gross_amount,
          i.payment_status,
          i.reservation_status,
          i.created_at      AS reservation_created_at,
          i.nb_adult,
          i.nb_child,
          i.nb_infant,
          i.unit_price_adult,
          i.unit_price_child,
          i.unit_price_infant,
          i.name,
          i.phone,
          i.email,


          s.id              AS slot_id,
          s.date,
          s.start_hour,
          s.end_hour,
          s.offer_slug,
          s.status          AS slot_status,

          o.adresse,
          COALESCE(o.title_i18n->>$2,       o.title_i18n->>'fr',       o.title)       AS title

        FROM reservations_individuals AS i
        JOIN reservation_slots AS s ON i.slot_id = s.id
        JOIN offers o ON o.slug = s.offer_slug
        WHERE i.id = $1
        `
    const values = [reservation_id, lang];
    const result = await pool.query(query, values);

    // C'est CETTE ligne qui manque dans ton code :
    return res.json({ success: true, reservation: result.rows[0] });  // ✅ Corrigé
  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({success: false, error: "Erreur serveur" });
  }
});


// GET /api/payment/transactions/slot/:slotId/individuals?provider_id=11
router.get("/slot/:slotId/individuals", async (req, res) => {
  try {
    const { slotId } = req.params;
    const { provider_id } = req.query;

    // (optionnel) vérifier que le slot appartient bien au provider connecté
    const slotCheck = await pool.query(
      `SELECT id, provider_id FROM reservation_slots WHERE id = $1`,
      [slotId]
    );
    if (slotCheck.rowCount === 0) {
      return res.status(404).json({ success: false, error: "Slot inconnu" });
    }
    if (provider_id && String(slotCheck.rows[0].provider_id) !== String(provider_id)) {
      return res.status(403).json({ success: false, error: "Non autorisé" });
    }

    const { rows: individuals } = await pool.query(
      `
      SELECT 
        id,
        name,
        email,
        phone,
        nb_adult,
        nb_child,
        nb_infant,
        unit_price_adult,
        unit_price_child,
        unit_price_infant,
        gross_amount,
        total_places_used,
        created_at
      FROM reservations_individuals
      WHERE slot_id = $1
      ORDER BY created_at ASC
      `,
      [slotId]
    );

    return res.json({ success: true, individuals});
  } catch (e) {
    console.error("❌ /slot/:slotId/individuals error:", e);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});




router.get("/validate", async (req, res) => {
  const { slug, token_validate } = req.query;

  if (!slug || !token_validate) {
    return res.status(400).json({
      valid: false,
      message: "Paramètres manquants",
      subMessage: "Le ticket doit contenir un identifiant (slug) et un token de validation.",
    });
  }

  try {
    const result = await pool.query(
      `SELECT i.*, s.date, s.start_hour, s.end_hour
       FROM reservations_individuals i
       JOIN reservation_slots s ON s.id = i.slot_id
       WHERE s.offer_slug = $1 AND i.token_validate = $2`,
      [slug, token_validate]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        valid: false,
        message: "Ticket invalide",
        subMessage: "Ce ticket ne correspond à aucune réservation enregistrée.",
      });
    }

    const reservation = result.rows[0];

    // Vérifie si le créneau est déjà terminé
    const endDateTime = new Date(`${reservation.date}T${reservation.end_hour}`);
    const now = new Date();

    if (now > endDateTime) {
      return res.json({
        valid: false,
        message: "Ticket expiré",
        subMessage: "Ce ticket correspond à une réservation déjà passée.",
        reservation,
      });
    }

    return res.json({
      valid: true,
      message: "Ticket valide",
      subMessage: "Cette réservation est authentique et encore valable.",
      reservation,
    });
  } catch (err) {
    console.error("❌ Erreur DB validation ticket:", err);
    return res.status(500).json({
      valid: false,
      message: "Erreur serveur",
      subMessage: "Un problème est survenu lors de la vérification du ticket.",
    });
  }
});



module.exports = router;
