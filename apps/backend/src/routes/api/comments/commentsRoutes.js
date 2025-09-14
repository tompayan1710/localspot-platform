const express = require("express");
const router = express.Router();

// // const { createOffer, getAllOffers, getOfferBySlug, getOffersProvider } = require("../../../db/Models/offerModel");
// // const { findOrCreateCityByName } = require("../../../db/Models/AdresseModel");
const db = require("../../../db/index");
const { translateToAll } = require("../../../utils/translate");




router.post("/add-comment", async (req, res) => {
  const { user_id, reservation_id, offer_slug, rating, comment } = req.body;

  
  console.log("Je suis dans le Add-Comment")
  if (!user_id || !reservation_id) {
    return res.status(400).json({ success: false, error: "user_id ou reservation_id ou offer_slug manquant" });
  }

    const SUPPORTED_LANGS = [
    "en",
    "fr",
    // "it",
    // "de"
  ]

  const comment_i18n = await translateToAll(comment, SUPPORTED_LANGS /* , "fr" si tu sais */);


  try {
    const result = await db.query(
      `SELECT * FROM comments WHERE user_id = $1 AND reservation_id = $2`,
      [user_id, reservation_id]
    );

    if (result.rowCount > 0) {
      return res.json({ success: false, message: "Un commentaire a déjà été laissé pour cette réservation." });
    }

    const insertResult = await db.query(
      `INSERT INTO comments(user_id, reservation_id, offer_slug, rating, comment, comment_i18n)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [user_id, reservation_id, offer_slug, rating, comment, JSON.stringify(comment_i18n)]
    );

    const newComment = insertResult.rows[0];

    console.log("Mon Comment : ", newComment);
    // Met à jour la réservation avec la FK du commentaire

    await db.query(
      `UPDATE reservations_individuals SET comment_id = $1 WHERE id = $2`,
      [newComment.id, reservation_id]
    );

    return res.json({ success: true, comment: insertResult.rows[0] });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});


router.get("/getall", async (req, res) => {
  const { slug, lang } = req.query;

  const short = (lang || "fr").split("-")[0].toLowerCase();

  if (!slug) {
    return res.status(400).json({ success: false, error: "Paramètre 'slug' manquant" });
  }

  try {
    const result = await db.query(
      `
      SELECT 
        *, 
        rating::float,
        COALESCE(c.comment_i18n->>$2, c.comment_i18n->>'fr') AS comment
      FROM comments c
      WHERE offer_slug = $1
      ORDER BY created_at DESC
      `,
      [slug, short] // ⚠️ utilise "short" (lang simplifiée) au lieu de lang brut
    );


    return res.json({ success: true, comments: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});



router.get("/right-comment", async (req, res) => {
  const { user_id, res_id } = req.query;

  console.log("J'analyse Si Right to Comment ->", user_id);

  if (!user_id || !res_id || res_id === "null") {
    return res.status(400).json({ 
      success: false, 
      error: "Paramètre 'user_id' ou 'res_id' manquant ou invalide" 
    });
  }

  try {
    const result = await db.query(
      `
      SELECT 
        ri.id AS reservation_id,
        ri.comment_id
      FROM reservations_individuals ri
      WHERE ri.user_id = $1 
        AND ri.id = $2
        AND ri.reservation_status = 'confirmed'
      ORDER BY ri.created_at DESC
      `,
      [user_id, res_id]
    );

    console.log("Résultat SQL →", result.rows);

    if (result.rowCount === 0) {
      return res.json({ success: true, canComment: false, have_reservation: false });
    }

    // Vérifie s'il existe au moins une réservation sans commentaire associé
    const uncommented = result.rows.find(r => r.comment_id === null);

    if (uncommented) {
      return res.json({
        success: true,
        canComment: true,
        have_reservation: true,
        reservation_id: uncommented.reservation_id
      });
    } else {
      return res.json({ success: true, canComment: false, have_reservation: true });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});


module.exports = router;