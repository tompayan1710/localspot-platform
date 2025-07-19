import SearchBar from "../components/SearchBar/SearchBar";
import { getAllOffers } from "../services/offers"

import "./Home.css"
import starIcon from "../assets/images/starIcon.png"
import StartIconMiddle from "../assets/images/StartIconMiddle.png"
import extendIcon from "../assets/images/extendIcon.png"
import NiceIntro1 from "../assets/images/NiceIntro1.png"
import NiceIntro2 from "../assets/images/NiceIntro2.png"
import NiceIntro3 from "../assets/images/NiceIntro3.png"
import yogo1 from "../assets/images/yogo1.jpg"
import arrowRight from "../assets/images/arrowRight.png"
import ViarteLogo from "../assets/images/ViarteLogo.png"
import ViarteV from "../assets/images/ViarteV.png"
import ViarteFont from "../assets/images/ViarteFont.png"
import Map2dPinWhite from "../assets/images/Map2dPinWhite.png"
import ArrowTopRight from "../assets/images/ArrowTopRight.png"
import FiltersSearch from "../assets/images/FiltersSearch.png"

import Terms from "../assets/images/Terms.png"
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer/Footer";
import { useLocation } from 'react-router-dom';
import PopUpBottom from "../components/PopUpBottom/PopUpBottom";
import FadeInImage from "../components/Utils/FadeInImage";
import { classifyOffers } from "../services/offerFilters";
import TopSearchBar from "../components/SearchBar/TopSearchBar";
import FilterElement from "../components/SearchBar/FilterElement/FilterElement";
import PopUpLogin from "../components/Auth/PopUpLogin/PopUpLogin";
import { AuthContext } from "../components/Auth/authContext/authContext";
import OffersCard from "../components/OffersCard/OffersCard";





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


  export default function Home({navBarRef}) {
    const [isOccultView, setIsOccultView] = useState(false);
    const { checkAuth, authState } = useContext(AuthContext);

    const offerContainerRef = useRef(null);
    const LogoContainerAnimationRef = useRef(null); 
    const HomePageRef = useRef(null); 
    const generalTerms = useRef(null);
    const [homeOffersByCategory, setHomeOffersByCategory] = useState({
      thisAfternoon: [],
      tonight: [],
      popular: [],
      nearby: [],
    });
    const location = useLocation();
    const { scrollTo } = location.state || {};
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const currentLang = i18n.language;
    const searchBarRef = useRef(null);
    const PopUpLoginRef = useRef(null);
    const [HomeOffers, setHomeOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectingOfferToday, setSelectingOfferToday] = useState({})

    useEffect(() => {
      if (scrollTo) {
        const el = document.getElementById(scrollTo);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.replaceState({}, document.title); // ⬅️ Vide le state après scroll
          }, 100); // ⚠️ attendre un peu pour que le DOM soit prêt
        }
      }
    }, [scrollTo]);


      const getHomeOffers = async () => {
        const data = await getAllOffers();
        if(data.success){

          let offers = data.offers;

          if (currentLang !== "fr") {
          // Traduire chaque titre (en parallèle)
            const titles = offers.map(o => o.title);
            const descriptions = offers.map(o => o.description);

            // const translatedTitles = await batchTranslate(titles, currentLang);
            // const translatedDescriptions = await batchTranslate(descriptions, currentLang);

            const translatedTitles =titles;
            const translatedDescriptions= descriptions;
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

          setSelectingOfferToday(offers[0]);

          const classified = classifyOffers(offers, null); // si tu as la localisation
          //                                        userLocation
          setHomeOffersByCategory(classified);

        }
      }

      useEffect(() => {
        setLoading(true);

        getHomeOffers();

        setTimeout(() =>{
          setLoading(false);
        }, 2000)
        // setLoading(false);
        // setTimeout(() => OfferAnimationShow(), 200);
        // AnnimationWhitoutLogo();

        // setTimeout(() => {
        //    generalTerms.current.classList.add("open");
        //     setIsOccultView(true);
        // },20000)

      }, [i18n.language])

      const AnnimationWhitoutLogo = () => {
        setTimeout(() => {
          HomePageRef.current.style.top = "0";
          HomePageRef.current.style.opacity = "1";
          HomePageRef.current.style.overflowY = "auto";
        }, 500);

        setTimeout(() => {
          navBarRef.current.classList.add("sliderInBottomNav");
          searchBarRef.current.classList.add("slideInSearch")
          // searchBarRef.current.style.top = "0";
          setTimeout(() => {
            offerContainerRef.current.style.overflowY = "scroll";
          }, 0)

        }, 1000)
      }

      const OfferAnimationShow = () => {
        // LogoContainerAnimationRef.current.style.top = "-100vh";
        const logo = LogoContainerAnimationRef.current;

        if (!logo) return;

        // logo.classList.add("appear");

        setTimeout(() => {
          // logo.classList.remove("appear");
          logo.classList.add("disappear");
          setTimeout(() => {
            logo.style.top = "-100vh";
          }, 1000);
        }, 2000)
        setTimeout(() => {
          
          HomePageRef.current.style.top = "0";
          HomePageRef.current.style.opacity = "1";
          HomePageRef.current.style.overflowY = "auto";
        }, 2500);
        
        
        setTimeout(() => {
          navBarRef.current.classList.add("sliderInBottomNav");
          searchBarRef.current.classList.add("slideInSearch")
          // searchBarRef.current.style.top = "0";
          setTimeout(() => {
            offerContainerRef.current.style.overflowY = "scroll";
          }, 500)

        }, 3000)
    }
    

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
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get("token");


        if (token) {
        // ✅ Stocke le JWT dans localStorage
        console.warn("Il y a un token de : ", token);
        localStorage.setItem("jwtToken", token);

        // ✅ Met à jour le contexte d'authentification
        checkAuth();

        // ✅ Redirige l'utilisateur là où il était
        // navigate(`/profile`);
        }
    }, []);

    return (
      <div className="HomeContainerPrincipal" ref={offerContainerRef}>
        {/* <div ref={LogoContainerAnimationRef} className={`${true ? "" : ""} LogoContainerAnimation`}>
          <div className="LogoContainer">
            <img src={ViarteLogo} alt="Viarte Logo" 
            onLoad={(e) => {
              e.currentTarget.classList.add("loaded");
            }}/>
          </div>
        </div> */}
        {/* <SearchBar ref={searchBarRef}/> */}
        <div className="ViarteIntro">
          <img src={ViarteV} alt="Viarte Logo"/>
          <div className="row">
            <div className="vline"></div>
            <img src={ViarteFont} alt="Viarte font"/>
          </div>
        </div>
        <div className="TopContainer">
          <div className="row">
            <TopSearchBar ref={searchBarRef} setIsOccultView={setIsOccultView}/>
            <button className="FilterButton" onClick={() =>{
              searchBarRef.current.classList.add("open")
              setIsOccultView(true);
            }}>
              <img src={FiltersSearch} alt="filter search icon"/>
            </button>
          </div>
          <div className="hline"></div>
        </div>

        {/* <div className="ParticipantSelectContainer" onClick={() => {
          // ParticipantBottomRef.current.style.bottom = "0px";
          searchBarRef.current.classList.add("open")
          setIsOccultView(true);
        }}>
          <p>BIG BOSS TOM</p>
        </div> */}
        <div className="IntroUIContainer">
          <div className="Images">
            <div className={`ImageWrapper ${loading && "loading shimmer"}`}>
              {
                !loading && <FadeInImage src={NiceIntro2} alt="Intro ui images"/>
              }
            </div>
            <div className={`ImageWrapper ${loading && "loading shimmer"}`}>
              {
                !loading && <FadeInImage src={NiceIntro1} alt="Intro ui images"/>
              }
            </div>
          </div>
          <p className="t32">Because <strong>memories</strong><br></br> deserve to be more than<br></br>just words!</p>
        </div>
        <div ref={HomePageRef} className="HomeContainer">
          <div  className={`SelectingToday ${loading && "loading shimmer"}`}>
            {
              !loading &&
              <>
              <FadeInImage src={yogo1} alt="selecting activity"/>
              <button>
                <img src={extendIcon} alt="extend Icon"/>
              </button>
              <div className="InfoOffer row">
                <div className="column">
                  <p className="t5 maxLine">Cours de yoga en pleine aire avec tom</p>
                  <div className="row adresse">
                    <img src={Map2dPinWhite} alt="map 2d pin white"/>
                    <p className="t6 maxLine">04 place Godeau</p>
                  </div>
                </div>
                <div className="GoTo">
                  <img src={ArrowTopRight}/>
                </div>
              </div>
              </>
            }
          </div>
          <div className="HomeSectionContainer">
            {/* <div className="IntroImage">
              <p className="t5">Discover the best of</p>
              {
                loading ? <div className="ContainerSkeleton"><div className="SkeletonCity shimmer"></div></div>
                : <p className="t1">Nice</p>
              }
              <div className="ContainerCenter">
                <div className="SkeletonImage shimmer SkeletonLeft"></div>
                    <div className="SkeletonImage shimmer"></div>
                    <div className="SkeletonImage shimmer SkeletonRight"></div>
                    <>
                    
                  </>
                {loading ? (
                  <>
                    
                  </>
                ) : (
                  <>
                  <FadeInImage src={NiceIntro2} alt="Intro Image parachute" />
                    <FadeInImage src={NiceIntro1} alt="Intro Image class" />
                    <FadeInImage src={NiceIntro3} alt="Intro Image chateau" />
                    </>
                )}
                <div className={`Shadow ${loading ? "loading" : ""}`}></div>
              </div>

            </div> */}
            {/* <p className="t6">Parfait pour l'été</p> */}
            {/* <p className="t6">Populaire sur Viarte</p> */}
            <div className="row">
              {/* <p className="t4">Les activité d'été</p>  */}
              <p className="t32">Cet après-midi</p>
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <OffersCard offers={homeOffersByCategory.thisAfternoon} loading={loading}/>
            
            
            <div className={`ConnectYourSelf ${authState.isAuth && "close"}`}>
              <p className="t3">Rejoingnez-nous !</p>
              <p className="t5">Accédez à toutes les fonctionnalités en vous connectant ou en créant un compte</p>
              <button 
                className="Signup" 
                onClick={() =>{
                PopUpLoginRef.current.classList.add("open")
                setIsOccultView(true);
              }}>
                <p className="t5">S'inscrire</p>
              </button>
              <div className="row">
                <div className="line"></div>
                <p className="t5">ou</p>
                <div className="line"></div>
              </div>
              <button 
                className="Login" 
                onClick={() =>{
                PopUpLoginRef.current.classList.add("open")
                setIsOccultView(true);
              }}>
                <p className="t5">Se connecter</p></button>
            </div>

            <div className="row">
              <p className="t32"> À moins de 5 mim</p> 
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <OffersCard offers={homeOffersByCategory.popular} loading={loading}/>

            
            {/* <p className="t6">Sorties de dernière minute</p> */}
            <div className="row">
              <p className="t32">Sortir ce soir</p>
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <OffersCard offers={homeOffersByCategory.popular} loading={loading}/>

            {/* <p className="t6">disponnible aujourd'huit</p> */}
            <div className="freeConcelation">
              <div className="hline"></div>
              <p className="t3">Annulation Gratuite</p>
              <p className="t5">
                  Les prestataires peuvent activer l’annulation gratuite avec un délai minimum.
              </p>
              <button>
                <p className="t6">Politique d'annulation</p>
              </button>
              <div className="hline"></div>
            </div>


            <p className="t6">Populaire cet été</p>
            <div className="row">
              <p className="t32">Les plus aimées</p> 
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <OffersCard offers={homeOffersByCategory.popular} loading={loading}/>

          </div>
          <div id="DivSpace"></div>
          <Footer />
        </div>

        <PopUpBottom
          onClose={() => {
            generalTerms.current.classList.remove("open");
            setIsOccultView(false);
          }}
          title={<p className="t5">Veuillez accepter les conditions générales pour continuer</p>}
          isHeader={false}
          ref={generalTerms}
        >
        <div className="generalTerms">
          <img src={Terms} alt="generals terms illustration"/>
          <h3 className="t3">Conditions Générales</h3>
          {/* <p className="t5">
            Pour finaliser votre réservation, vous devez accepter nos conditions générales d’utilisation et de vente.
          </p> */}
          <p className="t6">
            En poursuivant, vous acceptez nos{" "}
            <a href="/terms-of-service" className="t6" target="_blank" rel="noopener noreferrer">
              Conditions Générales d’Utilisation
            </a>{" "}
            ainsi que nos{" "}
            <a href="/terms-and-conditions-of-sale" className="t6" target="_blank" rel="noopener noreferrer">
              Conditions Générales de Vente
            </a>.
          </p>
          <div className="column">
            <button onClick={() => {
              generalTerms.current.classList.remove("open");
              setIsOccultView(false);
              }}
            >
              <p className="t5">Décliner</p>
            </button>
            <button onClick={() => {
              generalTerms.current.classList.remove("open");
              setIsOccultView(false);
              }}
            >
              <p className="t5">Accepter</p>
            </button>
          </div>
        </div>
      </PopUpBottom>

      <PopUpBottom 
        onClose={() => {
          searchBarRef.current.classList.remove("open");
          setIsOccultView(false);
        }}
        title={(
          <p className="t5">TitreBOSS TOM</p>
        )}
        ref={searchBarRef}
        duration={0.4}
        fullHeight={true}
      >
        <FilterElement applieNavigate={"/searching-page"}/>
      </PopUpBottom>


      <PopUpLogin googleRedirectRoute="/" ref={PopUpLoginRef} setIsOccultView={setIsOccultView}/>
      {/* <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
        // generalTerms.current.classList.remove("open");
        // setIsOccultView(false);
      }}></div> */}

          <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
            console.warn("IsOccult 1")
            searchBarRef.current.classList.remove("open");
            PopUpLoginRef.current.classList.remove("open");
            
            // PopUpBottomRef.current.style.bottom = "-100%";
            // CancelBottomRef.current.style.bottom = "-100%";
            // ParticipantBottomRef.current.style.bottom = "-100%";
            setIsOccultView(false);
          }}></div>
      </div>
    );
  }
