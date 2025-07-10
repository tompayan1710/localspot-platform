import copieIcon from "../../assets/images/copieIcon.png";
import walkIcon from "../../assets/images/walkIcon.png"
import bycicleIcon from "../../assets/images/bycicleIcon.png"
import carRedIcon from "../../assets/images/carRedIcon.png"
import validateIcon from "../../assets/images/validateIcon.png"
import dureeIcon from "../../assets/images/dureeIcon.png"
import Map2DPin from "../../assets/images/Map2DPin.png"
import starIcon from "../../assets/images/starIcon.png"
import Lorier from "../../assets/images/Lorier.png" 
import customerKing from "../../assets/images/customerKing.png" 
import arrowRight from "../../assets/images/arrowRight.png" 
import extendMap from "../../assets/images/extendMap.png" 
import crossiconBlack from "../../assets/images/crossiconBlack.png" 
import Map2D from "../../components/Maps/Map2D";
import { getOfferBySlug } from "../../services/offers"
import { getQRCodeById } from "../../services/QRCodeService"
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
import { useNavigate, useLocation } from "react-router-dom";
import PopUpBottom from "../../components/PopUpBottom/PopUpBottom";

export default function OfferPage() {
  const { slug } = useParams();
  const location = useLocation();
  const isAnimation = location.state?.isAnimation || false;

  const queryParams = new URLSearchParams(location.search);
  const id_qrcode = queryParams.get('id');


  const navigate = useNavigate();
  const offerContainerRef = useRef(null);
  const OfferPageAnimationRef = useRef(null); 
  const OfferPageRef = useRef(null); 
  const ReserveButtonRef = useRef(null); 
  const CarrouselRef = useRef(null);
  const PopUpBottomRef = useRef(null);
  const CancelBottomRef = useRef(null);
  const ParticipantBottomRef = useRef(null);
  const refOfferMapContainer = useRef(null);
  const refAdresse = useRef(null);

  const [offer, setOffer] = useState({});
  const [qrcode, setQRCode] = useState({});
  const [hote, setHote] = useState({});
  const [durations, setDurations] = useState({});
  const [navigationSelected, setNavigationSelected] = useState(0);
  const [scrollSyncEnabled, setScrollSyncEnabled] = useState(true);
  const [readMoreIsEnable, setReadMoreIsEnable] = useState({});
  const [isOccultView, setIsOccultView] = useState(false);
  const [participantAdult, setParticipantAdult] = useState(2);
  const [participantReduced, setParticipantReduced] = useState(1);      
  const [isLoading, setIsLoading] = useState(true);      
  const [isExtendMap, setIsExtendMap] = useState(false);  
  
  

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
    
function allRefsReady() {
  return (
    OfferPageAnimationRef.current &&
    OfferPageRef.current &&
    ReserveButtonRef.current &&
    offerContainerRef.current
  );
}

  const OfferAnimationShow = () => {
    console.error("Voici mon isAnimation : ", isAnimation);

      OfferPageAnimationRef.current.style.top = "-100vh";
      OfferPageRef.current.style.top = "0";
      OfferPageRef.current.style.overflowY = "auto";
            
      setTimeout(() => {
        if(ReserveButtonRef.current){
          ReserveButtonRef.current.classList.add("pupUp");
        }

        // setTimeout(() => {
          offerContainerRef.current.style.overflowY = "scroll";
          // }, 0)

      }, 1000)    
  }

  
  const OfferWithoutAnimation = () => {
    console.warn("Voici mon isAnimation OfferWithoutAnimation : ", isAnimation);

    // OfferPageAnimationRef.current.style.display = "none";
      OfferPageRef.current.style.top = "0";
      OfferPageRef.current.style.overflowY = "auto";
            
      offerContainerRef.current.style.overflowY = "scroll";
  
      if(ReserveButtonRef.current){
          ReserveButtonRef.current.classList.add("pupUp");
        }
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


  const getMaximumParticipants = async () => {
    
  }
    
  useEffect(() => {
    async function loadData(slug) {
      try {
        setIsLoading(true);
        const offerData = await getOfferBySlug(slug);
        if (!offerData.success) return;
        setOffer(offerData.offer);
        console.log(offerData.offer);

        

         if(id_qrcode){
          console.log("Mon id est :", id_qrcode);
          const qrcodeData = await getQRCodeById(id_qrcode);
          if (!qrcodeData.success) return;
          setQRCode(qrcodeData.qrcode);


          const hoteData = await getHoteById(qrcodeData.qrcode.id_hote);
          if (!hoteData.success) return;
          setHote(hoteData.hote);

          await fetchDurations(offerData.offer, hoteData.hote);

          setTimeout(() => {
            getShortestDuration(durations)
          },1000)
        }else{
          console.log("C'est nulllLLLLLL id", id_qrcode);
        }

        setTimeout(() => {
          setIsLoading(false);
        }, 1000)

        
        } catch (error) {
          console.error("Erreur dans loadData :", error);
      }
    }

    if (slug) {
      console.log("Mon SLUG est : ", slug);

      loadData(slug);
      if(isAnimation){
        setTimeout(() => {
        if (allRefsReady()) {
          OfferAnimationShow();
        }}, 1000);
      }else{//Ici Pas d'animation
        if(allRefsReady()){
          OfferWithoutAnimation();
        }
      }
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

    function getShortestDuration(durations) {
      const durationValues = Object.values(durations)
        .map(duration => {
          if (!duration) return Infinity; // Si duration est undefined/null
          const hoursMatch = duration.match(/(\d+)\s*hour/);
          const minsMatch = duration.match(/(\d+)\s*min/);

          let totalMinutes = 0;
          if (hoursMatch) totalMinutes += parseInt(hoursMatch[1], 10) * 60;
          if (minsMatch) totalMinutes += parseInt(minsMatch[1], 10);

          return totalMinutes > 0 ? totalMinutes : Infinity;
        });

      const shortestMinutes = Math.min(...durationValues);

      if (shortestMinutes === Infinity) return "...";

      const hours = Math.floor(shortestMinutes / 60);
      const minutes = shortestMinutes % 60;

      console.log(hours, minutes)
      // if (hours > 0 && minutes > 0) return `${hours}h${minutes}m`;
      // if (hours > 0) return [hours, "hours"]`${hours}h`;
      if(hours>0){
        console.log("JE TESTE LES HEURES")
        const formattedHours = (hours + Math.round(0.6 / minutes * 10)/10).toFixed(1);
        return [formattedHours, "hours"];
      }else {
        return [minutes, "min"];
      }
    }


  useEffect(() => {
    if (offer.latitude && offer.longitude && !isLoading && refAdresse.current) {
      const hauteur = refAdresse.current.offsetHeight;
      console.log("Hauteur du P :", hauteur, "px");

      refOfferMapContainer.current.style.paddingBottom=`calc(${hauteur}px + 45px)`
    }
  }, [isLoading]);


    return (
      <div className="offerContainer" ref={offerContainerRef}>
        <div className={`OfferPageAnimation ${!isAnimation ? "Without" : ""}`} ref={OfferPageAnimationRef}>
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

        <div className={`ContainerOfferPageAll ${!isAnimation ? "Without" : ""}`} ref={OfferPageRef}>
          <GoBack nagigation={"/"} scrollTo={""} text={"revenir"}/> 
          {/* <TopDivOpacity /> */}
          <button className="AllImages" onClick={() => {console.log("Appuie")}}>
            <img src={copieIcon} alt="copie Icon"/>
          </button>
          <Carrousel isLoading={isLoading}  photos={offer.image_urls}  setNavigationSelected={setNavigationSelected} ref={CarrouselRef} scrollSyncEnabled={scrollSyncEnabled}/>
          <div className="pointNavigationContainer">
            {
              Array.isArray(offer.image_urls) &&
                offer.image_urls.map((_, index) => (
                  <button
                    key={index}
                    className={`pointNavigation ${navigationSelected === index ? "selected" : ""}`}
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

            <p className={`OfferTitle t3 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" :offer.title}</p>
            <p className={`OfferDescription t5 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : offer.description}</p>
            <p className={`t5 OfferType ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : `*${offer.type}`}</p>
            <div className="Offerhline"></div>     

              <div className="OfferInfoContainer">
                {
                  offer.cancellable ?
                    <div className={`row ${isLoading ? "loading shimmer" : ""}`}>
                      {isLoading ?
                        <></>
                        : 
                        <>
                          <img src={validateIcon} alt="validate icon"/>
                          <p className="t6">Free cancellation</p>
                        </>
                      }
                    </div>
                    :
                    <></>
                }
                <div className={`row ${isLoading ? "loading shimmer" : ""}`}>
                  {isLoading ?
                    <></>
                    : 
                    <>
                      <img src={dureeIcon} alt="clock icon"/>
                      <p className="t6">Durée {offer.duration}</p>
                    </>
                  }
                </div>
                
              </div>

            <div className="Offerhline"></div>     

            {
              id_qrcode ?
              <>
                <p className="t32 DistanceText">Distance depuis votre Hotel :</p>
                <div className="OfferDistanceContainer">
                  <div className="OfferDistanceColumn">
                    {
                      isLoading ?
                        <div className="skeletonType shimmer"></div>
                      :
                        <img src={walkIcon} alt="walk icon"/>
                    }
                    <p className="t3">{formatDuration(durations.walking) || "..."}</p>
                  </div>
                  <div className="OfferDistanceColumn">
                    {
                      isLoading ?
                        <div className="skeletonType shimmer"></div>
                      :
                        <img src={bycicleIcon} alt="bycicle icon"/>
                    }
                    <p className="t3">{formatDuration(durations.bicycling) || "..."}</p>
                  </div>
                  <div className="OfferDistanceColumn">
                    {
                      isLoading ?
                        <div className="skeletonType shimmer"></div>
                      :
                        <img src={carRedIcon} alt="car icon"/>
                    }
                    <p className="t3">{formatDuration(durations.driving) || "..."}</p>
                  </div>
                </div>
              </>
              :
              <></>
            }
            

            <div className={`OfferMapContainer ${isExtendMap ? "extendMap" : ""}`} ref={refOfferMapContainer}>
              <button onClick={() => {
                setIsExtendMap(!isExtendMap)
              }}>
                {
                  isExtendMap ? <img src={crossiconBlack} alt="close icon"/>
                  : <img src={extendMap} alt="extend icon"/>
                }
              </button>
              {offer.latitude && offer.longitude ? (
                  <>
                {
                  hote.latitude && hote.longitude ? (
                    <>
                    <Map2D
                      center={{ lat: offer.latitude, lng: offer.longitude }}
                      destination={{ lat: hote.latitude, lng: hote.longitude }}
                      zoom={17}
                      adresseTexte ={offer.adresse ? offer.adresse : ""}
                      borderRadius={isExtendMap ? 0 : 35}
                      duration={getShortestDuration(durations)}
                    />
                    <div className={`row adresseContainer ${isLoading ? "loading shimmer" : ""}`}>
                      {!isLoading && (
                        <>
                          <img src={Map2DPin} alt="map pin icon" />
                          <p ref={refAdresse} className="adresseText">{offer.adresse}</p>
                        </>
                      )}
                    </div>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&origin=${hote.latitude},${hote.longitude}&destination=${offer.latitude},${offer.longitude}&travelmode=driving`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="OpenInMapsBtn t6"
                    >
                      Ouvrir dans Google Maps
                    </a>
                    </>
                  ) : 
                    <>
                    <Map2D
                      center={{ lat: offer.latitude, lng: offer.longitude }}
                      zoom={17}
                      adresseTexte ={offer.adresse ? offer.adresse : ""}
                      borderRadius={isExtendMap ? 0 : 35}
                    />
                    <div className={`row adresseContainer ${isLoading ? "loading shimmer" : ""}`}>
                    {!isLoading && (
                      <>
                        <img src={Map2DPin} alt="map pin icon" />
                        <p ref={refAdresse} className="t6 adresseText">{offer.adresse}</p>
                      </>
                    )}
                  </div>
                    <a 
                      href={`https://www.google.com/maps/search/?api=1&query=${offer.latitude},${offer.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="OpenInMapsBtn t6"
                    >
                      Voir sur Google Maps
                    </a>
                    </>
                }
                  
                
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
            <button id="CancellationPolicy" onClick={() => {
              // CancelBottomRef.current.style.bottom = "0px";
              PopUpBottomRef.current.classList.add("open")
              setIsOccultView(true);
            }}>
              <div>
                <p className="t4">Cancellation Policy</p>
                <p className="t6">You can cancel up to 24 hours in advance of the experience for a full refund.</p>
              </div>
              <img src={arrowRight} alt="arrow right icon"/>
            </button>
            <div className={"cancelline"}></div>

            <div className="ParticipantSelectContainer" onClick={() => {
              // ParticipantBottomRef.current.style.bottom = "0px";
              ParticipantBottomRef.current.classList.add("open")
              setIsOccultView(true);
            }}>
              <div>
                <p className="t4">Select participants</p>
                <div className="row">
                  <p className="t5">Participants :</p> 
                  <p className="t5">{ participantAdult + participantReduced}</p>
                </div>
                <p className="t6">
                  ×{participantAdult} adult
                  {participantReduced > 0 && `\u00A0\u00A0×${participantReduced} reduced`}
                </p>
              </div>
              
              <img src={arrowRight} alt="arrow right icon"/>
            </div>

            <div className="ClientReviewContainer">
              <div className="row">
                <p className="t4 ReviewTitle">Customer Riviews</p>
                <button className="iButton" onClick={() => {
                  // PopUpBottomRef.current.style.bottom = "0px";
                  PopUpBottomRef.current.classList.add("open")
                  setIsOccultView(true);
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
                  <img src={Lorier} alt="lorier illustration"/>
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
            <Footer paddingBottom={"150px"}/>
          </div>



          <div className="ReserveContainer" ref={ReserveButtonRef}>
            <div className="ReserveInfoCon">
              <p className="t5" style={{fontWeight: "900"}}>À partir de {offer.price}€</p>
              <p className="t6">par {offer.priceper}</p>
            </div>
            <button className="ReserveButton" onClick={() => {
              navigate(`/offer-page/${slug}/availibility`, {
                state: {
                  title: offer.title,
                  adresse: offer.adresse,
                  price: offer.price,
                  participantAdult: participantAdult,
                  participantReduced: participantReduced,
                  OfferIsCancellable: offer.cancellable,
                  total_capacity: offer.total_capacity,
                }
              })
            }}>Voir les<br></br>disponnibilités</button>
          </div>


          <PopUpBottom 
            onClose={() => {
              CancelBottomRef.current.classList.remove("open");
              // CancelBottomRef.current.style.bottom = "-100%";
              setIsOccultView(false);
            }}
            title={(
              <p className="t5">CancelPolicy</p>
            )}
            ref={CancelBottomRef}
          >
            <p className="t6">Vous pouvez annuler votre réservation jusqu’à 24 heures avant le début de l’activité pour obtenir un remboursement complet. Passé ce délai, aucune annulation ni remboursement ne sera possible.</p>
          </PopUpBottom>

          <PopUpBottom 
            onClose={() => {
              ParticipantBottomRef.current.classList.remove("open");
              // ParticipantBottomRef.current.style.bottom = "-100%";
              setIsOccultView(false);
            }}
            title={(
              <p className="t5">Ajouter des participants</p>
            )}
            ref={ParticipantBottomRef}
          >
            <>
              <p className="t6">il reste actuellement <strong className={`${10<3 ? "short" : ""}`}>10 places</strong></p>
              <div className="AnimationHuman">

              </div>
              <div className="rowTotal">
                <p className="t5">Participants :</p> 
                <p className="t5">{participantAdult + participantReduced}</p>
              </div>
              <div className="rowAddParticipant">
                <div className="column">
                  <p className="t5">Adult</p>
                  <p className="t6">18 - 99 ans</p>
                </div>
                <div className="row">
                  <button className="buttonParticipant" disabled={participantAdult === 1} onClick={() => {
                    setParticipantAdult((prev) => prev - 1)
                    }}>
                    <p className="t3">-</p>
                  </button>
                  <p className="t4">{participantAdult}</p>
                  <button className="buttonParticipant" disabled={participantAdult === 10} onClick={() => {
                    setParticipantAdult((prev) => prev + 1)
                    }}>
                    <p className="t3">+</p>
                  </button>
                </div>
              </div>
              <div className="rowAddParticipant">
                <div className="column">
                  <p className="t5">Tarif réduit</p>
                  <p className="t6">-18 ans</p>
                </div>
                <div className="row">
                  <button className="buttonParticipant" disabled={participantReduced === 0} onClick={() => {
                    setParticipantReduced((prev) => prev - 1)
                    }}>
                    <p className="t3">-</p>
                  </button>
                  <p className="t4">{participantReduced}</p>
                  <button className="buttonParticipant" disabled={participantReduced === 10} onClick={() => {setParticipantReduced((prev) => prev + 1)}}>
                    <p className="t3">+</p>
                  </button>
                </div>
              </div>
            </>
          </PopUpBottom>


          <PopUpBottom 
            onClose={() => {
              // PopUpBottomRef.current.style.bottom = "-100%";
              PopUpBottomRef.current.classList.remove("open");
              setIsOccultView(false);
            }}
            title={(
              <div className="row">
                <img src={customerKing} alt="customer is king"/>
                <p className="t5">ustomer Riviews</p>
              </div>
            )}
            ref={PopUpBottomRef}
          >
            <p className="t6">Après avoir participé à l’activité, les voyageurs sont invités à partager leur expérience en laissant un commentaire. Ces avis sont 100 % authentiques, rédigés uniquement par les participants ayant réellement vécu l’expérience.</p>
          </PopUpBottom>
          
          {/* <div className="PopUpBottom" ref={PopUpBottomRef}>
            <button className="closeButton" onClick={() => {
              PopUpBottomRef.current.style.bottom = "-150px";
              setIsOccultView(false);
            }}>
              <img src={crossiconBlack} alt="cross icon"/>
            </button>
            <div className="row">      
              <img src={customerKing} alt="customer is king"/>
              <p className="t5">ustomer Riviews</p>
            </div>
            <div className="PopUpLine"></div>
            <p className="t6">Après avoir vécu l’expérience, les voyageurs sont invités à partager leur ressenti : des avis fiables et authentiques. Vous êtes certain de lire un retour d’expérience réel.</p>
          </div> */}

          <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
            PopUpBottomRef.current.classList.remove("open");
            CancelBottomRef.current.classList.remove("open");
            ParticipantBottomRef.current.classList.remove("open");

            // PopUpBottomRef.current.style.bottom = "-100%";
            // CancelBottomRef.current.style.bottom = "-100%";
            // ParticipantBottomRef.current.style.bottom = "-100%";
            setIsOccultView(false);
          }}></div>
    </div>
  );
}



