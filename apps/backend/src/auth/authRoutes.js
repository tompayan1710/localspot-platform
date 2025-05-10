const express = require('express');
const { signup, login ,  getProfile,testconnection, logout, googleOAuth2, googleCallback} = require('./authController');
// const { testconnection} = require('./authController');
const router = express.Router();
const path = require('path'); 
const authMiddleware = require('./authMiddleware'); // Import du middleware JWT
const { error } = require('console');



// router.get('/signup', (req, res) => {
//     res.sendFile(path.join(__dirname, 'signup.html'));
//   });
  
//   // Route GET pour afficher le formulaire de login
//   router.get('/login', (req, res) => {
//     res.sendFile(path.join(__dirname, 'login.html'));
//   });

// router.get('/testconnection', testconnection);

// ✅ Route Login (POST /api/auth/login)
router.post('/login', async (req, res) => {
  const response = await login(req.body);
  
  if (!response.success) {
    return res.status(response.status).json({ error: response.error });
  }

  return res.status(response.status).json({
    message: response.message,
    token: response.token,
    user: response.user
  });
});



router.post('/signup', async(req, res) => {
  const response = await signup(req.body);
  
  if (!response.success) {
    return res.status(response.status).json({ error: response.error });
  }

  return res.status(response.status).json({
    message: response.message,
    token: response.token,
    user: response.user
  });
});




// router.post('/logout', logout);


router.get('/getprofile',authMiddleware, async (req, res) => {
  const response  = await getProfile(req);
  res.status(response.status || 200).json(response);
});


// Route protégée par JWT (uniquement pour les utilisateurs connectés)
// router.get('/profile', authMiddleware, (req, res) => {
//   res.json({ message: 'Bienvenue sur votre profild', user: req.user });
// });



//AUTHENTIFICATION GOOGLE

// ✅ Route pour démarrer l'authentification Google
router.get('/googleoauth2', googleOAuth2);
// ✅ Route de redirection de Google (callback)
router.get('/google/callback', googleCallback);


module.exports = router;
