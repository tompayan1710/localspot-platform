import "./Calendar.css"
import crossiconBlack from "../../assets/images/crossiconBlack.png"
import arrowLeft from "../../assets/images/arrowLeft.png"
import arrowRight from "../../assets/images/arrowRight.png"
import NiceIntro from "../../assets/images/NiceIntro.jpg"
import NiceIntro1 from "../../assets/images/NiceIntro1.png"
import plus from "../../assets/images/plus.png"
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";

export default function Calendar(){
    const allDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [selectedDate, setSelectedDate] = useState(tomorrow);
    return (
        <div className="Calendar">
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
                        // modifiers={{
                        //     hasSlots: datesWithSlots,
                        //     selectedGreen: !props.isCancel ? [selectedDate] : [],
                        //     selectedRed: props.isCancel ? [selectedDate] : [],
                        // }}
                        // modifiersClassNames={{
                        //     hasSlots: `day-has-slots ${props.isCancel ? "red" : "green"}`,
                        //     selectedGreen: "selected-green",
                        //     selectedRed: "selected-red",
                        // }}
                    />
                </div>
                    
            </div>
            <div className="AllReservationList">
                <div className="barToScroll"></div>
                <p className="t3">Reservations</p>
                <div className="AllReservationItem">
                    <div className="row">
                        <p>Wednesday&nbsp;13</p>
                        <div className="hline"></div>
                    </div>
                    <div className="t6 Creneau">10:00 - 18:00</div>
                    <div className="reservationDetail">
                        <div className="ImagesOffers">
                            <img src={NiceIntro} alt="reservation Offer image"/>
                            <img src={NiceIntro1} alt="reservation Offer image"/>
                        </div>
                        <div className="column">
                            <p className="t6">ref : #GTR-10485932</p>
                            <p className="t4">Visite guidée du Vieux Nice</p>
                            <div className="hlinedashed"></div>
                            <div className="column">
                                <p className="t5">Participant : 5</p>
                                <p className="t6">×2 adult&nbsp;&nbsp;×2 reduced</p>
                            </div>
                            <div className="row">
                                <div className="rowParticipant">
                                    <div><img src={plus} alt="plus icon"/></div>
                                    <img src={NiceIntro} alt="reservation Offer image"/>
                                    <img src={NiceIntro} alt="reservation Offer image"/>
                                    <img src={NiceIntro} alt="reservation Offer image"/>
                                </div>
                                <button className="t6">see&nbsp;all</button>
                            </div>
                            <div className="hlinedashed"></div>
                            <div className="row">
                                <p className="t32">TOTAL</p>
                                <p className="t32">105,00 €</p>

                            </div>
                        </div>
                    </div>
                    <div className="reservationDetail">
                        <div className="ImagesOffers">
                            <img src={NiceIntro} alt="reservation Offer image"/>
                            <img src={NiceIntro1} alt="reservation Offer image"/>
                        </div>
                        <div className="column">
                            <p className="t6">ref : #GTR-10485932</p>
                            <p className="t4">Visite guidée du Vieux Nice</p>
                            <div className="hlinedashed"></div>
                            <div className="column">
                                <p className="t5">Participant : 5</p>
                                <p className="t6">×2 adult&nbsp;&nbsp;×2 reduced</p>
                            </div>
                            <div className="row">
                                <div className="rowParticipant">
                                    <div><img src={plus} alt="plus icon"/></div>
                                    <img src={NiceIntro} alt="reservation Offer image"/>
                                    <img src={NiceIntro} alt="reservation Offer image"/>
                                    <img src={NiceIntro} alt="reservation Offer image"/>
                                </div>
                                <button className="t6">see&nbsp;all</button>
                            </div>
                            <div className="hlinedashed"></div>
                            <div className="row">
                                <p className="t32">TOTAL</p>
                                <p className="t32">105,00 €</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
