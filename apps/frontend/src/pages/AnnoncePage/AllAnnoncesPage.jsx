import "./AllAnnoncesPage.css"
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { getOffersProvider } from "../../services/offers";
import { useNavigate } from "react-router-dom";
import plus from "../../assets/images/plus.png"
import CahierTexte from "../../components/CahierTexte/CahierTexte";
import FadeInImage from "../../components/Utils/FadeInImage";

export default function AllAnnoncesPage(){
    const navigate = useNavigate();
    const { authState, logout } = useContext(AuthContext);
    const [providerOffers, setProviderOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const getOfferOfProvider = async (provider_id) => {
        const data = await getOffersProvider(provider_id);
        if(data.success){        
        console.warn(data.offers);
        setProviderOffers(data.offers);
        }
        setLoading(false);
    }
    

        
    useEffect(() => {
        // ✅ Redirection uniquement lorsque loading est terminé
        console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
        if (!authState.loading && !authState.isAuth) {
        console.log("🔄 Redirection car non authentifié");
        navigate("/login");
        }

        if (authState.user?.provider_id && authState.user?.provider?.is_validated) {
        getOfferOfProvider(authState.user.provider_id);
        }  
    }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth


    return (
        <div id="AnnoncesPage">
            {/* <div className="StatistiqueAnnonces"></div> */}
            {/* <CahierTexte /> */}
            <div className="row">
                <p className="t3">Mes annonces :</p>
                <button onClick={() => {
                    navigate("/create-offer", {
                        state: {

                        }
                    })
                }}>
                    <img src={plus} alt="cross icon"/>
                </button>
            </div>
            <div className="allAnnonces">
                { providerOffers && providerOffers.length > 0 ? providerOffers.map((offer) => (
                    <button key={offer.id} className="AnnonceItem" onClick={() => {
                        navigate(`${offer.slug}`);
                    }}>
                        <div className="ImageWrapper">
                            <FadeInImage src={offer.image_urls[0]} alt={"image annonce"}/>
                        </div>
                        <div className="columnAnnonceOffer">
                            <p className="t5">{offer.title}</p>
                            <p className="t6">{offer.description}</p>
                        </div> 
                    </button>
                    )) : 
                    <div className="noOffer">
                        <p className="t32">Actuellement aucune réservations</p>
                        <p className="t6">Aucune offre actuellement</p>
                        <button className="blackButton" onClick={() => {
                            navigate("/annonces", {
                                state: {
                                    activeTab: "annonces"
                                }
                            })
                        }}>
                        {/* <p className="t5">Mettre en avant mes offres</p> */}
                        <p className="t5">Ajouter une annonces</p>
                        </button>
                    </div>
                } 
            </div>
        </div>
    )
}