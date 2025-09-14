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
import { useTranslation } from "react-i18next"
import { fr, enUS, it, de } from "date-fns/locale";


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
    nb_child=0,
    nb_infant=0,
    fetchFilteredOffers
}){
    const navigate = useNavigate();
    const [minValue, setMinValue] = useState(priceRange_min)
    const [maxValue, setMaxValue] = useState(priceRange_max)
    const categories = ["Nautiques", "Culture & Patrimoine", "Bien-être", "Nature & Aventure", "Loisirs & Divertissement", "Sports & Sensations Fortes", "En Famille"];
    const [selectedCategories, setSelectedCategories] = useState(categoriesList)
    const [participantAdult, setParticipantAdult] = useState(nb_adult);
    const [participantChild, setParticipantChild] = useState(nb_child);  
    const [participantInfant, setParticipantInfant] = useState(nb_infant);  
    const dayPickerRef = useRef(null);
    const [seccondOccultView, setSeccondOccultView] = useState(false);
    const [selectedDate, setSelectedDate] = useState(date);

    const {t, i18n} = useTranslation();
    const lang = (i18n.language || "fr").split("-")[0]; 
    // const today = new Date().toLocaleDateString('fr-CA');
    const today = new Date().toLocaleDateString(lang, {
        weekday: "long", // ex: Monday, Lundi
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    const dateLocales = {
        fr,
        en: enUS,
        it,
        de
    };
    const dayPickerLocale = dateLocales[lang] || enUS;


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




 useEffect(() => {
        document.documentElement.style.setProperty("--today-label", `"${t("Today")}"`);
    }, [lang]);



    return (
        <div className="FilterElement" style={{paddingBottom : "70px"}}>
            <p className="t3">{t("Filters")}</p>
            <div className="column">
                <p className="t32">{t("Time_of_day")}</p>
                <div className="AllMoments row">
                    {moments.map((moment, index) => (
                    <button
                        key={index}
                        className={`momentButton ${selectedMoment === moment.text ? "selected" : ""}`}
                        onClick={() => setSelectedMoment((prev) => prev === moment.text ? "" :  moment.text)}
                    >
                        <img src={moment.img} alt={t(moment.text)} />
                        <p className="t6">{t(moment.text)}</p>
                    </button>
                    ))}
                </div>
            </div>

            <div className="column">
                <p className="t32">{t("Price_range")}</p>
                <SliderPrice minValue={minValue} setMinValue={setMinValue} maxValue={maxValue} setMaxValue={setMaxValue} resetTrigger={resetTrigger}/>
            </div>
            <div className="column">
                <p className="t32">{t("Date")}</p>
                <div className="ColumnCalendar">
                    <button className="OpenCalendar" onClick={() => {
                        dayPickerRef.current.classList.add("open");
                        setSeccondOccultView(true)
                    }}>
                        <p className="t5">{selectedDate || t("No_date_specified")}</p>
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
                                // setSelectedDate(date ? date.toLocaleDateString('fr-CA') : today)
                                setSelectedDate(date ? date.toLocaleDateString(lang) : today)
                                }}
                                disabled={[{ before: today }]}
                                weekStartsOn={1}
                                required
                                captionLayout="buttons" // <-- OBLIGATOIRE pour voir les boutons flèches
                                locale={dayPickerLocale}  // ✅ Ici la locale change selon la langue
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
                                        <p className="t5">{t("Ajouter")}</p>
                                    </button>
                                </div>
                            </div>
                        </>
                    </PopUpBottom>
                </div>
            </div>
            <div className="column">
                <p className="t32">{t("Categories")}</p>
                <div className="AllCategories">
                    {
                        categories.map((txt, index) => {
                            return(
                                <button 
                                    key={index}
                                    className={`categorieButton ${selectedCategories.includes(txt) ? "selected" : ""}`}
                                    onClick={() => toggleCategory(txt)}
                                >
                                    <p className="t6">{t(txt)}</p>
                                </button>
                            )
                        })
                    }
                </div>
            </div>
            {/* <div className="column Participants">
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
                    <button className="buttonParticipant" disabled={participantChild === 0} onClick={() => {
                        setParticipantChild((prev) => prev - 1)
                        }}>
                        <p className="t3">-</p>
                    </button>
                    <p className="t4">{participantChild}</p>
                    <button className="buttonParticipant" disabled={participantChild === 20} onClick={() => {setParticipantChild((prev) => prev + 1)}}>
                        <p className="t3">+</p>
                    </button>
                    </div>
                </div>
                <div className="rowAddParticipant row">
                    <div className="column">
                    <p className="t5">Bébé</p>
                    <p className="t6">0 - 4ans</p>
                    </div>
                    <div className="row">
                    <button className="buttonParticipant" disabled={participantInfant === 0} onClick={() => {
                        setParticipantInfant((prev) => prev - 1)
                        }}>
                        <p className="t3">-</p>
                    </button>
                    <p className="t4">{participantInfant}</p>
                    <button className="buttonParticipant" disabled={participantInfant === 20} onClick={() => {setParticipantInfant((prev) => prev + 1)}}>
                        <p className="t3">+</p>
                    </button>
                    </div>
                </div>
            </div> */}

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
                            setParticipantChild(0)  
                            setSelectedDate("")
                            setSelectedMoment("")
                        }}>
                        <p className="t5">{t("Clear_all")}</p>
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
                                        // total_participants: participantAdult + participantChild,
                                        categories: selectedCategories, // tableau ex: ["Nautiques", "Bien-être"]
                                        nb_adult: participantAdult,
                                        nb_child: participantChild,
                                        nb_infant: participantInfant
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
                                    nb_child: participantChild,
                                    nb_infant: participantInfant,
                                    categories: selectedCategories, // tableau ex: ["Nautiques", "Bien-être"]
                                }
                                setFiltersOptions(options)
                                fetchFilteredOffers(options);
                                searchBarRef.current.classList.remove("open")
                                setIsOccultView(false);

                            }

                        }}
                    >
                        <p className="t5">{t("Apply")}</p>
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
