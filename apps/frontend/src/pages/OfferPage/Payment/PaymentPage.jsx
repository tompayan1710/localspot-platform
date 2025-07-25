import react, { useState, useContext, useEffect } from "react";
import "./PaymentPage.css"
import GoBack from "../../../components/GoBack/GoBack";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PayPalLogo from "../../../assets/images/PayPalLogo.png";
import logoCB from "../../../assets/images/logoCB.png";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"
import { Elements } from "@stripe/react-stripe-js";
import Spinner from "../../../components/Spinner/Spinner";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";


export default function PaymentPage() {
    const { slug } = useParams();
    const { authState } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const { checkAuth } = useContext(AuthContext);

    const [ stripePromise, setStripePromise ]= useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const locationParams = location.state;
    const fallbackParams = JSON.parse(sessionStorage.getItem("paymentParams") || "{}");
        
    const name = locationParams?.title ?? fallbackParams.title;
    const email = locationParams?.email ?? fallbackParams.email;
    const phone = locationParams?.phone ?? fallbackParams.phone;
    const title = locationParams?.title ?? fallbackParams.title;
    const price = locationParams?.price ?? fallbackParams.price;
    const OfferIsCancellable = locationParams?.OfferIsCancellable ?? fallbackParams.OfferIsCancellable;
    const participantAdult = locationParams?.participantAdult ?? fallbackParams.participantAdult;
    const participantReduced = locationParams?.participantReduced ?? fallbackParams.participantReduced;
    const start_hour = locationParams?.start_hour ?? fallbackParams.start_hour;
    const end_hour = locationParams?.end_hour ?? fallbackParams.end_hour;
    const date = locationParams?.date ?? fallbackParams.date;
    const adresse = locationParams?.adresse ?? fallbackParams.adresse;
    const total_capacity = locationParams?.total_capacity ?? fallbackParams.total_capacity;
    const selectedCreneau = locationParams?.selectedCreneau ?? fallbackParams.selectedCreneau;

    const [isFetching, setIsFetching] = useState(true);
    const [isStripeReady, setIsStripeReady] = useState(false);

    const [ selectedMethode, setSelectedMethode ] = useState(0);

    useEffect(() =>{

        
        console.error("JE SUIS DANS PAYEMEMT PAGE")
        console.log(location.state);
        if(
            price == null ||
            OfferIsCancellable == null ||
            participantAdult == null ||
            participantReduced == null)
        {
            console.warn("❌ PayementPage Aucun state recu ou champs manquants !");
            navigate(`/offer-page/${slug}/add-info`, {
                state: stateAddInfo
            })
        }

        const getPublishableKey = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/clients/config`, {
                    method: "GET",
                });
                const { publishableKey } = await response.json();
                console.log(publishableKey);
                setStripePromise(loadStripe(publishableKey));


                const amount = 51;
                const responseClient = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/clients/create-payment-intent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",  // ← OBLIGATOIRE
                    },
                    body: JSON.stringify({ amount }),
                });

                if(responseClient.status === 400) {
                    console.error("❌ Could not paid under 0.50 euro");
                    navigate("/");
                } else{
                    const { clientSecret } = await responseClient.json();         
                    setClientSecret(clientSecret)
                }
            } catch (err) {
                console.error("❌ Erreur paiement", err);
            } finally {
                setIsFetching(false);   // ← terminé de charger
            }
        }

        getPublishableKey();
    }, [])

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");


        if (token) {
        // ✅ Stocke le JWT dans localStorage
        console.warn("Il y a un token de : ", token);
        localStorage.setItem("jwtToken", token);

        // ✅ Met à jour le contexte d'authentification
        checkAuth();

        // ✅ Redirige l'utilisateur là où il était
        // navigate(`/profile`);
        }
    }, []);//Just to no have the warning, not necessari

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
                title: title,
                selectedCreneau: selectedCreneau
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

    const stateAvailibility = {
        price,
        OfferIsCancellable,
        title,
        adresse,
        total_capacity,
        participantAdult,
        participantReduced,
        selectedCreneau
    }

    const stateAddInfo = {
        name, 
        email,
        phone,
        title,
        price,
        OfferIsCancellable,
        participantAdult,
        participantReduced,
        start_hour,
        end_hour,
        date,
        total_capacity,
        adresse,
        selectedCreneau
    }
    return (
    <div className="PayementPageContainer">
        <GoBack
            nagigation={`/offer-page/${slug}/add-info`}
            scrollTo={""}
            text={"revenir"}
            state={stateAddInfo}
        />
        <ProgressBar num_etape={3} steps ={[
            {   
                title: "Réservation",
                route: `/offer-page/${slug}/availibility`,
                state: stateAvailibility
                },
            {   
                title: "Informations",
                route: `/offer-page/${slug}/add-info`,
                state: stateAddInfo
            },
            { title: "Paiement" }
        ]}/>

        <div className="TitleContainer">
            <p className="t3">Sélectionnez un moyen de payement</p>
        </div>

        <div className="MethodesContainer">
            {isFetching ? (
                <div className="loaderContainer">
                    <Spinner />
                    {/* <p className="loader">Chargement du paiement...</p> */}
                </div>
            ) : (
            <>
                {/* <div className={`MethodeItem ${selectedMethode === 1 ? "selected" : ""}`} onClick={() => setSelectedMethode(1)}>
                <div className="row">
                    <img src={PayPalLogo} alt="paypal logo" />
                    <p className="t4">PayPal</p>
                </div>
                <div className="round">
                    <div className={`${selectedMethode === 1 ? "underRound" : ""}`}></div>
                </div>
                </div> */}

                {stripePromise && clientSecret && (
                <div className="full-width-stripe-container" style={{ opacity: isStripeReady ? 1 : 0, transition: "opacity 0.3s ease" }}>
                    <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret,
                        appearance: {
                        theme: 'stripe',
                        variables: {
                            colorPrimary: '#008cdd',
                            colorText: '#333',
                            fontFamily: 'Poppins, Arial, sans-serif',
                            borderRadius: '15px',
                        },
                        },
                    }}
                    >
                    <CheckoutForm isStripeReady={isStripeReady} onReady={() => setIsStripeReady(true)} />
                    </Elements>
                </div>
                )}
            </>
            )}
            <button onClick={() => {saveCreneau()}}>SaveCreneau</button>
        </div>
    </div>
  );
}