// Profile.jsx
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BecomeProviderAddInfo.css";
import { AuthContext } from "../../components/Auth/authContext/authContext"
import Spinner from "../../components/Spinner/Spinner";

import arrowLeft from "../../assets/images/arrowLeft.png"
import crossiconBlack from "../../assets/images/crossiconBlack.png"
import galleryPhotosIcon from "../../assets/images/galleryPhotosIcon.png"
import userIconRelief from "../../assets/images/userIconRelief.png"

import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'



export default function BecomeProviderAddInfo() {
  const navigate = useNavigate();
  const { authState, logout } = useContext(AuthContext);

  
  const [etapeNum, setEtapeNum] = useState("1/3");
  const [value, setValue] = useState()

  const refNavigateButton = useRef(null);

  const [form, setform] = useState({
    name: "",
    description: "",
    logo: "",
  })

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
    };



  const handleRemoveFile = () => {
      setform((prev) => ({
        ...prev,
        logo: ""
      }))
      setSelectedFiles(null);
    };

  const submit = (e) => {
    e.preventDefault();
    navigate("/become-provider/add-contact", {
        state: {
            name: form.name,
            description: form.description,
            logo: form.logo
        }
    })
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
        <div className="BecomeProviderPage2">
            <div className="titleContainer">
                <p className="t32">Information sur votre entreprise</p>
                <p className="t5">Ajouter les caractéristiques principales</p>
            </div>
            <div className="PreviewContainer">
                <img src={userIconRelief}/>
                {form.name 
                    ? <p className="t4">{form.name}</p>
                    : <div className="PreviewTitle"></div>
                }
                {form.description 
                    ? <p className="t4">{form.description}</p>
                    : <div className="PreviewDescription"></div>
                }
            </div>
            <form onSubmit={(e) => submit(e)} className="PartnerForm">

                {/* <div className="hlinePartner"></div> */}
                


                <label className="t4">Nom (public)</label>
                <label className="t6">Ce nom sera affiché publiquement sur vos offres</label>
                <input
                    name="name"
                    className="InputText"
                    value={form.name}
                    onChange={handleChange}
                />

                
                <label className="t4">Écrivez une courte biographie</label>
                <label className="t6">Décrivez ce que vous proposez, et ce qui rend vos expériences uniques pour les voyageurs.</label>
                {/* Parlez-nous de vous et de ce qui rend votre activité unique. */}
                {/* Je suis guide local depuis 5 ans et j’adore faire découvrir ma région à travers des balades culturelles et gourmandes. */}


                <textarea
                    name="description"
                    className="DescriptionInput"
                    value={form.description}
                    onChange={handleChange}
                    rows={5}
                />
                <p className="RightInfo t6">{form.description ? form.description.length : "0"}/200</p>

                <div className="row"><label className="t4">Ajoutez un logo</label><label className="t6">(facultatif)</label></div>
                <label className="t6">Il sera visible par vos clients lors des réservations. Pour un meilleur rendu, privilégiez un d'une taille supérieur à 40 px de hauteur.</label>
                <label className="CreateOfferAddPhotos">
                    <img src={galleryPhotosIcon} />
                    <p className="t5">Ajouter des photos</p>
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange} // fonction pour gérer les images
                    />
                </label>
                {form.logo && (
                <div className="PreviewImageContainer">
                    <img
                    src={URL.createObjectURL(form.logo)}
                    alt="Aperçu du logo"
                    className="PreviewImage"
                    />
                    <button type="button" onClick={handleRemoveFile}>Supprimer</button>
                </div>
                )}

                <button type="submit" className="NavigateButton" ref={refNavigateButton} >Ajouter mes informations</button>

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
