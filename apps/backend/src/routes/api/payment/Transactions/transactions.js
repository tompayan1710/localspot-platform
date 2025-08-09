const express = require("express");
const router = express.Router();
const pool = require("../../../../db/index");


router.get("/getall-by-provider", async (req, res) => {
  const { provider_id } = req.query;

  if (!provider_id) {
    return res.status(400).json({ error: "provider_id manquant" });
  }

  try {
    let total_revenue = 0;
    let solde = 0;
    let waiting = 0;
    let already_paid = 0;


    const earnings = await pool.query(
      `SELECT created_at, 'earning' as type, 
              (net_amount_total)::numeric as amount, 
              CONCAT(total_reserved, ' places vendues - ', start_hour, ' à ', end_hour) as label,
              id
       FROM reservation_slots 
       WHERE provider_id = $1`,
      [provider_id]
    );

    earnings.rows.forEach((transaction) => {
      transaction.amount = parseFloat(transaction.amount);
      total_revenue += transaction.amount;
    })

    const payouts = await pool.query(
      `SELECT created_at, 'payout' as type, 
              amount,
              status,
              CONCAT('Retrait via ', method) as label ,
              id
       FROM withdrawals 
       WHERE provider_id = $1`,
      [provider_id]
    );

    payouts.rows.forEach((transaction) => {
      transaction.amount = parseFloat(transaction.amount);
      if(transaction.status === "completed"){
        already_paid+=transaction.amount;
      } else if(transaction.status === "waiting"){
        waiting+=transaction.amount;
      }
    })

    const fullHistory = [...earnings.rows, ...payouts.rows];
    fullHistory.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    solde = total_revenue - waiting - already_paid;

    res.json({ success: true, history: fullHistory, total_revenue, solde, waiting, already_paid });
  } catch (err) {
    console.error("❌ Erreur getall-earnings :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});





router.get("/get", async (req, res) => {
  const { id, provider_id } = req.query;

  if (!id || !provider_id) {
    return res.status(400).json({ error: "/transaction/get : id ou provider_id manquant" });
  }

  try {
    const earning = await pool.query(
      `SELECT r.*,         
        o.title                      AS offer_title,
        o.duration                   AS offer_duration,
        o.adresse                    AS offer_address
       FROM reservation_slots r
       JOIN offers o ON o.slug = r.offer_slug
       WHERE r.id = $1 AND r.provider_id = $2`,
      [id, provider_id]
    );

    if(earning.rowCount <= 0 ){
      res.json({ success: true, message: "Impossible to find reservation_slots with this id" });
      return
    }else{
      res.json({ success: true, earning: earning.rows });
    }
  } catch (err) {
    console.error("❌ Erreur /transactions/get :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});


module.exports = router;