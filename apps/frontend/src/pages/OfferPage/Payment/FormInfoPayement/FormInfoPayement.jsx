import { Route, useLocation, useNavigate, useParams } from "react-router-dom"
import GoBack from "../../../../components/GoBack/GoBack"
import "./FormInfoPayement.css"
import { useContext, useEffect, useState } from "react";
import ProgressBar from "../../../../components/ProgressBar/ProgressBar";
import PhoneInput from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import { AuthContext } from "../../../../components/Auth/authContext/authContext";

import LockGreen from "../../../../assets/images/LockGreen.png"
import { useTranslation } from "react-i18next";

export default function FormInfoPayement(){
    const { slug } = useParams();
    const {t} = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();

    const { checkAuth } = useContext(AuthContext);

    const locationParams = location.state;
    const fallbackParams = JSON.parse(sessionStorage.getItem("paymentParams") || "{}");
        
    // const name = locationParams?.name ?? fallbackParams.name;
    // const email = locationParams?.email ?? fallbackParams.email;
    // const phone = locationParams?.phone ?? fallbackParams.phone;
    const title = locationParams?.title ?? fallbackParams.title;
    // const price = locationParams?.price ?? fallbackParams.price;
    const offer_provider_id = locationParams?.offer_provider_id ?? fallbackParams.offer_provider_id;
    const id_hote = locationParams?.id_hote ?? fallbackParams.id_hote;
    const OfferIsCancellable = locationParams?.OfferIsCancellable ?? fallbackParams.OfferIsCancellable;
    const participantAdult = locationParams?.participantAdult ?? fallbackParams.participantAdult;
    const participantChild = locationParams?.participantChild ?? fallbackParams.participantChild;
    const participantInfant = locationParams?.participantInfant ?? fallbackParams.participantInfant;
    const pricing = locationParams?.pricing ?? fallbackParams.pricing;
    const start_hour = locationParams?.start_hour ?? fallbackParams.start_hour;
    const end_hour = locationParams?.end_hour ?? fallbackParams.end_hour;
    const date = locationParams?.date ?? fallbackParams.date;
    const adresse = locationParams?.adresse ?? fallbackParams.adresse;
    const total_capacity = locationParams?.total_capacity ?? fallbackParams.total_capacity;
    const selectedCreneau = locationParams?.selectedCreneau ?? fallbackParams.selectedCreneau;

    // const title = location.state?.title;
    // const price = location.state?.price;
    // const OfferIsCancellable = location.state?.OfferIsCancellable;
    // const participantAdult = location.state?.participantAdult;
    // const participantChild = location.state?.participantChild;
    // const start_hour = location.state?.start_hour;
    // const end_hour = location.state?.end_hour;
    // const date = location.state?.date;
    // const total_capacity = location.state?.total_capacity;
    // const adresse = location.state?.adresse;
    // const selectedCreneau = location.state?.selectedCreneau;
    // const offer_provider_id = location.state?.offer_provider_id;
    const [name, setName] = useState((locationParams?.name ?? fallbackParams.name) || "");
    const [email, setEmail] = useState((locationParams?.email ?? fallbackParams.email) || "");
    const [phone, setPhone] = useState((locationParams?.phone ?? fallbackParams.phone) || "");
    const [errors, setErrors] = useState({});


    useEffect(() => {
        // console.error("JE SUIS DANS PAYEMEMT PAGE")
        // console.log(location.state);
        if(
            // !location.state || !location.state.price
            title == null ||
            // price == null ||
            OfferIsCancellable == null ||
            participantAdult == null ||
            participantChild == null ||
            participantInfant == null ||
            start_hour == null ||
            end_hour == null ||
            date == null ||
            total_capacity == null ||
            adresse == null ||
            selectedCreneau == null ||
            offer_provider_id == null
        )
        {
            console.error("❌ PayementPage Aucun state recu ou champs manquants !");
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
                    // price,
                    offer_provider_id,
                    id_hote,
                    OfferIsCancellable, 
                    participantAdult,
                    participantChild,
                    participantInfant,
                    pricing,
                    start_hour,
                    end_hour,
                    // price,
                    date,
                    total_capacity,
                    selectedCreneau,
                }
            })
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        const init = async () => {
            if (token) {
                // ✅ Stocke le JWT dans localStorage
                console.warn("Il y a un token de : ", token);
                localStorage.setItem("jwtToken", token);

                // ✅ Met à jour le contexte d'authentification
                await checkAuth();

                // ✅ Redirige l'utilisateur là où il était
                // navigate(`/profile`);
            }
        }

        init();
    }, []);

    const stateAvailibility = {
        date,
        selectedCreneau,
        // price,
        OfferIsCancellable,
        title,
        adresse,
        offer_provider_id,
        id_hote,
        total_capacity,
        participantAdult,
        participantChild,
        participantInfant,
        pricing
    }
    return (
        <div className="FormInfoPayement">
            <GoBack nagigation={`/offer-page/${slug}/availibility`} text={"revenir"} state={stateAvailibility}/>
            <ProgressBar num_etape={2} steps ={[
                {   title: t("Reservation"),
                    route: `/offer-page/${slug}/availibility`,
                    state: stateAvailibility
                 },
                { title: t("Informations") },
                { title: t("Payment") }
            ]}/>
            <form className="FormInfoBody" autoComplete="on" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                <p className="Title t3">{t("Verify_your_personal_information")}</p>
                <div className="Securised row">
                    <img src={LockGreen} alt={"Lock green"}/>
                    <p className="t6">{t("Fast_and_secure_booking")}</p>
                </div>
                <p className="t5 label">{t("Full_name")}*</p>
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

                <p className="t5 label">{t("Email")}*</p>
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

                <p className="t5 label">{t("Phone_number")}*</p>
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
                <p className="t6 info">{t("Phone_info")}</p>
                )}

                <button className="SuivantButton" onClick={handleSubmit}>
                    {t("Next")}
                </button>
                <p className="t6 info">{t("Name_will_be_used_for_booking")}</p>
            </form>
        </div>
    )
}