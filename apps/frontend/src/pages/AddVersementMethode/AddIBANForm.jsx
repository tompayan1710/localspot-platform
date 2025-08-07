import GoBack from "../../components/GoBack/GoBack";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { useLocation, useNavigate } from "react-router-dom";

import "./AddVersement.css"
import { useContext, useEffect, useState } from "react";
import { useSSR } from "react-i18next";

export default function AddIBANForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    const { origin, name, last_name } = location.state || {};

    const [ swift, setSwift ] = useState("");
    const [ iban, setIban ] = useState("");
    const [ loading, setLoading ] = useState("");

    useEffect(() => {
        console.log(name, last_name);
    }, [])


    const AddingVersementPayment = async () => {
        try {
            const provider_id = authState.user?.provider_id;
            const body = {
                provider_id,
                name,
                last_name,
                method: "iban",
                iban,                
                swift
            }
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payouts/add-versement`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            });

            if (!response.ok) {
                throw new Error("Erreur serveur");
            }

            const data = await response.json();

            return data;

        } catch (err) {
            console.error("❌ Erreur AddingVersementPayment:", err);
            return { success: false };
        }
    }

    const handleSubmit = async () => {
        setLoading(true);
        
        if (!iban.trim()) {
            alert("Veuillez remplir l'IBAN.");
            setLoading(false);
            return;
        }

        const res = await AddingVersementPayment();

        if (res.success) {
            navigate(origin || "/"); // si origin n’est pas défini, redirige vers "/"
        } else {
            alert("Erreur lors de l’ajout de la méthode de versement.");
            setLoading(false);
        }
    };



    return (
        <div className="AddVersement Iban">
            <GoBack nagigation={"/"} scrollTo={""} text={"retour"} />
            <p className="t3 bold">Veuillez saisir vos coordonnées bancaires</p>
            <div className="bodyVersement">
                <p className="t4 bold">IBAN</p>
                <input
                    name="Iban"
                    className="InputText IBAN-input"
                    placeholder="Numéro IBAN"
                    value={iban}
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
                        setIban(cleaned);
                    }}
                />
                <IBANChecker referenceIban={iban}/>
                <p className="t6" style={{paddingBottom: "30px"}}>Le numéro IBAN (International Bank Account Number) identifie votre compte bancaire. Il figure sur votre relevé d’identité bancaire (RIB).</p>

                
                <p className="t4 bold">Code SWIFT/BIC</p>
                <p className="t6" style={{paddingTop: "2px"}}>Facultatif pour les comptes européens (SEPA)</p>
                <input
                    name="Swift"
                    className="InputText"
                    placeholder="Code SWIFT/BIC"
                    value={swift}
                    onChange={(e) => {
                        const cleaned = e.target.value.replace(/\s/g, "").toUpperCase();
                        setSwift(cleaned);
                    }}
                />
                <p className="t6">Le code SWIFT (ou BIC) permet d’identifier votre établissement bancaire à l’international. Il comporte généralement 8 ou 11 caractères alphanumériques.</p>
            </div>
            <button className="NavigateButton" onClick={handleSubmit}>
              <p className="t5">Ajouter</p>
            </button>
        </div>
    )
}


const IBANChecker = ({ referenceIban }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const input = e.target.value.replace(/\s/g, ""); // enlever les espaces
    if (input.length <= referenceIban.length) {
      setValue(input.toUpperCase());
    }
  };

  return (
    <div className="IbanCheckerWrapper">
      <div className="IbanVisual">
        {referenceIban.split("").map((refChar, i) => {
            const userChar = value[i];
            const isCorrect = userChar === refChar;

            const filledIndexes = [...value].map((c, idx) => c && idx).filter((v) => typeof v === "number");
            const firstFilled = filledIndexes[0];
            const lastFilled = filledIndexes[filledIndexes.length - 1];

            const isFirst = i === firstFilled;
            const isLast = i === lastFilled;

            return (
                <div
                key={i}
                className={`char-block 
                            ${userChar ? (isCorrect ? "valid" : "invalid") : ""} 
                            ${isFirst ? "first-letter" : ""} 
                            ${isLast ? "last-letter" : ""}`}
                >
                {userChar ? userChar : ""}
                </div>
            );
        })}

      </div>

      <input
        type="text"
        value={value}
        placeholder="Confirmez le numéro IBAN"
        onChange={handleChange}
        className="RealInput"
        maxLength={referenceIban.length}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
};
