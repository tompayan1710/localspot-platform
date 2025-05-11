// ✅ src/auth/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

// ✅ Middleware de vérification JWT
const authMiddleware = (req, res, next) => {

  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ 
      isAuth: false, 
      message: "No token provided" 
    });
  }

  try {
    const tokenValue = token.split(' ')[1]; // Récupère uniquement le JWT sans "Bearer"
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified; // ✅ Ajoute les infos utilisateur au req.user
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
