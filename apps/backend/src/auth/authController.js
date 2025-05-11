const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/index');
// const { use } = require('./authRoutes');
require('dotenv').config();





async function signup(userData) {
  const { email, password = "", provider = "password-email", role="member" } = userData;
  let hashedPassword = null;

  try {

     // ✅ Vérifier si l'utilisateur existe déjà
     const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
     if (existingUser.rowCount > 0) {
       return { success: false, status: 400, error: "Cet email est déjà utilisé." };
     }

    if(provider === "password-email"){
      hashedPassword = await bcrypt.hash(password, 10);
    } else if(provider === "password-email"){
      hashedPassword= null;
    }

    const newUser = await pool.query(
      'INSERT INTO users (email, password, provider, role, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING id, email',
      [email, hashedPassword, provider, role]
    );        

    return  {success: true, status: 201, message: "Utilisateur créé avec succès"};
  } catch (error) {
    return { success: false, status: 500, error: error.message};
  }
};







async function login(userData) {
  const { email, password = "", provider = "password-email" } = userData;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rowCount  === 0) return { success: false, status: 404, error: "Utilisateur non trouvé"};
    
    console.log('PASSWORD : ',password);
    console.log('user.rows[0] : ',user.rows[0]);
    if(provider ==="password-email"){
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
      if (!validPassword) return { success: false, status: 400, error: "Mot de passe incorrect"};
    }

    //IF provider === "google" Pas besoin de tester le mot de pass car pas de mot de passe à fournir

    const userData = user.rows[0];
    const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // ✅ Envoie le JWT dans la réponse
    return  {success: true, status: 200, message: "Connexion réussie", token, user: userData}
  } catch (error) {
    return  {success: true, status: 500, error: error.message}
  }
};







async function getProfile(req) {
  try {
    const reqUserInfo = req.user
    console.log("Le authMiddleware est vérifié est à donné ce user :", reqUserInfo);

     // ✅ Vérifie si l'utilisateur existe encore dans la base
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [reqUserInfo.email])
    if (user.rowCount  === 0){
      return { isAuth: false, error: "Utilisateur non trouvé"};
    } else {
      return ({
        "isAuth": true,
        "message": "Authenticated successfully",
        "user": user.rows[0]
      });
    };
  } catch (err) {
    console.error("Erreur de vérification JWT:", err);
    return ({
      "isAuth": false,
      "message": "Invalid or expired token",
    });
  }
}






  //AUTHENTIFICATION GOOGLE 
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;
const FRONTEND_URL = process.env.FRONTEND_URL


// ✅ Démarrer l'authentification Google (Origine JavaScript)
function googleOAuth2(req, res) {
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=email profile`;
  res.redirect(googleLoginUrl);
};


// ✅ Gérer la redirection de Google (callback)
async function googleCallback(req, res) {
  const { code } = req.query;
  // console.log("Je suis dans la redirection ....");
  // console.log("Voici le code : ", code);
  try {
    // ✅ Échange du code pour obtenir le token Google
    //await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);

    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      })
    });
    if (!response.ok) {
      console.error("Erreur lors de l'obtention du token Google:", data);
      return res.status(400).json({ message: "Erreur lors de l'authentification Google" });
    }

    const data = await response.json();

    const { id_token } = data;
    console.log("Le id du token est : ", id_token);

    // ✅ Vérifie le token Google et récupère les infos utilisateur
    const userInfoResponse = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`);
    if (!userInfoResponse.ok) {
      console.error("❌ Erreur lors de la vérification du token Google :", userInfoResponse.status);
      return res.status(400).json({ message: "Erreur lors de la vérification du token Google" });
    }

    const userData = await userInfoResponse.json();
    console.log("Données utilisateur récupérées :", userData);

    const { email, name, picture } = userData;
    console.log("email, name, picture  : ",  email, name, picture);


    // ✅ ✅ ✅ Envoie le JWT dans la réponse JSON (PAS de cookie, PAS de redirection)
    // return res.status(200).json({
    //   message: "Connexion réussie avec Google ✅",
    //   token: myJwt,       // ✅ Ton propre JWT
    //   user: { email, name, picture } // ✅ Les infos utilisateur
    // });

    const provider = "google";





    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
      console.log("Utilisateur non trouvé, création en cours...");
      // ✅ Crée automatiquement l'utilisateur s'il n'existe pas
      await signup({email,password: "", name,provider: "google"});
      if (loginResponse.status !== 201) {
        return res.status(login.status).json({ message: "Erreur lors de la création de l'utilisateur Google", error: loginResponse.error });
      }else{
        console.log("Utilisateur créé avec succés")
      }
    } else {
      console.log("Utilisateur Google déjà existant.");
    }

    const loginResponse = await login({email, password: "", provider});
    if (loginResponse.status !== 200) {
      return res.status(loginResponse.status).json({ message: "Erreur lors de la connexion Google", error: loginResponse.error });
    }

    // ✅ Génère ton propre JWT sécurisé
    const myJwt = jwt.sign({ email, name, picture }, JWT_SECRET, {
      expiresIn: "7d",
    });

    console.log("Mon propre JWT généré :", myJwt);

    return res.redirect(`${FRONTEND_URL}/login?token=${myJwt}`);

  } catch (error) {
    console.error("Erreur lors de l'authentification Google :", error.message);
    return res.status(400).json({ message: "Erreur lors de l'authentification Google" });
  }
};


module.exports = {
  signup,
  login,
  getProfile,
  googleOAuth2,
  googleCallback
};