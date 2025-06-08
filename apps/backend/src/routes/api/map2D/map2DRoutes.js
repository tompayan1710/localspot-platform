const express = require("express");
const router = express.Router();

const GOOGLE_MAPS_KEY = process.env.GOOGLE_MAPS_KEY;

router.get('/durations', async (req, res) => {
  const { originLat, originLng, destLat, destLng } = req.query;

  const modes = ['walking', 'bicycling', 'driving'];
  const results = {};

  try {
    for (const mode of modes) {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat},${originLng}&destination=${destLat},${destLng}&mode=${mode}&key=${GOOGLE_MAPS_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        results[mode] = data.routes[0].legs[0].duration.text;
      } else {
        results[mode] = null;
      }
    }

    res.json(results);
  } catch (err) {
    console.error("Erreur API Google Maps :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;