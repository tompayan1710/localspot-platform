// ✅ src/auth/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const pool = require('../db/index');

// ✅ Middleware de vérification JWT
const authMiddleware = async (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ 
      isAuth: false, 
      error: "No token provided to go to this route" 
    });
  }

  try {
    const tokenValue = token.split(' ')[1]; // Récupère uniquement le JWT sans "Bearer"
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [verified.email]);

    if (user.rowCount === 0) {
      console.log("Vous avez renseigner un token mais 'Utilisateur non trouvé'");
      return res.status(403).json({ error: "Votre compte n'existe plus ou à était suppriméds'" });
    }

    req.user = user.rows[0];
    next(); // ✅ Continue vers la route demandée
  } catch (err) {
    console.error("Erreur de vérification JWT:", err.name);

    // ✅ Gestion des erreurs spécifiques
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ 
        isAuth: false, 
        error: "Access Token expired, please refresh." 
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(403).json({ 
        isAuth: false, 
        error: "Invalid Access Token." 
      });
    }

    return res.status(500).json({ 
      isAuth: false, 
      error: "Internal server error" 
    });
  }
};

module.exports = authMiddleware;
