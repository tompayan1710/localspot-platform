import gouter from "../../assets/images/gouter.avif"; // Replace with your mp4 video path
import Nice from "../../assets/images/Nice.avif"; // Replace with your mp4 video path
import arrowLeft from "../../assets/images/arrowLeft.png"; // Replace with your mp4 video path
import plusRound from "../../assets/images/plusRound.png";
import scaleImageIcon from "../../assets/images/scaleImageIcon.png";
import starIcon from "../../assets/images/starIcon.png";
import IconTicket from "../../assets/images/IconTicket.png";
import clockIcon from "../../assets/images/clockIcon.png";
import languageIcon from "../../assets/images/languageIcon.png";
import arrowdownicon from "../../assets/images/arrowdownicon.png";
import bycicle from "../../assets/images/bycicle.webp";
import footIcon from "../../assets/images/footIcon.png";
import carIcon from "../../assets/images/carIcon.png";
import copieIcon from "../../assets/images/copieIcon.png";
import mapIcon from "../../assets/images/mapIcon.webp";
import Map2D from "../../components/Map3D/Map2D";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";

import { motion } from "framer-motion";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import CarrouselPhoto from "../../components/CarrouselPhoto/CarrouselPhoto";
import DurationSlider from "./DurationSlider";
import DistanceSlider from "./DistanceSlider";
import ButtonLevier from "../../components/ButtonLevier/ButtonLevier";

export default function ScanPage() {

   const logoContainerRef = useRef(null);
   const hotelref = useRef(null);
   const imageOfferRef = useRef(null);
   const adresse = "04 place Godeau, 06140 Nice, France";

   const [searchOpen, setSearchOpen] = useState(false);

   const [LieuOpen, setLieuOpen] = useState(false);
   const [addPersonOpen, setAddPersonOpen] = useState(false);


   useEffect(() => {
    const logoContainer = logoContainerRef.current;
    const hotel = hotelref.current;

      // Initialisation de l'état initial (invisible et en bas)
       if (logoContainer) {
      // Supprimer les classes existantes si nécessaire
      // logoContainer.classList.remove("Animated");
      hotel.classList.add("popup");


      // Démarrer l'animation après 1 seconde*

      setTimeout(() => {
        logoContainer.classList.add("upingTop");
      }, 2000);
      // setTimeout(() => {
      //   logoContainer.classList.add("Animated");
      // }, 2000);
  }}, []);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(adresse)
      .then(() => {
        console.log("Adresse copiée !");
        // tu peux ajouter un petit feedback visuel ici si tu veux
      })
      .catch((err) => {
        console.error("Erreur de copie :", err);
      });
  };


  const fullCarrousel = ()=>{
    const imageOffer = imageOfferRef.current;
    imageOffer.classList.add("fullSize")
  }


  const [selectedChoicesActivity, setChoicesActivity] = useState([]);//Levier Choice
  const choicesActivity = [
    "JetSki", "Parachute", "Plongée", "Kayak", "Surf", "Paddle", "Bouée", "Ski nautique", "KiteSurf"
  ];
  const toggleChoiceActivity = (choice) => {
    setChoicesActivity((prev) => 
      prev.includes(choice)
      ? prev.filter((item) => item !== choice)
      : [...prev, choice]
    ) 
  }
  const [isActivitySelected, setActivitySelected] = useState(true);
  const toogleInputActivity = () => {
    setActivitySelected((prev) => !prev)
  }


  const [selectedChoicesFood, setChoicesFood] = useState([]);//Levier Choice
  const choicesFood = ["Croissant", "Quiche", "Falafel", "Burrito", "Wok", "Kebab", "Risotto", "Dim Sum", "Poké Bowl"];
  const toggleChoiceFood = (choice) => {
    setChoicesFood((prev) => 
      prev.includes(choice)
      ? prev.filter((item) => item !== choice)
      : [...prev, choice]
    ) 
  }
  const [isFoodSelected, setFoodSelected] = useState(false);
  const toogleInputFood = () => {
    setFoodSelected((prev) => !prev)
  }





  return (
    <div className="offerContainer">
      <div className={`SearchContainer ${searchOpen ?  "searchOpen" : ""}`}>
        <form className="StartSearch"  
        // onSubmit={handleLogin}>
        >     

         {
                      searchOpen ?  
        <div className="continueResearchContainer" onClick={() => setSearchOpen(false)}>
          <img src={arrowLeft}/>
          <p className="t6">revenir</p>
        </div> : <></>
          }
                    <input 
                      type="email" 
                      placeholder="Commencer ma recherche" 
                      // value={email} 
                      // onChange={(e) => setEmail(e.target.value)} 
                      onFocus={() => setSearchOpen(true)} // Correction ici
                      // required 
                    />

                    {
                      searchOpen ?
                      <>
                      <DistanceSlider />
                    <DurationSlider />
                      <div className="OptionSearch">
                        <div className="AddPersonne" onClick={() => setAddPersonOpen(prev => !prev)}>
                          <p className="t5">Ajouter des personnes</p>
                          <img src={arrowdownicon} />
                        </div>
                        { 
                          addPersonOpen ? 
                          <>
                            <div className="PersonneItem">
                              <div>
                                <p className="t4">Adultes</p>
                                <p className="t6">18 et plus</p>
                              </div>
                               <div className="AddOrRemove">
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur -");
                                }}>-</button>
                                <p className="t5">0</p>
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur +");
                                }}>+</button>
                              </div>
                            </div>
                            <div className="PersonneItem">
                              <div>
                                <p className="t4">Enfants</p>
                                <p className="t6">De 4 à 18ans</p>
                              </div>
                               <div className="AddOrRemove">
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur -");
                                }}>-</button>
                                <p className="t5">0</p>
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur +");
                                }}>+</button>
                              </div>
                            </div>
                            <div className="PersonneItem">
                              <div>
                                <p className="t4">Bébés</p>
                                <p className="t6">De 0 à 4ans</p>
                              </div>
                               <div className="AddOrRemove">
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur -");
                                }}>-</button>
                                <p className="t5">0</p>
                                <button onClick={(e) => {
                                  e.preventDefault();
                                  console.log("tu as cliqué sur +");
                                }}>+</button>
                              </div>
                            </div>
                          </>
                          : <></>
                        }
                      </div>
                        
                      <div className="ActivityChoice">
                        <di className="NameAndLevierContainer"><p>Activité</p><ButtonLevier toogleInput={toogleInputActivity} isSelected={isActivitySelected}/></di>
                        { 
                          isActivitySelected ? 
                          <div className="ListChoice">
                          {
                            choicesActivity.map((choice, index) => (
                              <div key={index} className={`ChoiceItem ${selectedChoicesActivity.includes(choice) ? "selectedChoice" : ""}`}
                              onClick={() => toggleChoiceActivity(choice)}>
                                <p className="t6">{choice}</p>
                              </div>

                            ))
                          }
                        </div>
                        : ""
                        }
                      </div>


                      <div className="ActivityChoice">
                        <di className="NameAndLevierContainer"><p>Food</p><ButtonLevier toogleInput={toogleInputFood} isSelected={isFoodSelected}/></di>
                        { 
                          isFoodSelected ? 
                          <div className="ListChoice">
                          {
                            choicesFood.map((choice, index) => (
                              <div key={index} className={`ChoiceItem ${selectedChoicesFood.includes(choice) ? "selectedChoice" : ""}`}
                              onClick={() => toggleChoiceFood(choice)}>
                                <p className="t6">{choice}</p>
                              </div>

                            ))
                          }
                        </div>
                        : ""
                        }
                      </div>
                    </>
                    : <></>
                    }
                    
                    {/* {message && <p className="erreurMessage t6">Ceci est le message d'erreur qui arrive {message}</p>} */}
        
                    {/* <button type="submit">
                      "Se connecter"
                    </button> */}
                  </form>
      </div>
      

      <div className="ContainerAll">
        <div ref={imageOfferRef} className="CarrouselPhotoContainer">
          <CarrouselPhoto />
          <div className="BackgroundBlur" onClick={fullCarrousel}>
            <img className="iconOnPhotos" src={scaleImageIcon} />
          </div>
        </div>
        <p className="t3">Atelier Croissant & Pâtisseries Parisiennes</p>
        <div className="StarList">
          <img src={starIcon} />
          <img src={starIcon} />
          <img src={starIcon} />
          <img src={starIcon} />
          <img src={starIcon} />
          <a className="t5" href="#avis">97 avis</a>
            
        </div>
        <p className="t5">Plongez dans l'art de la pâtisserie française lors de cet atelier situé au cœur du Marais à Paris. Accompagné d’un chef local, apprenez à préparer de vrais croissants, pains au chocolat et autres classiques de la boulangerie.</p>
        <div className="hline" style={{ padding: "0 10px", height: "0.5px" }}></div>
        <div className="InfoOfferContainer">
          <div className="infoOfferRow"><img src={clockIcon} /><p className="t6">Durée 50 min</p></div>
          <div className="infoOfferRow"><img src={IconTicket} /><p className="t6">Mobile ticket</p></div>
          <div className="infoOfferRow"><img src={languageIcon} /><p className="t6">Disponnible en anglais et 3 autres</p></div>
        </div>

        <div className="hline" style={{ padding: "0 10px", height: "0.5px" }}></div>

        <div className="OverviewContainer">
          <p className="t3">Overview</p>
          <div className="OverviewItem"><img src={Nice}/>
            <div>
              <p className="t5">Lorem ipsum dolor sit</p>
              <p className="t6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos adipisci consequuntur.</p>
            </div>
          </div>
          <div className="OverviewItem"><img src={Nice}/>
            <div>
              <p className="t5">Lorem ipsum dolor sit</p>
              <p className="t6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos adipisci consequuntur.</p>
            </div>
          </div>
          <div className="OverviewItem"><img src={Nice}/>
            <div>
              <p className="t5">Lorem ipsum dolor sit</p>
              <p className="t6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos adipisci consequuntur.</p>
            </div>
          </div>
        </div>

        <div className="hline" style={{ padding: "0 10px", height: "0.5px" }}></div>

        <div className={`RendezVousMapContainer ${LieuOpen ? "Open" : ""}`}>
          <div className="RendezVousRow" onClick={()=> setLieuOpen((prev) => !prev)}><p className="t4">Lieu de rendez-vous</p><img src={arrowdownicon} /></div>
          {LieuOpen ?
          <>
            <Map2D
                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
                        // markers={markers}              // ceci vient de useQrCodes()
                        // center={center}
                        // zoom={zoom}
                        // onMarkerClick={(m) => handleMarkerClick(m)}
            />
            <div className="DistanceRowContainer">
              <img src={footIcon}/><p>15 min</p>
              <img src={bycicle}/><p>10 min</p>
              <img src={carIcon}/><p>5 min</p>
            </div>
            <div className="AdresseContainer">
              <p className="t6">04 place Godeau, 06140 Nice, France</p>
              <button onClick={copyToClipboard}>
                <img src={copieIcon}/>
              </button>
            </div>
          </> 
          : <></>}
        </div> 

        <div className="hline" style={{ padding: "0 10px", height: "0.5px" }}></div>
        <div className="AvisContainer">
          <p className="t5">L'avis des client.es</p>
          <p className="t2">4.76</p>
          
          <div className="ListBigStar">
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
            <img src={starIcon} />
          </div>
          <div className="AvisList">
            <div className="AvisItem">
              <div>
                <div className="RowNameNote">
                  <p className="t5">Maurice - France</p>
                  <div className="row"><p className="t6">1/5</p><img src={starIcon} /></div>
                </div>    
                <p className="t6 VerifyAvis">Réservation vérifiée</p>
                <p className="t5">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque possimus est eligendi enim rerum, nesciunt molestiae nobis accusamus itaque aliquam repellat alias</p>

              </div>
              <p className="t6" style={{paddingTop : "10px", fontWeight: 100}}>il y a 2 semaines</p>
            </div>
            <div className="AvisItem">
              <div>
                <div className="RowNameNote">
                  <p className="t5">Maurice - France</p>
                  <div className="row"><p className="t6">1/5</p><img src={starIcon} /></div>
                </div>    
                <p className="t6 VerifyAvis">Réservation vérifiée</p>
                <p className="t5">Londe labore earum doloribusLonde labore earum doloribusLonde labore earum doloribusLonde labore earum doloribusLonde labore earum doloribusLonde labore earum doloribusLonde labore earum doloribus.</p>

              </div>
              <p className="t6" style={{paddingTop : "10px", fontWeight: 100}}>il y a 2 semaines</p>
            </div>
          </div>
        </div>
      </div>
      
      
      <div className="hline"></div>

      <div className="LastDivScan">
        <p className="t1">Votre hotel</p>
        <p className="t2">&</p>
        <p className="t1" style={{fontSize: "2.5rem"}}>Localspot</p>
      </div>



      <button className="MapButton" onClick={() =>console.log("Clique on map")}>
        <img src={mapIcon}/>
      </button>
      <div className="ReserveContainer">
        <div className="ReserveInfoCon">
          <p className="t5" style={{fontWeight: "900"}}>À partir de 59€</p>
          <p className="t6">par personne</p>
        </div>
        <button className="ReserButton">Reserver</button>
      </div>
       <BottomNavBar/> 
    </div>
  );
}



