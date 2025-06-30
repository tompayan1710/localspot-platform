import TimeOnlyPicker from "../../../components/Auth/ProfilPage/BookingSystem/TimeOnlyPicker";
import GoBack from "../../../components/GoBack/GoBack"
import "./AvailabilityEditor.css"
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import crossiconBlack from "../../../assets/images/crossiconBlack.png"
import arrowLeft from "../../../assets/images/arrowLeft.png"
import arrowRight from "../../../assets/images/arrowRight.png"
import VerifyIcon from "../../../assets/images/VerifyIcon.png"
import { DayPicker } from "react-day-picker";

export default function Exceptionnal(){
    /*//////////////////:Exceptionnal*/
    const [selectedDate, setSelectedDate] = useState();
    const { slug } = useParams();

    const creneauRef = useRef(null); // ← Étape 1
    const [barStyle, setBarStyle] = useState({ width: 0, angle: 0 });
    const [isOccultView, setIsOccultView] = useState(false);
    const [participantAdult, setParticipantAdult] = useState(4);
    const [participantReduced, setParticipantReduced] = useState(0); 
    const [selectedCreneau, setSelectedCreneau] = useState(0);

    const ParticipantBottomRef = useRef(null); 
    const LoginBottomRef = useRef(null); 

    //format ISO court YYYY-MM-DD
    const [availability, setAvailability] = useState({
    "2025-06-30": [
        { id: 1, from: "10:00", to: "12:00" },
        { id: 2, from: "14:00", to: "15:00" }
    ],
    "2025-07-06": [
        { id: 3, from: "09:00", to: "11:30" }
    ]
    });

    const updateAvailability = (day, id, field, newTime) => {
        setAvailability((prev) => ({
        ...prev,
        [day]: prev[day].map((slot) =>
            slot.id === id ? { ...slot, [field]: newTime } : slot
        ),
        }));
    };

    const addSlotToDate = (dateStr, from, to) => {
        setAvailability((prev) => {
            const existing = prev[dateStr] || [];
            return {
            ...prev,
            [dateStr]: [...existing, { id: Date.now(), from, to }]
            };
        });
        };


    // 2. Un autre pour la date sélectionnée
    useEffect(() => {
        if (selectedDate) {
            console.log("Date sélectionnée :", selectedDate);
            const dateKey = selectedDate?.toLocaleDateString("fr-CA"); // format YYYY-MM-DD
            const slots = availability[dateKey] || [];
            console.log("Date sélectionnée dateKey :", dateKey);
            console.log("-> slots associé :", slots);
        }
    }, [selectedDate]);

    return (
        <div className="DayPickerContainer">
            <div className="CalendarContainer">
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
                />
            </div>
                
            <div className="CreneauPicker" ref={creneauRef}>
                <p className="t5">Creneaux indisponnibles : </p>
                <div className="column">
                    {
                        // slots.map(slot => (
                        // <div key={slot.id}>
                        //     <TimeOnlyPicker ... />
                        // </div>
                        // ))


                    }
                    {/* const dateKey = selectedDate?.toISOString().split("T")[0]; // "2025-07-05"
const slots = exceptionalAvailability[dateKey] || []; */}

                    <div 
                        className="row" 
                        // key={slot.id}
                    >
                        <p className="t5">From</p>
                    <TimeOnlyPicker
                        updateAvailability={updateAvailability}
                        // day={day}
                        // id={slot.id}
                        field="from"
                        // slot={slot.to}
                        // hour={parseInt(slot.from.split(":")[0])}
                        // minute={parseInt(slot.from.split(":")[1])}
                    />                  
                    <p className="t5">to</p>
                    <TimeOnlyPicker
                        updateAvailability={updateAvailability}
                        // day={day}
                        // id={slot.id}
                        field="to"
                        // slot={slot.from}
                        // hour={parseInt(slot.to.split(":")[0])}
                        // minute={parseInt(slot.to.split(":")[1])}
                    />
                    <button className="removecreneau" onClick={() => {
                        setAvailability((prev) => ({
                            // ...prev,
                            // [day]: prev[day].filter((s) =>  s.id !== slot.id)
                        }))
                        }}>
                        <img src={crossiconBlack} alt="close icon"/>
                    </button>
                </div>
                <div id="spacing"></div>
                <button className="addOne">
                    <p className="t5"><strong>+</strong> Ajouter</p>
                </button>
                </div>
            </div>
        </div>
    )
}

