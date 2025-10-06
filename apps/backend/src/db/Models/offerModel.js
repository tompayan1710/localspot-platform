const db = require("../index");
const { v4: uuidv4 } = require("uuid");

// 🔹 Crée une nouvelle offre
async function createOffer({
  title,
  description,
  adresse,
  latitude,
  longitude,
  departement_id,
  categories,
  type,
  city_id,
  priceAdult,
  priceChild,
  priceBaby,
  price,
  counts_toward_capacity_adult,
  counts_toward_capacity_child,
  counts_toward_capacity_infant,
  duration,
  image_urls,
  provider_id,
  pricePer,
  total_capacity,
  slug,
  cancellable,
  title_i18n,
  description_i18n
}) {

  const query = `
    INSERT INTO offers (
      title,
      description,
      adresse,
      latitude,
      longitude,
      departement_id,
      categories,
      type,
      city_id,
      duration,
      image_urls,
      provider_id,
      pricePer,
      total_capacity,
      slug,
      cancellable,
      title_i18n, 
      description_i18n,
      price  
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
    RETURNING *;
  `;

  const values = [
    title, description, adresse, latitude, longitude, departement_id,
    categories, type, city_id, duration, image_urls, provider_id,
    pricePer, total_capacity,
    // qrcode_url,
    slug, cancellable,
    JSON.stringify(title_i18n),          // <-- JSONB { fr, en }
    JSON.stringify(description_i18n),    // <-- JSONB { fr, en }
    price
  ];

  const result = await db.query(query, values);

  const band_types = [
    { type: "adult",  price: priceAdult, age_min: 18, age_max: null },
    { type: "child",  price: priceChild, age_min: 5,  age_max: 17 },
    { type: "infant", price: priceBaby,  age_min: 0,  age_max: 4 },
  ];

  const adultId = (await createOfferPricing(slug, "adult", 18, 99, priceAdult, "EUR", counts_toward_capacity_adult)).id;
  const childId = (await createOfferPricing(slug, "child", 5, 17, priceChild, "EUR", counts_toward_capacity_child)).id;
  const infantId = (await createOfferPricing(slug, "infant", 0, 4, priceBaby, "EUR", counts_toward_capacity_infant)).id;
  
  const updating_result = await db.query(`
    UPDATE offers
    SET offer_pricing_adult = $1,
        offer_pricing_child = $2,
        offer_pricing_infant = $3
    WHERE slug = $4
    RETURNING *;
  `, [adultId, childId, infantId, slug]);

  
  return updating_result.rows[0];
}

async function createOfferPricing(offer_slug, band_type, age_min, age_max, price, currency, counts_toward_capacity) {
  const query = `
    INSERT INTO offer_pricing (
      offer_slug, band_type, age_min, age_max, price, currency, counts_toward_capacity  
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [
    offer_slug, band_type, age_min, age_max, price, currency, counts_toward_capacity
  ];

  const result = await db.query(query, values);
  return result.rows[0];
}

// 🔹 Récupère une offre par son ID
async function getOfferBySlug(slug, lang) {
  const short = (lang || "fr").split("-")[0].toLowerCase();

  const result = await db.query(`
    SELECT
      o.id,
      o.slug,
      o.adresse,
      o.latitude,
      o.longitude,
      o.city_id,
      o.categories,
      o.type,
      o.price,
      o.priceper,
      o.duration,
      o.image_urls,
      o.provider_id,
      o.total_capacity,
      o.cancellable,
      o.created_at,
      o.updated_at,
      COALESCE(o.title_i18n->>$2,       o.title_i18n->>'fr',       o.title)       AS title,
      COALESCE(o.description_i18n->>$2, o.description_i18n->>'fr', o.description) AS description,

      o.departement_id,
      
      
      -- 👇 Objet JSON construit seulement avec les clés présentes
      (
        COALESCE(
          CASE WHEN ap.id IS NOT NULL THEN
            jsonb_build_object(
              'adult', jsonb_build_object(
                'id', ap.id,
                'type', ap.band_type,
                'price', ap.price,
                'currency', ap.currency,
                'age_min', ap.age_min,
                'age_max', ap.age_max,
                'counts_toward_capacity', ap.counts_toward_capacity
              )
            )
          END, '{}'::jsonb
        )
        ||
        COALESCE(
          CASE WHEN cp.id IS NOT NULL THEN
            jsonb_build_object(
              'child', jsonb_build_object(
                'id', cp.id,
                'type', cp.band_type,
                'price', cp.price,
                'currency', cp.currency,
                'age_min', cp.age_min,
                'age_max', cp.age_max,
                'counts_toward_capacity', cp.counts_toward_capacity
              )
            )
          END, '{}'::jsonb
        )
        ||
        COALESCE(
          CASE WHEN ip.id IS NOT NULL THEN
            jsonb_build_object(
              'infant', jsonb_build_object(
                'id', ip.id,
                'type', ip.band_type,
                'price', ip.price,
                'currency', ip.currency,
                'age_min', ip.age_min,
                'age_max', ip.age_max,
                'counts_toward_capacity', ip.counts_toward_capacity
              )
            )
          END, '{}'::jsonb
        )
      ) AS pricing


    FROM offers o
      LEFT JOIN offer_pricing AS ap ON ap.id = o.offer_pricing_adult
      LEFT JOIN offer_pricing AS cp ON cp.id = o.offer_pricing_child
      LEFT JOIN offer_pricing AS ip ON ip.id = o.offer_pricing_infant
      WHERE o.slug = $1
    LIMIT 1;`
    , [slug, short]
  );
  return result;
}
 
// 🔹 Récupère toutes les offres
// async function getAllOffers() {
//   const result = await db.query(`SELECT * FROM offers ORDER BY created_at DESC`);
//   return result.rows;
// }
async function getAllOffers(whereClause = "", values = [], moment = "", lang="fr") {
  try {
    console.log("GetAllOffers : moment : ", moment);
    const short = (lang || "fr").split("-")[0].toLowerCase();
    const langIdx = values.length + 1; // position du paramètre langue
 
    const lowerMoment = moment?.toLowerCase();
    const momentMap = {
      "matin": "isMorning",
      "après-midi": "isAfternoon",
      "soir": "isEvening" // majuscule ici ✅
    };

    const momentField = momentMap[lowerMoment];
    const momentFilter = momentField ? `WHERE ow."${momentField}" = true` : "";


  const result = await db.query(`
    WITH valid_slots AS (
      SELECT o.slug AS offer_slug, unnest(ex.slots)::time AS slot
      FROM offers o
      JOIN offer_exceptional_slots ex ON ex.slug_offer = o.slug
      WHERE ex.date = CURRENT_DATE
        AND NOT EXISTS (
          SELECT 1
          FROM offer_cancel_slots can, unnest(can.slots) AS canceled
          WHERE can.slug_offer = o.slug
            AND can.date = ex.date
            AND canceled = ANY(ex.slots)
        )

      UNION ALL

      SELECT o.slug AS offer_slug, unnest(re.slots)::time AS slot
      FROM offers o
      JOIN offer_recurring_slots re ON re.slug_offer = o.slug
      WHERE re.day_of_week = LOWER(TRIM(TO_CHAR(CURRENT_DATE, 'Day')))
        AND NOT EXISTS (
          SELECT 1
          FROM offer_cancel_slots can, unnest(can.slots) AS canceled
          WHERE can.slug_offer = o.slug
            AND can.date = CURRENT_DATE
            AND canceled = ANY(re.slots)
        )
    ),

    offers_with_moment AS (
      SELECT 
        o.*,
        EXISTS (
          SELECT 1 FROM valid_slots vs
          WHERE vs.offer_slug = o.slug AND vs.slot < '12:00'
        ) AS "isMorning",
        EXISTS (
          SELECT 1 FROM valid_slots vs
          WHERE vs.offer_slug = o.slug AND vs.slot >= '12:00' AND vs.slot < '18:00'
        ) AS "isAfternoon",
        EXISTS (
          SELECT 1 FROM valid_slots vs
          WHERE vs.offer_slug = o.slug AND (vs.slot >= '18:00' OR vs.slot <= '03:00')
        ) AS "isEvening"
      FROM offers o
      ${whereClause ? `WHERE ${whereClause}` : ""}
    ),



    -- SELECT * FROM offers_with_moment ow
     reservations_count AS (
  SELECT
    ri.offer_slug,
    COUNT(*)::int AS nb_reservation
  FROM reservation_slots ri
  GROUP BY ri.offer_slug
)

SELECT 
  ow.id,
      ow.slug,
      ow.adresse,
      ow.latitude,
      ow.longitude,
      ow.city_id,
      ow.categories,
      ow.type,
      ow.price,
      ow.priceper,
      ow.duration,
      ow.image_urls,
      ow.provider_id,
      ow.total_capacity,
      ow.cancellable,
      ow.created_at,
      ow.updated_at,
      COALESCE(ow.title_i18n->>$${langIdx},       ow.title_i18n->>'fr',       ow.title)       AS title,
      COALESCE(ow.description_i18n->>$${langIdx}, ow.description_i18n->>'fr', ow.description) AS description,
      ow."isMorning",
      ow."isAfternoon",
      ow."isEvening",

  COALESCE(rc.nb_reservation, 0) AS nb_reservation
FROM offers_with_moment ow
LEFT JOIN reservations_count rc
  ON rc.offer_slug = ow.slug
${momentField ? `WHERE ow."${momentField}" = TRUE` : ""}
ORDER BY ow.created_at DESC;
  `, [...values, short]);

//   const result = await db.query(`
// SELECT 
//   *
// FROM offers ow
// ORDER BY ow.created_at DESC;
//   `, values);

  return result.rows;
  } catch (err) {
    console.error("❌ ERREUR DANS getAllOffers :", err);
    throw err; // Pour remonter au contrôleur
  }
}





// SELECT 
//       o.*,

//       -- Présence d'au moins un créneau le matin
//       EXISTS (
//         SELECT 1 FROM valid_slots vs
//         WHERE vs.offer_slug = o.slug AND vs.slot < '12:00'
//       ) AS "isMorning",

//       -- Après-midi
//       EXISTS (
//         SELECT 1 FROM valid_slots vs
//         WHERE vs.offer_slug = o.slug AND vs.slot >= '12:00' AND vs.slot < '18:00'
//       ) AS "isAfternoon",

//       -- Soir
//       EXISTS (
//         SELECT 1 FROM valid_slots vs
//         WHERE vs.offer_slug = o.slug AND vs.slot >= '18:00'
//       ) AS "isEvening"

//     FROM offers o
//     ${whereClause};
//   `, values)

async function getOffersProvider(provider_id, lang) {
  console.log("🔍 Récupération des offres du provider", provider_id);
  const result = await db.query(
    `SELECT 
      *, 
      COALESCE(o.title_i18n->>$2, o.title_i18n->>'fr') AS title
    FROM offers o
      WHERE provider_id = $1 
    ORDER BY created_at DESC
    `, 
    [provider_id, lang]);
  return result.rows;
}




async function createSlugOfferNotExist() {
  let slug = uuidv4(); // identifiant unique pour ce QR code
    while((await getOfferBySlug(slug)).rowCount > 0){
      slug = uuidv4();
  }

  return slug;
}


async function deleteOffer(id) {
  console.log("Deleting Offer ", id);

  const result = await db.query(
    `DELETE FROM offers WHERE id = $1 RETURNING *;`,
    [id]
  );

  const result_pricing = await db.query(
    `DELETE FROM offer_pricing WHERE offer_slug = $1 RETURNING *;`,
    [id]
  );

  const result_recurring_slots = await db.query(
    `DELETE FROM offer_recurring_slots WHERE slug_offer = $1 RETURNING *;`,
    [id]
  );


  return result.rows[0] || null;
}



module.exports = {
  createOffer,
  getOfferBySlug,
  getAllOffers,
  getOffersProvider,
  createSlugOfferNotExist,
  deleteOffer
};
