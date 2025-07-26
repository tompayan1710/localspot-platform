import "./Today.css"

import { useState, useEffect, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import NiceIntro from "../../assets/images/NiceIntro.jpg"
import NiceIntro1 from "../../assets/images/NiceIntro1.png"
import Map2DPin from "../../assets/images/Map2DPin.png"
import plus from "../../assets/images/plus.png"
import { AuthContext } from "../../components/Auth/authContext/authContext"
import Spinner from "../../components/Spinner/Spinner";
import FadeInImage from "../../components/Utils/FadeInImage";
import { linearTheme } from "../../services/themeModifier";


export default function Today() {
  const navigate = useNavigate();
  const allDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [firstMonth, setFirstMonth] = useState("");
  const [lastMonth, setLastMonth] = useState(""); 
  const [next7Days, setNext7Days] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const degImage = [5, -3, 4, -5];
  const translateYImage = [0, -2, 6, -2];
  const [ allCreneaux, setAllCreneaux ] = useState({});
  const [ allOffers, setAllOffers ] = useState({});
  const [ now, setNow ] = useState(new Date());

  const [creneauOfSelectedDate, setCreneauOfSelectedDate ] = useState({});

  const { authState, logout } = useContext(AuthContext);

    const getNext7DaysCreneaux = async (provider_id) => {
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
        body: JSON.stringify({ provider_id, numofday: 7 }),
        });

        const data = await res.json();
        console.warn(data);
        if(data.success){
            setAllCreneaux(data.slots);
            setAllOffers(data.offers)
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
        getNext7DaysCreneaux(authState.user.provider_id);
    }
  }, [authState.loading, authState.isAuth, navigate])

  useEffect(() => {
    console.log(next7Days);
  }, [next7Days]);

  useEffect(() => {
    if(!isLoading) {
        setCreneauOfSelectedDate(() => {
            const temp = {};
            // console.log(allCreneaux[next7Days[selectedDay].toLocaleDateString('fr-CA')])
            allCreneaux[next7Days[selectedDay].toLocaleDateString('fr-CA')] && allCreneaux[next7Days[selectedDay].toLocaleDateString('fr-CA')].forEach((slot) => {
                // console.log(slot);
                const key = `${slot.start_hour}-${slot.end_hour}`
                if(!temp[key]) temp[key]= [];
                temp[key].push(slot);
            });
            return temp;
        })
    }
  }, [isLoading, selectedDay])

  useEffect(() => {
    console.log(creneauOfSelectedDate);
  }, [creneauOfSelectedDate])


    useEffect(() => {
        const TodayWeek = document.getElementById("TodayweekContainer");
        const SpinnerContainer = document.getElementById("SpinnerContainer");

        if (TodayWeek && SpinnerContainer) {
            const heightTodayWeek = TodayWeek.scrollHeight;
            SpinnerContainer.style.setProperty('--heightTop', `${heightTodayWeek}px`);
        }
    }, [isLoading]);


    useEffect(() => {
      const from = [243, 244, 246]; 
      const to = [255, 255, 255]; 
      const cleanup = linearTheme(from, to);

      return cleanup; // ✅ on nettoie l'écouteur au démontage du composant
    }, []);

  return (
    <div className="TodayReservationPage">
        <div id="TodayweekContainer" className="TodayweekContainer">
            {next7Days.length > 0 && !isLoading ? 
            <>
            <div className="row">
                <p className="t2">{firstMonth}</p>
                {
                    lastMonth && (
                        <p className="t2">- {lastMonth}</p>
                    )
                }
            </div>
            <div className="Today7date">

            
                {next7Days.map((date, index) => (
                <div key={index} className="column">
                    <p className="t5">{allDay[date.getDay()]}</p>
                    <button
                    className={`${selectedDay === index ? "selected" : ""} t5`}
                    onClick={() => {
                        setSelectedDay(index)
                        setNow(new Date());
                    }}
                    >
                    {date.getDate()}
                    </button>
                    {
                        allCreneaux[next7Days[index].toLocaleDateString('fr-CA')] && <div className="isReservation"></div>
                    }
                </div>
                ))
                }
            </div>
            </>
            : (
                <>
                <div className="MonthSquelette shimmer"></div>
                {/* <p>Chargement...</p> */}
                <div className="Today7date">
                {
                    Array.from({length: 7}).map((_, index) => {
                        return (
                            <div className="column" key={index}>
                                <div className="DaySquelette shimmer"></div>
                                <div className="DayButtonSquelette shimmer"></div>
                                <div className="ReservationSquelette shimmer"></div>
                            </div>
                        );
                    })
                }
                </div>
                </>
            )}
        </div>
        <div className="reservationList">
            <div className="barToScroll"></div>
            {
                // !isLoading ? ( allCreneaux[next7Days[selectedDay].toLocaleDateString('fr-CA')] ? 
                !isLoading ? ( Object.keys(creneauOfSelectedDate).length > 0 ? 
                (
                    
                    // allCreneaux[next7Days[selectedDay].toLocaleDateString('fr-CA')].map((slot) => { 
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
                        console.log(next7Days[selectedDay].toLocaleDateString('fr-CA'))
                        const dateCreneau = next7Days[selectedDay].toLocaleDateString('fr-CA');
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
                            <div key={timeRange} className={`SlotReservation row ${slotStatus}`}>
                                <div className="column CreneauColumn">
                                    {slotStatusLabels[slotStatus] && (
                                        // <p className="t5">{t(`status.${slotStatusLabels[slotStatus]}`)}</p>//Plus tard avec i18n
                                        <p className="t5">{`${slotStatusLabels[slotStatus]}`}</p>
                                    )}
                                    <div className="column">
                                        <div className="t6 Creneau">{slot_start_hour}</div> 
                                        <div className="lineHorrizontal"></div>
                                        <div className="t6 Creneau">{slot_end_hour}</div> 
                                    </div>
                                </div>
                                <div className="column AllCreneauReserved">
                                    {slotsArray.map((slot) => (
                                        <div key={`${timeRange}-${slot.offer_slug}`} className="ReservationItem">
                                            <div className="ReservationDetail">
                                                <div className="allImages">
                                                    {
                                                        Array.from({ length: 4 }).map((_, index) => {
                                                        const imageOffer = allOffers[slot.offer_slug].image_urls[index]; 
                                                        return (
                                                            imageOffer &&
                                                            // <>
                                                            // <p className="TESTINUMBER">{index}</p>
                                                            <div 
                                                                className="ImageWrapper" key={index}
                                                                style={{ transform: `translateX(calc(${3- index} * -15px)) translateY(${translateYImage[index]}px) rotate(${degImage[index]}deg)`}}>
                                                                <FadeInImage src={imageOffer} alt="offer image"/>
                                                            </div>
                                                        );
                                                        })
                                                    }
                                                </div>
                                                <p className="t6">ref : #{slot.offer_slug}</p>
                                                <p className="t4">{allOffers[slot.offer_slug].title}</p>
                                                <div className="hlinedashed"></div>
                                                {
                                                    slotStatus !== "completed" ?
                                                    <>
                                                    <div className="adresse">
                                                        <img src={Map2DPin} alt="pin image"/>
                                                        <p className="t6">{allOffers[slot.offer_slug].adresse}</p>
                                                    </div>
                                                    <div className="hlinedashed"></div>
                                                    <div className="column">
                                                        <p className="t5">Participant : {slot.total_reserved} {allOffers[slot.offer_slug].total_capacity - slot.total_reserved === 0 && "(COMPLET)"}</p>
                                                        <p className="t6">×2 adult&nbsp;&nbsp;×2 reduced</p>
                                                    </div>
                                                    <div className="row">
                                                        <div className="rowParticipant">
                                                            <div><img src={plus} alt="plus icon"/></div>
                                                            <img src={NiceIntro} alt="reservation Offer image"/>
                                                            <img src={NiceIntro} alt="reservation Offer image"/>
                                                            <img src={NiceIntro} alt="reservation Offer image"/>
                                                        </div>
                                                        <button className="t6">see&nbsp;all</button>
                                                    </div>
                                                    <div className="hlinedashed"></div>
                                                </>
                                                : 
                                                <></>
                                                }
                                                        
                                                <div className="row">
                                                    <p className="t32">TOTAL</p>
                                                    <p className="t32">
                                                        {(slot.total_reserved * slot.price_per_person).toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
                                                    </p>
                                                </div>
                                            </div>   
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                })
                    
                )
                
                :
                <div className="NoCreneau">
                    <p className="t32">{now.getDay() == allDay[selectedDay] ? "Aucune réservations pour aujourd'hui." : "Actuellement aucune réservations"}</p>
                    <p className="t6">
                    Vous pouvez permettre aux clients de réserver jusqu’à 1 heure avant le début de l’activité. Grâce à cela capter les clients de dernière minutes !
                    </p>
                    <button className="whiteButton" onClick={() => {
                        // navigate("/create-offer", {
                        //     state: {
                        //         origin: "/today"
                        //     }
                        // });
                        navigate("/annonces", {
                            state: {
                                activeTab: "annonces"
                            }
                        })
                    }}>
                        {/* <p className="t5">Mettre en avant mes offres</p> */}
                        <p className="t5">Voir mes annonces</p>
                    </button>
                </div>
            )
                :<div id={"SpinnerContainer"} className="SpinnerContainer">
                    <Spinner />
                </div>
            }
        </div>
        {/* <Footer /> */}
    </div>
  );
}
