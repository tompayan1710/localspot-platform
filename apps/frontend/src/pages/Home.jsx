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
import Map2dPinWhite from "../assets/images/Map2dPinWhite.png"
import ArrowTopRight from "../assets/images/ArrowTopRight.png"
import Terms from "../assets/images/Terms.png"
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer/Footer";
import { useLocation } from 'react-router-dom';
import PopUpBottom from "../components/PopUpBottom/PopUpBottom";
import FadeInImage from "../components/Utils/FadeInImage";
import { classifyOffers } from "../services/offerFilters";
import TopSearchBar from "../components/SearchBar/TopSearchBar";





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
        <TopSearchBar />

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
            <div className="HomeListPrestation">
              {
                !loading ?
                homeOffersByCategory.thisAfternoon.map((offer, index) => {
                  // const km = getDistanceInKm(hote.lat, hote.lng, offer.lat, offer.lng);
                  // const estimatedWalkTimeMinutes = km * 15; // 4 km/h ≈ 15 min/km
                  return(
                    <div key={index} className={`HomeListPrestationItem ${index === HomeOffers.length - 1 ? "flou" : ""}  ${offer.isToday && "Today1"}`} 
                    onClick={() => {
                        navigate(`/offer-page/${offer.slug}`, {
                        state: {
                          isAnimation: false,
                        }
                      });
                    }}>
                      {
                        index === HomeOffers.length - 1 ? <p className="seeMore t32">Voir <strong>+</strong></p> : <></>
                      }
                      <div className={`${index === HomeOffers.length - 1 ? "flou-interne" : ""}`}>
                        <div className="ImageContainer">
                          <FadeInImage src={offer.image_urls[0]} alt="Offer Image" />
                          <div className="shine"></div> {/* Effet de lueur ici */}
                          {/* <div></div> */}
                          <button>
                            <img src={extendIcon} alt="extend icon"/>
                          </button>
                        </div>
                        <div className="containerTopBottom">
                          <div>
                            <p className="t6 isFreeCancelation">free cancellation</p>
                            <p className="t5">{offer.title}</p>
                          </div>
                          <div>
                            <p className="t6"><strong>{offer.price}€</strong> par {offer.priceper}</p>
                            <div className="HomeStarList">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <img key={i} src={starIcon} alt="star icon"/>
                              ))}
                              <img src={StartIconMiddle} alt="middle star"/>
                              <p className="t6">4.5/5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                  )
                })
                :
               Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="HomeListPrestationItem loading">
                  <div className="skeleton-image shimmer"></div>
                  <div className="containerTopBottom">
                    <div className="skeleton-title shimmer"></div>
                    <div className="skeleton-details shimmer"></div>
                  </div>
                </div>
              ))
              }
            </div>

            <div className="ConnectYourSelf">
              <p className="t3">Rejoingnez-nous !</p>
              <p className="t5">Accédez à toutes les fonctionnalités en vous connectant ou en créant un compte</p>
              <button>
                <p className="t5">S'inscrire</p>
              </button>
              <div className="row">
                <div className="line"></div>
                <p className="t5">ou</p>
                <div className="line"></div>
              </div>
              <a className="t5">Se connecter</a>
            </div>

            <div className="row">
              <p className="t32"> À moins de 5 mim</p> 
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <div className="HomeListPrestation">
              {
                HomeOffers.map((offer, index) => {
                  return(
                    <div key={index} className={`HomeListPrestationItem ${index === HomeOffers.length - 1 ? "flou" : ""}`} 
                    onClick={() => {
                        navigate(`/offer-page/${offer.slug}`, {
                        state: {
                          isAnimation: false,
                        }
                      });
                    }}>
                      {
                        index === HomeOffers.length - 1 ? <p className="seeMore t32">Voir <strong>+</strong></p> : <></>
                      }
                      <div className={`${index === HomeOffers.length - 1 ? "flou-interne" : ""}`}>
                        <div className="ImageContainer">
                          <img src={offer.image_urls[0]} alt="Image Offer"/>
                          <div className="shine"></div> {/* Effet de lueur ici */}
                          {/* <div></div> */}
                          <button>
                            <img src={extendIcon} alt="extend icon"/>
                          </button>
                        </div>
                        <div className="containerTopBottom">
                          <div>
                            <p className="t6 isFreeCancelation">free cancellation</p>
                            <p className="t5">{offer.title}</p>
                          </div>
                          <div>
                            <p className="t6"><strong>{offer.price}€</strong> par {offer.priceper}</p>
                            <div className="HomeStarList">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <img key={i} src={starIcon} alt="star icon"/>
                              ))}
                              <img src={StartIconMiddle} alt="middle star"/>
                              <p className="t6">4.5/5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            
            {/* <p className="t6">Sorties de dernière minute</p> */}
            <div className="row">
              <p className="t4">Sortir ce soir</p> 
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <div className="HomeListPrestation">
              {
                HomeOffers.map((offer, index) => {
                  return(
                    <div key={index} className={`HomeListPrestationItem ${index === HomeOffers.length - 1 ? "flou" : ""}`} 
                    onClick={() => {
                        navigate(`/offer-page/${offer.slug}`, {
                        state: {
                          isAnimation: false,
                        }
                      });
                    }}>
                      {
                        index === HomeOffers.length - 1 ? <p className="seeMore t32">Voir <strong>+</strong></p> : <></>
                      }
                      <div className={`${index === HomeOffers.length - 1 ? "flou-interne" : ""}`}>
                        <div className="ImageContainer">
                          <img src={offer.image_urls[0]} alt="Image Offer"/>
                          <div className="shine"></div> {/* Effet de lueur ici */}
                          {/* <div></div> */}
                          <button>
                            <img src={extendIcon} alt="extend icon"/>
                          </button>
                        </div>
                        <div className="containerTopBottom">
                          <div>
                            <p className="t6 isFreeCancelation">free cancellation</p>
                            <p className="t5">{offer.title}</p>
                          </div>
                          <div>
                            <p className="t6"><strong>{offer.price}€</strong> par {offer.priceper}</p>
                            <div className="HomeStarList">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <img key={i} src={starIcon} alt="star icon"/>
                              ))}
                              <img src={StartIconMiddle} alt="middle star"/>
                              <p className="t6">4.5/5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

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
              <p className="t4">Les plus aimées</p> 
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <div className="HomeListPrestation">
              {
                HomeOffers.map((offer, index) => {
                  return(
                    <div key={index} className={`HomeListPrestationItem ${index === HomeOffers.length - 1 ? "flou" : ""}`} 
                    onClick={() => {
                        navigate(`/offer-page/${offer.slug}`, {
                        state: {
                          isAnimation: false,
                        }
                      });
                    }}>
                      {
                        index === HomeOffers.length - 1 ? <p className="seeMore t32">Voir <strong>+</strong></p> : <></>
                      }
                      <div className={`${index === HomeOffers.length - 1 ? "flou-interne" : ""}`}>
                        <div className="ImageContainer">
                          <img src={offer.image_urls[0]} alt="Image Offer"/>
                          <div className="shine"></div> {/* Effet de lueur ici */}
                          {/* <div></div> */}
                          <button>
                            <img src={extendIcon} alt="extend icon"/>
                          </button>
                        </div>
                        <div className="containerTopBottom">
                          <div>
                            <p className="t6 isFreeCancelation">free cancellation</p>
                            <p className="t5">{offer.title}</p>
                          </div>
                          <div>
                            <p className="t6"><strong>{offer.price}€</strong> par {offer.priceper}</p>
                            <div className="HomeStarList">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <img key={i} src={starIcon} alt="star icon"/>
                              ))}
                              <img src={StartIconMiddle} alt="middle star"/>
                              <p className="t6">4.5/5</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>

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
      >
        <p className="t5">JE SUIS LE GROS BIG BOSS TOM</p>
      </PopUpBottom>

      {/* <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
        // generalTerms.current.classList.remove("open");
        // setIsOccultView(false);
      }}></div> */}

          <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
            searchBarRef.current.classList.remove("open");

            // PopUpBottomRef.current.style.bottom = "-100%";
            // CancelBottomRef.current.style.bottom = "-100%";
            // ParticipantBottomRef.current.style.bottom = "-100%";
            setIsOccultView(false);
          }}></div>
      </div>
    );
  }
