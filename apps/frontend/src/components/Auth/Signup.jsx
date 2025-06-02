// Signup.jsx
import React, { useState, useContext } from "react";
import { signup, login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import localspotlogo from "../../assets/images/localspotlogo.png";
import { AuthContext } from '../Auth/authContext/authContext';
import { GoogleAuthButton } from "./GoogleAuthButton"
import Spinner from "../Spinner/Spinner"
import arrowLeft from "../../assets/images/arrowLeft.png";


export default function Signup() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  const { checkAuth } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password.length < 6) {
      setMessage("Veuillez rentrer un mot de passe de plus de 6 caractères");
      setLoading(false);
      setIsSuccess(false);
      return;
  }


    const response = await signup(email, password);

    setIsSuccess(response.success)
    setMessage(response.message || response.error);
    
    if (response.message) {
      const loginResponse = await login(email, password);
      if (loginResponse.token) {

        checkAuth();

        navigate("/profile");
      } else {
        setMessage("Erreur lors de la connexion automatique.");
      }
    }
  };

  return (
    <div className="AuthPage">
      <div className="continueResearchContainer" onClick={() => {navigate("/scanpage")}}>
          <img src={arrowLeft}/>
          <p className="t6">revenir</p>
      </div>
      <div className="authcomponentcontainer">
        <div className="form-container">
          <img src={localspotlogo} alt="localspot logo"/>
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

            <p className={`t6 errorMessage ${isSuccess ? "succesColor" : "errorColor"} ${message ? "visible" : ""}`}>    
              {message}
            </p>
            <button type="submit">
              {loading ? "Création en cours..." : "Créer mon compte"}
              {loading && <Spinner />}
              </button>
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
