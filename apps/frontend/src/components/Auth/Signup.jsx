// Signup.jsx
import { useState, useContext } from "react";
import { signup, login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import ViarteLogo from "../../assets/images/ViarteLogo.png";
import { AuthContext } from '../Auth/authContext/authContext';
import { GoogleAuthButton } from "./GoogleAuthButton"
import Spinner from "../Spinner/Spinner"
import GoBack from "../GoBack/GoBack";
import FadeInImage from "../Utils/FadeInImage";
import { useTranslation } from "react-i18next";


export default function Signup() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {t, i18n} = useTranslation();
  const navigate = useNavigate();

  const { checkAuth } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password.length < 6) {
      setMessage(t("Signup_error_six"));
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

        setTimeout(() => {
          checkAuth();

          setTimeout(() => {
            navigate("/profile", {
              replace: true
            });
          }, 300);

            // checkAuth();
          }, 300);
      } else {
        setMessage(t("Signup_error"));
      }
    }
  };

  return (
    <div className="AuthPage">
      <GoBack nagigation={`/`} scrollTo={""} text={"back"}/>
      <div className="authcomponentcontainer">
        <div className="form-container">
          <div className="ImageWrapper">
            <FadeInImage className="LogoImage" src={ViarteLogo} alt="localspot logo"/>
          </div>
          <p className="t32">{t("Signup_button")}</p>
          <p className="t6">{t("Signup_Subtitle")}</p>
          <GoogleAuthButton />
          <div className="orcontainer">
            <div className="orhline"></div><p className="t6">{t("or")}</p><div className="orhline"></div>
          </div>
          
          <form className="emailPasswordForm" onSubmit={handleSignup}>
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
            {/* Message d'erreur avec transition fluide */}
            {/* {message && <p className="erreurMessage t6">Ceci est le message d'erreur qui arrive {message}</p>} */}

            <p className={`t6 errorMessage ${isSuccess ? "succesColor" : "errorColor"} ${message ? "visible" : ""}`}>    
              {message}
            </p>
            <button type="submit" className="submitbutton">
              <p className="t5">{loading ? t("Signup_in_progress") : t("Signup_button")}</p>
              {loading && <Spinner />}
            </button>
          </form>
        </div>
        <div className="row">
          <p className="t5">{t("Have_account")}</p>
          <a className="t4" href="/login">{t("Login_link")}</a>
        </div>
      </div>
    </div>
  );
}
