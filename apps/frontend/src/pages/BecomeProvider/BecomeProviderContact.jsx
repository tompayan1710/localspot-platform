// Profile.jsx
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BecomeProviderAddInfo.css";
import "./BecomeProviderContact.css";
import { AuthContext } from "../../components/Auth/authContext/authContext"
import Spinner from "../../components/Spinner/Spinner";

import arrowLeft from "../../assets/images/arrowLeft.png"
import crossiconBlack from "../../assets/images/crossiconBlack.png"
import galleryPhotosIcon from "../../assets/images/galleryPhotosIcon.png"

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



export default function BecomeProviderAddContact() {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);
  const location = useLocation();
  const {type, sizes, name, bio, logo_url} = location.state || {};
  
  const [etapeNum, setEtapeNum] = useState("1/3");
  const [value, setValue] = useState()

  const refNavigateButton = useRef(null);

  const [form, setform] = useState({
    email: "",
    website: "",
    instagram: "",
    facebook: "",
    moredetails: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setform((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  useEffect(() => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && !authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate("/login");
    }

    setTimeout(() => {
        if(refNavigateButton.current){
            refNavigateButton.current.classList.remove("hide");     // on lance la sortie
            refNavigateButton.current.classList.add("show");
        }
    },600)
  }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth
  


  const askBecomeProvider= async (e) => {
    //type, sizes, name, description, logo
    e.preventDefault();
    setIsLoading(true);
    const providerData = {
      name,
      bio,
      type,
      sizes,
      logo_url, // attention : c’est un File, faudra gérer ça
      email: form.email,
      tel: value,
      website: form.website,
      instagram: form.instagram,
      facebook: form.facebook,
      moredetails: form.moredetails,
      id_user: authState.user.id
    };
    try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(providerData)
      })

      if (!response.ok) {
        console.error("Erreur lors de la création du profil prestataire.");
      }

      const result = await response.json();

      if(result.success){
        console.log("✅ Prestataire enregistré :", result);
      }
      navigate("/profile");
    } catch (error) {
      console.error("Erreur API :", error);
    }

    setIsLoading(true);
  }

  if (authState.loading) {
    return <div className="SinnerTester"></div>;
  }

  return (
    <>
      {authState.loading ? <Spinner centerPage={true}/> :        
      <div className="BecomeProviderAll">
        <button className="CloseButton" onClick={() => navigate("/profile")}><img src={crossiconBlack}/></button>
        <div className="BecomeProviderEtape"><p className="t6"> {etapeNum}</p></div>
        <button className="GoBackButton" style={{opacity: "1"}} onClick={() => {console.log("BACK")}}><img src={arrowLeft}/><p className="t6">précédent</p></button>
        <div className="TopDivOpacity"></div>
        <div className="BecomeProviderPage2 And 3">
          <div className="titleContainer">
            <p className="t32">Vos informations de contact</p>
            <p className="t6">Ces coordonnées serviront à vous contacter pour faire suite à votre demande.</p>
          </div>
          <form onSubmit={(e) => askBecomeProvider(e)} className="PartnerForm">
            <label className="t4">Adresse email</label>
            <input
              name="email"
              className="InputText"
              value={form.email}
              onChange={handleChange}
              maxLength={30}
              required
            />

            <label className="t4">Numéro de téléphone</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
              defaultCountry="FR"
              required
            />

            <label className="t4">Site web</label>
            <input
              name="website"
              className="InputText"
              value={form.website}
              onChange={handleChange}
              maxLength={30}
            />

            <div className="rowSocialNetwork">
              <div>
                <label className="t4">Instagram</label>
                <input
                  name="instagram"
                  className="InputText"
                  value={form.instagram}
                  onChange={handleChange}
                  maxLength={30}
                />
              </div>
              <div>
                <label className="t4">Facebook</label>
                <input
                  name="facebook"
                  className="InputText"
                  value={form.facebook}
                  onChange={handleChange}
                  maxLength={30}
                />
              </div>
            </div>
            
            
            
                            
            <label className="t4">Détail à ajouter</label>
            <label className="t6">
                Précisez les éléments qui vous distinguent. Ces informations nous aideront à évaluer et valider votre demande.
            </label>
            
            <textarea
              name="moredetails"
              className="DescriptionInput"
              value={form.moredetails}
              onChange={handleChange}
              rows={8}
              maxLength={1000}
            />
            <p className={`${form.moredetails.length==1000 ? "error" : ""} RightInfo t6`}>{form.moredetails ? form.moredetails.length : "0"}/1000</p>
            <button type="submit" className="ContinueButton">{isLoading ? <Spinner /> :  "Envoyer ma demande"}</button>
          </form>
        </div>
      </div>
      }
  </>
  );
}


/*
 <PhoneInput
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
            defaultCountry="FR"
          />
          */
