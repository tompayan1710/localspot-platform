const express = require("express");
const router = express.Router();

const { createOffer, getAllOffers, getOfferBySlug } = require("../../../db/Models/offerModel");
const { findOrCreateCityByName } = require("../../../db/Models/AdresseModel");

// ➕ Route pour créer une nouvelle offre
router.post("/create", async (req, res) => {
  const {
    title,
    description,
    adresse,
    latitude,
    longitude,
    departement,
    ville,
    categories,
    type,
    price,
    duration,
    image_urls,
    id_hote,
    pricePer,
    qrcode_url,
    slug,
  } = req.body;


  
  console.log("✅ title :", title,
    "description", description,
    "adresse", adresse,
    "latitude", latitude,
    "longitude", longitude,
    "departement", departement,
    "ville", ville,
    "categories", categories,
    "type",type,
    "price",price,
    "duration",duration,
    "image_urls",image_urls,
    "id_hote",id_hote,
    "pricePer",pricePer,
    "qrcode_url", qrcode_url,
    "slug", slug,
  );
  
  let city_id, departement_id;
  try {
    const result = await findOrCreateCityByName(ville, departement);
    city_id = result.city_id;
    departement_id = result.departement_id;
  } catch (err) {
    console.error("❌ Erreur lors de la récupération de l'id de la ville :", err.message);
    return res.status(500).json({ success: false, error: "Erreur serveur" });
  }

  
  console.warn(title,
    description,
    adresse,
    latitude,
    longitude,
    departement,
    ville,
    categories,
    type,
    city_id,
    price,
    duration,
    image_urls,
    id_hote,
    pricePer,
    qrcode_url,
    slug,);

  try {
    const newOffer = await createOffer({
      title,
      description,
      adresse,
      latitude,
      longitude,
      departement_id,
      categories,
      type,
      city_id,
      price,
      duration,
      image_urls,
      id_hote,
      pricePer,
      qrcode_url,
      slug,
    });

    res.status(201).json({ success: true, offer: newOffer });
  } catch (err) {
    console.error("❌ Erreur lors de la création de l'offre :", err.message);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// (optionnel) Liste toutes les offres
router.get("/getall", async (req, res) => {
  try {
    const offers = await getAllOffers();
    res.json({ success: true, offers });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// (optionnel) Récupère une offre par son ID
router.get("/get", async (req, res) => {
  const slug = req.query.slug;

  if (!slug) {
    return res.status(400).json({ success: false, error: "slug manquant" });
  }

  try {
    const offer = await getOfferBySlug(slug);
    if (!offer) {
      return res.status(404).json({ success: false, error: "Offre non trouvée" });
    }
    res.json({ success: true, offer });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});





const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

// 🔐 Configuration Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// 📦 Multer en mémoire (upload RAM)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 📤 Route POST pour uploader plusieurs images
router.post("/upload-offer-images", upload.array("images"), async (req, res) => {

  console.log("📥 Fichiers reçus :", req.files);
  console.log("📥 offerId reçu :", req.body.offerId);


  const files = req.files;
  const offerId = req.body.offerId || "temp";
  const urls = [];

  

  if (!files || files.length === 0) {
    return res.status(400).json({ success: false, message: "Aucun fichier reçu." });
  }

  try {
    for (const file of files) {
      console.log("Uploading file:", file.originalname);

     // 🔁 À remplacer :

    // ✅ Par :
    const cleanName = file.originalname
      .normalize("NFD")                // enlève les accents
      .replace(/[\u0300-\u036f]/g, "") // retire les caractères accentués restants
      .replace(/\s+/g, "_")            // remplace les espaces par des "_"
      .replace(/[^a-zA-Z0-9_.-]/g, ""); // garde seulement caractères valides

    const filePath = `${offerId}/${Date.now()}_${cleanName}`;
      console.log("Uploading file:", filePath);


      const { error } = await supabase.storage
        .from("offers-images") // Nom de ton bucket Supabase
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (error) throw error;

      const { data: publicUrlData } = supabase.storage
        .from("offers-images")
        .getPublicUrl(filePath);

      urls.push(publicUrlData.publicUrl);
    }

    return res.status(200).json({ success: true, urls });
  } catch (err) {
    console.error("❌ Erreur lors de l'upload :", err.message);
    return res.status(500).json({ success: false, message: "Échec de l’upload des images." });
  }
});


module.exports = router;