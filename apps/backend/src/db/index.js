const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log("🧠 Connexion à la base :", process.env.DATABASE_URL); // 🔥 Ajoute ceci !


module.exports = {
  query: (text, params) => pool.query(text, params),
};
