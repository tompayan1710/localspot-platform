const db = require("../index");

// 🔹 Crée une nouvelle offre
async function createOffer({
  title,
  description,
  adresse,
  latitude,
  longitude,
  categories,
  type,
  city_id,
  price,
  duration,
  image_urls,
  provider_id,
  pricePer,
  qrcode_url,
  slug,
  cancellable
}) {
  const query = `
    INSERT INTO offers (
      title,
      description,
      adresse,
      latitude,
      longitude,
      categories,
      type,
      city_id,
      price,
      duration,
      image_urls,
      provider_id,
      pricePer,
      qrcode_url,
      slug,
      cancellable     
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
    RETURNING *;
  `;

  const values = [
    title,
    description,
    adresse,
    latitude,
    longitude,
    categories,
    type,
    city_id,
    price,
    duration,
    image_urls,
    provider_id,
    pricePer,
    qrcode_url,
    slug,
    cancellable
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

// 🔹 Récupère une offre par son ID
async function getOfferBySlug(slug) {
  const result = await db.query(`
    SELECT * FROM offers
    WHERE slug = $1`
    , [slug]
  );
  return result;
}
 
// 🔹 Récupère toutes les offres
// async function getAllOffers() {
//   const result = await db.query(`SELECT * FROM offers ORDER BY created_at DESC`);
//   return result.rows;
// }
async function getAllOffers() {
  const result = await db.query(`
    SELECT 
      o.*, 
      (
        -- CAS 1 : Créneau EXCEPTIONNEL aujourd'hui et pas tous annulés
        EXISTS (
          SELECT 1
          FROM offer_exceptional_slots ex
          WHERE ex.slug_offer = o.slug                     -- même offre
            AND ex.date = CURRENT_DATE                     -- aujourd'hui
            AND EXISTS (
              SELECT 1
              FROM unnest(ex.slots) AS slot                -- on prend chaque créneau de l'exceptionnel
              WHERE NOT EXISTS (
                SELECT 1
                FROM offer_cancel_slots can,
                    unnest(can.slots) AS canceled         -- on prend chaque créneau annulé
                WHERE can.slug_offer = o.slug              -- même offre
                  AND can.date = ex.date                   -- même jour
                  AND canceled = slot                      -- on compare : même créneau
              )
            )
            -- => on vérifie que AU MOINS UN créneau exceptionnel n'est pas annulé
        )

        OR

        -- CAS 2 : Créneau RÉCURRENT aujourd'hui et pas tous annulés
        EXISTS (
          SELECT 1
          FROM offer_recurring_slots re
          WHERE re.slug_offer = o.slug
            AND re.day_of_week = LOWER(TRIM(TO_CHAR(CURRENT_DATE, 'Day')))
            -- ⬆️ convertit la date d'aujourd'hui en jour de semaine ("monday", "tuesday"...)
            AND EXISTS (
              SELECT 1
              FROM unnest(re.slots) AS slot                -- on prend chaque créneau récurrent
              WHERE NOT EXISTS (
                SELECT 1
                FROM offer_cancel_slots can,
                    unnest(can.slots) AS canceled         -- on prend chaque créneau annulé
                WHERE can.slug_offer = o.slug
                  AND can.date = CURRENT_DATE
                  AND canceled = slot                      -- on compare : même créneau
              )
            )
        )
      ) AS "isToday",
      (
        SELECT
          count(*)
        FROM reservation_slots
        JOIN reservations_individuals ON reservation_slots.id = reservations_individuals.slot_id
        WHERE reservation_slots.offer_slug = o.slug
      ) AS nb_reservation
    FROM offers o;
  `);

  // const result = await db.query(`
  //   SELECT 
  //     o.*, 
  //     (
  //       -- Cas 1 : y'a un créneau exceptionnel NON annulé
  //       EXISTS (
  //         SELECT 1
  //         FROM offer_exceptional_slots ex
  //         WHERE ex.slug_offer = o.slug
  //           AND ex.date = CURRENT_DATE
  //       )
  //       OR
  //       -- Cas 2 : y'a un créneau récurrent aujourd'hui (par jour de semaine) NON annulé
  //       EXISTS (
  //         SELECT 1
  //         FROM offer_recurring_slots re
  //         WHERE re.slug_offer = o.slug
  //           AND re.day_of_week = LOWER(TRIM(TO_CHAR(CURRENT_DATE, 'Day')))
  //       )
  //     ) AS "isToday"
  //   FROM offers o
  // `);
  console.log(result.rows)
  return result.rows;
}



async function getOffersProvider(provider_id) {
  console.log("🔍 Récupération des offres du provider", provider_id);
  const result = await db.query('SELECT * FROM offers WHERE provider_id = $1 ORDER BY created_at DESC', [provider_id]);
  return result.rows;
}







module.exports = {
  createOffer,
  getOfferBySlug,
  getAllOffers,
  getOffersProvider
};
