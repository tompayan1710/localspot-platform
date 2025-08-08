import GoBack from "../../components/GoBack/GoBack";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { useLocation, useNavigate } from "react-router-dom";

import "./AddVersement.css"
import { useContext, useEffect, useState } from "react";
import { useSSR } from "react-i18next";
import IBANChecker from "./IBANChecker";
import IBAN from "./IBAN/IBAN";
import Spinner from "../../components/Spinner/Spinner";
import TestLoading from "../../components/Utils/TestLoading";

export default function AddIBANForm() {
    const navigate = useNavigate();
    const location = useLocation();
    const { authState } = useContext(AuthContext);

    const { origin, first_name, last_name } = location.state || {};

    const [ swift, setSwift ] = useState("");
    const [ iban, setIban ] = useState("");
    const [ loading, setLoading ] = useState("");
    const [ isValidRepeat, setIsValidRepeat ] = useState(true);
    useEffect(() => {
        console.log(first_name, last_name);
    }, [])


    const AddingVersementPayment = async () => {
        try {
            const provider_id = authState.user?.provider_id;
            const body = {
                provider_id,
                first_name,
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
            setTimeout(() => {
                navigate(origin || "/"); // si origin n’est pas défini, redirige vers "/"
            }, 1000)
        } else {
            alert("Erreur lors de l’ajout de la méthode de versement.");
            setLoading(false);
        }
    };



    return (
        <div className="AddVersement Iban">
            <GoBack nagigation={-1} scrollTo={""} text={"retour"} />
            <p className="t3 bold">Veuillez saisir vos coordonnées bancaires</p>
            <div className="bodyVersement">
            
                <IBAN iban={iban} setIban={setIban} setIsValidRepeat={setIsValidRepeat} base={true}/>
                
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
            <button className="NavigateButton" onClick={handleSubmit}
                disabled={!iban || !isValidRepeat}
            >
                {
                    loading && <Spinner />
                }
                <p className={`${loading ? "disappear" : ""} t4`}>Ajouter</p>
            </button>

            {/* <TestLoading setLoading={setLoading}/> */}
        </div>
    )
}
