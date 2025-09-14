import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "../../components/GoBack/GoBack";
import "./AddVersement.css";
import { useTranslation } from "react-i18next";

export default function AddTitulaireForm() {
  const {t} = useTranslation();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleContinue = () => {
    if (first_name.trim() && last_name.trim()) {
      const origin = location?.state?.origin || "/"
      navigate("/versement/new/iban", {
        state: {
          first_name,
          last_name,
          origin
        }
      });
    } else {
      // Optionnel : message d’erreur si les champs sont vides
      alert(t("Please_fill_in_holder_name"));
    }
  };

  return (
    <div className="AddVersement">
        <GoBack nagigation={location?.state?.origin ? location?.state?.origin : "/payout-request"} scrollTo={""} text={t("back")} />

        <p className="t3 bold">{t("Enter_account_holder_name")}</p>

        <div className="bodyVersement">
            <p className="t5">{t("Who_owns_the_account")}</p>

            <div className="row">
                <input
                name="name"
                className="InputText"
                placeholder={t("Last_name")}
                value={last_name}
                onChange={(e) => setLastName(e.target.value.toUpperCase())}
                // onChange={(e) => setName(e.target.value)}
                />

                <input
                name="last_name"
                className="InputText"
                placeholder={t("First_name")}
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
        </div>
        <p className="t6">{t("Holder_name_info")}</p>
        <button className="NavigateButton" onClick={handleContinue}>
          <p className="t4">{t("Continue")}</p>
        </button>
    </div>
  );
}
