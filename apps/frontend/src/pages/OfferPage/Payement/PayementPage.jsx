import react, { useState, useContext, useEffect } from "react";
import "./PayementPage.css"
import GoBack from "../../../components/GoBack/GoBack";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PayPalLogo from "../../../assets/images/PayPalLogo.png";
import logoCB from "../../../assets/images/logoCB.png";
import { AuthContext } from "../../../components/Auth/authContext/authContext";


export default function PayementPage() {
    const { slug } = useParams();
    const { authState } = useContext(AuthContext);
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
    const adresse = location.state?.adresse;
    const total_capacity = location.state?.total_capacity;

    const [ selectedMethode, setSelectedMethode ] = useState(0);

    useEffect(() =>{
        console.log(location.state);
        if(!location.state ||  
            price == null ||
            OfferIsCancellable == null ||
            participantAdult == null ||
            participantReduced == null)
        {
            console.warn("❌ PayementPage Aucun state recu ou champs manquants !");
            navigate(`/offer-page/${slug}/availibility`, {
                state: {
                    title: title,
                    adresse: adresse,
                    price: price,
                    participantAdult: participantAdult,
                    participantReduced: participantReduced,
                    OfferIsCancellable: OfferIsCancellable,
                    total_capacity: total_capacity,
                }
            })
        }
    })

    const getEvents = async () => {
        const providerId = authState.user?.provider_id;
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/google/events?provider_id=${providerId}`);
        const data = await res.json();
        console.log("📅 Événements :", data);
    }; 
    
    
    async function saveCreneau() {
        const dateObject = new Date(date);
        const formattedDate = dateObject.toLocaleDateString('fr-CA', { timeZone: 'Europe/Paris' });

        console.log(formattedDate, start_hour, end_hour)

        try {
            const ObjectToSave = {
                user_id: authState.user?.id, 
                provider_id: authState.user?.provider_id, 
                offerSlug: slug, 
                date: formattedDate, 
                start_hour: start_hour, 
                end_hour: end_hour, 
                location: adresse, 
                participants: participants, 
                total_participants: participantAdult + participantReduced, 
                price_per_person: price, 
                title: title
            }
            console.log(ObjectToSave);


            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/google/save-creaneau`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(ObjectToSave)
            });
        
            const data = await response.json();
            console.log(data)
            if (data.success) {
                alert("✅ " + data.message);
            } else {
            alert("❌ Erreur lors de l’enregistrement du créneau");
            }
        
            return data;
        } catch (error) {
            console.error("❌ Erreur lors de la sauvegarde :", error);
            alert("❌ Problème de connexion ou de serveur");
            return null;
        }
    }


    const participants = [
        { firstName: "Alice", lastName: "Durand", type: "adulte" },
        { firstName: "Bob", lastName: "Martin", type: "réduit" },
        { firstName: "Clara", lastName: "Petit", type: "enfant" }
    ];

    return (
        <div className="PayementPageContainer">
            <GoBack
            nagigation={`/offer-page/${slug}/availibility`}
            scrollTo={""}
            text={"revenir"}
            state={{
                title: title,
                adresse: adresse,
                price: price,
                participantAdult: participantAdult,
                participantReduced: participantReduced,
                OfferIsCancellable: OfferIsCancellable,
            }}
            />
            <div className="TopDivOpacity"></div>
            <div className="TitleContainer">
                <p className="t32">Sélectionnez un moyen de payement</p>
            </div>
            <div className="MethodesContainer">
                <div className={`MethodeItem ${selectedMethode === 1 ? "selected" : ""}`} onClick={() => {
                    setSelectedMethode(1);
                }}>
                    <div className="row">
                        <img src={PayPalLogo} alt="paypal logo"/>
                        <p className="t4">PayPal</p>
                    </div>
                    <div className={`round`}>
                        <div className={`${selectedMethode === 1 ? "underRound" : ""}`}></div>
                    </div>
                </div>
                <div className={`MethodeItem ${selectedMethode === 2 ? "selected" : ""}`} onClick={() => {
                    setSelectedMethode(2);
                }}>
                    <div className="row">
                        <img src={logoCB} alt="carte bancaire logo"/>
                        <p className="t4">Carte bancaire</p>
                    </div>
                    <div className={`round`}>
                        <div className={`${selectedMethode === 2 ? "underRound" : ""}`}></div>
                    </div>
                </div>
            </div>
            <div className={`CBContainer ${selectedMethode === 2 ? "show" : "desapear"}`}>
                <div className="hline"></div>
                <form className="CBForm">
                    <label className="t6">
                    Nom du titulaire de la carte
                    <input type="text" placeholder="Entrez votre nom" required />
                    </label>

                    <label className="t6">
                    Numéro de carte
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                    </label>

                    <div className="rowInput">
                    <label className="t6">
                        Date d’expiration
                        <input type="text" placeholder="MM/AA" maxLength="5" required />
                    </label>

                    <label className="t6">
                        CVV
                        <input type="text" placeholder="•••" maxLength="4" required />
                    </label>
                    </div>

                    <label className="checkboxContainer t6">
                    <input type="checkbox" />
                    Enregistrer la carte pour de futurs paiements
                    </label>
                </form>
            </div>
            <button onClick={getEvents} className="connectBtn">Voir événements</button>
            <button
                className="saveButton"
                onClick={() => {
                saveCreneau();
                }}
            >
                Enregistrer ou modifier le créneau
            </button>
        </div>
    )
}