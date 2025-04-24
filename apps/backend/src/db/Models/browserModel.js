const db = require("../index");

// 🔹 Trouve un navigateur par nom
async function findBrowserByName(name) {
  const result = await db.query(
    `SELECT * FROM browsers WHERE name = $1 LIMIT 1`,
    [name]
  );
  return result.rows[0];
}

// 🔹 Crée un navigateur si non existant, puis le retourne
async function findOrCreateBrowser(name) {
  // 1. Vérifie s’il existe déjà
  const existing = await findBrowserByName(name);
  if (existing) return existing;

  // 2. Sinon, insère et retourne
  const result = await db.query(
    `INSERT INTO browsers (name) VALUES ($1) RETURNING *`,
    [name]
  );
  return result.rows[0];
}

module.exports = {
  findBrowserByName,
  findOrCreateBrowser,
};
