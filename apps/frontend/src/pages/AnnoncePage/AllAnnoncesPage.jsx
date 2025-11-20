import "./AllAnnoncesPage.css"
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { getOffersProvider } from "../../services/offers";
import { useNavigate } from "react-router-dom";
import plus from "../../assets/images/plus.png"
import Pin from "../../assets/images/Pin.png"
import CahierTexte from "../../components/CahierTexte/CahierTexte";
import FadeInImage from "../../components/Utils/FadeInImage";
import { useTranslation } from "react-i18next";

export default function AllAnnoncesPage(){
    const {t, i18n} = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

    const navigate = useNavigate();
    const { authState, logout } = useContext(AuthContext);
    const [providerOffers, setProviderOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    

    const getOfferOfProvider = async (provider_id, lang) => {
        const data = await getOffersProvider(provider_id, lang);
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
        getOfferOfProvider(authState.user.provider_id, lang);
        }  
    }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth


    return (
        <div id="AnnoncesPage">
            {/* <div className="StatistiqueAnnonces"></div> */}
            {/* <CahierTexte /> */}
            <div className="row">
                <p className="t32">{t("My_listings")}</p>
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
                        <div className="ImagesAnnonces">
                            <div className="ImageWrapper">
                                <FadeInImage src={offer.image_urls[1]} alt={"image annonce"}/>
                            </div>
                            <div className="ImageWrapper">
                                <FadeInImage src={offer.image_urls[0]} alt={"image annonce"}/>
                            </div>
                        </div>
                        <div className="columnAnnonceOffer">
                            <p className="t5 maxLine bold">{offer.title}</p>
                            {/* <p className="t6 maxLine">{offer.description}</p> */}
                            <div className="row">
                                <img src={Pin} alt="Pin adresse"/>
                                <p className="t6 maxLine">{offer.adresse}</p>
                            </div>
                            <p className="t6 maxLine">{offer.price}€ {t("per_person")}</p>
                        </div> 
                    </button>
                    )) : 
                    <div className="noOffer">
                        {/* <p className="t32">Actuellement aucune réservations</p> */}
                        <p className="t6">{t("No_offers")}</p>
                        <button className="blackButton" onClick={() => {
                            navigate("/create-offer", {
                                state: {
                                    activeTab: "annonces"
                                }
                            })
                        }}>
                        {/* <p className="t5">Mettre en avant mes offres</p> */}
                        <p className="t5">{t("Add_a_listing")}</p>
                        </button>
                    </div>
                } 
            </div>
        </div>
    )
}