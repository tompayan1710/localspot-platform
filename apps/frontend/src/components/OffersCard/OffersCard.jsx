import "./OffersCard.css"
import extendIcon from "../../assets/images/extendIcon.png"
import starIcon2 from "../../assets/images/starIcon2.png"
import demiStarIcon from "../../assets/images/demiStarIcon.png"
import { useNavigate } from "react-router-dom"
import FadeInImage from "../Utils/FadeInImage"
import React from "react"


export default function OffersCard({loading, offers, vertical=false, goToOffer}){
  const navigate = useNavigate();

    return (
        <div className={`HomeListPrestation ${vertical && "vertical"}`}>
            {
                !loading ?
                offers.map((offer, index) => {
                  // const km = getDistanceInKm(hote.lat, hote.lng, offer.lat, offer.lng);
                  // const estimatedWalkTimeMinutes = km * 15; // 4 km/h ≈ 15 min/km
                  return(
                    <React.Fragment key={index}>
                    <div key={index} className={`HomeListPrestationItem ${!vertical && offers.length> 2 && index === offers.length - 1 ? "flou" : ""}  ${offer.isToday ? "Today1" : ""}`} 
                    onClick={() => {
                        goToOffer(`${offer.slug}`, {
                        state: {
                          isAnimation: false,
                        }
                      });
                    }}>
                      {/* {
                        !vertical && offers.length> 2 && index === offers.length - 1 ? <p className="seeMore t32">Voir <strong>+</strong></p> : <></>
                      } */}
                      {/* <div className={`${!vertical && offers.length> 2 && index === offers.length - 1 ? "flou-interne" : ""}`}> */}
                      <div>
                        <div className="ImageContainer">
                          <FadeInImage src={offer.image_urls[0]} alt="Offer Image" />
                          <div className="shine"></div> {/* Effet de lueur ici */}
                          {/* <div></div> */}
                          <button>
                            <img src={extendIcon} alt="extend icon"/>
                          </button>
                        </div>
                        <div className="containerTopBottom">
                          <div>
                            <p className="t6 isFreeCancelation">free cancellation</p>
                            <p className="t5">{offer.title}</p>
                          </div>
                          <div>
                            <p className="t6"><strong>{offer.price}€</strong> par {offer.priceper}</p>
                            <div className="HomeStarList">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <img key={i} src={starIcon2} alt="star icon"/>
                              ))}
                              <img src={demiStarIcon} alt="middle star"/>
                              <p className="t6">4.5/5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    </React.Fragment>
                  )
                })
                :
                Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="HomeListPrestationItem loading">
                  <div className="skeleton-image shimmer"></div>
                  <div className="containerTopBottom">
                    <div className="skeleton-title shimmer"></div>
                    <div className="skeleton-details shimmer"></div>
                  </div>
                </div>
              ))
            }

          {
            !vertical &&
            <div className="GoFilterContainer">
              <button className="GoFilterNull row" onClick={() => {
                navigate("/searching-page", {
                  state: {
                    priceRange: {
                      min: 25,
                      max: 3000,
                    },
                    date: null, // ou today si tu veux toujours passer une date
                    moment: null, // "Matin", "Après-midi", "Soir"
                     categories: null, // tableau ex: ["Nautiques", "Bien-être"]
                    nb_adult: null,
                    nb_child: null,
                    nb_infant: null
                  }
                });
              }}>
                <p className="t32">Voir&nbsp;<strong>+</strong></p>
              </button>
            </div>
          }
        </div>
    )
}