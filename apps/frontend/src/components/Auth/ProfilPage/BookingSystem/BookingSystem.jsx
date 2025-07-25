import React, { useState, useRef, useEffect, useContext } from "react";
import GoBack from "../../../GoBack/GoBack";
import "./BookingSystem.css";
import TimeOnlyPicker from "./TimeOnlyPicker";
import crossiconBlack from "../../../../assets/images/crossiconBlack.png"
import ArrowLeftAndRight from "../../../../assets/images/ArrowLeftAndRight.png"
import ViarteLogo from "../../../../assets/images/ViarteLogo.png"
import GoogleCalendarIcon from "../../../../assets/images/GoogleCalendarIcon.png"
import { AuthContext } from "../../authContext/authContext";

export default function BookingSystem() {
  const { authState } = useContext(AuthContext);
  
  const connectGoogle = () => {
    if(authState.loading){
      console.warn("Veuillez passienté, chargement de l'authentification");
      return;
    }else{
      if(authState.isAuth){
        window.location.href = `${process.env.REACT_APP_API_URL}/api/google/auth?provider_id=${authState.user?.provider_id}`;// ⬅️ redirige vers le backend
      }else{
        console.error("Vous devez être prestataire pour pouvoir connecter un système de réservation")
      }
    }
  };

  const getEvents = async () => {
    const providerId = authState.user?.provider_id;
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/google/events?provider_id=${providerId}`);
    const data = await res.json();
    console.log("📅 Événements :", data);
  };




  const [availability, setAvailability] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  const [ isOpen, setIsOpen ] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false
  }
  );

  const dayNames = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
  const [heights, setHeights] = useState({});

  const refs = useRef({});

  useEffect(() => {
  const newHeights = {};

  Object.entries(isOpen).forEach(([day, open]) => {
    if (open && refs.current[day]?.current) {
      newHeights[day] = refs.current[day].current.scrollHeight;
    } else {
      newHeights[day] = 0;
    }
  });

  setHeights(newHeights);
}, [isOpen, availability]);

  useEffect(() => {
    dayNames.forEach((day) => {
      refs.current[day] = React.createRef();
    });
  })


  const updateAvailability = (day, id, field, newTime) => {
    setAvailability((prev) => ({
      ...prev,
      [day]: prev[day].map((slot) =>
        slot.id === id ? { ...slot, [field]: newTime } : slot
      ),
    }));
  };




async function saveCreneau({
  provider_id,
  offerSlug,
  date,
  start_hour,
  end_hour,
  location,
  participants,
  totalPrice
}) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/google/save-creaneau`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider_id,
        offerSlug,
        date,
        start_hour,
        end_hour,
        location,
        participants,
        totalPrice
      })
    });

    const data = await response.json();

    if (data.success) {
      if (data.action === "created") {
        alert("✅ Créneau ajouté au Google Calendar !");
      } else if (data.action === "updated") {
        alert("✅ Créneau mis à jour dans Google Calendar !");
      }
    } else {
      alert("❌ Erreur lors de l’enregistrement du créneau");
    }

    return data;
  } catch (error) {
    console.error("❌ Erreur lors de la sauvegarde :", error);
    alert("❌ Problème de connexion ou de serveur");
    return null;
  }
}

  /*///////////////////////////*/

  return (
    <div className="BookingSystemContainer">
      <GoBack nagigation={`/profile`} scrollTo={``} text={"revenir"} />
      <div className="ContentContainer">
        <div className="row">
          <img className="Connecting" src={ViarteLogo} alt="Viarte Logo"/>
          {/* <div className="horizontalLine"></div> */}
          <img className="TheConnection" src={ArrowLeftAndRight} alt="Arrow left and right"/>
          <img className="Connecting" src={GoogleCalendarIcon} alt="Google Calendar Logo"/>
        </div>
        <p className="t5">Connectez votre agenda Viarte à Google Agenda</p>
        {/* <p className="t6">
          Une fois connecté, toutes vos réservations Viarte seront synchronisées dans un agenda Google, avec les détails essentiels.
        </p> */}

        <p className="t6">
          Les réservations seront ajoutées dans un agenda séparé, exclusivement dédié à Viarte, pour ne pas interférer avec votre agenda personnel.
        </p>
        
        <button onClick={connectGoogle}>
          <p className="t6">Connecter mon Agenda</p>
        </button>
        <p className="t6">
          En vous connectant, vous autorisez Viarte à créer et modifier des événements dans votre Google Agenda dédié, incluant les horaires, adresses et détails des participants.
        </p>
      </div>
      {/* <button onClick={connectGoogle} className="connectBtn">Connecter Google Calendar</button>
      <button onClick={getEvents} className="connectBtn">Voir événements</button>
      <button
        className="saveButton"
        onClick={() => {
          saveCreneau({
            provider_id: authState.user?.provider_id,
            offerSlug: "BIG TOM",
            date: "2025-07-04",
            start_hour: "10:00",
            end_hour: "12:00",
            location: "Enden",
            participants: 7,
            totalPrice: 200
          });
        }}
      >
        Enregistrer ou modifier le créneau
      </button>


      <div className="DayCreneaux">
        {
          Object.entries(availability).map(([day, slots]) => (
            <div key={day} className={`DayContainer ${isOpen[day] ? "open" : ""}`}>
              <div className="row">
                <p className="t5">{day.toUpperCase()}</p>
                <button className="switch" onClick={() => {
                  setIsOpen((prev) => ({
                    ...prev,
                    [day]: !prev[day],
                  }))

                  if(availability[day].length===0){
                    setAvailability((prev) => ({
                      ...prev,
                      [day]: [...prev[day], {id: Date.now(), from: "07:00", to: "08:00"}],
                    }))
                  }
                }}
                >
                  <div></div>
                </button>
              </div> 
              <div className="column"
                style={{
                  maxHeight: `${heights[day] || 0}px`,
                }}
                ref={refs.current[day]}
              >
                {slots.map((slot, index) => (
                  <div 
                    className="row" 
                    key={slot.id}
                  >
                    <p className="t5">From</p>
                    <TimeOnlyPicker
                      updateAvailability={updateAvailability}
                      day={day}
                      id={slot.id}
                      field="from"
                      slot={slot.to}
                      hour={parseInt(slot.from.split(":")[0])}
                      minute={parseInt(slot.from.split(":")[1])}
                    />                  
                    <p className="t5">to</p>
                    <TimeOnlyPicker
                      updateAvailability={updateAvailability}
                      day={day}
                      id={slot.id}
                      field="to"
                      slot={slot.from}
                      hour={parseInt(slot.to.split(":")[0])}
                      minute={parseInt(slot.to.split(":")[1])}
                    />
                    <button className="removecreneau" onClick={() => {
                      setAvailability((prev) => ({
                        ...prev,
                        [day]: prev[day].filter((s) =>  s.id !== slot.id)
                      }))
                    }}>
                      <img src={crossiconBlack} alt="close icon"/>
                    </button>
                  </div>
                ))}
                
                <button className="addOne" onClick={() => {
                  setAvailability((prev) => {
                    const lastSlot = prev[day][prev[day].length - 1];

                    const [lastHour, lastMinute] = lastSlot.to.split(":").map(Number);

                    if(lastHour>=23){
                      return {
                        ...prev,
                      }
                    }

                    const newFrom = lastSlot.to;

                    const newToHour = lastHour+1;
                    const newTo = `${newToHour > 9 ? newToHour : "0"+newToHour}:${lastMinute > 9 ? lastMinute : "0"+lastMinute}`;

                    return {
                      ...prev,
                      [day]: [...prev[day], {id: Date.now(), from: newFrom, to: newTo}],
                    }
                  })
                }}>
                  <p className="t5"><strong>+</strong> Ajouter</p>
                </button>
              </div>
            </div>
          ))
        }

        <button id="LOGINFO" onClick={() => {
          Object.entries(availability).forEach(([day, slots]) => {
            console.log(day);
            slots.forEach((slot) => {
              console.log(slot);
            })
          })
        }}>
          LOGINFO
        </button>
      </div> */}
    </div>
  );
}
