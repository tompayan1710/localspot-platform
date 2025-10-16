import "./Reservations.css"
import noReservations from "../../assets/images/noReservations.png"
import loupeicon from "../../assets/images/loupeicon.png"
import FadeInImage from "../../components/Utils/FadeInImage"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../components/Auth/authContext/authContext";
import { AuthContext } from "../../components/Auth/authContext/authContext";
import React from "react";
import { getOfferBySlug } from "../../services/offers";
import WhiteButton from "../../components/Buttons/WhiteButton/WhiteButton";
import { useTranslation } from "react-i18next"
import { formatDate, plural } from "../../services/translation"

export default function Reservations(){ 
    const navigate = useNavigate();
    const { authState } = useContext(AuthContext);
    
    const {t, i18n} = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];


    const [AllReservations, setAllReservations ] = useState({})
    const [ offers, setOffers ] = useState({});
    const [loading, setLoading] = useState(true);
    
    const getAllReservations = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reservation_individual/getall?user_id=${authState.user?.id}`, {
                method: "GET",
            });

            const data = await res.json();
            console.warn("DATA RESERVATION : ", data)
            if(data.success){
                return(data.reservations);
            }else{
                console.error("❌ Erreur getAllReservations :", data.error);
                return
            }
        } catch (error) {
            console.error("❌ Erreur getAllReservations :", error);
            return;
        } 
    }

    useEffect(() => {
        if (authState.loading) return;

        if (!authState.user?.id) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            try {
            const reservations = await getAllReservations();
            console.warn("Réservations : ", reservations);

            if (reservations && reservations.length > 0) {
                // --- Regrouper par date ---
                const objectReservation = {};
                for (const reservation of reservations) {
                const dateObj = new Date(reservation.reservation_created_at);
                const formattedDate = dateObj.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });

                if (!objectReservation[formattedDate]) {
                    objectReservation[formattedDate] = [];
                }
                objectReservation[formattedDate].push(reservation);
                }

                setAllReservations(objectReservation);

                // --- Charger les offres liées ---
                const objectOffers = {};
                for (const reservation of reservations) {
                const slug = reservation.offer_slug;
                if (!objectOffers[slug]) {
                    const response = await getOfferBySlug(slug, lang);
                    objectOffers[slug] = response.offer;
                }
                }

                setOffers(objectOffers);
            } else {
                // ⚠️ Aucune réservation
                console.warn("Aucune réservation trouvée");
                setAllReservations({});
            }
            } catch (error) {
            console.error("Erreur lors du chargement :", error);
            setAllReservations({});
            } finally {
            // ✅ Toujours arrêter le chargement
            setLoading(false);
            }
        };

        fetchData();
    }, [authState.loading, authState.user?.id]);


    useEffect(() => {
        console.warn("AllReservations")
        console.warn(AllReservations)
        console.warn("offers");
        console.warn(offers);
    }, [AllReservations, offers])

    return (
        <div className="Reservations">
            <p className="t32">{t("Reservations")}</p>
            <div className="AllReservations">
                {
                    (loading ? [["August 26, 2025", [1]]] 
                        : 
                        // Object.entries(AllReservations).length > 0 &&
                         Object.entries(AllReservations)).map(([date, reservations]) => {
                        console.error(date);
                        return (
                            <React.Fragment key={`${date}`}>
                            <p className={`t6  ${loading ? "loadingDate shimmer" : ""}`}>{formatDate(date, lang)}</p>
                            {
                                reservations.length > 0 ? reservations.map((reservation) => {
                                const nb_participant = reservation.nb_adult + reservation.nb_child + reservation.nb_infant;
                                return (
                                    <React.Fragment key={
                                        loading
                                        ? `sk-${date}-${reservation}`                               // key stable pour skeleton
                                        : reservation.reservation_id || `${date}-${reservation}` 
                                    }>
                                    <div className="ReservationItem" onClick={() => {
                                        if(!loading) navigate(`/reservations/${reservation.reservation_id}`)
                                    }}>
                                        <div className="ImagesOffers">
                                            <div className="ImageWrapper">
                                                {offers[reservation.offer_slug]?.image_urls[1] && 
                                                    <FadeInImage src={offers[reservation.offer_slug]?.image_urls[1]} alt="offer imageReservation offer image"/>
                                                }
                                            </div>
                                            <div className="ImageWrapper">
                                                <FadeInImage src={offers[reservation.offer_slug]?.image_urls[0]} alt="offer imageReservation offer image"/>
                                            </div>
                                        </div>
                                        <div className="column">
                                            <p className={`t4 maxLine maxLine1  ${loading ? "loadingTitle shimmer" : ""}`}>{loading ? "Excursion en bateau privé avec coucher de soleil à Saint-Jean" : offers[reservation.offer_slug]?.title}</p>
                                            {/* <p className="t4 maxLine maxLine1">{offers[reservation.offer_slug]?.title}</p> */}
                                            <div className="hlinedashed"></div>
                                            {/* <p className="t6">07/11/2025 à 14:35</p> */}
                                            <div className="row">
                                                <div className="column">
                                                    <p className={`t6 nbparticipant ${loading ? "loading shimmer" : ""}`}>{t(plural(nb_participant, "Participant", "Participants"))} : {loading ? "0" : nb_participant}</p>

                                                    {/* <p className="t6">Participant : {reservation.total_places_used ?? 0}</p> */}
                                                    <p className={`t6 ${loading ? "loading shimmer" : ""}`}>
                                                    {loading
                                                        ? "×2 adult ×1 child"
                                                        : `×${reservation.nb_adult} ${t(plural(reservation.nb_adult, "adult", "adults"))} ${reservation.nb_child ? `×${reservation.nb_child} ${t(plural(reservation.nb_child, "child", "children"))}` : ""} ${reservation.nb_infant ? `×${reservation.nb_infant} ${t(plural(reservation.nb_infant, "infant", "infants"))}` : ""}`
                                                    }
                                                    </p>
                                                </div>
                                                <p className={`t4 ${loading ? "loading shimmer" : ""}`}>{loading ? "240.00" : reservation.gross_amount}€</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* <div className="hline88"></div> */}
                                    </React.Fragment>
                                )
                                })
                                :
                                <></>
                            }
                            </React.Fragment>
                        )
                    })
                }


                {!loading && Object.entries(AllReservations).length === 0 && (
                    <div className="NoReservation">
                        <div className="MessageNone">
                            <div className="ImageWrapper">
                                <FadeInImage src={noReservations} alt="no reservations image"/>
                            </div>
                            <p className="t6">Vous n'avez aucune réservation pour <br></br>le moment.</p>
                            <WhiteButton text={"Rechercher des annonces"} onClick={() => navigate("/")} img={loupeicon} alt={"loupe icon"}/>
                        </div>
                    </div>
                    )
                }

            </div>
        </div>
    )
}