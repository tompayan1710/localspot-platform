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
  const result = await db.query(`SELECT * FROM offers WHERE slug = $1`, [slug]);
  return result.rows[0];
}

// 🔹 Récupère toutes les offres
async function getAllOffers() {
  const result = await db.query(`SELECT * FROM offers ORDER BY created_at DESC`);
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
