// Profile.jsx
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import { AuthContext } from "../authContext/authContext"
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-number-input'

import Spinner from "../../Spinner/Spinner";

import arrowLeft from "../../../assets/images/arrowLeft.png"
import Nice from "../../../assets/images/Nice.avif"
import editPenIcon from "../../../assets/images/editPenIcon.png"
import SaveIconFillWhite from "../../../assets/images/SaveIconFillWhite.png"
import GoBack from "../../GoBack/GoBack";

export default function EditProfil() {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const { authState, logout } = useContext(AuthContext);

  const [form, setform] = useState({
    name: "",
    bio: "",
    logo: "",
    tel: ""
  })
  const [value, setValue] = useState()

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
  }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth


  if (authState.loading) {
    return <Spinner centerPage={true} />;
  }

  return (
    <>
      {authState.loading ? <Spinner centerPage={true}/> : 
      <div className="EditProfilContainer">
        <GoBack nagigation={"/profile"} text={"revenir"}/>
        <button className="GoBackButton" style={{opacity: "1"}} onClick={() => navigate("/profile")}><img src={arrowLeft}/><p className="t6">revenir</p></button>
        <p className="t2">{t('editprofil')}</p> 
        <div className="ImageContainer">
            <img src={Nice} alt="profil picture"/>
            <button><img src={editPenIcon}/></button>
        </div>
        <div className="ListInformation">
            <form>
                <label className="t4">Nom</label>
                <input
                    name="name"
                    className="InputText"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={30}
                />


                
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

                <label className="t4">Phone number</label>
                <input
                    name="number"
                    className="InputText"
                    value={form.name}
                    onChange={handleChange}
                    maxLength={30}
                />
                <label className="t4">Numéro de téléphone</label>
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
              defaultCountry="FR"
              required
            />


                <button className="SaveButton"><img src={SaveIconFillWhite}/><p>Enregistrer</p></button>
            </form>
        </div>
      </div>
      }
  </>
  );
}
