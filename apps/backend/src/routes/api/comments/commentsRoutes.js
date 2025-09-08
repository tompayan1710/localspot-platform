const express = require("express");
const router = express.Router();

// // const { createOffer, getAllOffers, getOfferBySlug, getOffersProvider } = require("../../../db/Models/offerModel");
// // const { findOrCreateCityByName } = require("../../../db/Models/AdresseModel");
const db = require("../../../db/index");




router.post("/add-comment", async (req, res) => {
  const { user_id, reservation_id, offer_slug, rating, comment } = req.body;

  console.log("Je suis dans le Add-Comment")
  if (!user_id || !reservation_id) {
    return res.status(400).json({ success: false, error: "user_id ou reservation_id manquant" });
  }

  try {
    const result = await db.query(
      `SELECT * FROM comments WHERE user_id = $1 AND reservation_id = $2`,
      [user_id, reservation_id]
    );

    if (result.rowCount > 0) {
      return res.json({ success: false, message: "Un commentaire a déjà été laissé pour cette réservation." });
    }

    const insertResult = await db.query(
      `INSERT INTO comments(user_id, reservation_id, offer_slug, rating, comment)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [user_id, reservation_id, offer_slug, rating, comment]
    );

    return res.json({ success: true, comment: insertResult.rows[0] });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});


router.get("/getall", async (req, res) => {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ success: false, error: "Paramètre 'slug' manquant" });
  }

  try {
    const result = await db.query(
      `
      SELECT *, rating::float
      FROM comments
      WHERE offer_slug = $1
      ORDER BY created_at DESC
      `,
      [slug]
    );

    return res.json({ success: true, comments: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});



module.exports = router;