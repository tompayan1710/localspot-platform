
  import starIcon from "../../assets/images/starIcon.png";
  import arrowLeft from "../../assets/images/arrowLeft.png"
  import walkIcon from "../../assets/images/walkIcon.png"
  import bycicleIcon from "../../assets/images/bycicleIcon.png"
  import carRedIcon from "../../assets/images/carRedIcon.png"
  import validateIcon from "../../assets/images/validateIcon.png"
  import clockIcon from "../../assets/images/clockIcon.png"
  import dureeIcon from "../../assets/images/dureeIcon.png"
  import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
  import Map2D from "../../components/Maps/Map2D";
  import { getOfferBySlug } from "../../services/offers"
  import { getQRCodeBySlug } from "../../services/QRCodeService"
  import { getHoteById } from "../../services/hotes"
  import "../../components/GoBack/GoBack.css"

import { getDurations } from "../../services/map2D";

  import "./OfferPage.css";
  import { useEffect, useRef, useState } from "react";
  import { useParams } from "react-router-dom";
  import Carrousel from "../../components/Carrousel/Carrousel";


  export default function OfferPage() {
    const { slug } = useParams();

    const offerContainerRef = useRef(null);
    const OfferPageAnimationRef = useRef(null); 
    const OfferPageRef = useRef(null); 
    const ReserveButtonRef = useRef(null); 
    const BottomNavBarRef = useRef(null);

    const [offer, setOffer] = useState({});
    const [qrcode, setQRCode] = useState({});
    const [hote, setHote] = useState({});
    const [durations, setDurations] = useState({});

/*
    const getQRCodesAndHote = async (slug) => {
      const qrcodeData = await getQRCodeBySlug(slug);
      if(qrcodeData.success){
        setQRCode(qrcodeData.qrcode);
        console.log("LLLLLLLLLLLLLLLLLLL");
        console.log(qrcodeData);

        const hoteData = await getHoteById(qrcodeData.qrcode.id_hote);

        if(hoteData.success){
          setHote(hoteData.hote);
          console.log(hoteData);
          console.log("Récuperation de l'hote avec la latitdue : ", hoteData.hote.latitude, hoteData.hote.longitude);

          fetchDurations(offer, hoteData.hote)
        }

      }
    }*/

    const OfferAnimationShow = () => {
        OfferPageAnimationRef.current.style.top = "-100vh";
        OfferPageRef.current.style.top = "0";
        OfferPageRef.current.style.overflowY = "auto";
        
        setTimeout(() => {
          ReserveButtonRef.current.classList.add("pupUp");
          BottomNavBarRef.current.classList.add("sliderInBottomNav");

          setTimeout(() => {
            offerContainerRef.current.style.overflowY = "scroll";
          }, 800)

        }, 1000)
    }
    
  const fetchDurations = async (offer, hote) => {
    if (!offer.latitude || !hote.latitude) return;
    const res = await getDurations({
      origin: { lat: hote.latitude, lng: hote.longitude },
      destination: { lat: offer.latitude, lng: offer.longitude },
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    });
    setDurations(res);
  };



  
    useEffect(() => {
      async function loadData(slug) {
      try {
        const offerData = await getOfferBySlug(slug);
        if (!offerData.success) return;
        setOffer(offerData.offer);

        const qrcodeData = await getQRCodeBySlug(slug);
        if (!qrcodeData.success) return;
        setQRCode(qrcodeData.qrcode);

        const hoteData = await getHoteById(qrcodeData.qrcode.id_hote);
        if (!hoteData.success) return;
        setHote(hoteData.hote);

        await fetchDurations(offerData.offer, hoteData.hote);
      } catch (error) {
        console.error("Erreur dans loadData :", error);
      }
    }


      if (slug) {
        console.log("Mon SLUG est : ", slug);
        loadData(slug);
        setTimeout(() => OfferAnimationShow(), 1000);
      }
    }, []);




    function formatDuration(durationText) {
      if (!durationText) return "...";

      return durationText
        .replace(" hours", "h")
        .replace(" hour", "h")
        .replace(" mins", "m")
        .replace(" min", "m");
    }


    return (
      <div className="offerContainer" ref={offerContainerRef}>

      <div className="OfferPageAnimation" ref={OfferPageAnimationRef}>
        <div className="ContainerTextWelcome">
          <p className="t2">Welcome</p>
          <div className="row">
            <p className="t3">to </p>
            <p className="t1">Nice!</p>
          </div>
          <p className="t5">Your hotel Le Radison</p>
          <p className="t4">wishes you a great stay</p>
        </div>
        <p className="t6">*a Viarte experience</p>

      </div>
      



        <div className="ContainerOfferPageAll" ref={OfferPageRef}>
          <button className="goBackButton" onClick={() => {}}><img src={arrowLeft}/><p className="t6">précédent</p></button>
          <Carrousel  photos={offer.image_urls}/>

          <p className="OfferTitle t3">{offer.title}</p>
          <p className="OfferDescription t5">{offer.description}</p>
          <p className="t5 OfferType">*{offer.type}</p>
          <div className="Offerhline"></div>     

            <div className="OfferInfoContainer">
              {
                offer.cancellable ?
                  <div className="row"><img src={validateIcon} alt="validate icon"/><p className="t6">Free cancellation</p></div>
                  :
                  <></>
              }
              <div className="row"><img src={dureeIcon} alt="clock icon"/><p className="t6">Durée {offer.duration}</p></div>
            </div>

          <div className="Offerhline"></div>     

          <p className="t32 DistanceText">Distance depuis votre Hotel :</p>
          <div className="OfferDistanceContainer">
            <div className="OfferDistanceColumn">
              <img src={walkIcon}/>
              <p className="t3">{formatDuration(durations.walking) || "..."}</p>
            </div>
            <div className="OfferDistanceColumn">
              <img src={bycicleIcon}/>
              <p className="t3">{formatDuration(durations.bicycling) || "..."}</p>
            </div>
            <div className="OfferDistanceColumn">
              <img src={carRedIcon}/>
              <p className="t3">{formatDuration(durations.driving) || "..."}</p>
            </div>
          </div>

          <div className="OfferMapContainer">
            {offer.latitude && offer.longitude && hote.latitude && hote.longitude ? (
              <>
                <Map2D
                  center={{ lat: offer.latitude, lng: offer.longitude }}
                  destination={{ lat: hote.latitude, lng: hote.longitude }}
                  zoom={17}
                />
                <a 
                href={`https://www.google.com/maps/dir/?api=1&origin=${hote.latitude},${hote.longitude}&destination=${offer.latitude},${offer.longitude}&travelmode=driving`}
                target="_blank"
                rel="noopener noreferrer"
                className="OpenInMapsBtn t6"
              >
                Ouvrir le trajet dans Google Maps
              </a>
            </>
            ) : (
              <div className="SquelletteMap">
                <div className="shimmer"></div>
              </div>
            )}

            {/* <Map2D center={{lat: offer.lat, lng: offer.lng}} destination={{ lat: 43.701, lng: 7.262 }}/> */}


          </div>
    
          <div className="MargeBottom"></div>
        </div>



        <div className="ReserveContainer" ref={ReserveButtonRef}>
          <div className="ReserveInfoCon">
            <p className="t5" style={{fontWeight: "900"}}>À partir de {offer.price}€</p>
            <p className="t6">par {offer.priceper}</p>
          </div>
          <button className="ReserveButton">Reserver</button>
        </div>
        <BottomNavBar isMap={false}  ref={BottomNavBarRef}/>  
      </div>
    );
  }



