// Profile.jsx
import { useEffect, useContext, useState } from "react";
import { deleteAccount } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "./authContext/authContext"
import Spinner from "../Spinner/Spinner";
import BottomNavBar from "../BottomNavBar/BottomNavBar";
import BottomNavBarNotAnimate from "../BottomNavBar/BottomNavBarNotAnimate";
import userIconRelief from "../../assets/images/userIconRelief.png"
import arrowRight from "../../assets/images/arrowRight.png"
import userIconBlackline from "../../assets/images/userIconBlackline.png"
import logOutIcon from "../../assets/images/logOutIcon.png"
import global from "../../assets/images/global.png"
import parametres from "../../assets/images/parametres.png"
import EuroIcon from "../../assets/images/EuroIcon.png"
import CreditCard from "../../assets/images/CreditCard.png"
import Nice from "../../assets/images/Nice.avif"
import crossWhite from "../../assets/images/crossWhite.png"
import files from "../../assets/images/files.png"
import yoga3 from "../../assets/images/yoga3.jpg"
import Cuisto from "../../assets/images/Cuisto.jpg"
import { useTranslation } from "react-i18next";

import { getOffersProvider } from "../../services/offers"

export default function Profile() {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const { authState, logout } = useContext(AuthContext);
   
  const [providerOffers, setProviderOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  

  const getOfferOfProvider = async (provider_id) => {
    const data = await getOffersProvider(provider_id);
    if(data.success){        
      console.warn(data.offers);
      setProviderOffers(data.offers);
    }
    setLoading(false);
  }
  

    
  useEffect(() => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && !authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate("/login");
    }

    if (authState.user?.provider_id && authState.user?.provider?.is_validated) {
      getOfferOfProvider(authState.user.provider_id);
    }  
  }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth




  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = () => {
    deleteAccount();
    navigate("/login");
  }


  

  if (authState.loading) {
    return <div className="SinnerTester"></div>;
  }

  return (
    <>
      {authState.loading ? <Spinner centerPage={true}/> : 
      <div className="profile-container">
        <BottomNavBarNotAnimate/>
        <div className="principalcolumn">   
        {authState.user.provider_id ?
          <div className="ProviderOrNormalContainer">
            <p className="t1">{t('Profile')}</p>
            <p className="t3">{t('(provider)')}</p>
          </div>
          :
          <p className="t1">{t('profile')}</p>
        }
        
        <div className="ProfileEditContainer" onClick={() => navigate("/edit-profile")}>
        <div>
          <div className="ProfilPictureContainer">
            <img src={userIconRelief} alt="profil picture"/>
          </div>
          <div className="ColumnName">
            <p className="t4">{authState.user.first_name ? t(authState.user.first_name) : t('User')}</p>
            <p className="t6">Show profile</p>
          </div>
        </div>
        <img src={arrowRight} alt="arrow right"/>
      </div>
      <div className="hline"></div>
      {authState.user.provider_id ? (
        authState.user.provider?.is_validated ? (
          <>
          <div className="OfferListContainer">
            { providerOffers ? providerOffers.map((offer) => (
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
                {/* <img src={files} alt="files"/> */}
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
          </button>
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
                <img src={yoga3} alt="yoga photo"/>
                <img src={Cuisto} alt="cuisto photo"/>
              </div>
              <p className="t4">Devenir prestataire</p>
              <p className="t6">Votre demande sera traitée sous 24h et notre réponse vous sera rapidement communiquée.</p>
            </div>
        <button className="BecomeProviderButton" onClick={() => {navigate("/become-provider")}}>
            Devenir prestataire
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
            <div className="SettingsListItem" onClick={() => navigate("/edit-language")}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={global} alt="global icon"/><p className="t4">Languages</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
            <div className="SettingsListItem" onClick={() => navigate("/edit-language")}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={EuroIcon} alt="currenncy icon"/><p className="t4">Currency</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
            <div className="SettingsListItem" onClick={() => navigate("/edit-language")}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={CreditCard} alt="credit card icon"/><p className="t4">Payement methods</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
            <div className="SettingsListItem" onClick={handleLogout}>
              <div className="SettingsRow">
                <div className="RowFirst"><img src={logOutIcon} alt="log out icon"/><p className="t4">Log out</p></div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
            </div>
          </div>
          
          <button className="logout-button" onClick={handleDelete}>Supprimer le compte</button>
        </div>
      </div>
      }
  </>
  );
}
