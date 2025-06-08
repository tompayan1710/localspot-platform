const db = require("../index");

async function getHoteById(id_hote) {
  const query = `
    SELECT * FROM hotes WHERE id = $1
  `;
  const values = [id_hote];
  const result = await db.query(query, values);
  return result;
}

module.exports = {
  getHoteById,
};