const db = require("../index");

// 🔹 Crée un nouveau QR code
async function createQRCode(slug, url, displayId, category_id) {
  const query = `
    INSERT INTO qr_codes (slug, url, display_id, category_id)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `;
  const values = [slug, url, displayId, category_id];
  const result = await db.query(query, values);
  return result.rows[0];
}

// 🔹 Récupère un QR code par son slug
async function getQRCodeBySlug(slug) {
  const result = await db.query("SELECT * FROM qr_codes WHERE slug = $1", [slug]);
  return result.rows[0];
}

// 🔹 Récupère tous les QR codes
async function getAllQRCodes() {
  const result = await db.query(`
    SELECT 
      q.*, 
      c.name AS category_name
    FROM qr_codes q
    LEFT JOIN categories c ON q.category_id = c.id
    ORDER BY q.created_at DESC;
  `);
  return result.rows;
}

module.exports = {
  createQRCode,
  getQRCodeBySlug,
  getAllQRCodes,
};
