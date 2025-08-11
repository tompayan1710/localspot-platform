const express = require("express");
const router = express.Router();
const QRCode = require("qrcode");
const { createClient } = require("@supabase/supabase-js");
const { getQRCodeById, createQRCode, UpdateQRCode} = require("../../../db/Models/qrCodeModel");
const { createSlugOfferNotExist } = require("../../../db/Models/offerModel");

// Supabase config
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Créer un QR code
router.post("/create", async (req, res) => {
  const { slug, user_id, id_hote, latitude, longitude, adresse, base_url } = req.body;

  if (!user_id || !latitude || !longitude || !adresse) {
    return res.status(400).json({ success: false, message: "Champs manquants." });
  }

  try {
    // const slug = await createSlugOfferNotExist();

    const id_qrcode = await createQRCode(slug, user_id, id_hote, latitude, longitude, adresse)

    const qrContent = `${base_url ? base_url : process.env.FRONTEND_URL}/offer-page/${slug}?id=${id_qrcode}`; // ou ce que tu veux

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
    
    await UpdateQRCode(id_qrcode, image_url);

    return res.status(200).json({ success: true, qrImageUrl: image_url, slug: slug, id_qrcode: id_qrcode   });
  } catch (err) {
    console.error("❌ Erreur création QR :", err.message);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});


// (optionnel) Récupère une offre par son ID
router.get("/get", async (req, res) => {
  const id_qrcode = req.query.id_qrcode;

  if (!id_qrcode) {
    return res.status(400).json({ success: false, error: "Id manquant" });
  }

  try {
    const qrcode = await getQRCodeById(id_qrcode);
    if (!qrcode) {
      return res.status(404).json({ success: false, error: "QRCode non trouvée" });
    }
    res.json({ success: true, qrcode: qrcode.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

module.exports = router;
