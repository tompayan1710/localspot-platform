const db = require("./index");

async function test() {
  const res = await db.query("SELECT NOW()");
  console.log("🕒 Heure du serveur PostgreSQL :", res.rows[0]);
  process.exit(0); // 0 = succès

}

test();
