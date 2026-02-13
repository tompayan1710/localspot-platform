import react, { useState, useContext, useEffect } from "react";
import "./PaymentPage.css"
import GoBack from "../../../components/GoBack/GoBack";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import PayPalLogo from "../../../assets/images/PayPalLogo.png";
import logoCB from "../../../assets/images/logoCB.png";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"
import { CardCvcElement, CardExpiryElement, CardNumberElement, Elements } from "@stripe/react-stripe-js";
import Spinner from "../../../components/Spinner/Spinner";
import ProgressBar from "../../../components/ProgressBar/ProgressBar";
import { useTranslation } from "react-i18next";

//stripe trigger payment_intent.succeeded
//stripe listen --forward-to localhost:3000/api/stripe/webhook


export default function PaymentPage() {
    const { slug } = useParams();
    const {t, i18n} = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];
    const location = useLocation();
    const navigate = useNavigate();
    const { checkAuth, authState } = useContext(AuthContext);

    const [ stripePromise, setStripePromise ]= useState(null);
    const [clientSecret, setClientSecret] = useState("");

    const locationParams = location.state;
    const fallbackParams = JSON.parse(sessionStorage.getItem("paymentParams") || "{}");
        
    const name = locationParams?.name ?? fallbackParams.name;
    const email = locationParams?.email ?? fallbackParams.email;
    const phone = locationParams?.phone ?? fallbackParams.phone;
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

    const total =
                    (pricing?.adult?.price  ?? 0) * (participantAdult  ?? 0) +
                    (pricing?.child?.price  ?? 0) * (participantChild  ?? 0) +
                    (pricing?.infant?.price ?? 0) * (participantInfant ?? 0);

    const [isFetching, setIsFetching] = useState(true);
    const [isStripeReady, setIsStripeReady] = useState(false);

    const [ selectedMethode, setSelectedMethode ] = useState(0);

    useEffect(() =>{
        console.warn(authState);
        if (authState.loading) return;
        if (!authState.isAuth || !authState.user?.id) return;
        
        setTimeout(() => {

        }, 100000)
        if(
            // name == null ||
            // email == null ||
            // phone == null ||
            title == null ||
            // price == null ||
            offer_provider_id == null ||
            OfferIsCancellable == null ||
            participantAdult == null ||
            participantChild == null ||
            pricing == null ||
            start_hour == null ||
            end_hour == null ||
            date == null ||
            adresse == null ||
            total_capacity == null ||
            selectedCreneau == null
        )
        {
            console.error("❌ PayementPage Aucun state recu ou champs manquants !");
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


                const amount = Math.round(total * 100); 


                // const amount = Math.round(Number(price) * 100); // "55.00" -> 5500

                console.error("BOG BOS")
                console.log("Montant envoyé à Stripe :", amount); // doit afficher: 51

                const body = {
                        amount: amount,
                        user_id: authState.user?.id,
                        offerSlug: slug,
                        name,
                        email,
                        phone,
                        title,
                        provider_id: offer_provider_id,
                        id_hote,
                        OfferIsCancellable,
                        nb_adult: participantAdult,
                        nb_child: participantChild,
                        nb_infant: participantInfant,
                        unit_price_adult: pricing?.adult?.price,
                        unit_price_child: pricing?.child?.price,
                        unit_price_infant: pricing?.infant?.price,
                        adult_counts_toward_capacity: pricing?.adult?.counts_toward_capacity,
                        child_counts_toward_capacity: pricing?.child?.counts_toward_capacity,
                        infant_counts_toward_capacity: pricing?.infant?.counts_toward_capacity,
                        pricing: pricing,
                        start_hour,
                        end_hour,
                        date,
                        adresse,
                        total_capacity,
                        lang
                    }
 
                console.error(body);
                console.error("Fin body");
                const responseClient = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/clients/create-payment-intent`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",  // ← OBLIGATOIRE
                    },
                    body: JSON.stringify(body),
                });

                const data = await responseClient.json(); // 🔥 Ajoute ça même si le status est 400

                if(responseClient.status === 400) {
                    console.error("❌ Erreur backend :", data?.error?.message || "Erreur inconnue");
                    alert("❌ Erreur Stripe : " + (data?.error?.message || "inconnue"));
                    navigate("/");
                } else{
                    const { clientSecret } = data;         
                    setClientSecret(clientSecret)
                }
            } catch (err) {
                console.error("❌ Erreur paiement", err);
            } finally {
                setIsFetching(false);   // ← terminé de charger
            }
        }

        getPublishableKey();
    }, [authState.loading, authState.user?.id])

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
    }, []);//Just to no have the warning, not necessari

    const getEvents = async () => {
        const providerId = authState.user?.provider_id;
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/google/events?provider_id=${providerId}`);
        const data = await res.json();
        console.log("📅 Événements :", data);
    }; 
    
    console.error("Le nom est :", name);

    const stateAvailibility = {
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
        pricing,
        selectedCreneau
    }

    const stateAddInfo = {
        name, 
        email,
        phone,
        title,
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
                title: t("Reservation"),
                route: `/offer-page/${slug}/availibility`,
                state: stateAvailibility
                },
            {   
                title: t("Informations"),
                route: `/offer-page/${slug}/add-info`,
                state: stateAddInfo
            },
            { title: t("Payment") }
        ]}/>

        <div className="TitleContainer">
            <p className="t3">{t("Select_a_payment_method")}</p>
        </div>

        <div className="MethodesContainer">

            <>

                {stripePromise && clientSecret && (
                // <div className="full-width-stripe-container" style={{ opacity: isStripeReady ? 1 : 0, transition: "opacity 0.3s ease" }}>
                <div className="full-width-stripe-container" >
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
                        <CheckoutForm isStripeReady={isStripeReady} onReady={() => setIsStripeReady(true)} total={total} />
                    </Elements>
                </div>
                )}
            </>
            {/* <button onClick={() => {saveCreneau()}}>SaveCreneau</button> */}
        </div>
    </div>
  );
}