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

export default function PaymentPage() {
    const { slug } = useParams();
    const { authState } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const [ stripePromise, setStripePromise ]= useState(null);
    const [clientSecret, setClientSecret] = useState("");

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

    const [isFetching, setIsFetching] = useState(true);
    const [isStripeReady, setIsStripeReady] = useState(false);

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
          title,
          adresse,
          price,
          participantAdult,
          participantReduced,
          OfferIsCancellable,
        }}
      />

      <div className="TopDivOpacity"></div>

      <div className="TitleContainer">
        <p className="t32">Sélectionnez un moyen de payement</p>
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