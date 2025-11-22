


const express = require("express");
const router = express.Router();
const pool = require("../../../../db/index");
const { sendAdminAlertEmail } = require("../../../../utils/email");


router.post("/request", async (req, res) => {
  const { provider_id, hote_id, amount, method, details, iban, swift, first_name, last_name} = req.body;

  console.log("/requestion ENREGISTREMENT d'un retrait")
  console.log(provider_id, hote_id, amount, method, details, iban, swift, first_name, last_name);

  const paypal_email = "";
  if (!amount || !method || !details || !first_name || !last_name || (!provider_id && !hote_id)) {
    console.log("Champs manquants ")
    return res.status(400).json({ error: "Champs manquants" });
  }

  try {
    let query;
    let message;
    let value;
    
    if (provider_id) {
      query = `INSERT INTO withdrawals 
        (provider_id, amount, method, details, status, iban, swift, first_name, last_name, paypal_email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
      message = 
        "NOUVELLE DEMANDE DE RETRAIT d'un provider :\n\n" +
        `Nom : ${last_name}\n` +
        `Prénom : ${first_name}\n` +
        `provider_id : ${provider_id}\n` +
        `montant : ${amount} €\n\n` +
        `Détails : ${details}\n` +
        `Méthode : ${method}\n\n` +
        `IBAN : ${iban ? iban : "non-renseigné"}\n` +
        `SWIFT : ${swift ? swift : "non-renseigné"}\n\n` +
        `paypal_email : ${paypal_email ? paypal_email : "non-renseigné"}\n\n` +
        "➡️ Va dans la BD pour traiter cette demande.\n";
      value = provider_id;
    } else if (hote_id) {
      query = `INSERT INTO withdrawals 
        (hote_id, amount, method, details, status, iban, swift, first_name, last_name, paypal_email)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`;
      message = 
        "NOUVELLE DEMANDE DE RETRAIT d'un hote :\n\n" +
        `Nom : ${last_name}\n` +
        `Prénom : ${first_name}\n` +
        `hote_id : ${hote_id}\n` +
        `montant : ${amount} €\n\n` +
        `Détails : ${details}\n` +
        `Méthode : ${method}\n\n` +
        `IBAN : ${iban ? iban : "non-renseigné"}\n` +
        `SWIFT : ${swift ? swift : "non-renseigné"}\n\n` +
        `paypal_email : ${paypal_email ? paypal_email : "non-renseigné"}\n\n` +
        "➡️ Va dans la BD pour traiter cette demande.\n";
      value = hote_id;
    }
    await pool.query(
      query,
      [value, amount, method, details, "waiting", iban, swift, first_name, last_name, paypal_email]
    );


    await sendAdminAlertEmail({
      subject: "🆕 Nouvelle demande de virement",
      to: process.env.ADMIN_EMAIL,
      message: message
    });


    res.json({ success: true, message: "Demande de retrait enregistrée" });
  } catch (err) {
    console.error("❌ Erreur BDD retrait :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

// router.post("/method", async (req, res) => {
//   const { provider_id, method, details } = req.body;

//   if (!provider_id || !method || !details) {
//     return res.status(400).json({ error: "Données manquantes" });
//   }

//   try {
//     // Supprime l'ancien si existant (optionnel)
//     await pool.query("DELETE FROM withdrawal_methods WHERE provider_id = $1", [provider_id]);

//     // Insère le nouveau
//     await pool.query(`
//       INSERT INTO withdrawal_methods (provider_id, method, details)
//       VALUES ($1, $2, $3)
//     `, [provider_id, method, details]);

//     res.json({ success: true });
//   } catch (err) {
//     console.error("❌ Erreur sauvegarde méthode :", err.message);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });




// router.post("/getall-earnings", async (req, res) => {
//   const { provider_id, hote_id, method, details } = req.body;

//   if (!method || !details || (!provider_id && !hote_id)) {
//     return res.status(400).json({ error: "Données manquantes" });
//   }

//   try {
//     let query;
//     let query_insert;
//     let value;
//     // Supprime l'ancien si existant (optionnel)
//     if (provider_id) {
//       query = "DELETE FROM withdrawal_methods WHERE provider_id = $1";
//       query_insert = `INSERT INTO withdrawal_methods (provider_id, method, details)
//         VALUES ($1, $2, $3)`;
//       value = provider_id;
//     } else if (hote_id) {
//       query = "DELETE FROM withdrawal_methods WHERE hote_id = $1";
//       query_insert = `INSERT INTO withdrawal_methods (hote_id, method, details)
//         VALUES ($1, $2, $3)`;
//       value = hote_id;
//     }
//     await pool.query(query, [value]);

//     // Insère le nouveau
//     await pool.query(query_insert, [value, method, details]);

//     res.json({ success: true });
//   } catch (err) {
//     console.error("❌ Erreur sauvegarde méthode :", err.message);
//     res.status(500).json({ error: "Erreur serveur" });
//   }
// });


router.post("/add-versement", async (req, res) => {
  const { provider_id, hote_id, first_name, last_name, method, iban, swift } = req.body;

  if (!first_name || !last_name || !iban || (!provider_id && !hote_id)) {
    return res.status(400).json({ error: "Données manquantes" });
  }

  console.log(provider_id, hote_id, first_name, last_name, method, iban, swift);

  try {
    // (Optionnel) supprimer les anciennes méthodes du même type
    let query;
    let query_insert;
    let value;
    if (provider_id) {
      query = "DELETE FROM withdrawal_methods WHERE provider_id = $1 AND iban=$2 AND method = 'iban'";
      query_insert = `INSERT INTO withdrawal_methods (provider_id, method, iban, swift, first_name, last_name)
        VALUES ($1, $2, $3, $4, $5, $6)`;
      value = provider_id;
    } else if (hote_id) {
      query = "DELETE FROM withdrawal_methods WHERE hote_id = $1 AND iban=$2 AND method = 'iban'";
      query_insert = `INSERT INTO withdrawal_methods (hote_id, method, iban, swift, first_name, last_name)
        VALUES ($1, $2, $3, $4, $5, $6)`;
      value = hote_id;
    }
    await pool.query(
      query,
      [value, iban]
    );

    // Insère la nouvelle méthode de retrait
    await pool.query(
      query_insert,
      [value, method, iban, swift || null, first_name, last_name]
    );

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("❌ Erreur lors de l'ajout de la méthode de versement :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



router.get("/getall-withdrawal_methods", async (req, res) => {
  const { provider_id, hote_id } = req.query; // <-- ici sans les parenthèses
  console.log("/getall-withdrawal_method - Provider ID reçu :", provider_id, "Hote ID recu : ", hote_id);

  try {
    let query;
    let value;

    if (provider_id) {
      query = `SELECT * FROM withdrawal_methods WHERE provider_id = $1 ORDER BY id DESC`;
      value = provider_id;
    } else if (hote_id) {
      query = `SELECT * FROM withdrawal_methods WHERE hote_id = $1 ORDER BY id DESC`;
      value = hote_id;
    }
    const versements_methode = await pool.query(
      query,
      [value]
    );

    res.status(200).json({ success: true, versements: versements_methode.rows });
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des méthodes de versement :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/is-withdrawal_method", async (req, res) => {
  const { provider_id, hote_id } = req.query;

  if (!provider_id && !hote_id) {
    return res.status(400).json({ success: false, error: "provider_id ou hote_id obligatoire" });
  }

  try {
    let query;
    let value;

    if (provider_id) {
      query = `SELECT 1 FROM withdrawal_methods WHERE provider_id = $1 LIMIT 1`;
      value = provider_id;
    } else {
      query = `SELECT 1 FROM withdrawal_methods WHERE hote_id = $1 LIMIT 1`;
      value = hote_id;
    }

    const result = await pool.query(query, [value]);

    res.json({
      success: true,
      is_withdrawal_method: result.rowCount > 0
    });

  } catch (err) {
    console.error("❌ Erreur /is-withdrawal_method :", err.message);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});





router.patch("/update-versement", async (req, res) => {
  const { provider_id, hote_id, old_iban, updates } = req.body;

  if (!old_iban || !updates || typeof updates !== 'object' || (!provider_id && !hote_id)) {
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

  let query;
  if (provider_id) {
    values.push(provider_id); // $i
    values.push(old_iban);    // $i+1
    query = `
      UPDATE withdrawal_methods
      SET ${fields.join(", ")}
      WHERE provider_id = $${i} AND iban = $${i + 1}
    `;
  } else if (hote_id) {
    values.push(hote_id); // $i
    values.push(old_iban);    // $i+1
    query = `
      UPDATE withdrawal_methods
      SET ${fields.join(", ")}
      WHERE hote_id = $${i} AND iban = $${i + 1}
    `;
  }

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






// DELETE /api/payment/payouts/delete-versement
router.delete("/delete-versement", async (req, res) => {
  const { provider_id, hote_id, iban } = req.body;

  if (!iban || (!provider_id && !hote_id)) {
    return res.status(400).json({ success: false, error: "Champs manquants" });
  }
  
  console.log("/delete-versement");
  try {
    let query;
    let value

    if (provider_id) {
      query = `DELETE FROM withdrawal_methods WHERE provider_id = $1 AND iban = $2`;
      value = provider_id;
    } else if (hote_id) {
      query = `DELETE FROM withdrawal_methods WHERE hote_id = $1 AND iban = $2`;
      value = hote_id;
    }

    const result = await pool.query(
      query,
      [value, iban]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, error: "Méthode introuvable" });
    }

    return res.json({ success: true, message: "Méthode supprimée" });
  } catch (err) {
    console.error("❌ Erreur lors de la suppression :", err);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});







router.get("/get", async (req, res) => {
  const { id, provider_id, hote_id } = req.query;
  console.log("Je rendre dans payout/get");
  if (!id || (!provider_id && !hote_id)) {
    return res.status(400).json({ error: "/payout/get : id ou provider_id ou hote_id manquant" });
  }

  try {
    let query;
    let value;

    if (provider_id) {
      query = `SELECT *
        FROM withdrawals
        WHERE id = $1 AND provider_id = $2`
      value = provider_id
    } else if (hote_id) {
      query = `SELECT *
        FROM withdrawals
        WHERE id = $1 AND hote_id = $2`
      value = hote_id;
    }
    const withdrawal = await pool.query(
      query,
      [id, value]
    );

    if(withdrawal.rowCount <= 0 ){
      res.json({ success: true, message: "Impossible to find withdrawal with this id" });
      return
    }else{
      res.json({ success: true, withdrawal: withdrawal.rows });
    }
  } catch (err) {
    console.error("❌ Erreur /payout/get :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



module.exports = router;