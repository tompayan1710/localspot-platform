import "./AllAnnoncesPage.css"
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { getOffersProvider } from "../../services/offers";
import { useNavigate } from "react-router-dom";
import plus from "../../assets/images/plus.png"
import CahierTexte from "../../components/CahierTexte/CahierTexte";

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
            <div className="StatistiqueAnnonces"></div>
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
                { providerOffers ? providerOffers.map((offer) => (
                    <button key={offer.id} className="AnnonceItem" onClick={() => {
                        navigate(`${offer.slug}`);
                    }}>
                        <img src={offer.image_urls[0]}/>
                        <div className="columnAnnonceOffer">
                            <p className="t5">{offer.title}</p>
                            <p className="t6">{offer.description}</p>
                        </div> 
                    </button>
                    )) : 
                    <div className="noOffer"></div>
                }
            </div>
        </div>
    )
}