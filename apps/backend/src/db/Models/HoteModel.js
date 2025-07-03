const db = require("../index");

async function getHoteById(id_hote) {
  const query = `
    SELECT * FROM hotes WHERE id = $1
  `;
  const values = [id_hote];
  const result = await db.query(query, values);
  return result;
}

async function getAllHotesBySlug(slug) {
  const query = `
    SELECT * FROM qr_codes q
    JOIN hotes h ON h.id = q.id_hote
    WHERE q.slug = $1
  `;
  const values = [slug];
  const result = await db.query(query, values);
  return result;
}


module.exports = {
  getHoteById,
  getAllHotesBySlug
};