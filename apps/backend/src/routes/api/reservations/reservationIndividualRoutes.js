const express = require("express");
const router = express.Router();
const pool = require("../../../db/index");


router.get("/getall", async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ error: "user_id manquant." });
  }

  try {
      const query = `
        SELECT
          i.id              AS reservation_id,
          i.user_id,
          i.total_participants,
          i.total_price,
          i.payment_status,
          i.created_at      AS reservation_created_at,
          i.nb_reduced,
          i.nb_adult,


          s.id              AS slot_id,
          s.date,
          s.start_hour,
          s.end_hour,
          s.offer_slug,
          s.status          AS slot_status
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
  const { reservation_id } = req.query;

  if (!reservation_id) {
    return res.status(400).json({ error: "reservation_id manquant." });
  }

  try {
      const query = `
        SELECT
          i.id              AS reservation_id,
          i.user_id,
          i.total_participants,
          i.total_price,
          i.payment_status,
          i.reservation_status,
          i.created_at      AS reservation_created_at,
          i.nb_reduced,
          i.nb_adult,
          i.name,
          i.phone,
          i.email,


          s.id              AS slot_id,
          s.date,
          s.start_hour,
          s.end_hour,
          s.offer_slug,
          s.price_per_person,
          s.status          AS slot_status,

          o.adresse,
          o.title
        FROM reservations_individuals AS i
        JOIN reservation_slots AS s ON i.slot_id = s.id
        JOIN offers o ON o.slug = s.offer_slug
        WHERE i.id = $1
        `
    const values = [reservation_id];
    const result = await pool.query(query, values);

    // C'est CETTE ligne qui manque dans ton code :
    return res.json({ success: true, reservation: result.rows[0] });  // ✅ Corrigé
  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({success: false, error: "Erreur serveur" });
  }
});


module.exports = router;
