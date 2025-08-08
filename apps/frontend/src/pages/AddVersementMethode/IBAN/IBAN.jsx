import "./IBAN.css"

import IBANChecker from "../IBANChecker";


export default function IBAN({iban, setIban, setIsValidRepeat, base, placeholderIBAN=""}) {
    return (
        <div className="AllIban">
            <p className="t4 bold">IBAN</p>
            <input
                name="Iban"
                className={`InputText IBAN-input ${placeholderIBAN ? "" : "no-letter-spacing"}`}
                placeholder={`${placeholderIBAN ? placeholderIBAN : "Numéro IBAN"}`}
                value={iban}
                onChange={(e) => {
                    const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
                    setIban(cleaned);
                }}
            />
            
            <IBANChecker referenceIban={iban} setIsValidRepeat={setIsValidRepeat} base={base}/>
            <p className="t6" style={{paddingBottom: "30px"}}>Le numéro IBAN (International Bank Account Number) identifie votre compte bancaire. Il figure sur votre relevé d’identité bancaire (RIB).</p>
        </div>
    )
}