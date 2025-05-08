const express = require('express');
const { signup, login, testconnection, logout} = require('./authController');
// const { testconnection} = require('./authController');
const router = express.Router();
const path = require('path'); 
const authMiddleware = require('./authMiddleware'); // Import du middleware JWT

router.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
  });
  
  // Route GET pour afficher le formulaire de login
  router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
  });

// router.get('/testconnection', testconnection);


router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

// Route protégée par JWT (uniquement pour les utilisateurs connectés)
router.get('/profile', require('./authMiddleware'), (req, res) => {
  res.json({ message: 'Bienvenue sur votre profild', user: req.user });
});


module.exports = router;
