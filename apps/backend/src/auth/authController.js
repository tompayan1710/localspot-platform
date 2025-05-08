const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db/index');
require('dotenv').config();

// Enregistrement (Signup)
exports.signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (email, password, created_at) VALUES ($1, $2, NOW()) RETURNING id, email',
      [email, hashedPassword]
    );
    res.status(201).json({ message: 'Utilisateur créé avec succès', user: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Connexion (Login)
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rowCount  === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).json({ error: "Mot de passe incorrect" });

    const userData = user.rows[0];
    const token = jwt.sign({ id: userData.id, email: userData.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // ✅ Envoie le JWT dans la réponse
    res.status(200).json({ message: 'Connexion réussie', token, user: userData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




  // exports.logout = async(req, res) => {
  //   req.session.destroy();
  //   res.clearCookie('connect.sid');
  //   res.json({ message: 'Déconnecté avec succès' });
  // };

  // // Route de Vérification de Connexion (session active)
  // exports.testconnection = async(req, res) => {
  //   if (req.session.user) {
  //     res.json({ user: req.session.user });
  //   } else {
  //     res.status(401).json({ error: "Vous n'êtes pas connecté" });
  //   }
  // };