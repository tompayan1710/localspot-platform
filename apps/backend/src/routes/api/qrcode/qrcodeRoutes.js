const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const { createClient } = require("@supabase/supabase-js");
const { v4: uuidv4 } = require("uuid");
const { getQRCodeBySlug, createQRCode} = require("../../../db/Models/qrCodeModel");

// Supabase config
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Créer un QR code
router.post("/create", async (req, res) => {
  const { id_hote, latitude, longitude, adresse } = req.body;

  if (!id_hote || !latitude || !longitude || !adresse) {
    return res.status(400).json({ success: false, message: "Champs manquants." });
  }

  try {
    let slug = uuidv4(); // identifiant unique pour ce QR code
    while((await getQRCodeBySlug(slug)).rowCount > 0){
        slug = uuidv4();
    }

    const qrContent = `${process.env.FRONTEND_URL}/offer-page/${slug}`; // ou ce que tu veux

    const qrBuffer = await QRCode.toBuffer(qrContent);

    const filePath = `qrcodes/${Date.now()}_${slug}.png`;

    const { error: uploadError } = await supabase.storage
      .from("offers-images") // ton bucket
      .upload(filePath, qrBuffer, {
        contentType: "image/png",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: publicData } = supabase.storage
      .from("offers-images")
      .getPublicUrl(filePath);

    const image_url = publicData.publicUrl;

    // 👉 insérer en DB
    
    await createQRCode(slug, id_hote, latitude, longitude, adresse, image_url)

    return res.status(200).json({ success: true, qrImageUrl: image_url, slug: slug });
  } catch (err) {
    console.error("❌ Erreur création QR :", err.message);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});


// (optionnel) Récupère une offre par son ID
router.get("/get", async (req, res) => {
  const slug = req.query.slug;

  if (!slug) {
    return res.status(400).json({ success: false, error: "slug manquant" });
  }

  try {
    const qrcode = await getQRCodeBySlug(slug);
    if (!qrcode) {
      return res.status(404).json({ success: false, error: "QRCode non trouvée" });
    }
    res.json({ success: true, qrcode: qrcode.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});


module.exports = router;
