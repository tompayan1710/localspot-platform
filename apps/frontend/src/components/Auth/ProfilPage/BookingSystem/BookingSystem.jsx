import React, { useState, useRef, useEffect } from "react";
import GoBack from "../../../GoBack/GoBack";
import "./BookingSystem.css";
import TimeOnlyPicker from "./TimeOnlyPicker";
import crossiconBlack from "../../../../assets/images/crossiconBlack.png"

export default function BookingSystem() {
  
  const connectGoogle = () => {
    window.location.href = `${process.env.REACT_APP_API_URL}/api/google/auth`; // ⬅️ redirige vers le backend
  };

  const getEvents = async () => {
    
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/google/events`, {
      credentials: "include", // ⬅️ pour envoyer le cookie
    });
    const data = await res.json();
    console.log("📅 Événements :", data);
  };

  const addEvent = async () => {
    const event = {
      summary: "Visite guidée locale",
      location: "Place du marché, Toulouse",
      description: "Activité avec un guide",
      start: {
        dateTime: "2025-07-05T10:00:00+02:00",
        timeZone: "Europe/Paris"
      },
      end: {
        dateTime: "2025-07-05T12:00:00+02:00",
        timeZone: "Europe/Paris"
      }
    };

    const res = await fetch("http://localhost:3000/api/google/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify(event)
    });

    const data = await res.json();
    if (res.ok) {
      alert("✅ Événement ajouté !");
      console.log(data);
    } else {
      alert("❌ Erreur ajout !");
      console.error(data);
    }
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


  return (
    <div className="BookingSystemContainer">
      <GoBack nagigation={`/profile`} scrollTo={``} text={"revenir"} />
      <p className="t2">BookingSystem</p>

      <button onClick={connectGoogle} className="connectBtn">Connecter Google Calendar</button>
      <button onClick={getEvents} className="connectBtn">Voir événements</button>
      <button onClick={addEvent} className="connectBtn">Ajouter événement</button>

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
                  {/* Add More */}
                </button>
              </div>
            </div>
          ))
        }

        {/* <TimeOnlyPicker /> */}
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
      </div>
    </div>
  );
}
