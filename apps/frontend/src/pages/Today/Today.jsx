import "./Today.css"

import { useState, useEffect } from "react";
import NiceIntro from "../../assets/images/NiceIntro.jpg"
import NiceIntro1 from "../../assets/images/NiceIntro1.png"
import Map2DPin from "../../assets/images/Map2DPin.png"
import plus from "../../assets/images/plus.png"

export default function Today() {
  const allDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const [firstMonth, setFirstMonth] = useState("");
  const [lastMonth, setLastMonth] = useState("");
  const [next7Days, setNext7Days] = useState([]);
  const [selectedDay, setSelectedDay] = useState([0]);
  const degImage = [5, -3, 4, -5];
  const translateYImage = [0, -2, 6, -2];

  useEffect(() => {
    const today = new Date();
    const days = [];
    const firstMonthName = today.toLocaleDateString('en-US', { month: 'long' });
    setFirstMonth(firstMonthName);

    let lastMonthName;

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      const currentMonth = date.toLocaleDateString('en-US', { month: 'long' });
      if (currentMonth !== firstMonthName) {
        lastMonthName = currentMonth;
      }

      days.push(date);
    }

    setLastMonth(lastMonthName);
    setNext7Days(days);
  }, []);

  return (
    <div className="TodayReservationPage">
        <div className="TodayweekContainer">
            <div className="row">
                <p className="t2">{firstMonth}</p>
                {
                    lastMonth && (
                        <p className="t2">- {lastMonth}</p>
                    )
                }
            </div>

            <div className="Today7date">
                {next7Days.map((date, index) => (
                <div key={index} className="column">
                    <p className="t5">{allDay[date.getDay()]}</p>
                    <button 
                        className={`${selectedDay == index ? "selected" : ""} t4`}
                        onClick={() => {
                            setSelectedDay(index)
                        }}
                    >
                        {date.getDate()}
                    </button>
                    <div className="isReservation"></div>
                </div>
                ))}
            </div>
        </div>
        
        <div className="reservationList">
            <div className="barToScroll"></div>
            <div className="ReservationItem finished">
                <div className="row">
                    <div className="column CreneauContainer">
                        <div className="t6 Creneau">10:00</div> 
                        <div className="lineHorrizontal"></div>
                        <div className="t6 Creneau">11:00</div> 
                    </div>
                    <div className="ReservationDetail">
                        <div className="allImages">
                        {
                            Array.from({ length: 4 }).map((_, index) => {
                            return (
                                <img
                                key={index}
                                src={NiceIntro}
                                style={{ transform: `translateX(calc(${index} * 50%)) translateY(${translateYImage[index]}px) rotate(${degImage[index]}deg)` }}
                                alt="offer image"
                                />
                            );
                            })
                        }
                        </div>
                        <p className="t6">ref : #GTR-10485932</p>
                        <p className="t4">Visite guidée du Vieux Nice</p>
                        <div className="hlinedashed"></div>
                        <div className="row">
                            <p className="t32">TOTAL</p>
                            <p className="t32">105,00 €</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ReservationItem">
                <p className="t5">En cours</p>
                <div className="row">
                    <div className="column CreneauContainer Current">
                        <div className="t6 Creneau">10:00</div> 
                        <div className="lineHorrizontal"></div>
                        <div className="t6 Creneau">11:00</div> 
                    </div>
                    <div className="ReservationDetail">
                        <div className="allImages">
                        {
                            Array.from({ length: 4 }).map((_, index) => {
                            return (
                                <img
                                key={index}
                                src={NiceIntro}
                                style={{ transform: `translateX(calc(${index} * 50%)) translateY(${translateYImage[index]}px) rotate(${degImage[index]}deg)` }}
                                alt="offer image"
                                />
                            );
                            })
                        }
                        </div>
                        <p className="t6">ref : #GTR-10485932</p>
                        <p className="t4">Visite guidée du Vieux Nice</p>
                        <div className="hlinedashed"></div>
                        <div className="adresse">
                            <img src={Map2DPin} alt="pin image"/>
                            <p className="t6">04 place godeau, Vence 06140, France</p>
                        </div>
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
            <div className="ReservationItem">
                <p className="t5">Bientôt</p>
                <div className="row">
                    <div className="column CreneauContainer startingInMinutes">
                        <div className="t6 Creneau">10:00</div> 
                        <div className="lineHorrizontal"></div>
                        <div className="t6 Creneau">11:00</div> 
                    </div>
                    <div className="ReservationDetail">
                        <div className="allImages">
                        {
                            Array.from({ length: 4 }).map((_, index) => {
                            return (
                                <img
                                key={index}
                                src={NiceIntro}
                                style={{ transform: `translateX(calc(${index} * 50%)) translateY(${translateYImage[index]}px) rotate(${degImage[index]}deg)` }}
                                alt="offer image"
                                />
                            );
                            })
                        }
                        </div>
                        <p className="t6">ref : #GTR-10485932</p>
                        <p className="t4">Visite guidée du Vieux Nice</p>
                        <div className="hlinedashed"></div>
                        <div className="adresse">
                            <img src={Map2DPin} alt="pin image"/>
                            <p className="t6">04 place godeau, Vence 06140, France</p>
                        </div>
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
            {/* <div className="hline88"></div> */}
        </div>
        {/* <Footer /> */}
    </div>
  );
}
