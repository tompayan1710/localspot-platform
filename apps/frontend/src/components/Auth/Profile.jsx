// Profile.jsx
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "./authContext/authContext"
import Spinner from "../Spinner/Spinner";
import userIconRelief from "../../assets/images/userIconRelief.png"
import arrowRight from "../../assets/images/arrowRight.png"
import logOutIcon from "../../assets/images/logOutIcon.png"
import global from "../../assets/images/global.png"
import parametres from "../../assets/images/parametres.png"
import EuroIcon from "../../assets/images/EuroIcon.png"
import CreditCard from "../../assets/images/CreditCard.png"
import Calendar from "../../assets/images/Calendar.png"
import crossWhite from "../../assets/images/crossWhite.png"
import NiceIntro1 from "../../assets/images/NiceIntro1.png"
import NiceIntro2 from "../../assets/images/NiceIntro2.png"
import clockIcon from "../../assets/images/clockIcon.png"
import profilPicture from "../../assets/images/profilPictureFemal.png"
import templateOffer from "../../assets/images/templateOffer.png"
import yoga3 from "../../assets/images/yoga3.jpg"
import Cuisto from "../../assets/images/Cuisto.jpg"
import CalendarBorder from "../../assets/images/CalendarBorder.png"
import Switch from "../../assets/images/Switch.png"
import Kayak from "../../assets/images/Kayak.jpg"
import { useTranslation } from "react-i18next"; 
import { useLocation } from "react-router-dom"

import { getOffersProvider } from "../../services/offers"
import FadeInImage from "../Utils/FadeInImage";
import { getProviderById } from "../../services/provider";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();

 
  const { authState, logout, checkAuth } = useContext(AuthContext);
   
  const [providerOffers, setProviderOffers] = useState([]);
  const [providerInfo, setProviderInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const MODE_KEY = "userMode"; // Valeur : "voyageur" ou "provider"
  const [selectedMode, setSelectedMode] = useState(() => {
    const stored = localStorage.getItem(MODE_KEY);
    return stored === "provider" ? "provider" : "voyageur"; // fallback = voyageur
  });

  const toggleMode = () => {
    const newMode = selectedMode === "provider" ? "voyageur" : "provider";
    setSelectedMode(newMode);
    localStorage.setItem(MODE_KEY, newMode);

    // ✅ Forcer la propagation comme si c'était un autre onglet
    window.dispatchEvent(new Event("storage"));
  };



  const getOfferOfProvider = async (provider_id) => {
    const data = await getOffersProvider(provider_id);
    if(data.success){        
      console.warn(data.offers);
      setProviderOffers(data.offers);
    }
    setLoading(false);
  }

  const getProviderInfo = async (provider_id) => {
    const data = await getProviderById(provider_id);
    console.error(data)
    if(data.success){        
      console.warn(data.provider);
      setProviderInfo(data.provider);
    }
    setLoading(false);
  }

  useEffect(() => {
    console.error("Provider Info");
    console.error(providerInfo);
  }, [providerInfo])
  
  useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");


        if (token) {
        // ✅ Stocke le JWT dans localStorage
        console.warn("Il y a un token de : ", token);
        localStorage.setItem("jwtToken", token);

        // ✅ Met à jour le contexte d'authentification
        checkAuth();

        // ✅ Redirige l'utilisateur là où il était
        // navigate(`/profile`);
        }
    }, []);//Just to no have the warning, not necessari
    
  useEffect(() => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && !authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate("/login", {
        replace: true,
        state: {
          origin: "/", 
          scrollTo: ""
        }
      });
    }

    if (authState.user?.provider_id && authState.user?.provider?.is_validated) {
      getOfferOfProvider(authState.user.provider_id);
      getProviderInfo(authState.user?.provider_id);
    }  
  }, [authState.loading, authState.isAuth, navigate, location.search]); // ✅ Suivre loading et isAuth




  
  const handleLogout = () => {
    logout();
    navigate("/login", 
      {
        replace: true,
      }
    );
  };



  

  if (authState.loading) {
    return <div className="SinnerTester"></div>;
  }

  return (
    <>
      {authState.loading ? <Spinner centerPage={true}/> : 
      <>
      {/* {
        authState.user && (
          authState.user.provider_id && (
            <>
              <div className="row ModeButtonContainer">
                <button className={`ButtonMode ${selectedMode === 1 ? "selected" : ""}`}
                onClick={() => setSelectedMode(1)}>
                  <p className="t5">Prestataire</p>
                </button>
                <button className={`ButtonMode ${selectedMode === 2 ? "selected" : ""}`}
                onClick={() => setSelectedMode(2)}>
                  <p className="t5">Voyageur</p>
                </button>
              </div>
            </>
          )
        )} */}
      {
        authState.user?.provider_id && authState.user?.provider?.is_validated &&(
          <button className="ModeButton" onClick={toggleMode}>
            <img src={Switch} alt="Switch" />
            <p className="t5">
              {selectedMode === "provider"
                ? "Basculer en mode voyageur"
                : "Basculer en mode prestataire"}
            </p>
          </button>
        )
      }
      <div
            className={`
              profile-container ${authState.user?.provider_id && 
                authState.user?.provider?.is_validated ? "increase" : ""}`}
      >
        
        {/* <BottomNavBarNotAnimate key="annonces" activeTab={"profile"}/> */}
        <div className="principalcolumn">  
        {
        authState.user && (
          authState.user.provider_id && authState.user?.provider?.is_validated ? (
            <>
            {/* <div className="row ModeButtonContainer">
              <button className="ButtonMode">
                <p className="t5">Prestataire</p>
              </button>
              <button className="ButtonMode">
                <p className="t5">Voyageur</p>
              </button>
            </div> */}
            <div className="ProviderOrNormalContainer">
              {selectedMode === "provider" ? 
                <p className="t2">{t('Espace Prestataire')}</p>
                :
                <p className="t1">{t('Profile')}</p>
              }
              {/* <p className="t3">
                {selectedMode === "provider" ? t('prestataire') : t('voyageur')}
              </p> */}
            </div>

            </>
          ) : (
            <p className="t1">{t('profile')}</p>
          )
        )}

         
        {
          selectedMode === "provider" && Object.keys(providerInfo).length > 0 && 
          <div className="ProfileEditContainer">
            <div>
              <div className={`ProfilPictureContainer ${providerInfo?.logo_url  ? "with-picture" : ""}`}>
                <FadeInImage src={providerInfo?.logo_url ? providerInfo?.logo_url : userIconRelief} alt="profil picture"/>
              </div>
              {
                
              }
              <div className="ColumnName">
                <p className="t4">{providerInfo?.name ? providerInfo?.name : authState.user?.first_name ? t(authState.user?.first_name) : t('User')}</p>            </div>
            </div>
          </div>
        }
       <div className="ProfileEditContainer" onClick={() => navigate("/edit-profile")}>
          <div>
            <div className={`ProfilPictureContainer ${authState?.user?.profil_picture  ? "with-picture" : ""}`}>
              <FadeInImage src={authState?.user?.profil_picture ? authState?.user?.profil_picture : userIconRelief} alt="profil picture"/>
            </div>
            {
              
            }
            <div className="ColumnName">
              <p className="t4">{authState.user?.name ? authState.user?.name : t('Compte personnel')}</p>
              <p className="t6">Voir le profile</p>
            </div>
          </div>
        <img src={arrowRight} alt="arrow right"/>
      </div>
      <div className="hline"></div>
      {authState.user?.provider_id ? (
        authState.user?.provider?.is_validated ? (
          <>
          {
            selectedMode === "provider" ?
            <>
            <div className="BecomProviderBig">
              <div className="BecomProviderContainer">
                <FadeInImage src={providerOffers[0]?.image_urls[1] ? providerOffers[0]?.image_urls[1] : templateOffer} alt="template photo"/>
                <FadeInImage src={providerOffers[0]?.image_urls[0] ? providerOffers[0]?.image_urls[0] : templateOffer} alt="template photo"/>
              </div>
              {/* <p className="t4">Mes annonces</p> */}
              <p className="t6">Gérez facilement vos activités, suivez vos réservations et mettez à jour vos offres en temps réel.</p>
            </div>
          <button className="whiteButton" onClick={() => {navigate("/annonces")}}>
              <p className="t5">Voir mes annonces</p>
          </button>
          </>
          : 
          <>
          <div className="BecomProviderBig">
              <div className="PhotoCommentContainer">
                <FadeInImage src={Kayak} alt="template photo"/>
                <div className="Comment">
                  <img className="profilPicture" src={profilPicture} alt="profilPicture"/>
                  <div className="row time">
                    <img src={clockIcon} alt="clock icon"/>
                    <p className="t6">1 mois</p>
                  </div>
                  <p className="t6">Camille a un cours prévu<br></br> ce week-end</p>
                </div>
              </div>

              {/* <p className="t4">Mes annonces</p> */}
              {/* <p className="t6">Gérez facilement vos activités, suivez vos réservations et mettez à jour vos offres en temps réel.</p> */}
              <p className="t6">Découvrez les meilleures activités autour de vous, en toute simplicité.</p>
            </div>
          <button className="whiteButton" onClick={() => {navigate("/annonces")}}>
              <p className="t5">Recherchez des annonces</p>
          </button>
          </>
          }
        </>
      ) : (
      <p className="t32 IsValidateMessage">
        Votre profil prestataire est en cours de validation. Vous serez notifié dès son activation
      </p>
      ))
      :
      <>
       <div className="BecomProviderBig">
              <div className="BecomProviderContainer">
                <FadeInImage src={yoga3} alt="yoga photo"/>
                <FadeInImage src={Cuisto} alt="cuisto photo"/>
              </div>
              <p className="t4">Devenir prestataire</p>
              <p className="t6">Votre demande sera traitée sous 24h et notre réponse vous sera rapidement communiquée.</p>
            </div>
        <button className="BecomeProviderButton" onClick={() => {navigate("/become-provider")}}>
            <p className="t6">Devenir prestataire</p>
        </button>
      </>
    }

          <div className="hline"></div> 
          <p className="t3">Settings</p>
          <div
            className={`
              SettingsListContainer ${authState.user?.provider_id && 
                authState.user?.provider?.is_validated ? "increase" : ""}`
              }
          >

            <div className="SettingsListItem" onClick={() => navigate("/settings")}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={parametres} alt="settings icon"/><p className="t4">Account settings</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
            <div className="SettingsListItem" onClick={() => navigate("/edit-language", {
              state: {
                origin: "/profile", 
                scrollTo: ""
              }
            })}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={global} alt="global icon"/><p className="t4">Languages</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
            <div className="SettingsListItem" onClick={() => navigate("/currency")}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={EuroIcon} alt="currenncy icon"/><p className="t4">Currency</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
            {
              authState.user?.provider_id && (
                authState.user?.provider?.is_validated && (
                  <>
                    {selectedMode === "provider" &&
                      <div className="SettingsListItem" onClick={() => navigate("/booking-system")}>
                        <div className="SettingsRow">
                          <div className="RowFirst"><img src={CalendarBorder} alt="currenncy icon"/><p className="t4">Booking system</p></div>
                          <img src={arrowRight} alt="arrow right"/>
                        </div>
                        <div className="hline"></div>
                      </div>
                    }
                    <div className="SettingsListItem" onClick={() => navigate("/payment-methode")}>
                      <div className="SettingsRow">
                        <div className="RowFirst"><img src={CreditCard} alt="credit card icon"/><p className="t4">Payment methods</p></div>
                        <img src={arrowRight} alt="arrow right"/>
                      </div>
                      <div className="hline"></div>
                    </div> 
                  </>
                )
              )
            }
            <div className="SettingsListItem" onClick={handleLogout}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={logOutIcon} alt="log out icon"/><p className="t4">Log out</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
          </div>
        </div>
      </div>
      </>
      }
  </>
  );
}
