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
import { useTranslation } from "react-i18next";


// Fonction utilitaire de traduction
async function batchTranslate(texts, lang) {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ texts, targetLang: lang }),
  });
  const data = await res.json();
  return data.translations;
}


export default function Home() {
  const HomeContainerRef = useRef(null);
  const navigate = useNavigate();

  const { i18n } = useTranslation();
  const currentLang = i18n.language;


  const searchBarRef = useRef(null);
  const [firstRender, setfirstRender] = useState(true);


  const [HomeOffers, setHomeOffers] = useState([]);
  const [loading, setLoading] = useState(true);

    const getHomeOffers = async () => {
      const data = await getOffersToday();
      if(data.success){

        let offers = data.offers;

        if (currentLang !== "fr") {
        // Traduire chaque titre (en parallèle)
          const titles = offers.map(o => o.title);
          const descriptions = offers.map(o => o.description);

          const translatedTitles = await batchTranslate(titles, currentLang);
          const translatedDescriptions = await batchTranslate(descriptions, currentLang);

          offers = offers.map((offer, i) => ({
            ...offer,
            title: translatedTitles[i],
            description: translatedDescriptions[i],
          }));
        } else {
          // Français : on garde le titre d'origine
          offers = offers.map((offer) => ({ ...offer, title: offer.title }));
        }
      
        console.warn(offers);
        setHomeOffers(offers);
      }
      setLoading(false);
    }

    useEffect(() => {
      getHomeOffers();
    }, [i18n.language])


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
