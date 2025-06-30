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
import Exceptionnal from "./ExceptionnalDate";

export default function AvailabilityEditor(){
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
    // 1. Une seule fois au montage, pour mesurer la largeur
    useEffect(() => {
        if (creneauRef.current) {
        const width = creneauRef.current.offsetWidth;
        const height = 70;
        const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
        const angleDeg = Math.atan2(height, width) * (180 / Math.PI) - 1;
        setBarStyle({ width: hypotenuse, angle: angleDeg });

        console.log("Largeur de CreneauPicker:", width);
        console.log("Hauteur de CreneauPicker:", height);
        }
    }, []); // ✅ vide = déclenché au premier rendu

    // 2. Un autre pour la date sélectionnée
    useEffect(() => {
        if (selectedDate) {
        console.log("Date sélectionnée :", selectedDate);
        }
    }, [selectedDate]);


    return (
        <div className="AvailabilityEditor">
            <GoBack nagigation={"/"} scrollTo={""} text={"mon annonce"} />
            <div className="TitleContainer">
                <p className="t32">Gérez vos disponibilités</p>
                <p className="t6">Ajoutez, modifiez ou supprimez vos heures de disponibilité pour permettre aux utilisateurs de réserver vos services facilement.</p>
            </div>
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
            </div>
            <div className="addExceptionnal">
                <p className="t5">Disponnibilité exceptionnel</p>
                <button>
                    <p className="t6">Ajouter</p>
                </button>
            </div>
            <div className="hlineExceptionnal"></div>
            <div className="addExceptionnal">
                <p className="t5">Annulation exceptionnel</p>
                <button>
                    <p className="t6">Ajouter</p>
                </button>
            </div>



            <Exceptionnal />

            
        </div>
    )
}







