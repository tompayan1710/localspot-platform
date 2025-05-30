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

export default function Home() {
   const logoContainerRef = useRef(null);
   const HomeContainerRef = useRef(null);
  const navigate = useNavigate();

  const searchBarRef = useRef(null);
  const [firstRender, setfirstRender] = useState(true);

   const BottomNavBarRef = useRef(null);

  const [todayRange, setTodayRange] = useState(0);
  const timeSteps = ["5 min", "10 min", "30 min", "1 h", "2 h", "+2 h"];

  const [HomeOffers, setHomeOffers] = useState([]);
     /*useEffect(() => {
      const logoContainer = logoContainerRef.current;
  
        logoContainer.classList.add("upingTop");

        // Initialisation de l'état initial (invisible et en bas)
         if (logoContainer) {
        // Supprimer les classes existantes si nécessaire
        // logoContainer.classList.remove("Animated");
  
  
        // Démarrer l'animation après 1 seconde*
  
        setTimeout(() => {
          // logoContainer.classList.add("upingTop");
        }, 2000);
        // setTimeout(() => {
        //   logoContainer.classList.add("Animated");
        // }, 2000);
    }}, []);*/

    const getHomeOffers = async () => {
      const data = await getOffersToday();
      if(data.success){
        console.warn(data.offers);
        setHomeOffers(data.offers);
      }
    }

    useEffect(() => {
      getHomeOffers();

      const logoContainer = logoContainerRef.current;
      const HomeContainer = HomeContainerRef.current;

      console.log("slideUpHome lancé", HomeContainer); // ← TEST

      setTimeout(() => {
        logoContainer.classList.add("popIn")
        setTimeout(() => {
          logoContainer.classList.add("goUp");
        }, 1000)
        setTimeout(() => {
          HomeContainer.classList.add("slideUpHome")
        }, 1200);
        setTimeout(() => {
            BottomNavBarRef.current.classList.add("sliderInBottomNav")
          }, 1500);
        setTimeout(() => {
          searchBarRef.current.classList.add("slideInSearch");
           
          setTimeout(() => {
            setfirstRender(false);
        }, 1300);
        }, 1300);
      }, 1000);
    }, [])


     const handleTodayRange = (e) => {
        setTodayRange(parseInt(e.target.value, 10));
      };


  return (
    <div className="HomeContainerPrincipal">
      <div ref={logoContainerRef} className="LogoContainerAnimation"></div>
      <SearchBar ref={searchBarRef} firstRender={firstRender}/>
      <BottomNavBar ref={BottomNavBarRef} firstRender={firstRender}/>
      <div ref={HomeContainerRef} className="HomeContainer">
        <div className="HomeSectionContainer">
          <p className="t4">Activité disponnible aujourd'huit</p>
          {/* <div className="RangeContainer">
            <img src={carIcon}/>
            <img src={footIcon}/>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={todayRange}
              onChange={handleTodayRange}
              className="custom-slider"
            />
          </div>
          <p>{timeSteps[todayRange]}</p> */}
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
            <div className="HomeOffersItem">
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
            <div className="HomeOffersItem">
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
          <p className="t4">Activité disponnible demain</p>
          <div className="HomeListOffers">
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
            <div className="HomeOffersItem">
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
            <div className="HomeOffersItem">
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
          <p className="t4">Populaire et proche de moi</p>
          <div className="HomeListOffers">
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
            <div className="HomeOffersItem">
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
            <div className="HomeOffersItem">
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
