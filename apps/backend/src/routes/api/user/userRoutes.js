// backend/routes/user/updateProfile.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const pool = require("../../../db/index"); // ← ta config PostgreSQL
const  { getAllFavorites }  = require("../../../db/Models/FavoritesModel"); // ← ta config PostgreSQL
const supabase = require("../../../utils/supabaseClient");

const upload = multer({ storage: multer.memoryStorage() });
router.patch("/update-profile", upload.single("profil_picture"), async (req, res) => {
  const { user_id } = req.body;
  const fieldsToUpdate = JSON.parse(req.body.fieldsToUpdate || "{}");

  // ✅ le fichier est dans req.file, pas dans fieldsToUpdate
  console.log(req.file)
  if (req.file) {
    console.log("✅Il existe bien un file, ainsi je rentre")
    const buffer = req.file.buffer;
    const ext = req.file.originalname.split(".").pop();
    const fileName = `user_${user_id}_${Date.now()}.${ext}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("profil-picture") // nom du bucket
      .upload(filePath, buffer, {
        contentType: req.file.mimetype,
        upsert: true,
      });

    if (uploadError) {
      console.error("❌ Erreur upload Supabase :", uploadError.message);
      return res.status(500).json({ message: "Erreur upload image" });
    }

    const { data: urlData } = supabase.storage
      .from("profil-picture")
      .getPublicUrl(filePath);

    fieldsToUpdate.profil_picture = urlData.publicUrl; // ✅ on injecte l'URL ici
  }

  if (!user_id || Object.keys(fieldsToUpdate).length === 0) {
    return res.status(400).json({ message: "Requête invalide" });
  }

  const fields = [];
  const values = [];

  Object.entries(fieldsToUpdate).forEach(([key, value], index) => {
    fields.push(`${key} = $${index + 1}`);
    values.push(value);
  });

  values.push(user_id);
  const query = `UPDATE users SET ${fields.join(", ")} WHERE id = $${values.length} RETURNING *`;

  try {
    const { rows } = await pool.query(query, values);
    return res.json(rows[0]);
  } catch (err) {
    console.error("❌ Erreur SQL :", err);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});




router.get("/getall-favorites", async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).json({ success: false, message: "user_id requis" });
  }

  try {
    const favorites = await getAllFavorites(user_id);
    return res.json({ success: true, favorites });
  } catch (error) {
    console.error("Erreur dans /offer/favorites :", error);
    return res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});

module.exports = router;
