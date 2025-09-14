import { useEffect, useRef, useState } from "react";
import CancelConfirmButton from "../CancelConfirmButton/CancelConfirmButton";
import PopUpBottom from "../PopUpBottom";
import "./EditVersement.css";
import IBANChecker from "../../../pages/AddVersementMethode/IBANChecker";
import IBAN from "../../../pages/AddVersementMethode/IBAN/IBAN";
import { useTranslation } from "react-i18next";

export default function EditVersement({
  editPopUp,
  versements,
  selectedModifie,
  modifiefirstname,
  setModifieFirstName,
  modifielastname,
  setModifieLastName,
  modifieIban,
  setModifieIban,
  modifieSwift,
  setModifieSwift,
  loadingModifie,
  handleUpdateVersement,
  setIsOccultView
}) {
  const [ isValidRepeat, setIsValidRepeat ] = useState(true);
  const {t} = useTranslation();
  useEffect(() => {
    console.log("IsValidReapeat: ", isValidRepeat);
  }, [isValidRepeat])



  return (
    <PopUpBottom
      onClose={() => {
        editPopUp.current.classList.remove("open");
        setIsOccultView(false);
      }}
      isHeader={true}
      ref={editPopUp}
    >
      <>
        <div className="ModifieVersement">
          <p className="t4 bold">{t("Account_holder")}</p>
          <div className="row">
            <input
              name="last_name"
              className="InputText"
              placeholder={versements[selectedModifie]?.last_name || "Nom"}
              value={modifielastname}
              onChange={(e) =>
                setModifieLastName(e.target.value.toUpperCase())
              }
            />

            <input
              name="name"
              className="InputText"
              placeholder={versements[selectedModifie]?.first_name || "Prénom"}
              value={modifiefirstname}
              onChange={(e) => setModifieFirstName(e.target.value)}
            />
          </div>

          <IBAN iban={modifieIban} setIban={setModifieIban} setIsValidRepeat={setIsValidRepeat} base={true} placeholderIBAN={versements[selectedModifie]?.iban}/>
          {/* <p className="t4 bold">IBAN</p>
          <input
            name="Iban"
            className="InputText IBAN-input R"
            placeholder={versements[selectedModifie]?.iban || "Numéro IBAN"}
            value={modifieIban}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
              setModifieIban(cleaned);
            }}
          />
          <IBANChecker referenceIban={modifieIban} setIsValidRepeat={setIsValidRepeat} base={true}/> */}

          <p className="t4 bold">{t("SWIFT_BIC_code")}</p>
          <p className="t6" style={{ paddingTop: "2px" }}>
            {t("Optional_for_European_accounts")}
          </p>
          <input
            name="Swift"
            className="InputText"
            placeholder={versements[selectedModifie]?.swift || "Code SWIFT/BIC"}
            value={modifieSwift}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
              setModifieSwift(cleaned);
            }}
          />
          <p className="t6">{t("SWIFT_explanation")}</p>

          <p className="t6">
            {t("Ensure_accurate_info")}
          </p>
        </div>

    
        <CancelConfirmButton
            cancelText={t("Cancel")}
            confirmText={t("Edit")}
            loading={loadingModifie}
            onCancel={() => {
                editPopUp.current.classList.remove("open");
                setIsOccultView(false);
            }}
            onConfirm={handleUpdateVersement}
            isValid={isValidRepeat}
        />

      </>
    </PopUpBottom>
  );
}
