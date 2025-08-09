import "./Calendar.css"
import crossiconBlack from "../../assets/images/crossiconBlack.png"
import arrowLeft from "../../assets/images/arrowLeft.png"
import arrowRight from "../../assets/images/arrowRight.png"
import NiceIntro from "../../assets/images/NiceIntro.jpg"
import NiceIntro1 from "../../assets/images/NiceIntro1.png"
import plus from "../../assets/images/plus.png"
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../components/Auth/authContext/authContext"
import { DayPicker } from "react-day-picker";
import Spinner from "../../components/Spinner/Spinner"
import FadeInImage from "../../components/Utils/FadeInImage"
import Map2DPin from "../../assets/images/Map2DPin.png"
import { linearTheme } from "../../services/themeModifier"

export default function Calendar(){

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [selectedDate, setSelectedDate] = useState(tomorrow);

    const navigate = useNavigate();
    const allDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const [firstMonth, setFirstMonth] = useState("");
    const [lastMonth, setLastMonth] = useState("");
    const [next30Days, setNext7Days] = useState([]);
    // const [selectedDay, setSelectedDay] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const degImage = [5, -3, 4, -5];
    const translateYImage = [0, -2, 6, -2];
    const [ allCreneaux, setAllCreneaux ] = useState({});
    const [ allOffers, setAllOffers ] = useState({});
    const [ now, setNow ] = useState(new Date());
    const [ datesWithSlots, setDatesWithSlots ] = useState(new Date());

    const [creneauOfSelectedDate, setCreneauOfSelectedDate ] = useState({});

    const { authState, logout } = useContext(AuthContext);

    const getNext30DaysCreneaux = async (provider_id) => {
        try {
            const today = new Date();
            const days = [];
            const firstMonthName = today.toLocaleDateString('en-US', { month: 'long' });
            setFirstMonth(firstMonthName);

            let lastMonthName;
            for (let i = 0; i < 7; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const currentMonth = date.toLocaleDateString('en-US', { month: 'long' });
            if (currentMonth !== firstMonthName) {
                lastMonthName = currentMonth;
            }
            days.push(date);
            }

            setLastMonth(lastMonthName);
            setNext7Days(days);
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reservations/getnextXdays`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ provider_id, numofday: 30 }),
            });

            const data = await res.json();
            console.warn(data);
            if(data.success){
                setAllCreneaux(data.slots);
                setAllOffers(data.offers)

                setDatesWithSlots(() => {
                    const dateObjectsWithSlots = Object.keys(data.slots).map(dateStr => {
                        return new Date(dateStr); // "2025-07-12" => Date
                    });
                    return dateObjectsWithSlots;
                })
            }else{
                console.error("❌ Erreur getNext7DaysCreneaux :", data.error);
                return
            }
        } catch (error) {
            console.error("❌ Erreur getNext7DaysCreneaux :", error);
            return;
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000)
            return;
        }
    };


    useEffect(() => {
        console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
        if (!authState.loading && !authState.isAuth) {
        console.log("🔄 Redirection car non authentifié");
        navigate("/login", {
            state: {
            origin: "/",
            scrollTo: ""
            }
        });
        }

        if (authState.user?.provider_id && authState.user?.provider?.is_validated) {
            getNext30DaysCreneaux(authState.user.provider_id);
        }
    }, [authState.loading, authState.isAuth, navigate])

    useEffect(() => {
        console.log(next30Days);
    }, [next30Days]);

    useEffect(() => {
        console.log(selectedDate)
        if(!isLoading) {
            setCreneauOfSelectedDate(() => {
                const temp = {};
                // console.log(allCreneaux[next30Days[selectedDay].toLocaleDateString('fr-CA')])
                allCreneaux[selectedDate.toLocaleDateString('fr-CA')] && allCreneaux[selectedDate.toLocaleDateString('fr-CA')].forEach((slot) => {
                    // console.log(slot);
                    const key = `${slot.start_hour}-${slot.end_hour}`
                    if(!temp[key]) temp[key]= [];
                    temp[key].push(slot);

                });
                return temp;
            })
        }
    }, [isLoading, selectedDate])

    useEffect(() => {
        console.log(creneauOfSelectedDate);
    }, [creneauOfSelectedDate])


    const getDateWithMaj = (date) => {
        const dateLabel = date.toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long", 
        });
        return dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1);
    }

    const dateLimit = new Date(now);
    dateLimit.setDate(now.getDate() + 30);


    useEffect(() => {
        const Calendar = document.getElementById("CalendarContainer");
        const SpinnerContainer = document.getElementById("SpinnerContainer");

        if (Calendar && SpinnerContainer) {
            const heightCalendar = Calendar.scrollHeight;
            SpinnerContainer.style.setProperty('--heightTop', `${heightCalendar}px`);
        }
    }, [isLoading]);

    useEffect(() => {
      const from = [243, 244, 246]; 
      const to = [255, 255, 255]; 
      const cleanup = linearTheme(from, to);

      return cleanup; // ✅ on nettoie l'écouteur au démontage du composant
    }, []);

    return (
        <div className="Calendar">
            <div className="DayPickerContainer">
                <div id={"CalendarContainer"} className="CalendarContainer">
                    {/* <p className="t5">Choisissez une date</p> */}
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={[{ before: new Date() }]}
                        weekStartsOn={1}
                        required
                        captionLayout="buttons" // <-- OBLIGATOIRE pour voir les boutons flèches
                        components={{
                        IconLeft: () => (
                            <img
                            src={arrowLeft}
                            alt="Précédent"
                            style={{ width: 18, height: 18, objectFit: "contain" }}
                            />
                        ),
                        IconRight: () => (
                            <img
                            src={arrowRight}
                            alt="Suivant"
                            style={{ width: 18, height: 18, objectFit: "contain" }}
                            />
                        ),
                        }}
                        modifiers={{
                            hasSlots: datesWithSlots,
                            // selectedGreen: !props.isCancel ? [selectedDate] : [],
                        }}
                        modifiersClassNames={{
                            hasSlots: `day-has-slots green`,
                            selectedGreen: "selected-green",
                        }}
                    />
                </div>
                    
            </div>
            <div className="AllReservationList">
                <div className="barToScroll"></div>
                <p className="t3">Reservations</p>
                <div className="row">
                    <p className="t4">{getDateWithMaj(selectedDate)}</p>
                    <div className="hline"></div>
                </div>
                <div>

                </div>
                {
                    !isLoading ?
                    
                    ( Object.keys(creneauOfSelectedDate).length > 0 ?
                    (
                        Object.entries(creneauOfSelectedDate).map(([timeRange, slotsArray]) => {
                        
                                                // console.log(slot)
                                                // Exemple de slot
                                                // const slotDate = "2025-07-11";       // format YYYY-MM-DD
                                                // const startHour = "13:30";           // format HH:mm
                                                // const endHour = "15:00";             // format HH:mm
                                                const slotStatusLabels = {
                                                    ongoing: "En cours",
                                                    upcoming: "Bientôt",
                                                    completed: null,
                                                    normal: null
                                                };
                                                const slot_hours = timeRange.split("-");
                                                const slot_start_hour = slot_hours[0];
                                                const slot_end_hour = slot_hours[1];
                                                console.log(selectedDate.toLocaleDateString('fr-CA'))
                                                const dateCreneau = selectedDate.toLocaleDateString('fr-CA');
                                                // Tu construis des dates complètes en France (GMT+2 l'été)
                                                const startDateTime = new Date(`${dateCreneau}T${slot_start_hour}:00+02:00`);
                                                const endDateTime = new Date(`${dateCreneau}T${slot_end_hour}:00+02:00`);
                                                let slotStatus = "normal";
                        
                                                if (now >= startDateTime && now <= endDateTime) {
                                                    slotStatus = "ongoing";        // En cours
                                                    console.log("✅ Ongoing");
                                                } else if (now < startDateTime) {
                                                    const diffMinutes = (startDateTime - now) / (1000 * 60);
                                                    if (diffMinutes <= 30) {
                                                        slotStatus = "upcoming";    // Bientôt (dans moins de 30 min)
                                                        console.log("⏳ Upcoming");
                                                    } else {
                                                        // slotStatus = "scheduled";   // Programmé mais pas tout de suite
                                                        console.log("🕐 Scheduled -> Normal");
                        
                                                    }
                                                } else if (now > endDateTime) {
                                                    slotStatus = "completed";       // Terminé
                                                    console.log("❌ Completed");
                                                }


                                                return (
                                                    <div className="AllReservationItem" key={timeRange}>
                                                        <div className="t6 Creneau">{slot_start_hour} - {slot_end_hour}</div>
                                                        {
                                                            slotsArray.map((slot) => (
                                                                <div className="reservationDetail" key={slot.offer_slug}>
                                                                    <div className="ImagesOffers">
{
                                                                        Array.from({ length: 2 }).map((_, index) => {
                                                                        const imageOffer = allOffers[slot.offer_slug].image_urls[index]; 
                                                                            return (
                                                                                imageOffer &&
                                                                                // <>
                                                                                // <p className="TESTINUMBER">{index}</p>
                                                                                <div className="ImageWrapper" key={index}>
                                                                                    <FadeInImage src={imageOffer} alt="offer image"/>
                                                                                </div>
                                                                            );
                                                                            })
                                                                        }
                                                                        {/* <img src={NiceIntro} alt="reservation Offer image"/>
                                                                        <img src={NiceIntro1} alt="reservation Offer image"/> */}
                                                                    </div>
                                                                    <div className="column">
                                                                        <p className="t6">ref : #{slot.offer_slug}</p>
                                                                        <p className="t4">{allOffers[slot.offer_slug].title}</p>
                                                                        <div className="hlinedashed"></div>
                                                                        <div className="column">
                                                                            <p className="t5">Participant : {slot.total_reserved} {allOffers[slot.offer_slug].total_capacity - slot.total_reserved === 0 && "(COMPLET)"}</p>
                                                                            <p className="t6">×2 adult&nbsp;&nbsp;×2 reduced</p>
                                                                        </div>
                                                                        {/* <div className="row">
                                                                            <div className="rowParticipant">
                                                                                <div><img src={plus} alt="plus icon"/></div>
                                                                                <img src={NiceIntro} alt="reservation Offer image"/>
                                                                                <img src={NiceIntro} alt="reservation Offer image"/>
                                                                                <img src={NiceIntro} alt="reservation Offer image"/>
                                                                            </div>
                                                                            <button className="t6">see&nbsp;all</button>
                                                                        </div> */}
                                                                        <div className="hlinedashed"></div>
                                                                        <div className="row">
                                                                            <p className="t32">TOTAL</p>
                                                                            <p className="t32">
                                                                                {(slot.total_reserved * slot.price_per_person).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>
                                                )
                                        })
                    )
                    :
                        <div className="NoCreneau">
                            <p className="t32">Actuellement aucune réservations</p>
                            <p className="t6">
                                {
                                    selectedDate < dateLimit ?
                                    "Vous pouvez permettre aux clients de réserver jusqu’à 1 heure avant le début de l’activité. Grâce à cela capter les clients de dernière minutes"
                                    : "Les voyageurs ne peuvent pas réserver une activité plus de 30 jours à l’avance."
                                }
                            </p>
                            <button className="whiteButton" onClick={() => {
                                // navigate("/create-offer", {
                                //     state: {
                                //         origin: "/today"
                                //     }
                                // });
                                navigate("/today", {
                                    state: {
                                        activeTab: "annonces"
                                    }
                                })
                            }}>
                                {/* <p className="t5">Mettre en avant mes offres</p> */}
                                <p className="t5">Aujourd'hui</p>
                            </button>
                        </div>
                    )
                    :
                    <div id={"SpinnerContainer"} className="SpinnerContainer">
                        <Spinner />
                    </div>
                }
            
            </div>
        </div>
    )
}
