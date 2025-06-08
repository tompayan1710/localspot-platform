const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { texts, targetLang } = req.body;

  if (!Array.isArray(texts) || !targetLang) {
    return res.status(400).json({ error: "Champs manquants ou invalides." });
  }

  try {
    const params = new URLSearchParams({
      auth_key: process.env.DEEPL_API_KEY,
      target_lang: targetLang.toUpperCase(),
    });

    texts.forEach(text => params.append("text", text));

    const response = await fetch("https://api-free.deepl.com/v2/translate", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("DeepL error:", response.status, errorText);
      return res.status(500).json({ error: "DeepL API error", details: errorText });
    }

    const data = await response.json();
    const translations = data.translations.map(t => t.text);

    res.json({ translations });
  } catch (err) {
    console.error("Erreur serveur :", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
