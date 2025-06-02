// Profile.jsx
import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./BecomeProviderAddInfo.css";
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

  
  const [etapeNum, setEtapeNum] = useState("1/3");
  const [value, setValue] = useState()

  const refNavigateButton = useRef(null);

  const [form, setform] = useState({
    title: "",
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
    setSelectedFiles([...e.target.files]);
    console.log("Images sélectionnées :", e.target.files);
  };

  const handleRemoveFile = (indexToRemove) => {
      setSelectedFiles(null);
    };

  const submit = (e) => {
    e.preventDefault();
    navigate("/become-provider/add-contact")
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
