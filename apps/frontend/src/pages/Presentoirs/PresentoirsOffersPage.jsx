import "./PresentoirsOffersPage.css";

import Pin from "../../assets/images/Map2DPin.png";
import arrowtopright from "../../assets/images/arrowTopRight2.png";
import ExempleQRCODE from "../../assets/images/ExempleQRCODE.png";

import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { useTranslation } from "react-i18next";
import { getOfferBySlug } from "../../services/offers";
import GoBack from "../../components/GoBack/GoBack";
import Spinner from "../../components/Spinner/Spinner";
import FadeInImage from "../../components/Utils/FadeInImage";

export default function PresentoirsOffersPage() { 
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const { t, i18n } = useTranslation();

    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];
    const { slug } = useParams();

    const [offer, setOffer] = useState(null);
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [fullQR, setFullQR] = useState(false);

    // ------------------------------
    // Charge l’offre + stats
    // ------------------------------
    useEffect(() => {
        if (authState.loading) return;
        if (!authState.user?.hote_id) return;

        async function loadData() {
            try {
                setIsLoading(true);

                if (!slug) {
                    return;
                }
                // 1) Charger l'offre
                const offerData = await getOfferBySlug(slug, lang);
                if (!offerData.success) return;
                setOffer(offerData.offer);

                // 2) Charger les stats
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/presentoirs/stats?slug=${slug}&hote_id=${authState.user?.hote_id}`
                );

                const statsData = await res.json();
                if (statsData.success) setStats(statsData.stats);

                setIsLoading(false);

            } catch (error) {
                console.error("Erreur loadData :", error);
            }
        }

        loadData();
    }, [lang, slug, authState]);

    if (isLoading || !offer || !stats) {
        return <Spinner centerPage={true} />;
    }

    return (
        <div className="PresentoirOffer">
            <GoBack nagigation={"/presentoirs"} text={t("back")} />

            <div className="CardPresentoir">

                {/* TITRE + bouton voir */}
                <div className="row">
                    <p className="t5 bold">{offer.title}</p>

                    <button
                        className="seeAnnonce row"
                        onClick={() => navigate(`/offer-page/${slug}?hote_id=${authState.user?.hote_id}`)}
                    >
                        <p className="t5">{t("see")}</p>
                        <img src={arrowtopright} />
                    </button>
                </div>

                {/* Adresse */}
                <div className="row addresse">
                    <img src={Pin} alt="pin address" />
                    <p className="t5">{offer.adresse}</p>
                </div>

                {/* Images */}
                <div className="whiteBoxContainer">
                    <div className="whiteBox whiteBoxLeft"></div>
                    <div className="rowImagesOffers">
                        {offer.image_urls.map((img, i) => (
                            <FadeInImage key={i} src={img} alt={"image offer"}/>
                        ))}
                    </div>
                    <div className="whiteBox whiteBoxRight"></div>
                </div>

                <div className="ImagesOffers">
                    {offer.image_urls.slice(0, 4).map((img, i) => (
                        <FadeInImage key={i} src={img} alt="image offer" />
                    ))}
                </div>
                <div className="hline"></div>

                {/* STATISTIQUES */}
                <div className="row">
                    <div className="cardInfo column">
                        <p className="t5">Total scans</p>
                        <p className="t4 bold">{stats.total_scans}</p>
                    </div>

                    <div className="cardInfo column">
                        <p className="t5">Scans / mois</p>
                        <p className="t4 bold">{stats.monthly_scans}</p>
                    </div>

                    <div className="cardInfo column">
                        <p className="t5">Affichée sur</p>
                        <p className="t5 bold">{stats.presentoir_count} présentoirs</p>
                    </div>
                </div>

                <div className="hline"></div>

                {/* QR CODE */}
                <div className="row">
                    <p className="t5">
                        Ce QR code est identique à celui scanné par vos clients dans votre établissement.
                    </p>

                    <div className="column">
                        <div className="qrbuttonContainer"  onClick={() => {
                                setFullQR((prev) => !prev);
                            }}>
                            <button className={`qrcodeButton ${fullQR ? "full" : ""}`}>
                                <img src={ExempleQRCODE} alt="qrcode"/>
                            </button>
                            <p className="t6">
                                {fullQR ? "Tap anywhere to close" : "Tap to view full size"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
