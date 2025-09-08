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
import TestHeight from "../components/TestHeight/TestHeight";
import { linearTheme } from "../services/themeModifier";
import WhiteButton from "../components/Buttons/WhiteButton/WhiteButton";
import ButtonLanguage from "../components/Buttons/ButtonLanguage/ButtonLanguage";



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
    const { t, i18n } = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];
    console.warn(lang)

  const offerContainerRef = useRef(null);
    const LogoContainerAnimationRef = useRef(null); 
    const HomePageRef = useRef(null); 
    const generalTerms = useRef(null);
    const [homeOffersByCategory, setHomeOffersByCategory] = useState({
      thisAfternoon: [],
      tonight: [],
      selected_today: {},
      popular: [],
      nearby: [],
    });
    const location = useLocation();
    const { scrollTo } = location.state || {};
    const navigate = useNavigate();
    const currentLang = i18n.language;
    const searchBarRef = useRef(null);
    const PopUpLoginRef = useRef(null);
    const [HomeOffers, setHomeOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectingOfferToday, setSelectingOfferToday] = useState({})

    const [popUpLanguage, setPopUpLanguage] = useState(false);


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
        const data = await getAllOffers(lang);
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

          const classified = classifyOffers(offers, { lat: 43.7, lon: 7.25 });

          // const classified = classifyOffers(offers, null); // si tu as la localisation
          //                                        userLocation
          setHomeOffersByCategory(classified);

        }
      }

      useEffect(() => {
        setLoading(true);
        setPopUpLanguage(true);
        getHomeOffers();

        setTimeout(() =>{
          setLoading(false);
        }, 1300)
        // setLoading(false);
        // setTimeout(() => OfferAnimationShow(), 200);
        // AnnimationWhitoutLogo();

        // setTimeout(() => {
        //    generalTerms.current.classList.add("open");
        //     setIsOccultView(true);
        // },20000)

      }, [i18n.language])




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



    useEffect(() => {
      if (isOccultView) {
        document.body.style.overflow = "hidden";   // bloque le scroll du body
      } else {
        document.body.style.overflow = "";         // réactive le scroll
      }
    }, [isOccultView]);


    useEffect(() => {
      const from = [83, 83, 83]; 
      const to = [55, 55, 55]; 
      const cleanup = linearTheme(from, to);

      return cleanup; // ✅ on nettoie l'écouteur au démontage du composant
    }, []);


    // ⚡ Récupération de l'objet complet { id_hote, ts }
    const [id_hote_data, setId_hote_data] = useState(() => {
      const stored = localStorage.getItem("id_hote");
      return stored ? JSON.parse(stored) : null;
    });

    useEffect(() => {
      const EXPIRATION = 7 * 24 * 60 * 60 * 1000; // 7 jours en ms

      if (id_hote_data && Date.now() - id_hote_data.ts > EXPIRATION) {
        localStorage.removeItem("id_hote");
        console.log("id_hote expiré");
        setId_hote_data(null);
      }
    }, [id_hote_data]);

    const goToOffer = (slug, navOptions = {}) => {
      console.warn("Je goToOffer");
      if (id_hote_data?.id_hote) {
        navigate(`/offer-page/${slug}?host_id=${id_hote_data.id_hote}`, navOptions);
      } else {
        navigate(`/offer-page/${slug}`, navOptions);
      }
    };





    return (
      <div className={`HomeContainerPrincipal ${isOccultView && "noScroll"}`} ref={offerContainerRef}>
  
        <div className="ViarteIntro">
          <img src={ViarteV} alt="Viarte Logo"  onClick={() => window.location.reload()} />
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
          <p className="t32">{t('sloganstart')}<br></br>{t('sloganend')}</p>
        </div>
        <div ref={HomePageRef} className="HomeContainer">
          <div  className={`SelectingToday ${loading ? "loading shimmer" : ""}`}>
            {
              !loading && homeOffersByCategory.selected_today &&
              <>
              <FadeInImage src={homeOffersByCategory.selected_today.image_urls[0]} alt="selecting activity" onClick={() => {
                goToOffer(`${homeOffersByCategory.selected_today.slug}`, {
                        state: {
                          isAnimation: false,
                        }
                      })
                      
              }}/>
              <button 
                onClick={() => {
                  goToOffer(`${homeOffersByCategory.selected_today.slug}`, {
                    state: {
                      isAnimation: false,
                    }
                  })
                }}
              >
                <img src={extendIcon} alt="extend Icon"/>
              </button>
              <div className="InfoOffer row"
                onClick={() => {
                  goToOffer(`${homeOffersByCategory.selected_today.slug}`, {
                    state: {
                      isAnimation: false,
                    }
                  })
                }}
                >
                <div className="column">
                  <p className="t5 maxLine">{homeOffersByCategory.selected_today.title}</p>
                  <div className="row adresse">
                    <img src={Map2dPinWhite} alt="map 2d pin white"/>
                    <p className="t6 maxLine">{homeOffersByCategory.selected_today.adresse}</p>
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

            {
              homeOffersByCategory.morning && homeOffersByCategory.morning.length > 0 &&
              <>
              <div className="row">
                <p className="t32">{t('This_Morning')}</p>
                <button onClick={() => {
                  const now = new Date();
                  navigate("/searching-page", {
                    state: {
                      priceRange: {
                        min: 25,
                        max: 3000,
                      },
                      date: now.toLocaleDateString('fr-CA'), // ou today si tu veux toujours passer une date
                      moment: "Matin", // "Matin", "Après-midi", "Soir"
                      categories: null, // tableau ex: ["Nautiques", "Bien-être"]
                      nb_adult: null,
                      nb_child: null,
                      nb_infant: null
                    }
                  });
                }}>
                  <img src={arrowRight} alt="arrow right icon"/>
                </button>
              </div> 
              <OffersCard offers={homeOffersByCategory.morning} loading={loading} goToOffer={goToOffer}/>
              </>
            }
            {
              homeOffersByCategory.afternoon && homeOffersByCategory.afternoon.length > 0 &&
              <>
              <div className="row">
                <p className="t32">Cet après-midi</p>
                <button onClick={() => {
                  const now = new Date();
                  navigate("/searching-page", {
                    state: {
                      priceRange: {
                        min: 25,
                        max: 3000,
                      },
                      date: now.toLocaleDateString('fr-CA'), // ou today si tu veux toujours passer une date
                      moment: "Après-midi", // "Matin", "Après-midi", "Soir"
                      categories: null, // tableau ex: ["Nautiques", "Bien-être"]
                      nb_adult: null,
                      nb_child: null,
                      nb_infant: null
                    }
                  });
                }}>
                  <img src={arrowRight} alt="arrow right icon"/>
                </button>
              </div> 
              <OffersCard offers={homeOffersByCategory.afternoon} loading={loading} goToOffer={goToOffer}/>
              </>
            }
            
            <p className="t6">Populaire cet été</p>
            <div className="row">
              <p className="t32">Les plus aimées</p> 
              <button onClick={() => {
                  navigate("/searching-page", {
                    state: {
                      priceRange: {
                        min: 25,
                        max: 3000,
                      },
                      date: null, // ou today si tu veux toujours passer une date
                      moment: null, // "Matin", "Après-midi", "Soir"
                      categories: null, // tableau ex: ["Nautiques", "Bien-être"]
                      nb_adult: null,
                      nb_child: null,
                      nb_infant: null
                    }
                  });
                }}>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <OffersCard offers={homeOffersByCategory.popular} loading={loading} goToOffer={goToOffer}/>
            
            
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

            {
              homeOffersByCategory.nearby && homeOffersByCategory.nearby.length > 2 &&
              <>
              <div className="row">
                <p className="t32"> À moins de 5 minutes</p> 
                <button>
                  <img src={arrowRight} alt="arrow right icon"/>
                </button>
              </div> 
              <OffersCard offers={homeOffersByCategory.nearby} loading={loading} goToOffer={goToOffer}/>
              </>
            }

            {/* <div className="freeConcelation">
              <div className="hline"></div>
              <p className="t3">Annulation Gratuite</p>
              <p className="t5">
                  Les prestataires peuvent activer l’annulation gratuite avec un délai minimum.
              </p>
              <WhiteButton text={"Politique d'annulation"} onClick={() => {
                navigate("/cancellation-policy");
              }}/>
              <div className="hline"></div>
            </div> */}

            {
              homeOffersByCategory.all_remaining && homeOffersByCategory.all_remaining.length > 2 ||
              homeOffersByCategory.evenning && homeOffersByCategory.evenning.length > 2 &&
              <div className="freeConcelation">
                  <div className="hline"></div>
                    <p className="t3">Annonces vérifiés</p>
                    <p className="t5">
                      Chaque activité est proposée par un partenaire local sélectionné et validé par nos équipes.
                    </p>
                  <div className="hline"></div>
              </div>
            }

            {
              homeOffersByCategory.evenning && homeOffersByCategory.evenning.length > 2 &&
              <>
              <div className="row">
                <p className="t32">Sortir ce soir</p>
                <button onClick={() => {
                  const now = new Date();
                  navigate("/searching-page", {
                    state: {
                      priceRange: {
                        min: 25,
                        max: 3000,
                      },
                      date: now.toLocaleDateString('fr-CA'), // ou today si tu veux toujours passer une date
                      moment: "Soir", // "Matin", "Après-midi", "Soir"
                      categories: null, // tableau ex: ["Nautiques", "Bien-être"]
                      nb_adult: null,
                      nb_child: null,
                      nb_infant: null
                    }
                  });
                }}>
                  <img src={arrowRight} alt="arrow right icon"/>
                </button>
              </div> 
              <OffersCard offers={homeOffersByCategory.evenning} loading={loading} goToOffer={goToOffer}/>
              </>
            }

            {
              homeOffersByCategory.all_remaining && homeOffersByCategory.all_remaining.length > 2 &&
              <>
              <div className="row">
                <p className="t32">À voir aussi</p>
                <button>
                  <img src={arrowRight} alt="arrow right icon"/>
                </button>
              </div> 
              <OffersCard offers={homeOffersByCategory.all_remaining} loading={loading} goToOffer={goToOffer}/>
              </>
            }

          </div>
          <div id="DivSpace"></div>
          <Footer isOtherTheme={true}/>
        </div>

        <ButtonLanguage home={true} popUp={popUpLanguage}/>


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

          <div className={`occultView ${isOccultView ? "open" : ""}`}  
          onClick={(e) => {
            console.warn("IsOccult 1")
            searchBarRef.current.classList.remove("open");
            PopUpLoginRef.current.classList.remove("open");
            setIsOccultView(false);
          }}></div>

      </div>
    );
  }
