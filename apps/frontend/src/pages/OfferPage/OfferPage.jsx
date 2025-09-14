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
  import favoris from "../../assets/images/favoris.png" 
  import favoris_selected from "../../assets/images/favoris_selected.png" 
  import allImageIcon from "../../assets/images/allImageIcon.png" 
  import France from "../../assets/images/France.png" 
  import warningRed from "../../assets/images/warningRed.png" 

  import Map2D from "../../components/Maps/Map2D"; 

  import { getOfferBySlug } from "../../services/offers"
  import { toggleFavorite, IsOfferFavorite } from "../../services/favorites.js"
  import { getQRCodeById } from "../../services/QRCodeService"
  import { getHoteById } from "../../services/hotes"
  import "../../components/GoBack/GoBack.css"
  import React from "react";
  import { getDurations } from "../../services/map2D";
  import { AuthContext } from "../../components/Auth/authContext/authContext.js";

  import "./OfferPage.css";
  import { useEffect, useRef, useState, useContext } from "react";
  import { useParams } from "react-router-dom";
  import Carrousel from "../../components/Carrousel/Carrousel";
  import Footer from "../../components/Footer/Footer";
  import GoBack from "../../components/GoBack/GoBack";
  import ReviewItem from "./Comments/ReviewItem";
  import { useNavigate, useLocation } from "react-router-dom";
  import PopUpBottom from "../../components/PopUpBottom/PopUpBottom";
  import OfferComments from "./Comments/OfferComments";
  import { linearTheme } from "../../services/themeModifier";
  import PopUpLogin from "../../components/Auth/PopUpLogin/PopUpLogin.jsx";
  import ButtonLanguage from "../../components/Buttons/ButtonLanguage/ButtonLanguage.jsx";
  import { useTranslation } from "react-i18next";


  // import "./EditLanguage.css"


  export default function OfferPage() {
    const { slug } = useParams();
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

    const isAnimation = location.state?.isAnimation || false;
    const origin = location.state?.origin || false;
    const { checkAuth, authState } = useContext(AuthContext);

    const queryParams = new URLSearchParams(location.search);
    const id_hote = queryParams.get('host_id');


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
    const PopUpLoginRef = useRef(null);

    const [offer, setOffer] = useState({});
    const [qrcode, setQRCode] = useState({});
    const [hote, setHote] = useState({});
    const [durations, setDurations] = useState({});
    const [navigationSelected, setNavigationSelected] = useState(0);
    const [scrollSyncEnabled, setScrollSyncEnabled] = useState(true);
    const [isOccultView, setIsOccultView] = useState(false);
    const [participantAdult, setParticipantAdult] = useState(2);
    const [participantChild, setParticipantChild] = useState(0);      
    const [participantInfant, setParticipantInfant] = useState(0);      
    const [isLoading, setIsLoading] = useState(true);      
    const [isExtendMap, setIsExtendMap] = useState(false);  
    const [isFavorite, setIsFavorite] = useState(false);  
    const [popUpLanguage, setPopUpLanguage] = useState(false);



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
            setPopUpLanguage(true);
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
            setPopUpLanguage(true);
        }
    }
        

    useEffect(() => {
      const getFavoricity = async () => {
        if (authState.user?.id && slug) {
          const result = await IsOfferFavorite(authState.user.id, slug);
          if (result.success) {
            setIsFavorite(result.isFavorite);
          }
        }
      };

      getFavoricity();
    }, [authState.user?.id, slug]);

    // const fetchDurations = async (offer, hote) => {////////////////////////////////////A remetre
    //   if (!offer.latitude || !hote.latitude) return;
    //   const res = await getDurations({
    //     origin: { lat: hote.latitude, lng: hote.longitude },
    //     destination: { lat: offer.latitude, lng: offer.longitude },
    //     apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
    //   });
    //   setDurations(res);
    // };

    function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // rayon de la Terre en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

      

    useEffect(() => {
      checkAuth();
    }, [])

    useEffect(() => {

      //Pour les likes, pour réinitialisé l'état après que l'utilisateur se soit connecter
      async function loadData(slug) {
        try {
          setIsLoading(true);
          const offerData = await getOfferBySlug(slug, lang);
          if (!offerData.success) return;
          setOffer(offerData.offer);
          console.log(offerData.offer);

          

          if(id_hote){
            // console.log("Mon id est :", id_hote);
            // const qrcodeData = await getQRCodeById(id_hote);
            // if (!qrcodeData.success) return;
            // setQRCode(qrcodeData.qrcode);


            // const hoteData = await getHoteById(qrcodeData.qrcode.id_hote);
            const hoteData = await getHoteById(id_hote);
            if (!hoteData.success) return;
            setHote(hoteData.hote);

            // await fetchDurations(offerData.offer, hoteData.hote); ////////////////////////////////////A remetre

            setTimeout(() => {
              getShortestDuration(durations)
            },1000)
          }else{
            console.log("C'est nulllLLLLLL id", id_hote);
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
    }, [lang]);




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



      useEffect(() => {
        const from = [255, 255, 255]; 
        const to = [55, 55, 55]; 
        const cleanup = linearTheme(from, to);

        return cleanup; // ✅ on nettoie l'écouteur au démontage du composant
      }, []);


      useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");

        if (token) {
          localStorage.setItem("jwtToken", token);
          checkAuth(); // ✅ ici tu réinitialises authState
        }
      }, []);


      useEffect(() => {
        if (id_hote) {
          localStorage.setItem("id_hote", JSON.stringify({ id_hote: id_hote, ts: Date.now() }));
        }
      }, [id_hote]);



      const [copied, setCopied] = useState(false);

      const handleCopy = (text) => {
        navigator.clipboard.writeText(text).then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 1000); // Reset après 2s
        });
      };
      
    const plural = (n, sing, plur) => (n === 1 ? sing : plur);



      // Helpers (dans ton composant ou dans un util)
      const yearsLabel = t('years');
      const andUpLabel = t('and_up');
      const toLabel = t('to');

      const formatAgeRange = (band) => {
        if (!band) return '';
        const { age_min: min, age_max: max } = band;

        // Tous âges
        if (min == null && max == null) return t('age-range.all-ages', 'Tous âges');

        // ≤ max ans
        if (min == null && max != null) return `≤ ${max} ${yearsLabel}`;

        // min ans et plus
        if (min != null && max == null) return `${min} ${yearsLabel} ${andUpLabel}`;

        // min à max ans
        return `${min} ${toLabel} ${max} ${yearsLabel}`;
      };

      // Raccourcis
      const pricing = offer?.pricing || {};
      const adult = pricing.adult;
      const child = pricing.child;
      const infant = pricing.infant;

      // Min/Max UI (respecte max_per_booking si défini, sinon 20 par défaut)
      const ADULT_MIN = adult ? 1 : 0;
      const CHILD_MIN = 0;
      const INFANT_MIN = 0;

      const ADULT_MAX = adult?.max_per_booking ?? 20;
      const CHILD_MAX = child?.max_per_booking ?? 20;
      const INFANT_MAX = infant?.max_per_booking ?? 20;



      useEffect(() => {
        if (offer?.pricing) {
          if (!offer.pricing.child)  setParticipantChild(0);
          if (!offer.pricing.infant) setParticipantInfant(0);
          if (!offer.pricing.adult && !offer.pricing.child) setParticipantInfant(2)
        }
      }, [offer]);





      // Libellés au pluriel
      const labels = {
        adult:  t('Adults', 'Adultes'),
        child:  t('Children', 'Enfants'),
        infant: t('Infants', 'Bébés'),
      };

      const joinFr = (arr) =>
        arr.length === 1 ? arr[0]
        : arr.length === 2 ? `${arr[0]} et ${arr[1]}`
        : `${arr.slice(0,-1).join(', ')} et ${arr.slice(-1)[0]}`;

      const buildNoSeatMessage = (adultBand, childBand, infantBand, counts) => {
        const cats = [];
        if (adultBand  && adultBand.counts_toward_capacity  === false && counts.adult  > 0) cats.push(labels.adult.toLowerCase());
        if (childBand  && childBand.counts_toward_capacity  === false && counts.child  > 0) cats.push(labels.child.toLowerCase());
        if (infantBand && infantBand.counts_toward_capacity === false && counts.infant > 0) cats.push(labels.infant.toLowerCase());

        if (!cats.length) return null; // rien à afficher
        return `Les ${joinFr(cats)} n’occupent pas de place.`;
      };


      const ruleMessage = buildNoSeatMessage(adult, child, infant, {
        adult: participantAdult,
        child: participantChild,
        infant: participantInfant,
      });

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
            <GoBack nagigation={origin ? origin : "/"} scrollTo={""} text={"revenir"}/> 
            {/* <TopDivOpacity /> */}
            <div className="InteractionContainer row">
              <div className="likeContainer">
                <button className="AllImages" onClick={() => {
                  
                  console.warn(authState)
                  console.warn(slug);
                  console.warn(authState.user);
                  if(authState?.user?.id && slug){
                    console.log("Can liked")
                    setIsFavorite((prev) => !prev)
                    toggleFavorite(authState.user.id, slug)
                  }else{
                    setIsOccultView(true);
                    PopUpLoginRef.current.classList.add("open");
                    console.log("Could not like");
                  }
                }}>
                  <img src={favoris} alt="favoris Icon"/>
                  <img className={`${isFavorite ? "appear" : "disappear"}`} src={favoris_selected} alt="favoris selected Icon"/>
                </button>
              </div>
              <button className="AllImages" onClick={() => {console.log("Appuie")}}>
                <img src={allImageIcon} alt="copie Icon"/>
              </button>
            </div>
            {/* <Carrousel isLoading={isLoading}  photos={offer.image_urls}  setNavigationSelected={setNavigationSelected} ref={CarrouselRef} scrollSyncEnabled={scrollSyncEnabled}/> */}
            <Carrousel
              isLoading={isLoading}
              photos={offer.image_urls || []}
              setNavigationSelected={setNavigationSelected}
              ref={CarrouselRef}
              scrollSyncEnabled={scrollSyncEnabled}
            />

            <div className="pointNavigationContainer">
              {Array.isArray(offer.image_urls) &&
                offer.image_urls.map((url, index) => (
                  <button
                    key={`${index}-${url}`}
                    className={`pointNavigation ${navigationSelected === index ? "selected" : ""}`}
                    onClick={() => {
                      setNavigationSelected(index);
                      setScrollSyncEnabled(false);
                      CarrouselRef.current?.scrollToIndex(index);   // ✅ utilise l’API
                      setTimeout(() => setScrollSyncEnabled(true), 400);
                    }}
                  />
                ))}
            </div>

              {/* <p className={`OfferTitle t3 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : pickI18n(offer.title_i18n, lang, offer.title)}</p>
              <p className={`OfferDescription t5 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : pickI18n(offer.description_i18n, lang, offer.description)}</p> */}

              <p className={`OfferTitle t3 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" :offer.title}</p>
              <p className={`OfferDescription t5 ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : offer.description}</p>

              <p className={`t5 OfferType ${isLoading ? "loading shimmer" : ""}`}>{isLoading ? "" : `*${t(offer.type)}`}</p>
              <div className="Offerhline"></div>     

                <div className="OfferInfoContainer">
                  {
                    // offer.cancellable ?
                    //   <div className={`row ${isLoading ? "loading shimmer" : ""}`}>
                    //     {isLoading ?
                    //       <></>
                    //       : 
                    //       <>
                    //         <img src={validateIcon} alt="validate icon"/>
                    //         <p className="t6">Free cancellation</p>
                    //       </>
                    //     }
                    //   </div>
                    //   :
                    //   <></>
                  }
                  <div className={`row ${isLoading ? "loading shimmer" : ""}`}>
                    {isLoading ?
                      <></>
                      : 
                      <>
                        <img src={dureeIcon} alt="clock icon"/>
                        <p className="t6">{t('Duration')} {offer.duration}</p>
                      </>
                    }
                  </div>
                  
                </div>

              <div className="Offerhline"></div>     

              {
                id_hote ?
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
                        // duration={getShortestDuration(durations)} ////////////////////////////////////A remetre
                        duration={10}
                      />
                      <div className={`row adresseContainer ${isLoading ? "loading shimmer" : ""}`}>
                        {!isLoading && (
                          <>
                            <button onClick={() => {
                              handleCopy(offer.adresse);
                            }} className="CopyButton">
                              {/* <img src={Map2DPin} alt="map pin icon" /> */}
                              <p ref={refAdresse} className="t6 adresseText">{offer.adresse}</p>
                              <img src={copieIcon} alt="Copier l’email" />
                              <span className={`${copied ? "copied" : ""} CopiedFeedback t6`}>Copié</span>
                            </button>
                            {/* <img src={Map2DPin} alt="map pin icon" />
                            <p ref={refAdresse} className="adresseText t5">{offer.adresse}</p> */}
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
                          <button onClick={() => {
                            handleCopy(offer.adresse);
                          }} className="CopyButton">
                            {/* <img src={Map2DPin} alt="map pin icon" /> */}
                            <p ref={refAdresse} className="t6 adresseText">{offer.adresse}</p>
                            <img src={copieIcon} alt="Copier l’email" />
                            <span className={`${copied ? "copied" : ""} CopiedFeedback t6`}>Copié</span>
                          </button>
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
              {/*
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
              <div className={"cancelline"}></div> */}

              <div className="ParticipantSelectContainer" onClick={() => {
                // ParticipantBottomRef.current.style.bottom = "0px";
                ParticipantBottomRef.current.classList.add("open")
                setIsOccultView(true);
              }}>
                <div>
                  <p className="t4">{t("Select_participants")}</p>
                  <div className="row">
                    <p className="t5">{t("Participants")} :</p> 
                    <p className="t5">{ participantAdult + participantChild + participantInfant}</p>
                  </div>
                  <p className="t6">
                    ×{participantAdult} {t(plural(participantAdult, 'adult', 'adults'))}
                    {participantChild > 0 &&
                      `\u00A0\u00A0×${participantChild}  ${t(plural(participantChild, 'child', 'children'))}`}
                    {participantInfant > 0 &&
                      `\u00A0\u00A0×${participantInfant} ${t(plural(participantInfant, 'infant', 'infants'))}`}
                  </p>
                </div>
                
                <img src={arrowRight} alt="arrow right icon"/>
              </div>
              <OfferComments offerSlug={slug} children={
                <div className="ContainerIButton row">
                    <p className="t4 ReviewTitle">{t("Customer_Riviews")}</p>
                    <button className="iButton" onClick={() => {
                      // PopUpBottomRef.current.style.bottom = "0px";
                      PopUpBottomRef.current.classList.add("open")
                      setIsOccultView(true);
                    }}
                  ><p className="t5">i</p></button>
                </div> 
              }/>
              <Footer paddingBottom={"220px"}/>
            </div>



            <div className="ReserveContainer" ref={ReserveButtonRef}>
              <div className="ReserveInfoCon">
                <p className="t5" style={{fontWeight: "900"}}>{t("Starting_at")}&nbsp;
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }).format(pricing.adult?.price || pricing.child?.price || pricing.infant?.price)}
                </p>
                {/* <p className="t6">par {offer.priceper}</p> */}
                <p className="t6">{t("per_person")}</p>
              </div>
              <button className="ReserveButton" onClick={() => {
                navigate(`/offer-page/${slug}/availibility`, {
                  state: {
                    title: offer.title,
                    adresse: offer.adresse,
                    // price: offer.price,
                    participantAdult: participantAdult,
                    participantChild: participantChild,
                    participantInfant: participantInfant,
                    pricing: pricing,
                    OfferIsCancellable: offer.cancellable,
                    total_capacity: offer.total_capacity,
                    offer_provider_id: offer.provider_id,
                    id_hote: id_hote,
                  }
                })
              }}>
                
              {t("See_availability").split(" ").map((word, i, arr) =>
                i === arr.length - 1 
                  ? <React.Fragment key={i}><br />{word}</React.Fragment> 
                  : word + " "
              )}

              </button>
            </div>



            {/* <ButtonLanguage offerPage={true}/> */}
            

            <ButtonLanguage offerPage={true} popUp={popUpLanguage}/>

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
              fullHeight={true}
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
                {/* <p className="t6">il reste actuellement <strong className={`${10<3 ? "short" : ""}`}>10 places</strong></p> */}
                <div className="AnimationHuman">

                </div>
                <div className="rowTotal">
                  <p className="t4">Participants :</p> 
                  <p className="t4">{participantAdult + participantChild + participantInfant}</p>
                </div>
                {/* Adult (si présent) */}
                {adult && (
                  <div className="rowAddParticipant">
                    <div className="column">
                      <p className="t5">{t('Adult')}</p>
                      <p className="t6">{formatAgeRange(adult)}</p>
                    </div>

                    <div className="row">
                      <button
                        className="buttonParticipant"
                        disabled={participantAdult <= ADULT_MIN}
                        onClick={() => setParticipantAdult(prev => Math.max(ADULT_MIN, prev - 1))}
                      >
                        <p className="t3">-</p>
                      </button>

                      <p className="t4">{participantAdult}</p>

                      <button
                        className="buttonParticipant"
                        disabled={participantAdult >= ADULT_MAX}
                        onClick={() => setParticipantAdult(prev => Math.min(ADULT_MAX, prev + 1))}
                      >
                        <p className="t3">+</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Child (rendu seulement si la bande existe) */}
                {child && (
                  <div className="rowAddParticipant">
                    <div className="column">
                      <p className="t5">{t('Child')}</p>
                      <p className="t6">{formatAgeRange(child)}</p>
                    </div>

                    <div className="row">
                      <button
                        className="buttonParticipant"
                        disabled={participantChild <= CHILD_MIN}
                        onClick={() => setParticipantChild(prev => Math.max(CHILD_MIN, prev - 1))}
                      >
                        <p className="t3">-</p>
                      </button>

                      <p className="t4">{participantChild}</p>

                      <button
                        className="buttonParticipant"
                        disabled={participantChild >= CHILD_MAX}
                        onClick={() => setParticipantChild(prev => Math.min(CHILD_MAX, prev + 1))}
                      >
                        <p className="t3">+</p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Infant (rendu seulement si la bande existe) */}
                {infant && (
                  <div className="rowAddParticipant">
                    <div className="column">
                      <p className="t5">{t('Infant')}</p>
                      <p className="t6">{formatAgeRange(infant)}</p>
                    </div>

                    <div className="row">
                      <button
                        className="buttonParticipant"
                        disabled={participantInfant <= INFANT_MIN}
                        onClick={() => setParticipantInfant(prev => Math.max(INFANT_MIN, prev - 1))}
                      >
                        <p className="t3">-</p>
                      </button>

                      <p className="t4">{participantInfant}</p>

                      <button
                        className="buttonParticipant"
                        disabled={participantInfant >= INFANT_MAX}
                        onClick={() => setParticipantInfant(prev => Math.min(INFANT_MAX, prev + 1))}
                      >
                        <p className="t3">+</p>
                      </button>
                    </div>
                  </div>
                )}

                {ruleMessage && (
                  <div className="NotCountCapacity row">
                    <img src={warningRed} alt="info" />
                    <p className="t6">{ruleMessage}</p>
                  </div>
                )}


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
              <p className="t6">{t("Customer_Para")}</p>
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

            <PopUpLogin googleRedirectRoute={`/offer-page/${slug}`} ref={PopUpLoginRef} setIsOccultView={setIsOccultView}/>

            {/* <div className={`occultView ${isOccultView ? "open" : ""}`}  
            onClick={(e) => {
              console.warn("IsOccult 1")
              searchBarRef.current.classList.remove("open");
              PopUpLoginRef.current.classList.remove("open");
              setIsOccultView(false);
            }}></div> */}

            <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
              PopUpBottomRef.current.classList.remove("open");
              CancelBottomRef.current.classList.remove("open");
              ParticipantBottomRef.current.classList.remove("open");
              PopUpLoginRef.current.classList.remove("open");
              // PopUpBottomRef.current.style.bottom = "-100%";
              // CancelBottomRef.current.style.bottom = "-100%";
              // ParticipantBottomRef.current.style.bottom = "-100%";
              setIsOccultView(false);
            }}></div>
      </div>
    );
  }



