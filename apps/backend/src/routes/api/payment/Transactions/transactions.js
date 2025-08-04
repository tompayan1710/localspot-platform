const express = require("express");
const router = express.Router();
const pool = require("../../../../db/index");


router.get("/getall-by-provider", async (req, res) => {
  const { provider_id } = req.query;

  if (!provider_id) {
    return res.status(400).json({ error: "provider_id manquant" });
  }

  try {
    const earnings = await pool.query(
      `SELECT created_at, 'earning' as type, 
              (total_reserved * price_per_person)::numeric as amount, 
              CONCAT(total_reserved, ' places vendues - ', start_hour, ' à ', end_hour) as label 
       FROM reservation_slots 
       WHERE provider_id = $1`,
      [provider_id]
    );

    const payouts = await pool.query(
      `SELECT created_at, 'payout' as type, 
              (-amount)::numeric as amount, 
              CONCAT('Retrait via ', method) as label 
       FROM withdrawals 
       WHERE provider_id = $1`,
      [provider_id]
    );

    const fullHistory = [...earnings.rows, ...payouts.rows];
    fullHistory.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));


    res.json({ success: true, history: fullHistory });
  } catch (err) {
    console.error("❌ Erreur getall-earnings :", err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
});



module.exports = router;