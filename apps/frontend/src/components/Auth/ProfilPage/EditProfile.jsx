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
import userIconRelief from "../../../assets/images/userIconRelief.png"
import editPenIcon from "../../../assets/images/editPenIcon.png"
import SaveIconFillWhite from "../../../assets/images/SaveIconFillWhite.png"
import GoBack from "../../GoBack/GoBack";

export default function EditProfil() {
  const navigate = useNavigate();
  const { t } = useTranslation();


  const { authState, updateUser } = useContext(AuthContext);

  console.log(authState)
  const [form, setform] = useState({
    name: authState.user?.name || "",
    // email: authState.user?.email || "",
    phone: authState.user?.phone || "",
    // bio: "",
    profil_picture: authState.user?.profil_picture || ""
  });

  useEffect(() => {
    setform({
      name: authState.user?.name || "",
      // email: authState.user?.email || "",
      phone: authState.user?.phone || "",
      profil_picture: authState.user?.profil_picture || ""
      // bio: "",
    })
  }, [authState])


  const handleChange = (e) => {
    const { name, value } = e.target;

    setform((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {};

    if (form.name !== authState.user.name) {
      updates.name = form.name.trim() === "" ? null : form.name.trim();
    }

    if (form.phone !== authState.user.phone) {
      updates.phone = form.phone?.trim() === "" ? null : form.phone?.trim();
    }

    if (Object.keys(updates).length === 0 && !form.profil_picture) {
      alert("Aucune modification détectée.");
      return;
    }

    const formData = new FormData();
    formData.append("user_id", authState.user.id);
    formData.append("fieldsToUpdate", JSON.stringify(updates));

    if (form.profil_picture) {
      formData.append("profil_picture", form.profil_picture); // 👈 ici on met le fichier
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/update-profile`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authState.token}`, // PAS de content-type ici !
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profil mis à jour !");
        updateUser(data); 
      } else {
        alert(data.message || "Erreur lors de la mise à jour.");
      }
    } catch (err) {
      console.error("Erreur :", err);
      alert("Erreur serveur.");
    }
  };


    
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

  const getConnexionMethod = () => {
    const provider = authState.user?.provider || "email";

    switch (provider) {
      case "google":
        return "Google";
      case "password-email":
      default:
        return "email";
    }
  };


  return (
    <>
      {authState.loading ? <Spinner centerPage={true}/> : 
      <div className="EditProfilContainer">
        <GoBack nagigation={"/profile"} text={"revenir"}/>
        <p className="t2">{t('editprofil')}</p> 
        <div className="ListInformation">
            <form onSubmit={handleSubmit}>
                <div className={`ImageContainer ${form.profil_picture ? "have-image" : ""}`}>
                  <img
                    src={
                      form.profil_picture
                        ? typeof form.profil_picture === "string"
                          ? form.profil_picture
                          : URL.createObjectURL(form.profil_picture)
                        : userIconRelief
                    }
                    alt="profil"
                  />

                  {/* 📎 input caché + label cliquable */}
                  <label className="EditPenButton">
                    <img src={editPenIcon} alt="Edit" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setform((prev) => ({ ...prev, profil_picture: e.target.files[0] }))
                      }
                      style={{ display: "none" }} // masque le bouton natif
                    />
                  </label>
                </div> 

                
                <div className="ConnexionInfoBox column">
                  <p className="t32 bold">Compte</p>
                  <div className="row">
                    <p className="t5">Connexion :</p>
                    <p className="t5">{getConnexionMethod()}</p>
                  </div>
                  <div className="row">
                    <p className="t5">Email associé :</p>
                    <p className="t5">{authState.user?.email}</p>
                  </div>
                </div>


                <label className="t4">Nom complet</label>
                <input
                  name="name"
                  className="InputText"
                  value={form.name}
                  onChange={handleChange}
                />

                {/* <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                /> */}



                
                {/* <label className="t4">Ajoutez une courte biographie</label> */}
                {/* <label className="t6">Décrivez ce que vous proposez, et ce qui rend vos expériences uniques pour les voyageurs.</label> */}
                {/* Parlez-nous de vous et de ce qui rend votre activité unique. */}
                {/* Je suis guide local depuis 5 ans et j’adore faire découvrir ma région à travers des balades culturelles et gourmandes. */}


                {/* <textarea
                    name="bio"
                    className="DescriptionInput"
                    value={form.bio}
                    onChange={handleChange}
                    rows={5}
                    maxLength={200}
                />
                <p className={`${form.bio.length >0 ? "" : "error"} RightInfo t6`}>{form.bio ? form.bio.length : "0"}/200</p> */}

                <label className="t4">Numéro de téléphone</label>
                <PhoneInput
                  placeholder=". . .   . . .   . . ."
                  value={form.phone}
                  onChange={(value) => {
                    setform((prev) => ({ ...prev, phone: value }));
                  }}
                  defaultCountry="FR"
                />


                <button type="submit" className="SaveButton"><img src={SaveIconFillWhite}/><p>Enregistrer</p></button>
            </form>
        </div>
      </div>
      }
  </>
  );
}
