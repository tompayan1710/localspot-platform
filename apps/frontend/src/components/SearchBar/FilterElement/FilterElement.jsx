import { useEffect, useRef, useState } from "react"
import SliderPrice from "../../Slider/SliderPrice"
import "./FilterElement.css"
import Morning from "../../../assets/images/Morning.png"
import Sun from "../../../assets/images/Sun.png"
import Moon from "../../../assets/images/Moon.png"
import CalendarNotFill from "../../../assets/images/CalendarNotFill.png"
import arrowRight from "../../../assets/images/arrowRight.png"
import arrowLeft from "../../../assets/images/arrowLeft.png"
import { DayPicker } from "react-day-picker";
import PopUpBottom from "../../PopUpBottom/PopUpBottom"
import { useNavigate } from "react-router-dom"


export default function FilterElement({ 
    setIsOccultView, 
    searchBarRef, 
    applieNavigate, 
    setFiltersOptions,
    moment="", 
    priceRange_min=25, 
    priceRange_max=3000, 
    date="", 
    categoriesList=[], 
    nb_adult=0, 
    nb_reduced=0,
    fetchFilteredOffers
}){
    const navigate = useNavigate();
    const [minValue, setMinValue] = useState(priceRange_min)
    const [maxValue, setMaxValue] = useState(priceRange_max)
    const categories = ["Nautiques", "Culture & Patrimoine", "Bien-être", "Nature & Aventure", "Loisirs & Divertissement", "Sports & Sensations Fortes", "En Famille"];
    const [selectedCategories, setSelectedCategories] = useState(categoriesList)
    const [participantAdult, setParticipantAdult] = useState(nb_adult);
    const [participantReduced, setParticipantReduced] = useState(nb_reduced);  
    const dayPickerRef = useRef(null);
    const [seccondOccultView, setSeccondOccultView] = useState(false);
    const today = new Date().toLocaleDateString('fr-CA');
    const [selectedDate, setSelectedDate] = useState(date);

    const moments = [
        {
            text: "Matin",
            img: Morning, // change le chemin si nécessaire
        },
        {
            text: "Après-midi",
            img: Sun,
        },
        {
            text: "Soir",
            img: Moon,
    }
    ];
    const [selectedMoment, setSelectedMoment] = useState(moment);
    const [resetTrigger, setResetTrigger] = useState(0);

    const toggleCategory = (cat) => {
        setSelectedCategories((prev) =>
        prev.includes(cat)
            ? prev.filter((c) => c !== cat) // Supprimer si déjà sélectionnée
            : [...prev, cat] // Ajouter sinon
        );
    };

    useEffect(() => {
        console.log(priceRange_min, priceRange_max);
        setMinValue(priceRange_min)
        setMaxValue(priceRange_max)
    }, [priceRange_min, priceRange_max])







    return (
        <div className="FilterElement">
            <p className="t3">Filtres</p>
            <div className="column">
                <p className="t32">Moment de la journée</p>
                <div className="AllMoments row">
                    {moments.map((moment, index) => (
                    <button
                        key={index}
                        className={`momentButton ${selectedMoment === moment.text ? "selected" : ""}`}
                        onClick={() => setSelectedMoment((prev) => prev === moment.text ? "" :  moment.text)}
                    >
                        <img src={moment.img} alt={moment.text} />
                        <p className="t6">{moment.text}</p>
                    </button>
                    ))}
                </div>
            </div>

            <div className="column">
                <p className="t32">Tranche de prix :</p>
                <SliderPrice minValue={minValue} setMinValue={setMinValue} maxValue={maxValue} setMaxValue={setMaxValue} resetTrigger={resetTrigger}/>
            </div>
            <div className="column">
                <p className="t32">Date</p>
                <div className="ColumnCalendar">
                    <button className="OpenCalendar" onClick={() => {
                        dayPickerRef.current.classList.add("open");
                        setSeccondOccultView(true)
                    }}>
                        <p className="t5">{selectedDate || "Aucun date spécifié"}</p>
                        <img src={CalendarNotFill} alt="Calendar icon"/>
                    </button>
                    <PopUpBottom 
                        onClose={() => {
                            dayPickerRef.current.classList.remove("open");
                            setSeccondOccultView(false);
                            setSelectedDate(null)
                        }}
                        title={( 
                        <p className="t5">TitreBOSS TOM</p>
                        )}
                        ref={dayPickerRef}
                        duration={0.4}
                        fullHeight={true}
                        zIndex={14}
                    >   
                        <> 
                            <DayPicker
                                mode="single"
                                selected={new Date(selectedDate)}
                                onSelect={(date) => {
                                setSelectedDate(date ? date.toLocaleDateString('fr-CA') : today)
                                }}
                                disabled={[{ before: today }]}
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
                            <div className="ApplieContainer">
                                <div className="hline"></div>
                                <div className="row">
                                    <button 
                                        className="Applie"
                                        onClick={() => {
                                            dayPickerRef.current.classList.remove("open");
                                            setSeccondOccultView(false);
                                        }}
                                    >
                                        <p className="t5">Ajouter</p>
                                    </button>
                                </div>
                            </div>
                        </>
                    </PopUpBottom>
                </div>
            </div>
            <div className="column">
                <p className="t32">Catégories</p>
                <div className="AllCategories">
                    {
                        categories.map((txt, index) => {
                            return(
                                <button 
                                    key={index}
                                    className={`categorieButton ${selectedCategories.includes(txt) ? "selected" : ""}`}
                                    onClick={() => toggleCategory(txt)}
                                >
                                    <p className="t6">{txt}</p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            <div className="column Participants">
                <p className="t32">Participants</p>
                <div className="rowAddParticipant row">
                    <div className="column">
                    <p className="t5">Adult</p>
                    <p className="t6">18 - 99 ans</p>
                    </div>
                        <div className="row">
                        <button className="buttonParticipant" disabled={participantAdult === 0} onClick={() => {
                            setParticipantAdult((prev) => prev - 1)
                            }}>
                            <p className="t3">-</p>
                        </button>
                        <p className="t4">{participantAdult}</p>
                        <button className="buttonParticipant" disabled={participantAdult === 20} onClick={() => {
                            setParticipantAdult((prev) => prev + 1)
                            }}>
                            <p className="t3">+</p>
                        </button>
                    </div>
                </div>
                <div className="rowAddParticipant row">
                    <div className="column">
                    <p className="t5">Tarif réduit</p>
                    <p className="t6">-18 ans</p>
                    </div>
                    <div className="row">
                    <button className="buttonParticipant" disabled={participantReduced === 0} onClick={() => {
                        setParticipantReduced((prev) => prev - 1)
                        }}>
                        <p className="t3">-</p>
                    </button>
                    <p className="t4">{participantReduced}</p>
                    <button className="buttonParticipant" disabled={participantReduced === 20} onClick={() => {setParticipantReduced((prev) => prev + 1)}}>
                        <p className="t3">+</p>
                    </button>
                    </div>
                </div>
            </div>

            <div className="ApplieContainer">
                <div className="hline"></div>
                <div className="row">
                    <button 
                        className="Reset"
                        onClick={() => {
                            setMinValue(25)
                            setMaxValue(3000)
                            setResetTrigger(prev => prev + 1)
                            setSelectedCategories([])
                            setParticipantAdult(0)
                            setParticipantReduced(0)  
                            setSelectedDate("")
                            setSelectedMoment("")
                        }}>
                        <p className="t5">Effacer tout</p>
                    </button>
                    <button 
                        className="Applie"
                        onClick={() => {
                            // searchBarRef.current.classList.remove("open")
                            // setIsOccultView(false);
                            if(applieNavigate){
                                navigate(applieNavigate, {
                                    state: {
                                        priceRange: {
                                            min: minValue,
                                            max: maxValue,
                                        },
                                        date: selectedDate || null, // ou today si tu veux toujours passer une date
                                        moment: selectedMoment || null, // "Matin", "Après-midi", "Soir"
                                        // total_participants: participantAdult + participantReduced,
                                        categories: selectedCategories, // tableau ex: ["Nautiques", "Bien-être"]
                                        nb_adult: participantAdult,
                                        nb_reduced: participantReduced
                                    }
                                });
                            } else {
                                console.log("J'applique les filtres !")
                                const options = {
                                    priceRange: {
                                        min: minValue,
                                        max: maxValue,
                                    },
                                    date: selectedDate || null, // ou today si tu veux toujours passer une date
                                    moment: selectedMoment || null, // "Matin", "Après-midi", "Soir"
                                    nb_adult: participantAdult,
                                    nb_reduced: participantReduced,
                                    categories: selectedCategories, // tableau ex: ["Nautiques", "Bien-être"]
                                }
                                setFiltersOptions(options)
                                fetchFilteredOffers(options);
                                searchBarRef.current.classList.remove("open")
                                setIsOccultView(false);

                            }

                        }}
                    >
                        <p className="t5">Appliquer</p>
                    </button>
                    {/* <button onClick={() => {
                        setResetTrigger((prev) => prev +1)
                    }}>ResetTrigger</button> */}
                </div>
            </div>

            <div className={`occultView Calendar ${seccondOccultView ? "open" : ""}`} style={{zIndex: "13"}} onClick={(e) => {
                console.warn("IsOccult 2")
                e.stopPropagation();
                dayPickerRef.current.classList.remove("open");
                setSeccondOccultView(false);
            }}></div>

        </div>
    )
}