const db = require("../index"); // ou le chemin vers ton fichier db

async function toggleFavorite(user_id, offer_slug) {
  try {
    const checkQuery = `
      SELECT id FROM favorites
      WHERE user_id = $1 AND offer_slug = $2
    `;
    const checkResult = await db.query(checkQuery, [user_id, offer_slug]);

    if (checkResult.rows.length > 0) {
      // Le favori existe → on le supprime
      const deleteQuery = `
        DELETE FROM favorites
        WHERE user_id = $1 AND offer_slug = $2
      `;
      await db.query(deleteQuery, [user_id, offer_slug]);
      return { success: true, action: "removed" };
    } else {
      // Le favori n’existe pas → on l’ajoute
      const insertQuery = `
        INSERT INTO favorites (user_id, offer_slug)
        VALUES ($1, $2)
      `;
      await db.query(insertQuery, [user_id, offer_slug]);
      return { success: true, action: "added" };
    }

  } catch (error) {
    console.error("Erreur dans toggleFavorite :", error);
    return { success: false, message: error.message };
  }
}


async function isFavorite(user_id, offer_slug) {
  try {
    const checkQuery = `
      SELECT id FROM favorites
      WHERE user_id = $1 AND offer_slug = $2
    `;
    const checkResult = await db.query(checkQuery, [user_id, offer_slug]);

    return checkResult.rows.length > 0;

  } catch (error) {
    console.error("Erreur dans toggleFavorite :", error);
    return { success: false, message: error.message };
  }
}



async function getAllFavorites(user_id) {
  try {
    const query = `
      SELECT offers.* 
      FROM favorites 
      JOIN offers ON favorites.offer_slug = offers.slug
      WHERE favorites.user_id = $1
      ORDER BY favorites.created_at DESC
    `;
    const result = await db.query(query, [user_id]);
    return result.rows;
  } catch (error) {
    console.error("Erreur dans getAllFavorites :", error);
    throw error;
  }
}

module.exports = {
  toggleFavorite,
  isFavorite,
  getAllFavorites
};
