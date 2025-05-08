// src/auth/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.header('Authorization'); // Récupère le header Authorization
  if (!token) return res.status(401).json({ error: 'Accès refusé. Token requis.Middleware' });

  try {
    const tokenValue = token.split(' ')[1]; // Récupère uniquement le JWT sans "Bearer"
    const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
    req.user = verified; // Ajoute les infos utilisateur à req.user
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token invalide.' });
  }
};
