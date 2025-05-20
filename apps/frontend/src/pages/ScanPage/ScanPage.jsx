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
import Map2D from "../../components/Map3D/Map2D";

import { motion } from "framer-motion";
import "./styles.css";
import { useEffect, useRef, useState } from "react";
import CarrouselPhoto from "../../components/CarrouselPhoto/CarrouselPhoto";

export default function ScanPage() {

   const logoContainerRef = useRef(null);
   const hotelref = useRef(null);
   const imageOfferRef = useRef(null);
   const adresse = "04 place Godeau, 06140 Nice, France";

   const [searchOpen, setSearchOpen] = useState(false);

   const [LieuOpen, setLieuOpen] = useState(false);
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

  return (
    <div className="offerContainer">
      <div className="SearchContainer">
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
                      required 
                    />

                    {
                      searchOpen ?
                      <>
                      <div className="OptionSearch">
                        <p className="t5">Ajouter des personnes</p>
                        <img src={plusRound} />
                      </div>
                      <input 
                      type="password" 
                      placeholder="Mot de passe" 
                      // value={password} 
                      // onChange={(e) => setPassword(e.target.value)} 
                      required 
                    /> 
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
      
      
      <div>

      </div>

       
       <div className="Voir les disponnibilité"></div>
    </div>
  );
}



