
    import copieIcon from "../../assets/images/copieIcon.png";
    import arrowLeft from "../../assets/images/arrowLeft.png"
    import walkIcon from "../../assets/images/walkIcon.png"
    import bycicleIcon from "../../assets/images/bycicleIcon.png"
    import carRedIcon from "../../assets/images/carRedIcon.png"
    import validateIcon from "../../assets/images/validateIcon.png"
    import clockIcon from "../../assets/images/clockIcon.png"
    import dureeIcon from "../../assets/images/dureeIcon.png"
    import starIcon from "../../assets/images/starIcon.png"
    import Lorier from "../../assets/images/Lorier.png" 
    import crossiconBlack from "../../assets/images/crossiconBlack.png" 
    import customerKing from "../../assets/images/customerKing.png" 
    import arrowRight from "../../assets/images/arrowRight.png" 
    import extendMap from "../../assets/images/extendMap.png" 
    import BottomNavBar from "../../components/BottomNavBar/BottomNavBar";
    import Map2D from "../../components/Maps/Map2D";
    import { getOfferBySlug } from "../../services/offers"
    import { getQRCodeBySlug } from "../../services/QRCodeService"
    import { getHoteById } from "../../services/hotes"
    import "../../components/GoBack/GoBack.css"
  import React from "react";
  import { getDurations } from "../../services/map2D";

    import "./OfferPage.css";
    import { useEffect, useRef, useState } from "react";
    import { useParams } from "react-router-dom";
    import Carrousel from "../../components/Carrousel/Carrousel";
  import Footer from "../../components/Footer/Footer";
  import GoBack from "../../components/GoBack/GoBack";
  import ReviewItem from "./ReviewItem";


    export default function OfferPage() {
      const { slug } = useParams();

      const offerContainerRef = useRef(null);
      const OfferPageAnimationRef = useRef(null); 
      const OfferPageRef = useRef(null); 
      const ReserveButtonRef = useRef(null); 
      const BottomNavBarRef = useRef(null);
      const CarrouselRef = useRef(null);
      const PopUpBottomRef = useRef(null);

      const [offer, setOffer] = useState({});
      const [qrcode, setQRCode] = useState({});
      const [hote, setHote] = useState({});
      const [durations, setDurations] = useState({});
      const [navigationSelected, setNavigationSelected] = useState(0);
      const [scrollSyncEnabled, setScrollSyncEnabled] = useState(true);
      const [readMoreIsEnable, setReadMoreIsEnable] = useState({});
      const [openCancelPolity, setOpenCancelPolity] = useState(false);

      
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

          console.log(offerData.offer);
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
            <GoBack nagigation={"/"} scrollTo={""} text={"revenir"}/> 
            <button className="AllImages" onClick={() => {console.log("Appuie")}}>
              <img src={copieIcon} alt="copie Icon"/>
            </button>
            {/* <button className="goBackButton" onClick={() => {}}><img src={arrowLeft}/><p className="t6">précédent</p></button> */}
            <Carrousel  photos={offer.image_urls}  setNavigationSelected={setNavigationSelected} ref={CarrouselRef} scrollSyncEnabled={scrollSyncEnabled}/>
            <div className="pointNavigationContainer">
              {
                Array.isArray(offer.image_urls) &&
                offer.image_urls.map((_, index) => (
                  <button
                    key={index}
                    className={`pointNavigation ${navigationSelected == index ? "selected" : ""}`}
                    onClick={() => {
                      setNavigationSelected(index);
                      
                      setScrollSyncEnabled(false);

                      const carrousel = CarrouselRef.current;
                      console.log(CarrouselRef.current);
                      if (carrousel && carrousel.children[index]) {
                        carrousel.children[index].scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest"  /*/ 👈 ne scroll pas verticalement/*/});
                      }

                      setTimeout(() => {
                        setScrollSyncEnabled(true); // réactive après le scroll
                      }, 400)
                    }}
                  ></button>

                ))
              }
            </div>

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
              <button>
                <img src={extendMap} alt="extend icon"/>
              </button>
              {offer.latitude && offer.longitude && hote.latitude && hote.longitude ? (
                <>
                  <Map2D
                    center={{ lat: offer.latitude, lng: offer.longitude }}
                    destination={{ lat: hote.latitude, lng: hote.longitude }}
                    zoom={17}
                    adresseTexte ={offer.adresse ? offer.adresse : ""}
                    borderRadius={35}

                  />
                  <a 
                  href={`https://www.google.com/maps/dir/?api=1&origin=${hote.latitude},${hote.longitude}&destination=${offer.latitude},${offer.longitude}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="OpenInMapsBtn t6"
                >
                  Ouvrir dans Google Maps
                </a>
                
              </>
              ) : (
                <div className="SquelletteMap">
                  <div className="shimmer"></div>
                </div>
              )}

              {/* <Map2D center={{lat: offer.lat, lng: offer.lng}} destination={{ lat: 43.701, lng: 7.262 }}/> */}
            </div>
      
            {/* <div className="MargeBottom"></div> */}
            
            <div className={"cancelline"}></div>
            <button id="CancellationPolicy" onClick={() => {setOpenCancelPolity(true)}}>
              <div>
                <p className="32">Cancellation Policy</p>
                <p className="t6">You can cancel up to 24 hours in advance of the experience for a full refund.</p>
              </div>
              <img src={arrowRight} alt="arrow right icon"/>
            </button>
            <div className={"cancelline"}></div>

            <div className="ClientReviewContainer">
              <div className="row">
                <p className="t4 ReviewTitle">Customer Riviews</p>
                <button className="iButton" onClick={() => {
                  PopUpBottomRef.current.style.bottom = "0px";
                }}
              >i</button>
              </div>        
              <p className="t1">4.5 / 5</p>
              <div className="StarsList">
                {
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="StarItem">
                      <img src={starIcon} alt="Star Icon" />
                    </div>
                  ))
                }
              </div>
              <div className="validateReview">
                <div className="row">
                  <img src={Lorier}/>
                </div>
                <div className="column">
                  {/* <p>Seul Les personnes ayant acheter "participer" on la possibilité de commenter</p> */}
                  {/* <p>les commentaires des autres personnes serve à vous décrire leur ressentie et autre</p> */}
                  {/* Avis 100 % authentiques. */}
                  {/* Seules les personnes ayant réservé cette activité peuvent partager leur ressenti pour vous guider dans votre choix */}
                  <p className="t5">les avis des participants</p>
                  {/* <p className="t6">Les commentaires partagés vous permettent de découvrir les ressentis et avis d'autres participants.</p> */}
                  <p className="t6">Les commentaires reflètent les ressentis de participants ayant réellement vécu l’expérience.</p>
                </div>
              </div>
              <p className="t5 BasedOn">Based on 345 reviews :</p>
              <div className="rankStarContainer">
              {
                Array.from({length: 5}).map((_, index) => {
                  const myindex = 5 - index;
                  return (
                    <React.Fragment key={`rank-${myindex}`}>
                    <p key={`start${myindex}`} className="t6 starStart">{myindex}&nbsp;star{myindex>1 ? "s" : ""}</p>
                    <div key={`progression${myindex}`} className="rankProgression">
                      <div className="rankGoldProgression"></div>
                    </div>
                    <p key={`number${myindex}`} className="t6 starEnd">{myindex*25}</p>
</React.Fragment>
                  )
                })
              }
            </div>
            <div id={"secondHline"}></div>
            <div className="ReviewItemColumn">
            {
              Array.from({length: 5}).map((_, index) => {
                return (
                  <div key={`review-${index}`}>
                  <ReviewItem
                    index={index}
                    comment={"J’ai adoré ce super syJ’ai adoré cette était superJ’ai adoré ce super syJ’ai adoré cette était superJ’ai adoré ce super syJ’ai adoré cette était superJ’ai adoré ce super syJ’ai adoré cette était superJ’ai adoré ce super syJ’ai adoré cette était super soré cette était super sy"}
                    readMoreIsEnable={readMoreIsEnable}
                    setReadMoreIsEnable={setReadMoreIsEnable}
                  />
                  </div>
                )
              })
            }
            </div>
            
           
            <p className="seeMore t5">Voir <strong>+</strong></p>
            </div>
            <Footer paddingBottom={"140px"}/>
          </div>



          <div className="ReserveContainer" ref={ReserveButtonRef}>
            <div className="ReserveInfoCon">
              <p className="t5" style={{fontWeight: "900"}}>À partir de {offer.price}€</p>
              <p className="t6">par {offer.priceper}</p>
            </div>
            <button className="ReserveButton">Reserver</button>
          </div>

          <BottomNavBar isMap={false}  ref={BottomNavBarRef}/>  

          <div className="openCancelPolity">
            <button className="closeButton" onClick={() => {setOpenCancelPolity(true)}}>
              <img src={crossiconBlack}/>
            </button>
            <div className="row">
              <img src={customerKing} alt="customer is king"/>
              <p className="t5">ustomer Riviews</p>
            </div>
            <div className="PopUpLine"></div>
            <p className="t6">Après avoir vécu l’expérience, les voyageurs sont invités à partager leur ressenti : des avis fiables et authentiques. Vous êtes certain de lire un retour d’expérience réel.</p>
          </div>

          <div className="PopUpBottom" ref={PopUpBottomRef}>
            <button className="closeButton" onClick={() => {
              PopUpBottomRef.current.style.bottom = "-150px";
            }}>
              <img src={crossiconBlack}/>
            </button>
            <div className="row">
              <img src={customerKing} alt="customer is king"/>
              <p className="t5">ustomer Riviews</p>
            </div>
            <div className="PopUpLine"></div>
            <p className="t6">Après avoir vécu l’expérience, les voyageurs sont invités à partager leur ressenti : des avis fiables et authentiques. Vous êtes certain de lire un retour d’expérience réel.</p>
          </div>
        </div>
      );
    }



