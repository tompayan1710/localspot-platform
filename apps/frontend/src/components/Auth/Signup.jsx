// Signup.jsx
import React, { useState, useContext } from "react";
import { signup, login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import localspotlogo from "../../assets/images/localspotlogo.png";
import googleicon from "../../assets/images/googleicon.png";
import { AuthContext } from '../Auth/authContext/authContext';
import { GoogleAuthButton } from "./GoogleAuthButton"

export default function Signup() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { checkAuth } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await signup(email, password);
    setMessage(response.message || response.error);
    
    if (response.message) {
      const loginResponse = await login(email, password);
      if (loginResponse.token) {

        checkAuth();

        navigate("/dashboard2");
      } else {
        setMessage("Erreur lors de la connexion automatique.");
      }
    }
  };

  return (
    <div className="AuthPage">
      <div className="authcomponentcontainer">
        <div className="form-container">
          <img src={localspotlogo}/>
          <p className="t32">Créer votre compte</p>
          <p className="t6">Bienvenue ! Veuillez compléter les informations pour continuer.</p>
          <GoogleAuthButton />
          <div className="orcontainer">
            <div className="orhline"></div><p className="t6">ou</p><div className="orhline"></div>
          </div>
          
          <form className="emailPasswordForm" onSubmit={handleSignup}>
            <input 
              type="email" 
              placeholder="Adresse e-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder="Mot de passe" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {/* Message d'erreur avec transition fluide */}
            {/* {message && <p className="erreurMessage t6">Ceci est le message d'erreur qui arrive {message}</p>} */}

            <p className={`t6 errorMessage ${message ? "visible" : ""}`}>
              {message}
            </p>
            <button type="submit">Créer mon compte</button>
          </form>
        </div>
        <div className="row">
          <p className="t5">Vous avez déjà un compte ?</p>
          <a className="t4" href="/login">Se connecter</a>
        </div>
      </div>
    </div>
  );
}
