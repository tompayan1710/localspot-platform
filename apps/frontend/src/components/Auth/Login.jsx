// Login.jsx
import { useState, useContext, useEffect } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from '../Auth/authContext/authContext';
import localspotlogo from "../../assets/images/localspotlogo.png";
import ViarteLogo from "../../assets/images/ViarteLogo.png";
import arrowLeft from "../../assets/images/arrowLeft.png";
import { GoogleAuthButton } from "./GoogleAuthButton"
import Spinner from "../Spinner/Spinner"

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { checkAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password.length < 6) {
      setMessage("Veuillez rentrer un mot de passe de plus de 6 caractères");
      setLoading(false);
      setIsSuccess(false);
      return;
  }


    const response = await login(email, password);

    setLoading(false);

    if (response.success) {
        setIsSuccess(true);
        setMessage("Connexion réussie ✅");
        localStorage.setItem("jwtToken", response.token);
        setTimeout(() => {
            navigate("/profile");
            checkAuth();
          }, 1000);
    } else {
      setIsSuccess(false);
      setMessage(response.message || "Erreur de connexion.");
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      // ✅ Stocke le JWT dans localStorage
      localStorage.setItem("jwtToken", token);

      // ✅ Met à jour le contexte d'authentification
      checkAuth();

      // ✅ Redirige l'utilisateur là où il était
      navigate("/profile");
    }
  }, [navigate, checkAuth]);//Just to no have the warning, not necessari




  return (
    <div className="AuthPage">
      <div className="continueResearchContainer" onClick={() => {navigate("/scanpage")}}>
        <img src={arrowLeft}/>
        <p className="t6">revenir</p>
      </div>
      <div className="authcomponentcontainer">
        <div className="form-container">
          <img src={ViarteLogo} alt="localspot logo"/>

          {/* {myauthContext.isAuth ? "Connectééééé Contexte" : "Déconnecter Je suis une merde en code"}
          <p>{myauthContext.message}</p> */}
          <p className="t32">Connectez-vous</p>
          <p className="t6">Bienvenue ! Veuillez compléter les informations pour continuer.</p>
          <GoogleAuthButton />
          <div className="orcontainer">
            <div className="orhline"></div><p className="t6">ou</p><div className="orhline"></div>
          </div>
          
          {/* <form className="emailPasswordForm" onSubmit={handleSignup}> */}
          <form className="emailPasswordForm"  onSubmit={handleLogin}>
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
            {/* {message && <p className="erreurMessage t6">Ceci est le message d'erreur qui arrive {message}</p>} */}

            <p className={`t6 errorMessage ${isSuccess ? "succesColor" : "errorColor"} ${message ? "visible" : ""}`}>
              {message}
            </p>
            
            <button type="submit">
              {loading ? "Connexion en cours..." : "Se connecter"}
              {loading && <Spinner />}
            </button>
          </form>
        </div>
        <div className="row">
          <p className="t5">Vous n'avez pas de compte ?</p>
          <a className="t4" href="/signup">S'inscrire</a>
        </div>
      </div>
    </div>
  );
}
