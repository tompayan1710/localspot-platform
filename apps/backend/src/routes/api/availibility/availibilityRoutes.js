const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const pool = require("../../../db/index");
require("dotenv").config();



async function updateOrCreateRecurringSlot(slug, day, slots) {

  try {
    const timeSlots = slots.map(slot => [slot.from, slot.to]); // ✅ conversion JS → PG

    const result = await pool.query(
      "SELECT id FROM offer_recurring_slots WHERE slug_offer=$1 AND day_of_week=$2",
      [slug, day]
    );

    if (result.rowCount > 0) {
      console.log(`🟡 Slot existant pour ${day}, mise à jour...`);
      await pool.query(
        "UPDATE offer_recurring_slots SET slots=$1 WHERE slug_offer=$2 AND day_of_week=$3",
        [timeSlots, slug, day]
      );
    } else {
      console.log(`🟢 Aucun slot pour ${day}, insertion...`);
      await pool.query(
        "INSERT INTO offer_recurring_slots(slug_offer, day_of_week, slots) VALUES($1, $2, $3)",
        [slug, day, timeSlots]
      );
    }

  } catch (err) {
    console.error(`❌ Erreur pour le jour ${day} :`, err.message);
    throw err;
  }
}


async function DeleteReccuringSlot(slug, day) {

  try {
    const result = await pool.query(
      "DELETE FROM offer_recurring_slots WHERE slug_offer=$1 AND day_of_week=$2",
      [slug, day]
    );
  } catch (err) {
    console.error(`❌ Erreur de suppression pour le jour ${day} :`, err.message);
    throw err;
  }
}


async function updateOrCreateAvaillable(slug, date, slots) {

  try {
    const timeSlots = slots.map(slot => [slot.from, slot.to]); // ✅ conversion JS → PG

    const result = await pool.query(
      "SELECT id FROM offer_exceptional_slots WHERE slug_offer=$1 AND date=$2",
      [slug, date]
    );

    if (result.rowCount > 0) {
      console.log(`🟡 Slot existant pour ${date}, mise à jour...`)
      await pool.query(
        "UPDATE offer_exceptional_slots SET slots=$1 WHERE slug_offer=$2 AND date=$3",
        [timeSlots, slug, date]
      );
    } else {
      console.log(`🟢 Aucun slot pour ${date}, insertion...`);
      await pool.query(
        "INSERT INTO offer_exceptional_slots(slug_offer, date, slots) VALUES($1, $2, $3)",
        [slug, date, timeSlots]
      );
    }

  } catch (err) {
    console.error(`❌ Erreur pour ${date} :`, err.message);
    throw err;
  }
}

async function DeleteAvaillable(slug, date) {
  try {
    const result = await pool.query(
      "DELETE FROM offer_exceptional_slots WHERE slug_offer=$1 AND date=$2",
      [slug, date]
    );
  } catch (err) {
    console.error(`❌ Erreur de suppression pour ${date} :`, err.message);
    throw err;
  }
}



async function updateOrCreateUnavaillable(slug, date, slots) {

  try {
    const timeSlots = slots.map(slot => [slot.from, slot.to]); // ✅ conversion JS → PG

    const result = await pool.query(
      "SELECT id FROM offer_cancel_slots WHERE slug_offer=$1 AND date=$2",
      [slug, date]
    );

    if (result.rowCount > 0) {
      console.log(`🟡 Slot existant pour ${date}, mise à jour...`)
      await pool.query(
        "UPDATE offer_cancel_slots SET slots=$1 WHERE slug_offer=$2 AND date=$3",
        [timeSlots, slug, date]
      );
    } else {
      console.log(`🟢 Aucun slot pour ${date}, insertion...`);
      await pool.query(
        "INSERT INTO offer_cancel_slots(slug_offer, date, slots) VALUES($1, $2, $3)",
        [slug, date, timeSlots]
      );
    }

  } catch (err) {
    console.error(`❌ Erreur pour ${date} :`, err.message);
    throw err;
  }
}

async function DeleteUnavaillable(slug, date) {
  try {
    const result = await pool.query(
      "DELETE FROM offer_cancel_slots WHERE slug_offer=$1 AND date=$2",
      [slug, date]
    );
  } catch (err) {
    console.error(`❌ Erreur de suppression pour ${date} :`, err.message);
    throw err;
  }
}


router.post("/save", async (req, res) => {

  const { slug, recurring: availability, exceptionalAvailable, Unavailable } = req.body;

  console.log("SLUG :");
  console.log(slug);
  console.log("availability :");
  console.log(availability);
  console.log("exceptionalAvailable :");
  console.log(exceptionalAvailable);
  console.log("Unavailable :");
  console.log(Unavailable);

  const allDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const allDateAvailable = Object.keys(exceptionalAvailable);
  const allDateUnavailable = Object.keys(Unavailable);


  try {
    //RECURING//////////////////////
    for (const [day, slots] of Object.entries(availability)) {
      await updateOrCreateRecurringSlot(slug, day, slots);
    }

    const daysToKeep = Object.keys(availability);
    const daysToDelete = allDays.filter(day => !daysToKeep.includes(day));

    for (const day of daysToDelete) {
      await DeleteReccuringSlot(slug, day);
    }

    //EXCEPTIONNAL AVAILABLE/////////////////
    for (const [date, slots] of Object.entries(exceptionalAvailable)) {
      await updateOrCreateAvaillable(slug, date, slots); // 👈 obligatoire
    }
    const available = await pool.query(
      "SELECT date FROM offer_exceptional_slots WHERE slug_offer=$1",
      [slug]
    );
    console.log(allDateAvailable);
    for (const row of available.rows) {
      const formattedDate = row.date.toLocaleDateString('fr-CA'); // → "2025-07-16"
      console.log(`Mon formattedDate : ${formattedDate}`);
      if (!allDateAvailable.includes(formattedDate)) {
        console.log(`🗑️ Suppression des créneaux ${row.date} pour ${formattedDate}`);
        await DeleteAvaillable(slug, row.date); // 👈 IMPORTANT : il faut await ici
      }
    }

    //UNAVALABLE/////////////////////
    for (const [date, slots] of Object.entries(Unavailable)) {
      await updateOrCreateUnavaillable(slug, date, slots); // 👈 obligatoire
    }
    const result = await pool.query(
      "SELECT date FROM offer_cancel_slots WHERE slug_offer=$1",
      [slug]
    );
    console.log(allDateUnavailable);
    for (const row of result.rows) {
      const formattedDate = row.date.toLocaleDateString('fr-CA');
      if (!allDateUnavailable.includes(formattedDate)) {
        console.log(`🗑️ Suppression des créneaux indisponibles ${row.date} pour ${formattedDate}`);
        await DeleteUnavaillable(slug, row.date); // 👈 IMPORTANT : il faut await ici
      }
    }

  } catch (err) {
    console.error("❌ Erreur serveur :", err);
    res.status(500).json({ error: err.message });
  }
});





router.get("/getall", async (req, res) => {
  console.log("✅ IN /get !");
  const { slug } = req.query;

  try {
    //RECURING/////////////////////
    const result_reccuring = await pool.query(
      "SELECT * FROM offer_recurring_slots WHERE slug_offer=$1",
      [slug]
    );
   
    let recurring = {};
    result_reccuring.rows.forEach(row => {
      const day = row.day_of_week;
      const slotArray = row.slots.map(pair => ({
        from: pair[0].slice(0,5), // coupe les secondes (ex : "07:00:00" → "07:00")
        to: pair[1].slice(0,5)
      }));

      recurring[day] = slotArray;
    });


    const result_available = await pool.query(`
      SELECT 
        to_char(date, 'YYYY-MM-DD') AS date_str,
        slots
      FROM offer_exceptional_slots
      WHERE slug_offer = $1
    `, [slug]);

    let exceptionalAvailable = {};
    result_available.rows.forEach(row => {
      exceptionalAvailable[row.date_str] = row.slots.map(pair => ({
        from: pair[0].slice(0,5),
        to: pair[1].slice(0,5)
      }));
    });



    const result_unvailable = await pool.query(
      `SELECT to_char(date, 'YYYY-MM-DD') AS date_str,
        slots
      FROM offer_cancel_slots 
      WHERE slug_offer = $1`,
      [slug]
    );
   
    let exceptionalUnavailable = {};
    result_unvailable.rows.forEach(row => {
      exceptionalUnavailable[row.date_str] = row.slots.map(pair => ({
        from: pair[0].slice(0,5),
        to: pair[1].slice(0,5),
      }));
    });


    res.status(200).json({ status: "✅✅ FIN GET REUSSIE ✅✅", recurring: recurring, exceptionalAvailable: exceptionalAvailable, exceptionalUnavailable: exceptionalUnavailable});
  } catch (err) {
    console.error("❌ Erreur serveur :", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/getrecurrent", async (req, res) => {
  console.log("✅ IN / getrecurrent !");
  const { slug } = req.query;

  try {
    //RECURING/////////////////////
    const result_reccuring = await pool.query(
      "SELECT * FROM offer_recurring_slots WHERE slug_offer=$1",
      [slug]
    );
   
    let recurring = {};
    result_reccuring.rows.forEach(row => {
      const day = row.day_of_week;
      const slotArray = row.slots.map(pair => ({
        from: pair[0].slice(0,5), // coupe les secondes (ex : "07:00:00" → "07:00")
        to: pair[1].slice(0,5)
      }));

      recurring[day] = slotArray;
    });


    res.status(200).json({ status: "✅✅ FIN GET REUSSIE ✅✅", recurring: recurring});
  } catch (err) {
    console.error("❌ Erreur serveur :", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
