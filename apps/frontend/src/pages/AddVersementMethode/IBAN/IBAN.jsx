import "./IBAN.css"

import IBANChecker from "../IBANChecker";
import { useTranslation } from "react-i18next";


export default function IBAN({iban, setIban, setIsValidRepeat, base, placeholderIBAN=""}) {
    const {t} = useTranslation();
    return (
        <div className="AllIban">
            <p className="t4 bold">IBAN</p>
            <input
                name="Iban"
                className={`InputText IBAN-input ${placeholderIBAN ? "" : "no-letter-spacing"}`}
                placeholder={`${placeholderIBAN ? placeholderIBAN : t("IBAN_number")}`}
                value={iban}
                onChange={(e) => {
                    const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
                    setIban(cleaned);
                }}
            />
            
            <IBANChecker referenceIban={iban} setIsValidRepeat={setIsValidRepeat} base={base}/>
            <p className="t6" style={{paddingBottom: "30px"}}>{t("IBAN_text")}</p>
        </div>
    )
}