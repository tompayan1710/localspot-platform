const express = require("express")
const router = express.Router();
const minify = require("../utils/minify.js")
const { getAllQRCodes } = require("../db/Models/qrCodeModel");


router.get("/dashboard", async (req, res) => {
    const links = await getAllQRCodes(); // récupère les slugs et urls
    
    // Génère le HTML
    let html = `
      <h1>📋 Tableau de bord des QR Codes</h1>
      <table border="1" cellspacing="0" cellpadding="8">
        <tr>
          <th>#</th>
          <th>Slug</th>
          <th>QR Code</th>
          <th>URL</th>
          <th>Redirection</th>
        </tr>
    `;
  
    let count = 1;
    for (const link of links) {
      const slug = link.slug;
      const url = link.url;
      html += `
        <tr>
          <td>${count++}</td>
          <td>${slug}</td>
          <td><img src="/qrcodes/${slug}.png" alt="QR ${slug}" width="100"/></td>
          <td><code>${url}</code></td>
          <td><a href="/q/${slug}" target="_blank">Tester</a></td>
        </tr>
      `;
    }
  
    html += "</table>";
    res.send(minify(html));
  });
  

module.exports = router;
