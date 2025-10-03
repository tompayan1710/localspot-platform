// Login.jsx
import { useState, useContext, useEffect } from "react";
import { login } from "../../services/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "./styles.css";
import { AuthContext } from '../Auth/authContext/authContext';
import ViarteLogo from "../../assets/images/ViarteLogo.png";
import { GoogleAuthButton } from "./GoogleAuthButton"
import Spinner from "../Spinner/Spinner"
import GoBack from "../GoBack/GoBack";
import FadeInImage from "../Utils/FadeInImage";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {t, i18n} = useTranslation();
  const location = useLocation();
  const scrollTo = location.state?.scrollTo || undefined;
  const origin = location.state?.origin || "/"; 
  const options = scrollTo ? { state: { scrollTo } } : undefined;

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
          checkAuth();

          setTimeout(() => {
            navigate("/profile", {
              replace: true
            });
          }, 300);

            // checkAuth();
          }, 300);
        // setTimeout(() => {
        //   navigate(`/profile?token=${response.token}`);
        // }, 300);
    } else {
      setIsSuccess(false);
      setMessage(response.message || "Erreur de connexion.");
    }
  };

  // useEffect(() => {
  //   console.warn("Je suis dans LOGIN")
  //   const queryParams = new URLSearchParams(window.location.search);
  //   const token = queryParams.get("token");

  //   if (token) {
  //     // ✅ Stocke le JWT dans localStorage
  //     localStorage.setItem("jwtToken", token);

  //     // ✅ Met à jour le contexte d'authentification
  //     checkAuth();

  //     // ✅ Redirige l'utilisateur là où il était
  //     navigate(`/profile`);
  //   }
  // }, [navigate, checkAuth]);//Just to no have the warning, not necessari




  return (
    <div className="AuthPage">
      <GoBack nagigation={`${origin}`} scrollTo={`${options}`} text={t("back")}/>
      <div className="authcomponentcontainer">
        <div className="form-container">
          <div className="ImageWrapper">
            <FadeInImage className="LogoImage" src={ViarteLogo} alt="localspot logo"/>
          </div>

          {/* {myauthContext.isAuth ? "Connectééééé Contexte" : "Déconnecter Je suis une merde en code"}
          <p>{myauthContext.message}</p> */}
          <p className="t32">{t("Login_Title")}</p>
          <p className="t6">{t("Login_Subtitle")}</p>
          <GoogleAuthButton redirectRoute={`/profile`}/>
          <div className="orcontainer">
            <div className="orhline"></div><p className="t6">{t("or")}</p><div className="orhline"></div>
          </div>
          
          {/* <form className="emailPasswordForm" onSubmit={handleSignup}> */}
          <form className="emailPasswordForm"  onSubmit={handleLogin}>
            <input 
              type="email" 
              placeholder={t("Email_address")}
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input 
              type="password" 
              placeholder={t("Password")}
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
            {/* {message && <p className="erreurMessage t6">Ceci est le message d'erreur qui arrive {message}</p>} */}

            <p className={`t6 errorMessage ${isSuccess ? "succesColor" : "errorColor"} ${message ? "visible" : ""}`}>
              {message}
            </p>
            
            <button type="submit" className="submitbutton">
              <p className="t5">{loading ? t("Login_in_progress") : t("Login_button")}</p>
              {loading && <Spinner />}
            </button>
          </form>
        </div>
        <div className="row">
          <p className="t5">{t("No_account")}</p>
          <a className="t4" href="/signup">{t("Signup_link")}</a>
        </div>
      </div>
    </div>
  );
}
