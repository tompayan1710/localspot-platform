import SearchBar from "../components/SearchBar/SearchBar";
import BottomNavBar from "../components/BottomNavBar/BottomNavBar"
import { getOffersToday } from "../services/offers"

import "./Home.css"
import Nice from "../assets/images/Nice.avif"
import footIcon from "../assets/images/footIcon.png"
import carIcon from "../assets/images/carIcon.png"
import starIcon from "../assets/images/starIcon.png"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBarNotAnimate from "../components/BottomNavBar/BottomNavBarNotAnimate";

export default function Home() {
  const logoContainerRef = useRef(null);
  const HomeContainerRef = useRef(null);
  const navigate = useNavigate();

  const searchBarRef = useRef(null);
  const [firstRender, setfirstRender] = useState(true);

  const BottomNavBarRef = useRef(null);

  const [HomeOffers, setHomeOffers] = useState([]);
    
    const getHomeOffers = async () => {
      const data = await getOffersToday();
      if(data.success){
        console.warn(data.offers);
        setHomeOffers(data.offers);
      }
    }

    useEffect(() => {
      getHomeOffers();
    }, [])


  return (
    <div className="HomeContainerPrincipal">
      <SearchBar ref={searchBarRef} firstRender={firstRender}/>
      <BottomNavBarNotAnimate/>
      <div ref={HomeContainerRef} className="HomeContainer">
        <div className="HomeSectionContainer">
          <p className="t4">Activité disponnible aujourd'huit</p>
          <div className="HomeListOffers">
            {
              HomeOffers.map((offer, index) => {
                return(
                  <div key={index} className="HomeOffersItem" onClick={() => {navigate(`/offer-page/${offer.slug}`)}}>
                    <img src={offer.image_urls[0]}/>
                    <div className="OffersInfo">
                      <div className="TopDiv">   
                        <p className="t5">{offer.title}</p>
                        <div className="OffersInfoDuration">
                          <img src={footIcon}/><p className="t6">12 min</p>
                          <img src={carIcon}/><p className="t6">5 min</p>
                        </div>
                      </div>
                      <div className="BottomDiv">
                        <div className="HomeStarList">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <img key={i} src={starIcon} />
                          ))}
                        </div>
                        <p className="t6"><strong>À partir de {offer.price} €</strong> par personne</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
            <div className="HomeOffersItem" onClick={() => {console.log("Je t'aime clara")}}>
              <img src={Nice}/>
              <div className="OffersInfo">
                <div className="TopDiv">   
                  <p className="t5">Atelier Croissant & Pâtisseries Parisiennes</p>
                  <div className="OffersInfoDuration">
                    <img src={footIcon}/><p className="t6">12 min</p>
                    <img src={carIcon}/><p className="t6">5 min</p>
                  </div>
                </div>
                <div className="BottomDiv">
                  <div className="HomeStarList">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <img key={i} src={starIcon} />
                    ))}
                  </div>
                  <p className="t6"><strong>À partir de 32,00 €</strong> par personne</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
