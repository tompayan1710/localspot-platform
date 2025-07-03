import "./CahierTexte.css"
import HotelIcon from "../../assets/images/HotelIcon.png"

export default function CahierTexte(){
    return (
        <>
            <div id="CahierTexte">
                <div className="feuille3">
                    <div className="feuille2">
                        <div className="feuille1">
                            <div className="encochesContainer">
                                {Array.from({ length: 10 }, (_, index) => (
                                    <div className="encochesTwo" key={index}>
                                        <div className="encoche"></div>
                                        <div className="encoche"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="row">
                                <div className="row left">
                                    <img src={HotelIcon} alt="image icon"/>
                                    <div></div>
                                </div>
                                <div className="column">
                                    <p className="t5">Preview</p>
                                    <p className="t6">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim sequi dolores error maiores nobi</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}