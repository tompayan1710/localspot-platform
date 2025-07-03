import TimeOnlyPicker from "../../../components/Auth/ProfilPage/BookingSystem/TimeOnlyPicker";
import GoBack from "../../../components/GoBack/GoBack"
import "./AvailabilityEditor.css"
import React, { useEffect, useRef, useState } from "react";
import crossiconBlack from "../../../assets/images/crossiconBlack.png"
import Exceptionnal from "./ExceptionnalDate";
import SaveIconFillWhite from "../../../assets/images/SaveIconFillWhite.png";
import { useParams } from "react-router-dom";
import CancelDate from "./CancelDate";

export default function AvailabilityEditor(){
    const { slug } = useParams();

    const [cancelOpen, setCancelOpen] = useState(false);
    const [disponnibilitiOpen, setDisponnibilitiOpen] = useState(false);
    const [recurentOpen, setRecurentOpen] = useState(true);

    const cancelExRef = useRef();
    const disponnibilitiExRef = useRef();
    const recurentRef = useRef();

    const [exceptionalAvailable, setExceptionalAvailable] = useState({});
    const [Unavailable, setUnavailable] = useState({});

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
    const [changing, preventChange] = useState(1);

    useEffect(() => {
        if(cancelOpen){
            console.log("cancel :", cancelExRef.current.scrollHeight);
            cancelExRef.current.style.maxHeight = Math.max(cancelExRef.current.scrollHeight +200,700) + "px";//700 et +200 valeur de base pour laissez de la marge au maxheight
            cancelExRef.current.classList.add("appear");
        }else{
            cancelExRef.current.classList.remove("appear");
            cancelExRef.current.style.maxHeight = "0px";
        }

        if(disponnibilitiOpen){
            console.log("disponnibilitiExRef :", disponnibilitiExRef.current.scrollHeight);
            disponnibilitiExRef.current.style.maxHeight = Math.max(disponnibilitiExRef.current.scrollHeight + 200,700) + "px";//700 et +200 valeur de base pour laissez de la marge au maxheight
            disponnibilitiExRef.current.classList.add("appear");
        }else{
            disponnibilitiExRef.current.classList.remove("appear");
            disponnibilitiExRef.current.style.maxHeight = "0px";
        }

        if(recurentOpen){
            console.log("disponnibilitiExRef :", recurentRef.current.scrollHeight);
            recurentRef.current.style.maxHeight = Math.max(recurentRef.current.scrollHeight + 400,700) + "px";//700 et +200 valeur de base pour laissez de la marge au maxheight
            recurentRef.current.classList.add("appear");
        }else{
            recurentRef.current.classList.remove("appear");
            recurentRef.current.style.maxHeight = "0px";
        }
    },[cancelOpen, disponnibilitiOpen, recurentOpen, availability, changing])









    /*::::::::::::::::::::::::::::::::SAVING DATA:::::::::::::*/
    const SaveData = async () => {
        console.log("✅ SAVING DATA");
        console.log(availability);
        console.log(exceptionalAvailable);
        console.log(Unavailable);

        let isRecurentEmpty = true;
        for (const slots of Object.values(availability)) {
            if (slots.length > 0) {
                isRecurentEmpty = false;
                break; // ✅ ici ça sort de la boucle immédiatement
            }
        }

        if(isRecurentEmpty){
            alert("Veuillez avoir au moins un créneaux récurent");
            return;
        }


        /*
        {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: []
        }
            
        {
        "2025-06-30": [
                { id: 1, from: "10:00", to: "12:00" },
                { id: 2, from: "14:00", to: "15:00" }
            ],
        "2025-07-06": [
                { id: 3, from: "09:00", to: "11:30" }
            ]
        }
        */

        //Prendre en compte seulement ceux qui sont ouvert
        let newAvailability = {};

        for (const [day, slots] of Object.entries(availability)) {
            if (slots.length > 0 && isOpen[day]) {
                newAvailability[day] = slots;
            }
        }
        const cleanedExceptionalAvailable = Object.fromEntries(
            Object.entries(exceptionalAvailable).filter(([_, slots]) => slots.length > 0)
        );

        const cleanedUnavailable = Object.fromEntries(
            Object.entries(Unavailable).filter(([_, slots]) => slots.length > 0)
        );

        const bodyToSend = {
            slug: slug,
            recurring: newAvailability,
            exceptionalAvailable: cleanedExceptionalAvailable,
            Unavailable: cleanedUnavailable,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/availibility/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(bodyToSend)
            });

            const result = await response.json();
            console.log("Réponse API :", result);
        } catch (error) {
            console.error("Erreur lors de l’envoi :", error);
        }
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/`);
    }

    const GetData = async () => {
        console.log("✅ SAVING DATA");
        console.log(availability);
        console.log(exceptionalAvailable);
        console.log(Unavailable);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/availibility/getall?slug=${slug}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const {status, recurring, exceptionalAvailable, exceptionalUnavailable } = await response.json();
            console.warn("✅LES DONNES");
            console.warn(recurring);
            console.warn(exceptionalAvailable);
            console.warn(exceptionalUnavailable);
            setAvailability((prev) => {
                const newAvailability = {...prev};

                for (const day of Object.keys(recurring)) {
                    const newSlots = recurring[day].map(slot => ({
                    ...slot,
                    id: Date.now() + Math.random() // 👈 unique id généré
                    }));
                    newAvailability[day] = newSlots;
                }
                return newAvailability;
            })
            setIsOpen((prev) => {
                const newIsOpen = { ...prev };
                for (const day of Object.keys(recurring)) {
                    newIsOpen[day] = true;
                }
                return newIsOpen;
            });

            setExceptionalAvailable((prev) => {
                const newExceptionalAvailable = {...prev};

                for (const day of Object.keys(exceptionalAvailable)) {
                    const newSlots = exceptionalAvailable[day].map(slot => ({
                    ...slot,
                    id: Date.now() + Math.random() // 👈 unique id généré
                    }));
                    newExceptionalAvailable[day] = newSlots;
                }
                return newExceptionalAvailable;
            })
            if(exceptionalAvailable){
                setDisponnibilitiOpen(true)
            }

            setUnavailable(exceptionalUnavailable);
            if(exceptionalUnavailable){
                setCancelOpen(true)
            }

            console.log("Réponse API :", status, recurring, exceptionalAvailable, Unavailable);
        } catch (error) {
            console.error("Erreur lors de l’envoi :", error);
        }
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/`);
    }

    useEffect(() => {
        setTimeout(() => {
            GetData();
        }, 1000)
    },[]);


    return (
        <div className="AvailabilityEditor">
            <div className="TopDivOpacity"></div>
            <GoBack nagigation={`/annonces/${slug}`} scrollTo={"PlanningRecurent"} text={"mon annonce"} />
            <button className="SaveButton" onClick={SaveData}>
                <img src={SaveIconFillWhite} alt="save icon"/>
                <p className="t5">Enregistrer</p>
            </button>
            {/* <button id="load" className="SaveButton" onClick={GetData}>
                <img src={SaveIconFillWhite} alt="save icon"/>
                <p className="t5">Load</p>
            </button> */}
            <div className="TitleContainer">
                <p className="t32">Gérez vos disponibilités</p>
                <p className="t6">Ajoutez, modifiez ou supprimez vos heures de disponibilité pour permettre aux utilisateurs de réserver vos services facilement.</p>
            </div>
            <div className="addExceptionnal">
                <div className="row">
                    <p className="t5">Créneaux récurents</p>
                    <button className={`${recurentOpen ? "selected" : ""}`} onClick={() => {
                        setRecurentOpen((prev) => !prev);
                    }}>
                        <p className="t6">{recurentOpen ? "Annuler" : "Ajouter"}</p>
                    </button>
                </div>
            
                <div className="DayCreneaux" ref={recurentRef}>
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
            </div>
            <div className="hlineExceptionnal"></div>
            <div className="addExceptionnal">
                <div className="row">
                    <p className="t5">Disponnibilité exceptionnel</p>
                    <button className={`${disponnibilitiOpen ? "selected" : ""}`} onClick={() => {
                        setDisponnibilitiOpen((prev) => !prev);
                    }}>
                        <p className="t6">{disponnibilitiOpen ? "Annuler" : "Ajouter"}</p>
                    </button>
                </div>
                
                <Exceptionnal isCancel={false} preventChange={preventChange} ref={disponnibilitiExRef} availability={exceptionalAvailable} setAvailability={setExceptionalAvailable}/>
            </div>
            <div className="hlineExceptionnal"></div>
            <div className="addExceptionnal">
                <div className="row">
                    <p className="t5">Annulation exceptionnel</p>
                    <button className={`${cancelOpen ? "selected" : ""}`} onClick={() => {
                        setCancelOpen((prev) => !prev);
                    }}>
                        <p className="t6">{cancelOpen ? "Annuler" : "Ajouter"}</p>
                    </button>
                </div>
                {/* <Exceptionnal isCancel={true} preventChange={preventChange} ref={cancelExRef} availability={Unavailable} setAvailability={setUnavailable}/> */}
                <CancelDate isCancel={true} preventChange={preventChange} ref={cancelExRef} availability={availability} isOpen={isOpen} Unavailable={Unavailable} setUnavailable={setUnavailable}/>
            </div>




            
        </div>
    )
}







