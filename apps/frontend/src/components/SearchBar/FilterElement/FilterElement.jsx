import { useState } from "react"
import SliderPrice from "../../Slider/SliderPrice"
import "./FilterElement.css"
import Morning from "../../../assets/images/Morning.png"
import Sun from "../../../assets/images/Sun.png"
import Moon from "../../../assets/images/Moon.png"

export default function FilterElement({ setIsOccultView, searchBarRef }){
    const [minValue, setMinValue] = useState(30)
    const [maxValue, setMaxValue] = useState(3000)
    const categories = ["Nautiques", "Culture & Patrimoine", "Bien-être", "Nature & Aventure", "Loisirs & Divertissement", "Sports & Sensations Fortes", "En Famille"];
    const [selectedCategories, setSelectedCategories] = useState([])
    const [participantAdult, setParticipantAdult] = useState(0);
    const [participantReduced, setParticipantReduced] = useState(0);  
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
    const [selectedMoment, setSelectedMoment] = useState(null);


    const toggleCategory = (cat) => {
        setSelectedCategories((prev) =>
        prev.includes(cat)
            ? prev.filter((c) => c !== cat) // Supprimer si déjà sélectionnée
            : [...prev, cat] // Ajouter sinon
        );
    };


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
                        onClick={() => setSelectedMoment(moment.text)}
                    >
                        <img src={moment.img} alt={moment.text} />
                        <p className="t6">{moment.text}</p>
                    </button>
                    ))}
                </div>
            </div>

            <div className="column">
                <p className="t32">Tranche de prix :</p>
                <SliderPrice minValue={minValue} setMinValue={setMinValue} maxValue={maxValue} setMaxValue={setMaxValue}/>
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

            <button 
                className="Applie"
                onClick={() => {
                    searchBarRef.current.classList.remove("open")
                    setIsOccultView(false);
                }}
            >
                <p className="t5">Appliquer</p>
            </button>
        </div>
    )
}