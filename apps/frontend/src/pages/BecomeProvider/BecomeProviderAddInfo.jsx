// Profile.jsx
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BecomeProviderAddInfo.css";
import { AuthContext } from "../../components/Auth/authContext/authContext"
import Spinner from "../../components/Spinner/Spinner";
import arrowLeft from "../../assets/images/arrowLeft.png"
import crossiconBlack from "../../assets/images/crossiconBlack.png"
import galleryPhotosIcon from "../../assets/images/galleryPhotosIcon.png"
import userIconRelief from "../../assets/images/userIconRelief.png"
import trashicon from "../../assets/images/trashicon.png"
 
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



export default function BecomeProviderAddInfo() {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);
  const location = useLocation();
  const { type, sizes } = location.state || {};
  
  const [etapeNum, setEtapeNum] = useState("1/3");
  const [value, setValue] = useState()

  const refNavigateButton = useRef(null);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  const [form, setform] = useState({
    name: "",
    bio: "",
    logo: "",
  })
  const [errorLogo, setErrorLogo] = useState("");
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
  

  const [SelectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setform((prev) => ({
        ...prev,
        logo: file,
        }));
    }

    setTimeout(() => {
      if(previewRef.current){
        previewRef.current.scrollIntoView({behavior: "smooth", block: "center"})
      }
    }, 200)
    };



  const handleRemoveFile = (e) => {
      e.stopPropagation(); // ✅ bonne écriture
      setform((prev) => ({
        ...prev,
        logo: ""
      }))
      setSelectedFiles(null);
    };




const uploadImage = async (e) => {
  e.preventDefault(); 
  setIsLoading(true);

  if(form.name.length==0){
    setIsLoading(false);
    alert("Veuillez fournir un nom de prestaaire.");
    return;
  }
  if(form.bio.length==0){
    setIsLoading(false);
    alert("Veuillez fournir une courte biographie de votre(vos) prestation(s).");
    return;
  }

  let logo_url="";

  if(form.logo){
    const uploadFormData = new FormData();
    uploadFormData.append("image", form.logo); // NOM du champ = "image"
    uploadFormData.append("offerId", "logo"); // ou un ID si tu en as un

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/provider/upload-provider-image`, {
        method: "POST",
        body: uploadFormData,
      });

      const data = await response.json();

      if (!data.success) {
        console.error("❌ Erreur serveur :", data.message);
        setErrorLogo("Erreur serveur lors de l'upload.");
        return;
      }

      console.log("✅ URL de l'image :", data.url); // 👈 url retournée
      // Tu peux l'enregistrer dans le state :
      // setImageUrl(data.url);
      logo_url= data.url
    } catch (err) {
      console.error("❌ Erreur réseau :", err);
      setErrorLogo("Erreur réseau lors de l’upload.");
    } finally {
      setIsLoading(false);
    }
  }

  navigate("/become-provider/add-contact", {
    state: {
      type:  type,
      sizes: sizes,
      name: form.name,
      bio: form.bio,
      logo_url: logo_url,
    }
  })
};


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
        <div className="BecomeProviderPage2">
            <div className="titleContainer">
                <p className="t32">Votre profile de prestataire</p>
                <p className="t6">Fournissez une présentation claire de votre activité pour faciliter son évaluation.</p>
            </div>
            <div className="PreviewContainer">
              <div className="PreviewImageBigContainer" ref={previewRef} onClick={() => fileInputRef.current.click()}>
                  <img style={{cursor: "pointer"}} src={userIconRelief} alt="user icon relier"/>
                  {form.logo ?
                  <div className={`PreviewImageContainer`}>
                      <img
                      src={URL.createObjectURL(form.logo)}
                      alt="Aperçu du logo"
                      className="PreviewImage"
                      style={{cursor: "pointer"}}
                      />
                      <button type="button" onClick={(e) => handleRemoveFile(e)}>
                        <img src={trashicon} alt="trash icon"/>
                      </button>
                  </div>
                  : <></>
                  }
                 {/* ✅ input caché ici */}
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                </div>
                {form.name 
                    ? <p className="t32">{form.name}</p>
                    : <div className="PreviewTitle"></div>
                }
                {form.bio 
                    ? <p className="t6">{form.bio}</p>
                    : <div className="PreviewBio"></div>
                }
            </div>
            <form onSubmit={(e) => uploadImage(e)} className="PartnerForm">

                {/* <div className="hlinePartner"></div> */}
                


                <label className="t4">Nom</label>
                <input
                    name="name"
                    className="InputText"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={30}
                />
                <p className={`${form.name.length >0 ? "" : "error"} RightInfo t6`}>{form.name ? form.name.length : "0"}/30</p>


                
                <label className="t4">Ajoutez une courte biographie</label>
                {/* <label className="t6">Décrivez ce que vous proposez, et ce qui rend vos expériences uniques pour les voyageurs.</label> */}
                {/* Parlez-nous de vous et de ce qui rend votre activité unique. */}
                {/* Je suis guide local depuis 5 ans et j’adore faire découvrir ma région à travers des balades culturelles et gourmandes. */}


                <textarea
                    name="bio"
                    className="DescriptionInput"
                    value={form.bio}
                    onChange={handleChange}
                    rows={5}
                    maxLength={200}
                />
                <p className={`${form.bio.length >0 ? "" : "error"} RightInfo t6`}>{form.bio ? form.bio.length : "0"}/200</p>

                <div className="row" style={{marginTop: "15px"}}><label className="t4">Importer un logo</label><label className="t6">(facultatif)</label></div>
                <label className="CreateOfferAddPhotos">
                    <img src={galleryPhotosIcon} />
                    <p className="t5">Ajouter une photo</p>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange} // fonction pour gérer les images
                    />
                </label>
                <div className="ErrorContainer">
                  <p className="leftError t6">{errorLogo ? errorLogo : ""}</p>
                </div>
                <button type="submit" className="ContinueButton">{isLoading ? <Spinner /> :  "Ajouter mes informations"}</button>
            </form>
        </div>

      </div>
      }
  </>
  );
}


