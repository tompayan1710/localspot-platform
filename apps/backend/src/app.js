const express = require("express");
const app = express();
const path = require("path");
const compression = require("compression");
const apiRoutes = require("./routes/api/index");
// const an  uthRoutes = require('./auth/authRoutes');

// const { pool } = require('./db/index'); // Utiliser la pool existante

const cors = require("cors");
const cookieParser = require('cookie-parser');
const FRONTEND_URL= process.env.FRONTEND_URL;

// app.use(cors());
app.use(cors({ 
  origin: [FRONTEND_URL], 
  credentials: true 
}));

app.use(cookieParser());
app.use(express.json());
app.use(compression());
app.use("/qrcodes", express.static(path.join(__dirname, "data/qrcodes")));
app.use('/api/auth', express.static(path.join(__dirname, 'auth'))); // Juste pour les fichiers HTML

app.use(express.static(path.join(__dirname, "../build")));





/*
const PostgresqlStore = genFunc(session);
app.use(session({
  store: new PostgresqlStore({
    pool: pool,              // Utilise la pool PostgreSQL existante
    tableName: 'session'     // Nom de la table des sessions
  }),
  secret: process.env.SESSION_SECRET,  // Clé secrète (à configurer dans .env)
  resave: false,             // Ne sauvegarde pas si la session n'est pas modifiée
  saveUninitialized: false,  // N'enregistre pas les sessions vides
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 jour
    secure: false,               // Mettre à true si HTTPS
    httpOnly: true,              // Empêche l'accès au cookie via JavaScript
    sameSite: 'lax'              // Protection CSRF
  }
}));


app.get('/api/session-test', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.send(`Vous avez visité cette page ${req.session.views} fois.`);
  } else {
    req.session.views = 1;
    res.send('Bienvenue ! Ceci est votre première visite.');
  }
});

*/









  

app.set("trust proxy", true);

// Utiliser la route
app.use("/api", apiRoutes);


app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});


module.exports = app;
