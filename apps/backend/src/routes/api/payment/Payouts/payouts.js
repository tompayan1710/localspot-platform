


const express = require("express");
const router = express.Router();
const pool = require("../../../../db/index");

router.post("/request", async (req, res) => {
  const { provider_id, amount, method, details, iban, swift, name, last_name} = req.body;

  const paypal_email = "";
  if (!provider_id || !amount || !method || !details) {
    return res.status(400).json({ error: "Champs manquants" });
  }

  console.log(provider_id, amount, method, details, iban, swift, name, last_name);

  try {
    await pool.query(
      `INSERT INTO withdrawals 
        (provider_id, amount, method, details, status, iban, swift, name, last_name, paypal_email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [provider_id, amount, method, details, "waiting", iban, swift, name, last_name, paypal_email]
    );

    res.json({ success: true, message: "Demande de retrait enregistrée" });
  } catch (err) {
    console.error("❌ Erreur BDD retrait :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.post("/method", async (req, res) => {
  const { provider_id, method, details } = req.body;

  if (!provider_id || !method || !details) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  try {
    // Supprime l'ancien si existant (optionnel)
    await pool.query("DELETE FROM withdrawal_methods WHERE provider_id = $1", [provider_id]);

    // Insère le nouveau
    await pool.query(`
      INSERT INTO withdrawal_methods (provider_id, method, details)
      VALUES ($1, $2, $3)
    `, [provider_id, method, details]);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur sauvegarde méthode :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});




router.post("/getall-earnings", async (req, res) => {
  const { provider_id, method, details } = req.body;

  if (!provider_id || !method || !details) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  try {
    // Supprime l'ancien si existant (optionnel)
    await pool.query("DELETE FROM withdrawal_methods WHERE provider_id = $1", [provider_id]);

    // Insère le nouveau
    await pool.query(`
      INSERT INTO withdrawal_methods (provider_id, method, details)
      VALUES ($1, $2, $3)
    `, [provider_id, method, details]);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Erreur sauvegarde méthode :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


router.post("/add-versement", async (req, res) => {
  const { provider_id, name, last_name, method, iban, swift } = req.body;

  if (!provider_id || !name || !last_name || !iban) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  console.log(provider_id, name, last_name, method, iban, swift);

  try {
    // (Optionnel) supprimer les anciennes méthodes du même type
    await pool.query(
      "DELETE FROM withdrawal_methods WHERE provider_id = $1 AND iban=$2 AND method = 'iban'",
      [provider_id, iban]
    );

    // Insère la nouvelle méthode de retrait
    await pool.query(
      `INSERT INTO withdrawal_methods (provider_id, method, iban, swift, name, last_name)
       VALUES ($1, $2, $3, $4, $5, $6) `,
      [provider_id, method, iban, swift || null, name, last_name]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Erreur lors de l'ajout de la méthode de versement :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



router.get("/getall-withdrawal_methods", async (req, res) => {
  const { provider_id } = req.query; // <-- ici sans les parenthèses
  console.log("/getall-versements - Provider ID reçu :", provider_id);

  try {
    const versements_methode = await pool.query(
      `SELECT * FROM withdrawal_methods WHERE provider_id = $1 ORDER BY id DESC`,
      [provider_id]
    );

    res.status(200).json({ success: true, versements: versements_methode.rows });
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des méthodes de versement :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});




router.patch("/update-versement", async (req, res) => {
  const { provider_id, old_iban, updates } = req.body;

  if (!provider_id || !old_iban || !updates || typeof updates !== 'object') {
    return res.status(400).json({ error: "Données manquantes ou invalides" });
  }

  // Construction dynamique de la requête
  const fields = [];
  const values = [];
  let i = 1;

  for (const key in updates) {
    fields.push(`${key} = $${i}`);
    values.push(updates[key]);
    i++;
  }

  values.push(provider_id); // $i
  values.push(old_iban);    // $i+1

  const query = `
    UPDATE withdrawal_methods
    SET ${fields.join(", ")}
    WHERE provider_id = $${i} AND iban = $${i + 1}
  `;

  try {
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Méthode non trouvée" });
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Erreur update PATCH :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



module.exports = router;