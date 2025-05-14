// ✅ src/auth/refreshTokens.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const pool = require('../db/index');

// ✅ Fonction pour créer un Refresh Token en base de données
async function createRefreshToken(userId, refresh_token, expiresAt) {
  await pool.query(
    'INSERT INTO refresh_tokens (user_id, refresh_token, expires_at) VALUES ($1, $2, $3)',
    [userId, refresh_token, expiresAt]
  );
  console.log("Nouveau Refresh Token créé");
}

// ✅ Fonction pour vérifier si un Refresh Token est valide
async function verifyRefreshToken(userId, refresh_token) {
  const result = await pool.query(
    'SELECT * FROM refresh_tokens WHERE user_id = $1 AND refresh_token = $2 AND expires_at > NOW()',
    [userId, refresh_token]
  );

  return result.rowCount > 0;
}

// ✅ Fonction pour supprimer un Refresh Token
async function deleteRefreshToken(userId, refresh_token) {
  await pool.query(
    'DELETE FROM refresh_tokens WHERE user_id = $1 AND refresh_token = $2',
    [userId, refresh_token]
  );

  console.log("Refresh Token supprimé pour l'utilisateur :", userId, "AVEC LE TOKEn :", refresh_token);
}








// ✅ Fonction pour mettre à jour un Refresh Token existant (Rotation)
async function upgradeRefreshToken(userId, oldRefreshToken, newRefreshToken, expiresAt) {
  console.log("FONCTION upgradeRefreshToken : ENTER");

  // ✅ Rechercher si le Refresh Token existe pour cet utilisateur
  const existingTokenResult = await pool.query(
    'SELECT * FROM refresh_tokens WHERE user_id = $1 AND refresh_token = $2',
    [userId, oldRefreshToken]
  );

  if (existingTokenResult.rowCount > 0) {
    // ✅ Si le Refresh Token existe, on le met à jour
    console.log("TOKEN USER id trouver, UPDATE EN COURS", userId);

    await pool.query(
      'UPDATE refresh_tokens SET refresh_token = $1, expires_at = $2 WHERE user_id = $3 AND refresh_token = $4',
      [newRefreshToken, expiresAt, userId, oldRefreshToken]
    );
    console.log("Refresh Token mis à jour pour l'utilisateur :", userId);
  } else {
    // ✅ Si aucun Refresh Token n'est trouvé pour cet utilisateur, on en crée un nouveau
    console.log("AUCUN UTILISATEUR TROUVER POUR LE refreshtoken et l'id; création d'un nouveau", userId);
    await pool.query(
      'INSERT INTO refresh_tokens (user_id, refresh_token, expires_at) VALUES ($1, $2, $3)',
      [userId, newRefreshToken, expiresAt]
    );
    console.log("Nouveau Refresh Token créé pour l'utilisateur :", userId);
  }

    console.log("FONCTION upgradeRefreshToken : sORTIE");

}








// ✅ Fonction pour supprimer tous les Refresh Tokens d'un utilisateur
async function deleteAllRefreshTokens(userId) {
  await pool.query('DELETE FROM refresh_tokens WHERE user_id = $1', [userId]);
}














// ✅ Fonction de renouvellement de l'Access Token avec le Refresh Token
async function refreshToken(req) {
    console.log("🔄 J'arrive dans le refresh token");
    console.log("✅ Cookies reçus dans la requête :", req.cookies);

  const refresh_token = req.cookies.refreshToken; // ✅ Lire le Refresh Token depuis le Cookie sécurisé
    console.log("✅ voici le resfresh_token");
  if (!refresh_token) {    
    console.log("Je n'ai pas trouver de RefreshToken donc return error status 401");
    return { success: false, status: 401, error: "No Refresh Token provided"};    
  }

  try {
    // ✅ Vérifier la validité du Refresh Token (signature)
    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

    // ✅ Vérifier en base de données que ce Refresh Token est toujours valide
    const isValid = await verifyRefreshToken(decoded.id, refresh_token);
    if (!isValid) {
      return { success: false, status: 403, error: " Invalid or expired Refresh Token"};    
    }

    // ✅ Générer un nouveau Access Token
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email, iat: Math.floor(Date.now()/1000) },
      process.env.JWT_SECRET,
      { expiresIn: '10s' } // Access Token de 15 minutes
    );

    const decodedAccessToken = jwt.decode(newAccessToken);


    // const decodedAcces = jwt.decode(refreshData.accessToken);
    const creationDate = new Date().toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    const expirationDate = new Date(decodedAccessToken.exp * 1000).toLocaleString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

                
    console.log("✅ Date de création du token (heure exacte) :", creationDate);
    console.log("✅ Date d'expiration du token (heure exacte) :", expirationDate);
    console.log("✅ Access Token renouvelé avec succès.");

    // ✅ Générer un nouveau Refresh Token (rotation)
    const newRefreshToken = jwt.sign(
      { id: decoded.id, email: decoded.email, iat: Math.floor(Date.now()/1000) },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '180d' } // 6 mois
    );

    console.log("UPGRADE REFRESH TOKEN : uprgraderefretoken");
    // ✅ Mettre à jour le Refresh Token en base de données (rotation)
    await upgradeRefreshToken(decoded.id, refresh_token, newRefreshToken, new Date(Date.now() + 180 * 24 * 60 * 60 * 1000));
    
    return  {success: true, 
      status: 200, 
      message: "Connexion réussie", 
      newAccessToken, 
      newRefreshToken
    }

  } catch (error) {
    console.error("❌ Erreur de renouvellement du token :", error);

    // ✅ Gestion des erreurs JWT (détaillée)
    if (error.name === "TokenExpiredError") {
      return { success: false, status: 403, error: "Expired Refresh Token"};    
    } else if (error.name === "JsonWebTokenError") {
      return { success: false, status: 403, error: "Invalid Refresh Token"};    
    }
    return { success: false, status: 500, error: "Erreur serveur"};    
  }
}

module.exports = {
  createRefreshToken,
  verifyRefreshToken,
  deleteRefreshToken,
  deleteAllRefreshTokens,
  upgradeRefreshToken,
  refreshToken
};
