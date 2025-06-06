const express = require("express");
const router = express.Router();
const { sendAdminAlertEmail } = require("../../../utils/email");

const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const { createProvider, insertUserProvider } = require("../../../../src/db/Models/ProviderModel")
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY 
);

const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/upload-provider-image", upload.single("image"), async (req, res) => {
  const file = req.file;
  const offerId = req.body.offerId || "temp";

  if (!file) {
    return res.status(400).json({ success: false, message: "Aucun fichier reçu." });
  }

  try {
    const cleanName = file.originalname
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_.-]/g, "");

    const filePath = `${offerId}/${Date.now()}_${cleanName}`;

    const { error } = await supabase.storage
      .from("providers-images")
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw error;

    const { data: publicUrlData } = supabase.storage
      .from("providers-images")
      .getPublicUrl(filePath);

    return res.status(200).json({
      success: true,
      url: publicUrlData.publicUrl, // ✅ retourne juste 1 URL
    });

  } catch (err) {
    console.error("❌ Erreur lors de l'upload :", err.message);
    return res.status(500).json({ success: false, message: "Échec de l’upload de l’image." });
  }
});



router.post("/create", async (req, res) => {
  try {
    const {
      name, bio, type, sizes, logo_url,
      email, tel, website, instagram, facebook, moredetails, id_user
    } = req.body || {};

    if (!name || !bio || !type || !email || !tel) {
      return res.status(400).json({ success: false, message: "Champs requis manquants." });
    }

    console.log("Create Provider : ", name, bio, type, sizes, logo_url,
      email, tel, website, instagram, facebook, moredetails, id_user)
    const result = await createProvider({
      name, bio, type, sizes, logo_url,
      email, tel, website, instagram, facebook, moredetails
    });
    const id_provider = result.id;
    
    await insertUserProvider(id_user, id_provider);

     // ✅ Envoi de l’alerte email
    // ✅ Envoi de l’e-mail d’alerte à l’admin
    await sendAdminAlertEmail({
      subject: "🆕 Nouvelle demande de prestataire",
      to: process.env.ADMIN_EMAIL,
      message: `
        Nouveau prestataire à valider :

        Nom : ${name}
        Email : ${email}
        Téléphone : ${tel}

        Bio : ${bio}
        Détails : ${moredetails}

        Lien du logo : ${logo_url || "aucun"}

        Accède au back-office pour valider.
        `
    });

    res.status(200).json({ success: true, id_provider });

  } catch (error) {
    console.error("Erreur dans /create :", error.message);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la création du prestataire." });
  }
});



module.exports = router;