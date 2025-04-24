const db = require("../index");

// 🔹 Ajouter un nouveau placement
async function addPlacement({ latitude, longitude, adresse, city_id, position_description }) {
  const result = await db.query(`
    INSERT INTO qr_placements (latitude, longitude, adresse, city_id, position_description)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `, [latitude, longitude, adresse, city_id, position_description]);

  return result.rows[0];
}

// 🔹 Récupérer tous les placements avec info ville
async function getAllPlacements() {
  const result = await db.query(`
    SELECT 
      qp.*, 
      c.name AS city_name
    FROM qr_placements qp
    LEFT JOIN cities c ON qp.city_id = c.id
    ORDER BY qp.created_at DESC;
  `);
  return result.rows;
}

// 🔹 Récupérer les placements d’une ville précise
async function getPlacementsByCityId(city_id) {
  const result = await db.query(`
    SELECT 
      qp.*, 
      c.name AS city_name
    FROM qr_placements qp
    LEFT JOIN cities c ON qp.city_id = c.id
    WHERE qp.city_id = $1
    ORDER BY qp.created_at DESC;
  `, [city_id]);
  return result.rows;
}

// 🔹 Supprimer un placement
async function deletePlacement(id) {
  await db.query(`DELETE FROM qr_placements WHERE id = $1`, [id]);
}

module.exports = {
  addPlacement,
  getAllPlacements,
  getPlacementsByCityId,
  deletePlacement
};
