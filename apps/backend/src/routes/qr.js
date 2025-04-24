/*const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");

// Route : /generate?url=https://example.com
router.get("/generate", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("❌ URL manquante !");
  }

  try {
    const qrCodeImage = await QRCode.toDataURL(url);
    // Envoie le QR Code sous forme d’image dans la réponse
    res.send(`
      <h2>QR Code généré pour :</h2>
      <p>${url}</p>
      <img src="${qrCodeImage}" />
    `);
  } catch (err) {
    res.status(500).send("Erreur lors de la génération du QR Code");
  }
});

module.exports = router;*/
