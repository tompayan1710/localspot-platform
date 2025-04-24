const express = require("express");
const router = express.Router();
const UAParser = require("ua-parser-js");
const { log } = require("../utils/logger");
const { getQRCodeBySlug } = require("../db/Models/qrCodeModel");
const { createScan, getAllScans, hasRecentScan } = require("../db/Models/scanModel");
const { findOrCreateBrowser } = require("../db/Models/browserModel");


router.all("/q/:slug", (req, res, next) => {
    log("🔥 Requête reçue :", {
      method: req.method,
      path: req.path,
      slug: req.params.slug,
      userAgent: req.headers["user-agent"],
      time: new Date().toISOString(),
    });
    next(); // continue vers le router.get après
  });
  



  router.get("/q/:slug", async (req, res) => {
    console.time("⏱ Requête complète");
  
    if (req.path === "/favicon.ico") return res.status(204).end();
  
    const { slug } = req.params;
    const userAgent = req.headers["user-agent"];
    const ip = req.ip;
  
    const record = await getQRCodeBySlug(slug);
    if (!record) return res.status(404).send("Lien introuvable");
  
    const destinationUrl = record.url;
  
    if (await hasRecentScan(record.id, ip)) {
      console.log("⏩ Scan ignoré (déjà enregistré il y a moins de 3s)");
      return res.redirect(destinationUrl);
    }

     // 👉 Analyse du user-agent
    const parser = new UAParser(userAgent);
    const uaData = parser.getResult();

    const device_type = uaData.device.type || "desktop";
    const browser_name = uaData.browser.name || "Unknown";

    try {
      // 🔍 Trouver ou créer l'entrée browser
      const browser = await findOrCreateBrowser(browser_name);

      // 💾 Enregistrement du scan
      await createScan(
        record.id,
        ip,
        userAgent,
        device_type,
        browser.id
      );

        log("📊 Nouveau scan enregistré pour :", slug);
      } catch (err) {
        console.error("❌ Erreur lors de l'enregistrement du scan :", err.message);
      }
    
      console.timeEnd("⏱ Requête complète");
      res.redirect(destinationUrl);
    }
  );
  


  router.get("/stats", async (req, res) => {
    const scans = await getAllScans();

    // Génère une petite page HTML
    let html = `
      <h1>📊 Statistiques de scans</h1>
      <table border="1" cellspacing="0" cellpadding="6">
        <tr>
          <th>#</th>
          <th>Slug</th>
          <th>Date</th>
          <th>IP</th>
          <th>Agent</th>
        </tr>
    `;
  
    scans.forEach((log, index) => {
      html += `
      <tr>
        <td>${index + 1}</td>
        <td>${log.slug}</td>
        <td>${log.timestamp}</td>
        <td>${log.ip}</td>
        <td>${log.user_agent}</td>
        <td>${log.device_type}</td>
        <td>${log.browser_name || "?"}</td>
      </tr>
    `;
    });
  
    html += "</table>";

    
    res.send(html);
  });
  

module.exports = router;
