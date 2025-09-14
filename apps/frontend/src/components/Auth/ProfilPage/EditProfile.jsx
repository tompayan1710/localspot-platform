// Profile.jsx
import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditProfile.css";
import { AuthContext } from "../authContext/authContext"
import { useTranslation } from "react-i18next";
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input';

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
  const [errors, setErrors] = useState({});

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
    const newErrors = {};

    if (form.name !== authState.user.name) {
      updates.name = form.name.trim() === "" ? null : form.name.trim();
    }

    
    if (form.phone !== authState.user.phone) {
      updates.phone = form.phone?.trim() === "" ? null : form.phone?.trim();
    }

    if (!form.phone || !isValidPhoneNumber(form.phone)) {
      newErrors.phone = t("The_phone_number_is_invalid");
    }

    if(Object.keys(newErrors).length !== 0){
      setErrors(newErrors);
      return;
    }

    if (Object.keys(updates).length === 0 && !form.profil_picture) {
      alert(t("No_changes_detected"));
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
        setErrors({})  
        alert(t("Profile_updated_successfully"));
        updateUser(data); 
      } else {
        alert(data.message || t("Error_updating_profile"));
      }
    } catch (err) {
      console.error("Erreur :", err);
      alert(t("Server_error"));
    }
  };


  useEffect(() => {
    if (errors.phone && isValidPhoneNumber(form.phone)) {
      setErrors((prev) => ({ ...prev, phone: null }));
    }
  }, [form.phone]);


    
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
        <GoBack nagigation={"/profile"} text={t("return")} refresh={true}/>
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
                  <p className="t32 bold">{t("Account")}</p>
                  <div className="row">
                    <p className="t5">{t("Connection_method")} :</p>
                    <p className="t5">{getConnexionMethod()}</p>
                  </div>
                  <div className="row">
                    <p className="t5">{t("Related_Email")}&nbsp;:</p>
                    <p className="t5">{authState.user?.email}</p>
                  </div>
                </div>


                <label className="t4">{t("Full_name")}</label>
                <input
                  name="name"
                  className="InputText"
                  value={form.name}
                  onChange={handleChange}
                />
                <label className="t4 label">{t("Phone_number")}</label>
                <PhoneInput
                    defaultCountry="FR"
                    international
                    withCountryCallingCode
                    value={form.phone}
                    autoComplete="tel"
                    name="tel"
                    required
                    onChange={(value) =>
                      setform((prev) => ({ ...prev, phone: value }))
                    }
                    className={`PhoneInput ${errors.phone ? "error" : ""}`}
                    placeholder={t("Enter_your_number")}
                />

                {errors.phone  && 
                  <p className="t6 error-message">{errors.phone}</p>
                }

                {/* <label className="t4">Numéro de téléphone</label>
                <PhoneInput
                  placeholder=". . .   . . .   . . ."
                  value={form.phone}
                  onChange={(value) => {
                    setform((prev) => ({ ...prev, phone: value }));
                  }}
                  defaultCountry="FR"
                /> */}


                <button type="submit" className="SaveButton"><img src={SaveIconFillWhite}/><p>{t("Save")}</p></button>
            </form>
        </div>
      </div>
      }
  </>
  );
}
