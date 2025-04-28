const express = require("express");
const router = express.Router();
const path = require("path");
const minify = require("../utils/minify");
const { addPlacement, getAllPlacements } = require("../db/Models/qrPlacementModel");

// Middleware pour parser les formulaires
router.use(express.urlencoded({ extended: true }));

// 🔹 Formulaire de création de placement
router.get("/new-placement", (req, res) => {
  res.send(minify(`
    <h1>📍 Ajouter un nouveau placement</h1>
    <form method="POST" action="/new-placement">
      <label>Adresse (auto-complétée via Google)</label><br/>
      <input type="text" id="adresse" name="adresse" required><br/><br/>

      <label>Description de position</label><br/>
      <input type="text" name="position_description" placeholder="Entrée, hall..." required><br/><br/>

      <label>ID de la ville</label><br/>
      <input type="number" name="city_id" required><br/><br/>

      <input type="hidden" name="latitude" id="latitude">
      <input type="hidden" name="longitude" id="longitude">

      <button type="submit">➕ Ajouter</button>
    </form>

    <script src="https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_KEY}&libraries=places"></script>
    <script>
      const input = document.getElementById("adresse");
      const latitude = document.getElementById("latitude");
      const longitude = document.getElementById("longitude");

      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ['geocode'],
        componentRestrictions: { country: 'fr' }
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return alert("Aucune position trouvée.");

        latitude.value = place.geometry.location.lat();
        longitude.value = place.geometry.location.lng();
      });
    </script>
  `));
});


// 🔹 Traitement du formulaire
router.post("/new-placement", async (req, res) => {
  try {
    const { position_description, adresse, latitude, longitude, city_id } = req.body;

    const result = await addPlacement({
      position_description,
      adresse,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      city_id: parseInt(city_id)
    });

    res.send(minify(`
      <h1 style="color: green;">✅ Placement ajouté !</h1>
      <p>Description : ${result.position_description}</p>
      <p>Adresse : ${result.adresse}</p>
      <p>Lat/Lng : ${result.latitude}, ${result.longitude}</p>
      <p><a href="/new-placement">Ajouter un autre</a></p>
    `));
  } catch (err) {
    console.error("❌ Erreur lors de l’ajout :", err.message);
    res.status(500).send("Erreur serveur lors de l’ajout du placement.");
  }
});


// 🔹 Liste des placements
router.get("/qr-placements", async (req, res) => {
  try {
    const placements = await getAllPlacements();

    let html = `
      <h1>📦 Liste des QR Placements</h1>
      <table border="1" cellpadding="8">
        <tr>
          <th>ID</th>
          <th>Description</th>
          <th>Adresse</th>
          <th>Coordonnées</th>
          <th>Date</th>
        </tr>
    `;

    placements.forEach(p => {
      html += `
        <tr>
          <td>${p.id}</td>
          <td>${p.position_description}</td>
          <td>${p.adresse}</td>
          <td>${p.latitude}, ${p.longitude}</td>
          <td>${new Date(p.created_at).toLocaleString()}</td>
        </tr>
      `;
    });

    html += "</table>";
    res.send(minify(html));
  } catch (err) {
    console.error("❌ Erreur affichage placements :", err.message);
    res.status(500).send("Erreur serveur.");
  }
});

module.exports = router;
