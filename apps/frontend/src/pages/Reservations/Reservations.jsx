import "./Reservations.css"
import NiceIntro1 from "../../assets/images/NiceIntro1.png"
import FadeInImage from "../../components/Utils/FadeInImage"
import { useNavigate } from "react-router-dom"

export default function Reservations(){
    const navigate = useNavigate();
    const reservation_id = "IFJ3FF3SIA2"
    return (
        <div className="Reservations">
            <p className="t32">Mes reservation</p>
            <div className="AllReservations">
                <p className="t6">April 25, 2022</p>
                <div className="ReservationItem" onClick={() => {
                    navigate(`/reservations/${reservation_id}`)
                }}>
                    <div className="ImagesOffers">
                    {/* {
                        Array.from({ length: 2 }).map((_, index) => {
                            const imageOffer = allOffers[slot.offer_slug].image_urls[index]; 
                            return (
                                imageOffer && */}
                                    {/* // <>
                                    // <p className="TESTINUMBER">{index}</p> */}
                                    <div className="ImageWrapper">
                                        <FadeInImage src={NiceIntro1} alt="offer imageReservation offer image"/>
                                    </div>
                                    <div className="ImageWrapper">
                                        <FadeInImage src={NiceIntro1} alt="offer imageReservation offer image"/>
                                    </div>
                                {/* );
                            })
                        } */}
                    </div>
                    <div className="column">
                        <p className="t4 truncate-multiline">Explorez les calanques en kayak</p>
                        <div className="hlinedashed"></div>
                        {/* <p className="t6">07/11/2025 à 14:35</p> */}
                        <div className="row">
                            <div className="column">
                                <p className="t6">Participant : 5</p>
                                <p className="t6">×2 adult  ×2 reduced</p>
                            </div>
                            <p className="t4">104.00€</p>
                        </div>
                    </div>
                </div>
                
                {/* <div className="hline88"></div> */}

                <div className="ReservationItem">
                    <div className="ImagesOffers">
                    {/* {
                        Array.from({ length: 2 }).map((_, index) => {
                            const imageOffer = allOffers[slot.offer_slug].image_urls[index]; 
                            return (
                                imageOffer && */}
                                    {/* // <>
                                    // <p className="TESTINUMBER">{index}</p> */}
                                    <div className="ImageWrapper">
                                        <FadeInImage src={NiceIntro1} alt="offer imageReservation offer image"/>
                                    </div>
                                    <div className="ImageWrapper">
                                        <FadeInImage src={NiceIntro1} alt="offer imageReservation offer image"/>
                                    </div>
                                {/* );
                            })
                        } */}
                    </div>
                    <div className="column">
                        <p className="t4 truncate-multiline">Explorez les calanques en kayak</p>
                        <div className="hlinedashed"></div>
                        {/* <p className="t6">07/11/2025 à 14:35</p> */}
                        <div className="row">
                            <div className="column">
                                <p className="t6">Participant : 5</p>
                                <p className="t6">×2 adult  ×2 reduced</p>
                            </div>
                            <p className="t4">104.00€</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}