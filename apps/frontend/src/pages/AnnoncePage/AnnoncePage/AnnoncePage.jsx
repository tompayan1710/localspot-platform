import "./AnnoncePage.css"
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import { getOfferBySlug } from "../../../services/offers";
import { useNavigate, useParams } from "react-router-dom";
import GoBack from "../../../components/GoBack/GoBack";
import Map2D from "../../../components/Maps/Map2D";
import { getAllHoteBySlug } from "../../../services/hotes";
import Footer from "../../../components/Footer/Footer";
import { useLocation } from "react-router-dom";
import LineGraphe from "../../Statistique/LineGraphe";

export default function AnnoncePage(){
    const navigate = useNavigate();
    const { slug } = useParams();
    const location = useLocation();

    const { authState, logout } = useContext(AuthContext);
    const [offer, setOffer] = useState({});
    const [hotes, setHotes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [isExtendMap, setIsExtendMap] = useState(false);
    const [availability, setAvailability] = useState(false);
    const allDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

    
    
    useEffect(() => {
        if (location.state?.scrollTo) {
            const targetElement = document.getElementById(location.state.scrollTo);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
            }
            // Supprimer scrollTo pour éviter de le rejouer
        }
    }, [location]);

    const getOffer = async (slug) => {
        const data = await getOfferBySlug(slug);
        if(data.success){        
        // console.warn(data.offer);
        setOffer(data.offer);
        }
    }

    const getAllHotes = async (slug) => {
        const data = await getAllHoteBySlug(slug);
        console.log(data)
        if(data.success){  
            console.warn("ALL HOTES !!!");      
            console.warn(data);
            // console.warn(data.offer);
            setHotes(data.hotes);
        }
    }
    

        
    const GetDisponnibility = async () => {
        console.log("✅ geting Disponnibility");

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/availibility/getrecurrent?slug=${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const {status, recurring } = await response.json();

            setAvailability((prev) => {
                const newAvailability = {...prev};

                for (const day of Object.keys(recurring)) {
                    const newSlots = recurring[day].map(slot => ({
                    ...slot,
                    id: Date.now() + Math.random() // 👈 unique id généré
                    }));
                    newAvailability[day] = newSlots;
                }
                return newAvailability;
            })

            console.log("Réponse API :", status, recurring);
        } catch (error) {
            console.error("Erreur lors de l’envoi :", error);
        }
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/`);
    }

    useEffect(() => {
        // ✅ Redirection uniquement lorsque loading est terminé
        console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
        if (!authState.loading && !authState.isAuth) {
        console.log("🔄 Redirection car non authentifié");
        navigate("/login");
        }

        getOffer(slug);
        getAllHotes(slug);
        GetDisponnibility(slug);
        // setTimeout(() =>{
        //     setLoading(false);
        // }, 2000)
        setLoading(false);
    }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth



    return (
        <div id="AnnoncePage">
            {/* <BottomNavBarNotAnimate key="annonces" activeTab="annonces" /> */}

            <GoBack nagigation={`/annonces`} scrollTo={""} text={"revenir"}/>
            {/* <div className="AnnonceGrapheContainer">
                <LineGraphe />
            </div> */}
            <div id="AnnonceStatistique"></div>
            <div className="row">
                <p className="t32">Informations</p>
                <button>
                    <p className="t6">Modifier</p>
                </button>
            </div>
            <div className="InfoContainer">
                <div className="row">
                    <p className="t6">Titre&nbsp;:</p>
                    <p className={`OfferTitle t5 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" :offer.title}</p>
                </div>
                <div className="row">
                    <p className="t6">Description&nbsp;:</p>
                    <p className={`OfferDescription t5 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : offer.description}</p>
                </div>
                <div className="row">
                    <p className="t6">Type&nbsp;:</p>
                    <p className={`t5 OfferType ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : `${offer.type}`}</p>
                </div>
                <div className="row">
                    <p className="t6">Durée&nbsp;:</p>
                    <p className={`t5 OfferDuree ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : `${offer.duration}`}</p>
                </div>
            </div>
            <div className="hline88"></div>
            <div className="CancellableContainer">
                <p className="t5">Annulation gratuite</p>
                <p className="t6">Choisissez si vos clients peuvent annuler gratuitement leur réservation</p>

                {
                    !isLoading ?
                    <div className="toggle-button-group">
                        <button
                            className={offer.cancellable ? "active" : ""}
                            onClick={() => setOffer(prev => ({ ...prev, cancellable: true }))}
                        >
                            <p className="t6">Oui</p>
                        </button>
                        <button
                            className={!offer.cancellable ? "non active" : ""}
                            onClick={() => setOffer(prev => ({ ...prev, cancellable: false }))}
                        >
                            <p className="t6">Non</p>
                        </button>
                    </div> 
                    :
                    <div className="toggle-button-group loading shimmer"></div>
                }
            </div>
            {/* <div className="hline88"></div> */}
            <div className="MapSection">
                <p className="t32">Visibilité locale de l’offre</p>
                <p className="t6">Votre offre est actuellement mise en avant dans les hôtels partenaires listés ci-dessus.</p>
                <div className="MapContainer">
                    {offer != undefined && offer.latitude && offer.longitude ? (
                        <>
                    <Map2D
                        center={{ lat: offer.latitude, lng: offer.longitude }}
                        hotes={hotes}
                        zoom={17}
                        adresseTexte={offer.adresse || ""}
                        borderRadius={isExtendMap ? 0 : 35}
                        />
                    </>
                    ) : (
                        <div className="SquelletteMap shimmer">
                        </div>
                    )}
                </div>
            </div>   
            <div className="row">
                <p className="t32">Mes photos</p>
                <button>
                    <p className="t6">Modifier</p>
                </button>
            </div>
            <div className="PhotosContainer">
                {
                    Array.isArray(offer?.image_urls) && offer.image_urls.map((image, index) => (
                        <div key={index} className="photoItem">
                            <img src={image} alt={`Image ${index + 1}`} />
                        </div>
                    ))
                }
            </div>
            <div className="row">
                <p className="t32">Mes disponnibilité</p>
                <button onClick={()=> {
                    navigate(`availability-editor`);
                }}>
                    <p className="t6">Modifier</p>
                </button>
            </div>
            <div id="PlanningRecurent" className="PlanningRecurent">
                <div className="vertBar"></div>
                <div className="vertBar second"></div>
            {allDays.map((day, index) => (
                <>
                <div className="day-row" key={day}>
                    <p className="t5">{day}</p>
                    <div className="slots">
                        {(availability[day] || []).map((slot, index) => (
                        <div key={slot.id} className="slot">
                            <p className="t6">{slot.from} - {slot.to}</p>
                        </div>
                        ))}
                    </div>
                </div>
                {
                    index < allDays.length - 1 ?
                    <div className="hline"></div>
                    : <></>
                }
                </>
            ))}
            </div>

            <Footer />
        </div>
    )
}