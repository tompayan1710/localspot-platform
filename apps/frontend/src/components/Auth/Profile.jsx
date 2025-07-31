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
import templateOffer from "../../assets/images/templateOffer.png"
import yoga3 from "../../assets/images/yoga3.jpg"
import Cuisto from "../../assets/images/Cuisto.jpg"
import CalendarBorder from "../../assets/images/CalendarBorder.png"
import { useTranslation } from "react-i18next"; 

import { getOffersProvider } from "../../services/offers"
import FadeInImage from "../Utils/FadeInImage";
import { getProviderById } from "../../services/provider";

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();

 
  const { authState, logout, checkAuth } = useContext(AuthContext);
   
  const [providerOffers, setProviderOffers] = useState([]);
  const [providerInfo, setProviderInfo] = useState({});
  const [loading, setLoading] = useState(true);
  

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
  }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth




  
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
      <div className="profile-container">
        {/* <BottomNavBarNotAnimate key="annonces" activeTab={"profile"}/> */}
        <div className="principalcolumn">  
        {
        authState.user && (
          authState.user.provider_id ? (
            <div className="ProviderOrNormalContainer">
              <p className="t1">{t('Profile')}</p>
              <p className="t3">{t('(provider)')}</p>
            </div>
          ) : (
            <p className="t1">{t('profile')}</p>
          )
        )}

         
        {
          Object.keys(providerInfo).length > 0 && 
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
            <div className={`ProfilPictureContainer ${authState.user.profil_picture  ? "with-picture" : ""}`}>
              <FadeInImage src={authState.user.profil_picture ? authState.user.profil_picture : userIconRelief} alt="profil picture"/>
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
          {/* <div className="OfferListContainer">
            { providerOffers.length > 0 ? providerOffers.map((offer) => (
              <div key={offer.id} className="OfferListItem">
                <div className="OfferImageContainer"><img src={offer.image_urls[0]}/></div>
                <div className="columnInfoOffer">
                  <p className="t5">{offer.title}</p>
                  <p className="t6">{offer.description}</p>
                </div> 
              </div>
            )) : 
            <div className="NoOffersBig">
              <div className="NoOffersContainer">
                <div className="Illutrate"></div>
                <div className="Illutrate"></div>
                <div className="Illutrate"></div>
                <span className="BackgroundLinear"></span>
                <span className="PlusButton">
                  <img src={crossWhite} alt="cross white"/>
                </span>
              </div>
              <p className="t4">Aucune offre</p>
              <p className="t6">Chaque offre sera soumise à une évaluation afin de garantir un service de haute qualité.</p>
            </div>
            }
          </div>
            
          <button className="ProfileAddOffertContainer" onClick={() => {navigate("/create-offer")}}>
            Ajouter une offre
          </button> */}
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
          <div className="SettingsListContainer">
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
                    <div className="SettingsListItem" onClick={() => navigate("/booking-system")}>
                      <div className="SettingsRow">
                        <div className="RowFirst"><img src={CalendarBorder} alt="currenncy icon"/><p className="t4">Booking system</p></div>
                        <img src={arrowRight} alt="arrow right"/>
                      </div>
                      <div className="hline"></div>
                    </div>
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
      }
  </>
  );
}
