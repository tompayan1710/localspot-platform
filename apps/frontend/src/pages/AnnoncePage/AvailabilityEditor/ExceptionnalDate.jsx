import TimeOnlyPicker from "../../../components/Auth/ProfilPage/BookingSystem/TimeOnlyPicker";
import GoBack from "../../../components/GoBack/GoBack"
import "./AvailabilityEditor.css"
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import crossiconBlack from "../../../assets/images/crossiconBlack.png"
import arrowLeft from "../../../assets/images/arrowLeft.png"
import arrowRight from "../../../assets/images/arrowRight.png"
import VerifyIcon from "../../../assets/images/VerifyIcon.png"
import { DayPicker } from "react-day-picker";

const Exceptionnal = forwardRef((props, ref) => {
    /*//////////////////:Exceptionnal*/
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [selectedDate, setSelectedDate] = useState(tomorrow);


    const creneauRef = useRef(null); // ← Étape 1

    //format ISO court YYYY-MM-DD
    // const [availability, setAvailability] = useState({
    // // "2025-06-30": [
    // //     { id: 1, from: "10:00", to: "12:00" },
    // //     { id: 2, from: "14:00", to: "15:00" }
    // // ],
    // // "2025-07-06": [
    // //     { id: 3, from: "09:00", to: "11:30" }
    // // ]
    // });

    const updateAvailability = (day, id, field, newTime) => {
        props.setAvailability((prev) => ({
        ...prev,
        [day]: prev[day].map((slot) =>
            slot.id === id ? { ...slot, [field]: newTime } : slot
        ),
        }));
    };

    const addSlotToDate = (dateStr, from, to) => {
        props.setAvailability((prev) => {
            const existing = prev[dateStr] || [];
            return {
            ...prev,
            [dateStr]: [...existing, { id: Date.now(), from, to }]
            };
        });
        };


    const isToday = (selectedDate) => {
        if (!selectedDate) return false;

        const today = new Date();
        return (
            selectedDate.getFullYear() === today.getFullYear() &&
            selectedDate.getMonth() === today.getMonth() &&
            selectedDate.getDate() === today.getDate()
        );
    };


    // 2. Un autre pour la date sélectionnée
    useEffect(() => {
        if (selectedDate) {
            console.log("Date sélectionnée :", selectedDate);
            const dateKey = selectedDate?.toLocaleDateString("fr-CA"); // format YYYY-MM-DD
            const slots = props.availability[dateKey] || [];
            console.log("Date sélectionnée dateKey :", dateKey);
            console.log("-> slots associé :", slots);
        }
    }, [selectedDate]);

    const datesWithSlots = Object.entries(props.availability)
        .filter(([_, slots]) => slots.length > 0)
        .map(([dateStr]) => new Date(dateStr));
const internalRef = useRef();


    return (
        <div className="DayPickerContainer" ref={(el) => {
            ref && (typeof ref === "function" ? ref(el) : ref.current = el);
            internalRef.current = el;
        }}>
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
                    modifiers={{
                        hasSlots: datesWithSlots,
                        selectedGreen: !props.isCancel ? [selectedDate] : [],
                        selectedRed: props.isCancel ? [selectedDate] : [],
                    }}
                    modifiersClassNames={{
                        hasSlots: `day-has-slots ${props.isCancel ? "red" : "green"}`,
                        selectedGreen: "selected-green",
                        selectedRed: "selected-red",
                    }}
                />
            </div>
                
            <div className="CreneauPicker" ref={creneauRef}>
                {/* <p className="t5">
                {props.isCancel
                    ? "Créneaux rendus exceptionnellement indisponibles :"
                    : "Créneaux rendus exceptionnellement disponibles :"}
                </p> */}
                <p className="t5">
                {props.isCancel
                    ? "Indisponibilités exceptionnelles :"
                    : "Disponibilités exceptionnelles :"}
                </p>

                <div className="column">
                    {selectedDate && (
                     <>
                    {(props.availability[selectedDate.toLocaleDateString("fr-CA")] || []).map((slot) => (
                        <div className="row" key={slot.id}>
                            {/* /////////////////////dddddddddddddddddddddddddddddddddddddddddddddddddd////// */}
                            <p className="t5">From</p>
                            <TimeOnlyPicker
                            updateAvailability={updateAvailability}
                            day={selectedDate.toLocaleDateString("fr-CA")}
                            id={slot.id}
                            field="from"
                            slot={slot.to}
                            hour={parseInt(slot.from.split(":")[0])}
                            minute={parseInt(slot.from.split(":")[1])}
                            />                  
                            <p className="t5">to</p>
                            <TimeOnlyPicker
                            updateAvailability={updateAvailability}
                            day={selectedDate.toLocaleDateString("fr-CA")}
                            id={slot.id}
                            field="to"
                            slot={slot.from}
                            hour={parseInt(slot.to.split(":")[0])}
                            minute={parseInt(slot.to.split(":")[1])}
                            />        

                            {/* /////////////////////dddddddddddddddddddddddddddddddddddddddddddddddddd////// */}                
                            <button
                                className="removecreneau"
                                onClick={() => {
                                const dateKey = selectedDate.toLocaleDateString("fr-CA");
                                props.setAvailability((prev) => ({
                                    ...prev,
                                    [dateKey]: prev[dateKey].filter((s) => s.id !== slot.id),
                                }));
                                }}
                            >
                                <img src={crossiconBlack} alt="close icon" />
                            </button>
                        </div>
                    ))}
                    {
                    (props.availability[selectedDate.toLocaleDateString("fr-CA")] || []).length > 1
                        ? <div id="spacing"></div>
                        : <></>
                    }
                    </>
                    )}

               {isToday(selectedDate) 
               ? 
               <div className="error-message">
                    <p className="t5" style={{ color: "orange" }}>
                        Vous ne pouvez pas annuler les créneaux du jour même. Cela pourrait impacter négativement l’expérience des clients.
                    </p>
                </div>
                :
                <button className="addOne" onClick={() => {
                    const dateStr = selectedDate?.toLocaleDateString("fr-CA"); // "2025-07-05"
                    console.log("J'ajoutes à :", dateStr);
                    props.preventChange((prev) => prev+1);
                    props.setAvailability((prev) => {
                        const existingSlots = prev[dateStr] || [];

                        let newFrom = "08:00";
                        let newTo = "09:00";

                        if (existingSlots.length > 0) {
                            const lastSlot = existingSlots[existingSlots.length - 1];
                            const [lastHour, lastMinute] = lastSlot.to.split(":").map(Number);

                            if (lastHour >= 23) return prev;

                            newFrom = lastSlot.to;
                            const newToHour = lastHour + 1;
                            newTo = `${newToHour > 9 ? newToHour : "0" + newToHour}:${lastMinute > 9 ? lastMinute : "0" + lastMinute}`;
                        }

                        return {
                            ...prev,
                            [dateStr]: [...existingSlots, { id: Date.now(), from: newFrom, to: newTo }],
                        };
                        });

                }}>
                    <p className="t5"><strong>+</strong> Ajouter</p>
                </button>
                }
                </div>
            </div>
        </div>
    )
}
)

export default Exceptionnal;