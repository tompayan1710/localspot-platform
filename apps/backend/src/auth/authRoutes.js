const express = require('express');
const { signup, login , logout,  getProfile,testconnection, googleOAuth2, googleCallback, deleteAccount} = require('./authController');
// const { testconnection} = require('./authController');
const { refreshToken } = require('./refreshTokens');

const router = express.Router();
const path = require('path'); 
const authMiddleware = require('./authMiddleware'); // Import du middleware JWT
const { Console, error } = require('console');
const isProduction = process.env.NODE_ENV === 'production';

// const { error } = require('console');



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
  console.log("✅ROUTE LOGIN")
  if (!response.success) {
    return res.status(response.status).json({ error: response.error });
  }
  console.log("ENREGISTREMET DU TOKEN")

  res.cookie('refreshToken', response.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',        // HTTPS uniquement (mettre à false en local si non HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',     // Protection CSRF (modifiable selon les besoins)
        // path: '/api/auth',   // Limiter l'accès uniquement aux routes d'authentification
        maxAge: 180 * 24 * 60 * 60 * 1000 // 6 mois
    });

  return res.status(response.status).json({
    message: response.message,
    token: response.token,
    user: response.user
  })
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
router.post('/logout', logout);





router.get('/getprofile',authMiddleware, async (req, res) => {
  const response  = await getProfile(req);
  res.status(response.status || 200).json(response);
});



router.delete('/deleteaccount', authMiddleware, deleteAccount);

// Route protégée par JWT (uniquement pour les utilisateurs connectés)
// router.get('/profile', authMiddleware, (req, res) => {
//   res.json({ message: 'Bienvenue sur votre profild', user: req.user });
// });

//AUTHENTIFICATION GOOGLE

// ✅ Route pour démarrer l'authentification Google
router.get('/googleoauth2', googleOAuth2);
// ✅ Route de redirection de Google (callback)
router.get('/google/callback', googleCallback);


router.get('/refresh-token',async (req, res) => {
const response = await refreshToken(req);

  if (!response.success) {
    return res.status(response.status).json({ error: response.error });
  }

  res.cookie('refreshToken', response.newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',        // HTTPS uniquement (mettre à false en local si non HTTPS)
        sameSite: process.env.NODE_ENV === 'production' ? 'Strict' : 'Lax',     // Protection CSRF (modifiable selon les besoins)
        // path: '/api/auth',   // Limiter l'accès uniquement aux routes d'authentification
        maxAge: 180 * 24 * 60 * 60 * 1000 // 6 mois
    });

  if(response.success){
    return res.status(response.status).json({
    status: response.status,
    message: response.message,
    newAccessToken: response.newAccessToken,
  })
  }else{
    return res.status(response.status).json({
    status: response.status,
    error: response.error,
  })
  }
});


module.exports = router;
