import "./Presentoirs.css";

import PresentoirePhoto from "../../assets/images/PresentoirePhoto.png";
import Pin from "../../assets/images/Pin.png";
import plus from "../../assets/images/crossWhite.png";
import addStock from "../../assets/images/addStock.png";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { useTranslation } from "react-i18next";
import { getOfferBySlug } from "../../services/offers";
import FadeInImage from "../../components/Utils/FadeInImage";
import MonthlyScanBarChart from "./MonthlyScanBarChart/MonthlyScanBarChart";

export default function Presentoirs() {
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    const { t, i18n } = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

    const [presentoirs, setPresentoirs] = useState([]);
    const [offers, setOffers] = useState({});
    const [loading, setLoading] = useState(true);

    const [statsLoading, setStatsLoading] = useState(true);
    const [monthlyChartData, setMonthlyChartData] = useState(null);


    // ------------------------------
    // Récupère les stats globales des présentoirs
    // ------------------------------
    const loadGlobalStats = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/presentoirs/allstats?hote_id=${authState.user?.hote_id}`
            );

            const data = await res.json();
            if (!data.success) return;

            const monthly = data.stats.monthly;

            const formatter = new Intl.DateTimeFormat(lang, { month: "short" });

            const labels = [];
            const values = [];

            for (const m of monthly) {
                const [year, month] = m.year_month.split("-");
                const date = new Date(year, month - 1, 1);

                labels.push(formatter.format(date)); // ex "juil."
                values.push(Number(m.scan_count));  // ex 2
            }

            setMonthlyChartData({
                labels,
                values,
                total_scans: data.stats.total_scans,
            });

        } catch (error) {
            console.error("Erreur globalStats :", error);
        }

        setStatsLoading(false);
    };



    // ------------------------------
    // Récupère les présentoirs
    // ------------------------------
    const getAllPresentoirs = async () => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/presentoirs/getall?hote_id=${authState.user?.hote_id}`
            );

            const data = await res.json();
            if (!data.success) return;

            console.warn(data.presentoirs);
            setPresentoirs(data.presentoirs);
            loadOffers(data.presentoirs);

        } catch (error) {
            console.error("Erreur réseau getAllPresentoirs :", error);
        }

        setLoading(false);
    };

    // ------------------------------
    // Charge les offres par slug
    // ------------------------------
    const loadOffers = async (presentoirList) => {
        const slugSet = new Set();
        presentoirList.forEach(p => p.offers.forEach(o => slugSet.add(o.offer_slug)));

        const slugs = Array.from(slugSet);
        const newOffers = {};

        for (const slug of slugs) {
            try {
                const result = await getOfferBySlug(slug);
                if (result.success && result.offer) {
                    newOffers[slug] = result.offer;
                }
            } catch (e) {
                console.error("Erreur getOfferBySlug:", slug, e);
            }
        }

        setOffers(newOffers);
    };

    // ------------------------------
    // Load all data on mount
    // ------------------------------
    useEffect(() => {
        if (authState.loading) return;
        if (!authState.user?.hote_id) {
            setLoading(false);
            return;
        }

        getAllPresentoirs();
        loadGlobalStats();

    }, [authState.user?.hote_id]);

    function timeAgo(dateString) {
        if (!dateString) return "—";

        const date = new Date(dateString);
        const now = new Date();
        const diff = now - date;

        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (days <= 0) {
            if (hours <= 0) return "Il y a moins d’une heure";
            if (hours === 1) return "Il y a 1 heure";
            return `Il y a ${hours} heures`;
        }

        if (days === 1) return "Hier";
        if (days < 7) return `Il y a ${days} jours`;

        if (weeks === 1) return "Il y a 1 semaine";
        if (weeks < 5) return `Il y a ${weeks} semaines`;

        if (months === 1) return "Il y a 1 mois";
        return `Il y a ${months} mois`;
    }

    const placeholderChartData = {
        labels: ["", "", "", "", "", ""],
        values: [0, 0, 0, 0, 0, 0],
        total_scans: 0
    };

    const chartData = monthlyChartData || placeholderChartData;


    return (
        <div className="Presentoirs">
            <button className="AddPresentoir">
                <img src={plus} alt="plus icon" />
                <p className="t5">Demande d’installation</p>
            </button>

            <p className="t32">{t("Presentoirs")}</p>

            <div>
                {/* <MonthlyScanBarChart 
                    data={monthlyChartData.monthly}
                    labels={globalLabels}
                    solde={globalStats ? globalStats.total_scans : 0}
                    loading={statsLoading}
                /> */}
                <MonthlyScanBarChart
                    data={chartData.values}
                    labels={chartData.labels}
                    solde={chartData.total_scans}
                    loading={statsLoading}
                />
            </div>

            {/* <div className="ImageWrapper">
                <img src={PresentoirePhoto} alt="Presentoire Photo" />
                <div></div>
            </div> */}

            <div className="AllPresentoirs">
                {loading && <p>Loading...</p>}

                {!loading && presentoirs.length === 0 ? (
                    <div className="NoPresentoirs">
                        <p className="t4">{t("No_presentoirs_yet")}</p>
                    </div>
                ) : (
                    <p className="t4 bold">Listes des présentoires</p>
                )}

                {presentoirs.map((p) => (
                    <div className="PresentoireCard" key={p.presentoir_id}>
                        <button className="addStock">
                            <img src={addStock} alt="add stock" />
                        </button>

                        <div className="row NameContainer">
                            <p className="t32 bold">{p.name}</p>
                            <div className="row">
                                <div className={`pointStatus ${p.status == ""}`}></div>
                                <p className="t5">Online</p>
                            </div>
                        </div>

                        <div className="statRow row">
                            <div className="statContainer column">
                                <p className="t5 bold">Total scans</p>
                                <p className="t4">{p.total_scans || "0"}</p>
                            </div>
                            <div className="statContainer column">
                                <p className="t5 bold">Dernier scan</p>
                                <p className="t5">{timeAgo(p.last_scan)}</p>
                            </div>
                            <div className="statContainer column">
                                <p className="t5 bold">Offres associées</p>
                                <p className="t4">{p.offers.length}</p>
                            </div>
                        </div>

                        <div className="hline"></div>

                        <p className="t5 bold">Offres affichées :</p>

                        <div className="allAnnonces">
                            {p.offers.length > 0 ? (
                                p.offers.slice(0, 5).map(o => {
                                    const slug = o.offer_slug;
                                    const offer = offers[slug];

                                    if (!offer) {
                                        return (
                                            <div key={slug} className="AnnonceItem">
                                                {/* <p>{slug}</p> */}
                                            </div>
                                        );
                                    }

                                    return (
                                        <button
                                            key={slug}
                                            className="AnnonceImage"
                                            onClick={() =>
                                                navigate(`/presentoirs/${slug}`, {
                                                    hote_id: authState.user.hote_id,
                                                    presentoir_id: p.presentoir_id
                                                })
                                            }
                                        >
                                            <FadeInImage src={offer.image_urls[0]} alt="image annonce" />
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="noOffer">
                                    <p className="t6">{t("No_offers_linked")}</p>
                                    <button className="blackButton" onClick={() => navigate("/create-offer")}>
                                        <p className="t5">{t("Add_a_listing")}</p>
                                    </button>
                                </div>
                            )}
                        </div>

                        <p className="t6 centerText">Un présentoir affiche 5 activités au total.</p>

                        <p className="t5 bold TopActivity">Top activité :</p>

                        {p.offers.length > 0 && (
                            p.offers.slice(0, 1).map(o => {
                                const slug = o.offer_slug;
                                const offer = offers[slug];

                                if (!offer) {
                                    return (
                                        <div key={slug} className="AnnonceItem">
                                            <p>{slug}</p>
                                        </div>
                                    );
                                }

                                return (
                                    <button
                                        key={slug}
                                        className="AnnonceItem"
                                        onClick={() =>
                                            navigate(`/presentoirs/${slug}`, {
                                                hote_id: authState.user.hote_id,
                                                presentoir_id: p.presentoir_id
                                            })
                                        }
                                    >
                                        <div className="ImagesAnnonces">
                                            <div className="ImageWrapper">
                                                <FadeInImage src={offer.image_urls[1]} alt="image annonce" />
                                            </div>
                                            <div className="ImageWrapper">
                                                <FadeInImage src={offer.image_urls[0]} alt="image annonce" />
                                            </div>
                                        </div>

                                        <div className="columnAnnonceOffer">
                                            <p className="t5 maxLine bold">{offer.title}</p>

                                            <div className="row">
                                                <img src={Pin} alt="Pin adresse" />
                                                <p className="t6 maxLine">{offer.adresse}</p>
                                            </div>

                                            <p className="t6 maxLine">
                                                {offer.price}€ {t("per_person")}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}

                    </div>
                ))}
            </div>
        </div>
    );
}
