const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const pool = require("../../../db/index");
require("dotenv").config();

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI_CALENDAR;
const FRONTEND_URL = process.env.FRONTEND_URL;

// 🔹 Étape 1 : Rediriger vers Google
router.get("/auth", (req, res) => {
  const url =
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&response_type=code&access_type=offline&prompt=consent` +
    `&scope=https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email`;
  res.redirect(url);
});

// 🔹 Étape 2 : Callback Google
 
/*
router.get("/callback", async (req, res) => {
  const { code } = req.query;

  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code"
    })
  });

  const tokens = await tokenResponse.json();
  const { access_token, refresh_token } = tokens;

  const userInfo = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` }
  });

  const { email } = await userInfo.json();

  const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (result.rowCount === 0) return res.status(404).json({ error: "Utilisateur introuvable" });

  const userId = result.rows[0].id;

  await pool.query("UPDATE users SET google_refresh_token = $1 WHERE id = $2", [refresh_token, userId]);

  // 🍪 Stocke l'ID utilisateur pour les appels suivants
  res.cookie("user_id", userId, {
    httpOnly: true,
    sameSite: "Lax",
    maxAge: 365 * 24 * 60 * 60 * 1000 // 1 an
  });

  res.redirect(`${FRONTEND_URL}/profile`);
});*/
router.get("/callback", async (req, res) => {
  const { code } = req.query;

  try {
    // 1. Récupère les tokens
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
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
    console.log("Refresh token :", refresh_token);

    // 3. Tu peux : soit le mettre en cookie, soit le renvoyer au frontend
    // Ici exemple en redirection avec les infos dans le query (à ne pas faire en prod pour des raisons de sécurité !)
    res.redirect(`${FRONTEND_URL}/booking-system?email=${encodeURIComponent(email)}&token=${encodeURIComponent(refresh_token)}`);

    // OU : Tu peux mettre juste le token en cookie temporaire :
    // res.cookie("google_email", email, { httpOnly: true });
    // res.cookie("google_refresh_token", refresh_token, { httpOnly: true });
    // res.redirect(`${FRONTEND_URL}/profile`);
  } catch (err) {
    console.error("❌ Erreur callback Google :", err);
    res.status(500).json({ error: "Erreur lors de la connexion Google" });
  }
});



// 🔁 Obtenir un access_token frais
async function getValidAccessToken(userId) {
  const result = await pool.query("SELECT google_refresh_token FROM users WHERE id = $1", [userId]);
  const refreshToken = result.rows[0]?.google_refresh_token;

  if (!refreshToken) throw new Error("Aucun refresh_token");

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token"
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Impossible de renouveler l'access token");

  return data.access_token;
}

// 📅 Voir les événements
router.get("/events", async (req, res) => {
  const userId = req.cookies.user_id;
  try {
    const token = await getValidAccessToken(userId);
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
router.post("/events", async (req, res) => {
  const userId = req.cookies.user_id;
  try {
    const token = await getValidAccessToken(userId);
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
});

module.exports = router;
