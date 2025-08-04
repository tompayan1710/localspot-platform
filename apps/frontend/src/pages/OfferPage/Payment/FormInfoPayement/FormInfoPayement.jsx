



import { Route, useLocation, useNavigate, useParams } from "react-router-dom"
import GoBack from "../../../../components/GoBack/GoBack"
import "./FormInfoPayement.css"
import { useEffect, useState } from "react";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';

import LockGreen from "../../../../assets/images/LockGreen.png"

export default function FormInfoPayement(){
    const { slug } = useParams();

    const location = useLocation();
    const navigate = useNavigate();

    const title = location.state?.title;
    const price = location.state?.price;
    const OfferIsCancellable = location.state?.OfferIsCancellable;
    const participantAdult = location.state?.participantAdult;
    const participantReduced = location.state?.participantReduced;
    const start_hour = location.state?.start_hour;
    const end_hour = location.state?.end_hour;
    const date = location.state?.date;
    const total_capacity = location.state?.total_capacity;
    const adresse = location.state?.adresse;
    const selectedCreneau = location.state?.selectedCreneau;
    const offer_provider_id = location.state?.offer_provider_id;
    const [name, setName] = useState(location.state?.name || "");
    const [email, setEmail] = useState(location.state?.email || "");
    const [phone, setPhone] = useState(location.state?.phone || "");
    const [errors, setErrors] = useState({});


    useEffect(() => {
        // console.error("JE SUIS DANS PAYEMEMT PAGE")
        // console.log(location.state);
        if(
            // !location.state || !location.state.price
            title == null ||
            price == null ||
            OfferIsCancellable == null ||
            participantAdult == null ||
            participantReduced == null ||
            start_hour == null ||
            end_hour == null ||
            date == null ||
            total_capacity == null ||
            adresse == null ||
            selectedCreneau == null ||
            offer_provider_id == null
        )
        {
            console.warn("❌ PayementPage Aucun state recu ou champs manquants !");
            navigate(`/offer-page/${slug}`)
        }

    }, [])


    const validateForm = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Le nom complet est requis";
        if (!email.trim()) newErrors.email = "L'email est requis";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "L'email est invalide";
        if (!phone || phone.length < 8) newErrors.phone = "Le numéro de téléphone est invalide";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("✅ Formulaire valide :", { name, email, phone });
            navigate(`/offer-page/${slug}/payment`, {
                state: {
                    name,
                    email,
                    phone,
                    title,
                    adresse,
                    price,
                    offer_provider_id,
                    OfferIsCancellable, 
                    participantAdult,
                    participantReduced,
                    start_hour,
                    end_hour,
                    price,
                    date ,
                    total_capacity,
                    selectedCreneau,
                }
            })
        }
    };

    // const slot = { from: start_hour, to: end_hour };
    // const selectedCreneau = {
    //     index: `${slot.from}-${slot.to}`,
    //     slot
    // };

    const stateAvailibility = {
        date,
        selectedCreneau,
        price,
        OfferIsCancellable,
        title,
        adresse,
        offer_provider_id,
        total_capacity,
        participantAdult,
        participantReduced
    }
    return (
        <div className="FormInfoPayement">
            <GoBack nagigation={`/offer-page/${slug}/availibility`} text={"revenir"} state={stateAvailibility}/>
            <ProgressBar num_etape={2} steps ={[
                {   title: "Réservation",
                    route: `/offer-page/${slug}/availibility`,
                    state: stateAvailibility
                 },
                { title: "Informations" },
                { title: "Paiement" }
            ]}/>
            <form className="FormInfoBody" autoComplete="on" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <p className="Title t3">Vérifier vos informations personnels</p>
                <div className="Securised row">
                    <img src={LockGreen} alt={"Lock green"}/>
                    <p className="t6">Réservation rapide et sécurisé</p>
                </div>
                <p className="t5 label">Nom complet*</p>
                <input
                    className={`InputText ${errors.name ? "error" : ""}`}
                    name="name"
                    autoComplete="name"
                    type="text"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <p className="error-message">{errors.name}</p>}

                <p className="t5 label">E-mail*</p>
                <input
                    className={`InputText ${errors.email ? "error" : ""}`}
                    type="email"
                    autoComplete="email"
                    name="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error-message">{errors.email}</p>}

                <p className="t5 label">Numéro de téléphone*</p>
                {/* react-phone-number-input transmet les props non reconnues à l’<input> interne. Donc ajoute name et autoComplete="tel" : */}
                <PhoneInput
                    defaultCountry="FR"
                    international
                    withCountryCallingCode
                    value={phone}
                    autoComplete="tel"
                    name="tel"
                    required 
                    onChange={setPhone}
                    className={`PhoneInput ${errors.phone ? "error" : ""}`}
                    placeholder="Entrez votre numéro"
                />

                {errors.phone ? (
                <p className="t6 error-message">{errors.phone}</p>
                ) : (
                <p className="t6 info">Votre numéro sera utilisé uniquement en cas de changements importants concernant votre réservation.</p>
                )}

                <button className="SuivantButton" onClick={handleSubmit}>
                    Suivant
                </button>
                <p className="t6 info">Le nom indiqué sera utilisé pour toute la réservation et sera associé à tous les participants.</p>
            </form>
        </div>
    )
}