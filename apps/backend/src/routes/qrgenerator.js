const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const QRCode = require("qrcode");
const path = require("path")
const fs = require("fs");
const minify = require("../utils/minify");
const { createQRCode, getQRCodeBySlug, getAllQRCodes } = require("../db/Models/qrCodeModel");



const qrcodeDir = path.join(__dirname, "../data/qrcodes"); // dossier de destination


router.use(express.urlencoded({ extended: true }));



router.get("/generate", (req, res) => {
  res.send(minify(`
    <h1>Générateur de QR Code</h1>
    <form method="POST" action="/generate">
      <label>URL à rediriger :</label><br/>
      <input type="url" name="url" required><br/><br/>
      
      <label>ID du présentoir (display_id) :</label><br/>
      <input type="number" name="display_id" placeholder="ex: 1"><br/><br/>
    
       <label>ID de la catégorie (category_id) :</label><br/>
      <input type="number" name="category_id" placeholder="ex: 2"><br/><br/>

      <label>Nom de l’offre (slug personnalisé) :</label><br/>
      <input type="text" name="slug" placeholder="promoSpa"><br/><br/>
      
      <button type="submit">Générer le QR Code</button>
    </form>
  `));
});

router.post("/generate", async (req, res) => {
  const { url, slug, display_id, category_id } = req.body;

  if (!url) {
    return res.send("❌ Veuillez fournir une URL.");
  }

  const finalSlug = slug || nanoid(6);

  const record = await getQRCodeBySlug(finalSlug);

  if (record) return res.send("❌ Ce slug est déjà utilisé.");

  

  const qrUrl = `https://localspot-platform.onrender.com//q/${finalSlug}`;

  try {
    const fileName = `${finalSlug}.png`;
    const filePath = path.join(qrcodeDir, fileName);
    const relativePath = `/qrcodes/${fileName}`;
      
    const record = await createQRCode(finalSlug, url, display_id, category_id);
    console.log("✅ QR Code sauvegardé en BDD :", record);

    // Génère et sauvegarde l'image .png
    await QRCode.toFile(filePath, qrUrl);
  
    res.send(minify(`
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h1 style="color: green;">✅ QR Code généré pour <b>${finalSlug}</b></h1>
          <p>Lien de redirection : <a href="/q/${finalSlug}" target="_blank">${qrUrl}</a></p>
          <img src="${relativePath}" alt="QR Code" style="margin: 20px 0;" />
          <p>🗂️ Sauvegardé dans : <code>/data/qrcodes/${fileName}</code></p>
          <a href="/generate">🔙 Générer un autre</a>
        </div>
      `));
      
  } catch (err) {
    console.error("❌ Erreur QR code :", err.message);
    console.error("❌ Erreur QR code :", err);
    res.status(500).send("Erreur pendant la génération du QR Code.");
  }
  
  
});






router.get("/qrcodes", async (req, res) => {
  try {
    const qrcodes = await getAllQRCodes();

    let html = `
      <h1>📦 Liste de tous les QR Codes</h1>
      <table border="1" cellspacing="0" cellpadding="8">
        <tr>
          <th>#</th>
          <th>Slug</th>
          <th>Image</th>
          <th>URL</th>
          <th>Catégorie</th>
          <th>Date</th>
          <th>Redirection</th>
        </tr>
    `;

    qrcodes.forEach((qrcode, index) => {
      html += `
        <tr>
          <td>${index + 1}</td>
          <td>${qrcode.slug}</td>
          <td><img src="/qrcodes/${qrcode.slug}.png" width="100" /></td>
          <td><code>${qrcode.url}</code></td>
          <td>${qrcode.category_name || "❌ Aucune catégorie"}</td>
          <td>${new Date(qrcode.created_at).toLocaleString()}</td>
          <td><a href="/q/${qrcode.slug}" target="_blank">Tester</a></td>
        </tr>
      `;
    });

    html += "</table>";
    res.send(minify(html));
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des QR codes :", err.message);
    res.status(500).send("Erreur serveur.");
  }
});




module.exports = router;