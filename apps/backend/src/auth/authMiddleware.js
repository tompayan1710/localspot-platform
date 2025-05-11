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
      message: "No token provided to go to this route" 
    });
  }

  try {
    const tokenValue = token.split(' ')[1]; // Récupère uniquement le JWT sans "Bearer"
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);

    const user = await pool.query('SELECT * FROM users WHERE email = $1', [verified.email]);

    if (user.rowCount === 0) {
      console.log("Vous avez renseigner un token mais 'Utilisateur non trouvé'");
      return res.status(403).json({ message: "Votre compte n'existe plus ou à était suppriméds'" });
    }

    req.user = user.rows[0];
    next(); // ✅ Continue vers la route demandée
  } catch (err) {
    console.log("Erreur de vérification JWT:", err);
    return res.status(403).json({ 
      isAuth: false, 
      message: "Invalid or expired token" 
    });
  }
};

module.exports = authMiddleware;
