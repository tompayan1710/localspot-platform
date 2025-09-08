const express = require("express");
const router = express.Router();

const { createOffer, getAllOffers, getOfferBySlug, getOffersProvider, createSlugOfferNotExist } = require("../../../db/Models/offerModel");
const { findOrCreateCityByName } = require("../../../db/Models/AdresseModel");
const { toggleFavorite, isFavorite } = require("../../../db/Models/FavoritesModel");
const { translateToAll } = require("../../../utils/translate");


const db = require("../../../db/index");

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
    provider_id,
    pricePer,
    total_capacity,
    // qrcode_url,
    slug,
    cancellable
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
    "provider_id",provider_id,
    "pricePer",pricePer,
    "total_capacity", total_capacity,
    // "qrcode_url", qrcode_url,
    "slug", slug,
    "cancellable", cancellable
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

  const SUPPORTED_LANGS = [
    "en",
    "fr",
    // "it",
    // "de"
  ]

  const title_i18n = await translateToAll(title, SUPPORTED_LANGS /* , "fr" si tu sais */);
  const description_i18n = await translateToAll(description, SUPPORTED_LANGS /* , "fr" si tu sais */);


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
    provider_id,
    pricePer,
    total_capacity,
    // qrcode_url,
    slug,
    cancellable,
    title_i18n,
    description_i18n);

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
      provider_id,
      pricePer,
      total_capacity,
      // qrcode_url,
      slug,
      cancellable,
      title_i18n,
      description_i18n
    });

    res.status(201).json({ success: true, offer: newOffer });
  } catch (err) {
    console.error("❌ Erreur lors de la création de l'offre :", err.message);
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

// (optionnel) Liste toutes les offres
router.get("/getall", async (req, res) => {
  const lang = (req.query.lang || "fr").split("-")[0].toLowerCase();

  try {
    const offers = await getAllOffers("", [], "", lang);
    res.json({ success: true, offers });
  } catch (err) {
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});

router.get("/getall-provider", async (req, res) => {
  const provider_id = req.query.provider_id;

  if (!provider_id) {
    return res.status(400).json({ success: false, error: "provider_id manquant" });
  }

  try {
    const offers = await getOffersProvider(provider_id);
    res.json({success: true, offers});
  }catch(err){
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
})
// (optionnel) Récupère une offre par son ID
router.get("/get", async (req, res) => {
  const slug = req.query.slug;
  const lang = (req.query.lang || "fr").split("-")[0].toLowerCase();

  if (!slug) {
    return res.status(400).json({ success: false, error: "slug manquant" });
  }

  try {
    const offer = await getOfferBySlug(slug, lang);
    if (!offer) {
      return res.status(404).json({ success: false, error: "Offre non trouvée" });
    }
    res.json({ success: true, offer: offer.rows[0]});
  } catch (err) {
    console.error("Erreur /api/offer/get :", err); // <-- utile
    res.status(500).json({ success: false, error: "Erreur serveur" });
  }
});


router.get("/create-slug", async (req, res) => {
  try {
    const slug = await createSlugOfferNotExist();
    if (!slug) {
      return res.status(404).json({ success: false, error: "Impossible de générer un slug" });
    }
    res.json({ success: true, slug: slug});
  } catch (err) {
    console.error("Erreur /create-slug :", err);
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



router.post("/filter", async (req, res) => {
  const { priceRange, date, moment, categories,  nb_adult, nb_child, nb_infant } = req.body;
  const lang = (req.query.lang || "fr").split("-")[0].toLowerCase();


  console.log(req.body);

  const total_places_used =  nb_adult + nb_child + nb_infant;
  console.log( "priceRange", priceRange, "date", date, "moment", moment, "categories", categories, "total_places_used", total_places_used)
  let conditions = [];
  let values = [];
  let index = 1;

  if (priceRange?.min !== undefined) {
    conditions.push(`price >= $${index}`);
    values.push(priceRange.min);
    index++;
  }

  if (priceRange?.max !== undefined) {
    conditions.push(`price <= $${index}`);
    values.push(priceRange.max);
    index++;
  }

  // if (date) {
  //   conditions.push(`$${index} = ANY(available_dates)`); // ou `date = $index` si c’est un champ direct
  //   values.push(date);
  //   index++;
  // }

  if (categories && categories.length > 0) {
    // categories && $1
    // -- devient : {'Nautiques', 'Bien-être', 'Culture'} && {'Bien-être', 'Sports'}

    conditions.push(`categories && $${index}`);
    values.push(categories);
    index++;
  }

  // Si tu veux filtrer par capacité minimum par exemple :
  if (total_places_used > 0) {
    conditions.push(`total_capacity >= $${index}`);
    values.push(total_places_used);
    index++;
  }

  const whereClause = conditions.join(" AND "); // 🔁 sans "WHERE"

  // const query = `
  //   SELECT * FROM offers
  //   ${whereClause}
  // `;

  // ORDER BY created_at DESC
  // LIMIT 50

  // const query = `
  //   SELECT * FROM offers
  // `;

  // const values = [];
  try {
    // console.log("SQL Query:", query);
    // console.log("With values:", values);
    console.log("WhereClause:", whereClause);
    console.log("With values:", values);

    const rows = await getAllOffers(whereClause, values, moment, lang);


    // const { rows } = await db.query(query, values);
    // const {rows} = await db.query(query, values)

    res.json(rows);
  } catch (err) {
    console.error("Erreur filtre offres :", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  } 
});





router.patch("/update-info", upload.none(), async (req, res) => {
  const { offer_slug } = req.body;
  const fieldsToUpdate = JSON.parse(req.body.fieldsToUpdate || "{}");

  if (!offer_slug || Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({ message: "Requête invalide" });
  }

  const fields = [];
  const values = [];

  Object.entries(fieldsToUpdate).forEach(([key, value], index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(value);
  });

  values.push(offer_slug);
  const query = `UPDATE offers SET ${fields.join(", ")} WHERE slug = $${values.length} RETURNING *`;

  try {
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Offre introuvable." });
    }

    return res.json(rows[0]); // ← renvoie l'offre mise à jour
  } catch (err) {
    console.error("❌ Erreur SQL :", err);
    return res.status(500).json({ message: "Erreur serveur." });
  }
});


router.patch("/update-photos", upload.array("new_photos"), async (req, res) => {
  const { offer_slug } = req.body;
  let remaining_urls = [];

  try {
    remaining_urls = JSON.parse(req.body.remaining_urls || "[]");
  } catch {
    return res.status(400).json({ success: false, message: "Invalid JSON in remaining_urls" });
  }

  if (!offer_slug) return res.status(400).json({ success: false, message: "Missing slug" });

  const newFiles = req.files || [];
  const newUploadedUrls = [];

  try {
    for (const file of newFiles) {
      const fileExt = file.originalname.split(".").pop();
      const filePath = `offers/${offer_slug}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("offers-images")
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: false
        });

      if (uploadError) throw uploadError;

      const { data: publicUrlData } = supabase
        .storage
        .from("offers-images")
        .getPublicUrl(filePath);

      newUploadedUrls.push(publicUrlData.publicUrl);
    }

    const finalImageUrls = [...remaining_urls, ...newUploadedUrls];

    // 🔄 Mise à jour de la base de données (Postgres ici)
    const result = await db.query(
      "UPDATE offers SET image_urls = $1 WHERE slug = $2 RETURNING *",
      [finalImageUrls, offer_slug]
    );

    return res.json({ success: true, offer: result.rows[0] });
  } catch (err) {
    console.error("Erreur Supabase Upload :", err);
    return res.status(500).json({ success: false, message: "Erreur lors du traitement des images." });
  }
});



router.patch("/toggle-like", async (req, res) => {
  const { user_id, offer_slug } = req.body;
  console.log("Je Toggle l'offer");

  if (!user_id || !offer_slug) {
    return res.status(400).json({ success: false, message: "user_id et offer_slug sont requis." });
  }

  try {
    const result = await toggleFavorite(user_id, offer_slug);
    return res.status(200).json({ success: true, action: result.action });
  } catch (error) {
    console.error("Erreur dans /offer/toggle-like :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});

router.post("/is-favorite", async (req, res) => {
  const { user_id, offer_slug } = req.body;
  console.log("Je Toggle l'offer");

  if (!user_id || !offer_slug) {
    return res.status(400).json({ success: false, message: "user_id et offer_slug sont requis." });
  }

  try {
    const result = await isFavorite(user_id, offer_slug);
    return res.status(200).json({ success: true, isFavorite: result });
  } catch (error) {
    console.error("Erreur dans /offer/is-favorite :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});

module.exports = router;