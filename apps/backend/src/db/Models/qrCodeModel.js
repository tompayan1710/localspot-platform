const db = require("../index");

// 🔹 Crée un nouveau QR code
async function createQRCode(slug, id_hote, latitude, longitude, adresse, image_url) {
  const query = `
    INSERT INTO qr_codes (slug, id_hote, latitude, longitude, adresse, image_url)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;
  const values = [slug, id_hote, latitude, longitude, adresse, image_url];
  const result = await db.query(query, values);
  return result.rows[0];
}

async function getQRCodeBySlug(slug) {
  const query = `
    SELECT * FROM qr_codes WHERE qr_codes.slug = $1
  `;
  const values = [slug];
  const result = await db.query(query, values);
  return result;
}

module.exports = {
  createQRCode,
  getQRCodeBySlug,
};