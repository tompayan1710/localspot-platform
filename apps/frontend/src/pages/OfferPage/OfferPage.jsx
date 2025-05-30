
import starIcon from "../../assets/images/starIcon.png";
import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
import { getOfferBySlug } from "../../services/offers"


import "./styles.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Carrousel from "../../components/Carrousel/Carrousel";


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
        <Carrousel  photos={offer.image_urls}/>
        {/* <div ref={imageOfferRef} className="CarrouselPhotoContainer">
          <CarrouselPhoto photos={offer.image_urls}/>
          <div className="BackgroundBlur" onClick={fullCarrousel}>
            <img className="iconOnPhotos" src={scaleImageIcon} />
          </div>
        </div> */}
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

        
      </div>
      
      <div className="hline"></div>
      <div className="MakeBig"></div>
     



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



