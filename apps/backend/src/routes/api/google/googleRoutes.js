const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const pool = require("../../../db/index");
const { getOfferBySlug } = require("../../../db/Models/offerModel");
require("dotenv").config();


// 🔹 Étape 1 : Rediriger vers Google
router.get("/auth", (req, res) => {
  const { provider_id } = req.query;
  
  const state = encodeURIComponent(provider_id);

  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}` +
    `&redirect_uri=${process.env.GOOGLE_REDIRECT_URI_CALENDAR}` +
    `&response_type=code&access_type=offline&prompt=consent` +
    `&scope=https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email`+
    `&state=${state}`;
  res.redirect(url);
});

/// 2
router.get("/callback", async (req, res) => {
  const { code, state } = req.query;

  try {
    // 1. Récupère les tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI_CALENDAR,
        grant_type: "authorization_code"
      })
    });

    const tokens = await tokenResponse.json();
    const { access_token, refresh_token } = tokens;

    // 2. Récupère l’email de l'utilisateur via access_token
    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    const userData = await userInfoResponse.json();
    console.log("➡️ Infos Google:", userData);

    const { email } = userData;


    console.log("Adresse Google connectée :", email);
    console.log("acces toke :", access_token);
    console.log("Refresh token :", refresh_token);

    // 3. Tu peux : soit le mettre en cookie, soit le renvoyer au frontend
    // Ici exemple en redirection avec les infos dans le query (à ne pas faire en prod pour des raisons de sécurité !)
    const provider_id = state;

    var isAlready = await pool.query(
      "SELECT * FROM provider_booking_integrations WHERE provider_id=$1",
      [provider_id]
    );
    if (isAlready.rows.length > 0) {
      // ❌ Aucune ligne trouvée
      console.log("Déjà connecté, UPDATING");
      const update = await pool.query(
        "UPDATE provider_booking_integrations SET platform=$1, access_token=$2, refresh_token=$3, email=$4 WHERE provider_id=$5",
        ["google_calendar", access_token, refresh_token, email, provider_id]
      );

      if (update.rowCount === 1) {
        console.log("✅ Mise à jour réussie !");
      } else {
        console.warn("⚠️ Échec de la mise à jour !");
      }
    }else{
      console.log("Première Connection, INSERT");
      var result = await pool.query(
        "INSERT INTO provider_booking_integrations(provider_id, platform, access_token, refresh_token, email) VALUES($1, $2, $3, $4, $5)",
        [provider_id, "google_calendar", access_token, refresh_token, email]
      );

      if (result.rowCount === 1) {
        console.log("✅ Insertion réussie des booking tokens en BD!");
      } else {
        console.log("❌ Problème lors de l'insertion des booking tokens en BD!.");
      }

    }


    res.redirect(`${process.env.FRONTEND_URL}/booking-system?email=${encodeURIComponent(email)}&token=${encodeURIComponent(refresh_token)}`);

    // OU : Tu peux mettre juste le token en cookie temporaire :
    // res.cookie("google_email", email, { httpOnly: true });
    // res.cookie("google_refresh_token", refresh_token, { httpOnly: true });
    // res.redirect(`${FRONTEND_URL}/profile`);
  } catch (err) {
    console.error("❌ Erreur callback Google :", err);
    res.status(500).json({ error: "Erreur lors de la connexion Google" });
  }
});

async function getProviderIdBySlug(slug_offer){
  const offer = await getOfferBySlug(slug_offer);
  if (!offer) {
    return res.status(404).json({ success: false, error: "Offre non trouvée" });
  }

  return offer.rows[0].provider_id;
}

async function getAccessToken(provider_id) {
  try {
    const result = await pool.query(
      "SELECT access_token, refresh_token FROM provider_booking_integrations WHERE provider_id = $1",
      [provider_id]
    );

    if (result.rows.length === 0) {
      throw new Error("Aucune intégration trouvée pour ce provider");
    }

    const { access_token, refresh_token } = result.rows[0];

    const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      headers: { Authorization: `Bearer ${access_token}` }
    });

    if (res.status === 401) {
      // 🔁 Token expiré → on le renouvelle
      const response = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          refresh_token: refresh_token,
          grant_type: "refresh_token"
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error_description || "Erreur de renouvellement du booking token");

      return data.access_token;
    }

    // ✅ Le token est encore valide → on le retourne
    return access_token;

  } catch (err) {
    console.log("❌ Erreur de génération de l'access token :", err.message);
    return null;
  }
}


// 📅 Voir les événements
router.get("/events", async (req, res) => {
  // const userId = req.cookies.user_id;
  // const { slug: slug_offer } = req.body;
  const { provider_id } = req.query;
  console.log("Provider id recu en query:", provider_id);
  try {
    // const provider_id = getProviderIdBySlug(slug_offer)
    const token = await getAccessToken(provider_id);
    console.log("📢 Token envoyé à Google:", token);
    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const events = await response.json();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📅 Créer un événement
/*
router.post("/event", async (req, res) => {
  const { slug: slug_offer } = req.body;
  try {
    const token = await getAccessToken(slug_offer);
    const response = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });
    const result = await response.json();
    res.status(response.status).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});*/

module.exports = router;
