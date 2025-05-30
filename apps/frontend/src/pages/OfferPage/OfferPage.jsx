import Nice from "../../assets/images/Nice.avif"; // Replace with your mp4 video path
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
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { getOfferBySlug } from "../../services/offers"


import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CarrouselPhoto from "../../components/CarrouselPhoto/CarrouselPhoto";


export default function OfferPage() {
  const { slug } = useParams();

  const imageOfferRef = useRef();

   const [offer, setOffer] = useState({});
  const [LieuOpen, setLieuOpen] = useState(false);

   const getOffer = async (slug) => {
    const data = await getOfferBySlug(slug);
    if(data.success){
      console.warn(data.offer);
      console.log(data.offer.image_urls)
      setOffer(data.offer);
      console.log("Jesuios")
      console.log(data.offer);
    }
   }


   useEffect(() => {
      console.log("Mon SLUG est : ", slug)

    getOffer(slug);
  }, []);


  const copyToClipboard = () => {
    navigator.clipboard.writeText(offer.location)
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

      

      <div className="ContainerAll">
        <div ref={imageOfferRef} className="CarrouselPhotoContainer">
          <CarrouselPhoto photos={offer.image_urls}/>
          {/* {
            offer ? <CarrouselPhoto photos={offer.image_urls}/> : ""
          } */}
          <div className="BackgroundBlur" onClick={fullCarrousel}>
            <img className="iconOnPhotos" src={scaleImageIcon} />
          </div>
        </div>
        <p className="t3">{offer.title}</p>
        <div className="StarList">
          <img src={starIcon} />
          <img src={starIcon} />
          <img src={starIcon} />
          <img src={starIcon} />
          <img src={starIcon} />
          <a className="t5" href="#avis">97 avis</a>
            
        </div>
        <p className="t5">{offer.description}</p>
        <div className="hline" style={{ padding: "0 10px", height: "0.5px" }}></div>
        <div className="InfoOfferContainer">
          <div className="infoOfferRow"><img src={clockIcon} /><p className="t6">{offer.duration}</p></div>
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
                        center={{lat: offer.latitude, lng: offer.longitude}}
                        zoom={13}
                        // onMarkerClick={(m) => handleMarkerClick(m)}
            />
            <div className="DistanceRowContainer">
              <img src={footIcon}/><p>15 min</p>
              <img src={bycicle}/><p>10 min</p>
              <img src={carIcon}/><p>5 min</p>
            </div>
            <div className="AdresseContainer">
              <p className="t6">{offer.adresse}</p>
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


      <div className="ReserveContainer">
        <div className="ReserveInfoCon">
          <p className="t5" style={{fontWeight: "900"}}>À partir de {offer.price}€</p>
          <p className="t6">par {offer.priceper}</p>
        </div>
        <button className="ReserButton">Reserver</button>
      </div>
       <BottomNavBar isMap={false}/> 
    </div>
  );
}



