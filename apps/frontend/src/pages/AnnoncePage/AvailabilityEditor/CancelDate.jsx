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

const CancelDate = forwardRef((props, ref) => {
    /*//////////////////:Exceptionnal*/
    const [newAvailability, setNewAvailability] = useState(props.availability || {});
    const [datesWithUnavailable, setDatesWithUnavailable] = useState([]);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [selectedDate, setSelectedDate] = useState(tomorrow);


    const creneauRef = useRef(null); // ← Étape 1


    //format ISO court YYYY-MM-DD
    // const [availability, setAvailability] = useState({
    // // "2025-06-30": [
    // //     { from: "10:00", to: "12:00" },
    // //     { from: "14:00", to: "15:00" }
    // // ],
    // // "2025-07-06": [
    // //     { from: "09:00", to: "11:30" }
    // // ]
    // });


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
            const dateKey = selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();// format YYYY-MM-DD
            const slots = newAvailability[dateKey] || [];
            console.log("Date sélectionnée dateKey :", dateKey);
            console.log("-> slots associé :", slots);
        }
    }, [selectedDate]);


    const internalRef = useRef();


    useEffect(() => {
        if (!props.availability) return;

        const tempAvailability = {};
        for (const [day, slots] of Object.entries(props.availability)) {
            if (slots.length > 0 && props.isOpen[day]) {
                tempAvailability[day] = slots;
            }
        }
        setNewAvailability(tempAvailability);


    }, [props.availability, props.isOpen]);



    useEffect(() => {
    const parsed = Object.entries(props.Unavailable || {})
        .filter(([_, slots]) => slots.length > 0)
        .map(([dateStr]) => {
        const [year, month, day] = dateStr.split('-').map(Number);
        return new Date(year, month - 1, day);
    });

    setDatesWithUnavailable(parsed);
    }, [props.Unavailable]);


    const dayKey = selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();
    const slots = newAvailability[dayKey] || [];


    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // useEffect(() => {
    //     // console.error(props.Unavailable)
    // })
    console.log("Données Unavailable reçues :", props.Unavailable);

    return (
        <div className="DayPickerContainer" ref={ref}>
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
                        hasSlots: datesWithUnavailable,
                        selectedGreen: !props.isCancel ? [selectedDate] : [],
                        selectedRed: props.isCancel ? [selectedDate] : [],
                        todayRed: today,
                    }}
                    modifiersClassNames={{
                        hasSlots: `day-has-slots`,
                        selectedGreen: "selected-green",
                        selectedRed: "selected-red",
                        todayRed: "today-red",
                    }}
                />
            </div>
                
            <div className="CreneauPicker" ref={creneauRef}>
                {/* <p className="t5">
                {props.isCancel
                    ? "Créneaux rendus exceptionnellement indisponibles :"
                    : "Créneaux rendus exceptionnellement disponibles :"}
                </p> */}
               {slots.length !== 0 ? (
                    <p className="t5">
                        Créneaux disponibles le&nbsp;
                        <strong>
                        {selectedDate.toLocaleDateString("fr-FR", {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                            year: "numeric"
                        })}
                        </strong>&nbsp;:
                    </p>
                ) : (
                    <p className="t5 NoneCreneau">Aucun créneau à supprimer</p>
                )}

                


                <div className="AllCreneauToRemove">
                    {selectedDate && (
                     <>
                    {(newAvailability[selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()] || []).map((slot, _) => (
                        <div className="RemoveSpecifiqueCreneau" key={_} >
                            <p className={`t5`}
                            style={{
                            textDecoration:
                                (props.Unavailable[selectedDate.toLocaleDateString("fr-CA")] || []).some(
                                (unavailableSlot) =>
                                    unavailableSlot.from === slot.from &&
                                    unavailableSlot.to === slot.to
                                )
                                ? "line-through"
                                : "none"
                            }}
                            >From&nbsp;&nbsp;<>{slot.from}</>&nbsp;&nbsp;&nbsp;&nbsp;to&nbsp;&nbsp;<>{slot.to}</></p>

                            <button onClick={() => {
                                const dateKey = selectedDate.toLocaleDateString("fr-CA");
                                console.log(dateKey)
                                const isAlreadyUnavailable = (props.Unavailable[dateKey] || []).some(
                                    (unavailableSlot) =>
                                        unavailableSlot.from === slot.from &&
                                        unavailableSlot.to === slot.to
                                );

                                if (isAlreadyUnavailable) {
                                    // ➖ Supprimer le créneau de la liste Unavailable
                                    props.setUnavailable((prev) => ({
                                        ...prev,
                                        [dateKey]: (prev[dateKey] || []).filter(
                                            (s) =>
                                                !(s.from === slot.from &&
                                                s.to === slot.to)
                                        ),
                                    }));
                                } else {
                                    // ➕ Ajouter le créneau à Unavailable
                                    props.setUnavailable((prev) => ({
                                        ...prev,
                                        [dateKey]: [...(prev[dateKey] || []), {
                                            from: slot.from,
                                            to: slot.to
                                        }],
                                    }));
                                }
                            }}>
                                <p className="t5">
                                    {
                                        (props.Unavailable[selectedDate.toLocaleDateString("fr-CA")] || []).some(
                                            (unavailableSlot) =>
                                                unavailableSlot.from === slot.from &&
                                                unavailableSlot.to === slot.to
                                        )
                                            ? "Remettre"
                                            : "Retirer"
                                    }
                                </p>
                            </button>


                        </div>
                    ))}

                    </>
                    )}

               
                </div>
            </div>
        </div>
    )
}
)

export default CancelDate;