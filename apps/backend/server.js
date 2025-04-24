const app = require("./src/app");
require("dotenv").config();
const db = require("./src/db/index"); 


//AIzaSyAe-fjksdOMXtdDWnGmJKEhOMiFFY4WRS0
PORT=process.env.PORT || 3000;

console.log(process.env.PORT); // → "5000"
console.log(process.env.SECRET_KEY); //


app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});


db.query("SELECT NOW()")
  .then(() => {
    console.log("✅ Connecté à PostgreSQL (vérification unique)");
  })
  .catch((err) => {
    console.error("❌ Erreur de connexion PostgreSQL :", err.message);
  });