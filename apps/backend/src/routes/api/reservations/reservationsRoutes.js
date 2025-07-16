const express = require("express");
const router = express.Router();
const pool = require("../../../db/index");
const { getOfferBySlug } = require("../../../db/Models/offerModel");
require("dotenv").config();


router.get("/getall", async (req, res) => {
  const { offer_slug } = req.query;

  if (!offer_slug) {
    return res.status(400).json({ error: "Slug manquant." });
  }

  try {
    const query = `
      SELECT * 
      FROM reservation_slots 
      WHERE offer_slug = $1
    `;
    const values = [offer_slug];
    const result = await pool.query(query, values);

    // C'est CETTE ligne qui manque dans ton code :
    return res.json({ success: true, data: result.rows });  // ✅ Corrigé
  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/get", async (req, res) => {
  const { offer_slug, date, start_hour, end_hour } = req.body;

  if (!offer_slug || !date || !start_hour || !end_hour) {
    return res.status(400).json({ error: "Paramètres manquants." });
  }

  try {
    const query = `
      SELECT * 
      FROM reservation_slots 
      WHERE offer_slug = $1 
        AND date = $2 
        AND start_hour = $3 
        AND end_hour = $4
      LIMIT 1;
    `;
    const values = [offer_slug, date, start_hour, end_hour];
    const result = await pool.query(query, values);

    if (result.rowCount > 0) {
      return res.json({ found: true, slot: result.rows[0] });
    } else {
      return res.json({ found: false });
    }
  } catch (err) {
    console.error("❌ Erreur SQL :", err.message);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});




router.post("/getnextXdays", async (req, res) => {
  const { provider_id, numofday } = req.body;

  if (!provider_id) {
    return res.status(400).json({ error: "provider_id ou days manquant." });
  }

  try {
    const today = new Date();
    const in7Days = new Date();
    in7Days.setDate(today.getDate() + numofday);

    console.log( today.toLocaleDateString('fr-CA'), in7Days.toLocaleDateString("fr-CA"))
    const result  = await pool.query(`
      SELECT * FROM reservation_slots
      WHERE provider_id = $1
      AND date BETWEEN $2 AND $3
      ORDER BY date ASC, start_hour ASC
    `, [provider_id, today.toLocaleDateString('fr-CA'), in7Days.toLocaleDateString("fr-CA")]);

    const slots = result.rows;
    const grouped = {};

    const offers = {};

    for (const slot of slots) {
      const dateStr = slot.date.toLocaleDateString('fr-CA');
      if (!grouped[dateStr]) grouped[dateStr] = [];
      grouped[dateStr].push(slot);

      const offer_slug = slot.offer_slug;

      if (!offers[offer_slug]) {
        try {
          const dataOffer = await getOfferBySlug(offer_slug);
          if (dataOffer && dataOffer.rows && dataOffer.rows[0]) {
            offers[offer_slug] = dataOffer.rows[0];
            // console.log("OFFER ///////");
            // console.log(dataOffer.rows[0]);
          } else {
            console.warn(`❌ Aucune offre trouvée pour slug : ${offer_slug}`);
          }
        } catch (err) {
          console.error(`❌ Erreur lors de la récupération de l'offre pour slug ${offer_slug} :`, err);
        }
      }
    }

    // const result = Object.entries(grouped).map(([date, slots]) => ({
    //   date,
    //   slots
    // }));

    // console.log("Voici mon result")
    // console.log(result);
  // const result = "RESULTAT";
    return res.json({ success: true, slots: grouped, offers: offers });
  } catch (err) {
    console.error("❌ Erreur SQL getnext7days :", err.message);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});


module.exports = router;
