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

export default function Reservations(){
    const navigate = useNavigate();
    const reservation_id = "IFJ3FF3SIA2"
    const { authState } = useContext(AuthContext);
    
    const [AllReservations, setAllReservations ] = useState({})
    const [ offers, setOffers ] = useState({});

    const getAllReservations = async () => {
        try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reservation_individual/getall?user_id=${authState.user?.id}`, {
                method: "GET",
            });

            const data = await res.json();
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
        if (!authState.user?.id) return;

        const fetchData = async () => {
            const reservations = await getAllReservations();
            if (reservations) {
                const objectReservation = {};
                reservations.map((reservation) => {
                    const dateObj = new Date(reservation.reservation_created_at); // Crée un objet Date

                    const formattedDate = dateObj.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    });

                    console.log(formattedDate); // "July 10, 2025"
                    if(!objectReservation[formattedDate]){
                        objectReservation[formattedDate] = []
                    }
                    objectReservation[formattedDate].push(reservation)
                })
                setAllReservations(objectReservation);

                const objectOffers = { ...offers };
                for (const reservation of reservations) {
                    const slug = reservation.offer_slug;
                    if (!objectOffers[slug]) {
                        const response = await getOfferBySlug(slug);
                        objectOffers[slug] = response.offer;
                    }
                }
                setOffers(objectOffers);
            }
        };

        fetchData();
    }, [authState.loading, authState.user?.id]);



    useEffect(() => {
        console.log(AllReservations)
        console.log(offers);
    }, [AllReservations, offers])

    return (
        <div className="Reservations">
            <p className="t32">Mes reservation</p>
            <div className="AllReservations">
                {
                    false && Object.entries(AllReservations).length > 0 ? Object.entries(AllReservations).map(([date, reservations]) => {
                        return (
                            <React.Fragment key={`${date}`}>
                            <p className="t6">{date}</p>
                            {
                                reservations.length > 0 ? reservations.map((reservation) => {
                                return (
                                    <React.Fragment key={reservation.reservation_id}>
                                    <div className="ReservationItem" onClick={() => {
                                        navigate(`/reservations/${reservation.reservation_id}`)
                                    }}>
                                        <div className="ImagesOffers">
                                        {/* {
                                            Array.from({ length: 2 }).map((_, index) => {
                                                const imageOffer = allOffers[slot.offer_slug].image_urls[index]; 
                                                return (
                                                    imageOffer && */}
                                                        {/* // <>
                                                        // <p className="TESTINUMBER">{index}</p> */}
                                                        <div className="ImageWrapper">
                                                            {offers[reservation.offer_slug]?.image_urls[1] && 
                                                                <FadeInImage src={offers[reservation.offer_slug]?.image_urls[1]} alt="offer imageReservation offer image"/>
                                                            }
                                                        </div>
                                                        <div className="ImageWrapper">
                                                            <FadeInImage src={offers[reservation.offer_slug]?.image_urls[0]} alt="offer imageReservation offer image"/>
                                                        </div>
                                                    {/* );
                                                })
                                            } */}
                                        </div>
                                        <div className="column">
                                            <p className="t4 maxLine maxLine1">{offers[reservation.offer_slug]?.title}Explorez les calanques en kayak</p>
                                            <div className="hlinedashed"></div>
                                            {/* <p className="t6">07/11/2025 à 14:35</p> */}
                                            <div className="row">
                                                <div className="column">
                                                    <p className="t6">Participant : {reservation.total_participants ?? 0}</p>
                                                    <p className="t6">×{reservation.nb_adult} adult  {reservation.nb_reduced ? `×${reservation.nb_reduced} reduced` : ""}</p>
                                                </div>
                                                <p className="t4">{reservation.total_price}€</p>
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
                    :
                    <div className="NoReservation">
                        <div className="MessageNone">
                            <img src={noReservations} alt="no reservations image"/>
                            <p className="t6">Vous n'avez aucune réservation pour <br></br>le moment.</p>
                            <WhiteButton text={"Rechercher des annonces"} onClick={() => navigate("/")} img={loupeicon} alt={"loupe icon"}/>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}