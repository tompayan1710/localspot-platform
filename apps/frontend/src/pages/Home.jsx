  import SearchBar from "../components/SearchBar/SearchBar";
  import BottomNavBar from "../components/BottomNavBar/BottomNavBar"
  import { getOffersToday } from "../services/offers"

  import "./Home.css"
  import Nice from "../assets/images/Nice.avif"
  import footIcon from "../assets/images/footIcon.png"
  import carIcon from "../assets/images/carIcon.png"
  import starIcon from "../assets/images/starIcon.png"
  import StartIconMiddle from "../assets/images/StartIconMiddle.png"
  import extendIcon from "../assets/images/extendIcon.png"
  import yoga2 from "../assets/images/yoga2.jpg"
  import NiceIntro from "../assets/images/NiceIntro.jpg"
  import NiceIntro1 from "../assets/images/NiceIntro1.png"
  import NiceIntro2 from "../assets/images/NiceIntro2.png"
  import NiceIntro3 from "../assets/images/NiceIntro3.png"
  import arrowRight from "../assets/images/arrowRight.png"
  import ViarteLogo from "../assets/images/ViarteLogo.png"
  import Terms from "../assets/images/Terms.png"
  import { useEffect, useRef, useState } from "react";
  import { useNavigate } from "react-router-dom";
  import BottomNavBarNotAnimate from "../components/BottomNavBar/BottomNavBarNotAnimate";
  import { useTranslation } from "react-i18next";
  import Footer from "../components/Footer/Footer";
  import { useLocation } from 'react-router-dom';
import PopUpBottom from "../components/PopUpBottom/PopUpBottom";


function FadeInImage({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className || ""} ${loaded ? "loaded" : "loading"}`}
      onLoad={() => setLoaded(true)}
    />
  );
}



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


  export default function Home() {
    const [isOccultView, setIsOccultView] = useState(false);

    const offerContainerRef = useRef(null);
    const LogoContainerAnimationRef = useRef(null); 
    const HomePageRef = useRef(null); 
    const BottomNavBarRef = useRef(null);
    const generalTerms = useRef(null);



    const location = useLocation();
    const { scrollTo } = location.state || {};

    useEffect(() => {
      if (scrollTo) {
        const el = document.getElementById(scrollTo);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth" });
          }, 100); // ⚠️ attendre un peu pour que le DOM soit prêt
        }
      }
    }, [scrollTo]);
    const navigate = useNavigate();

    const { i18n } = useTranslation();
    const currentLang = i18n.language;


    const searchBarRef = useRef(null);
    const [firstRender, setfirstRender] = useState(true);


    const [HomeOffers, setHomeOffers] = useState([]);
    const [loading, setLoading] = useState(true);

      const getHomeOffers = async () => {
        const data = await getOffersToday();
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
        }
        setLoading(false);
      }

      useEffect(() => {
        getHomeOffers();

        setTimeout(() => OfferAnimationShow(), 200);

        setTimeout(() => {
           generalTerms.current.classList.add("open");
            setIsOccultView(true);
        },5000)
      }, [i18n.language])


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
          BottomNavBarRef.current.classList.add("sliderInBottomNav");
          searchBarRef.current.classList.add("slideInSearch")
          // searchBarRef.current.style.top = "0";
          setTimeout(() => {
            offerContainerRef.current.style.overflowY = "scroll";
          }, 500)

        }, 3000)
    }
    

    return (
      <div className="HomeContainerPrincipal" ref={offerContainerRef}>
        <div ref={LogoContainerAnimationRef} className={`${true ? "" : ""} LogoContainerAnimation`}>
          <div className="LogoContainer">
            <img src={ViarteLogo} alt="Viarte Logo" 
            onLoad={(e) => {
              e.currentTarget.classList.add("loaded");
            }}/>
          </div>
        </div>
        <SearchBar ref={searchBarRef}/>
        <BottomNavBar isMap={false}  ref={BottomNavBarRef}/>
        <div ref={HomePageRef} className="HomeContainer">
          <div className="HomeSectionContainer">
            <div className="IntroImage">
              <p className="t5">Discover the best of</p>
              <p className="t1">Nice</p>
              <div className="ContainerCenter">
                <img src={NiceIntro2} alt="Intro Image illustration"/>
                <img src={NiceIntro1} alt="Intro Image illustration"/>
                <img src={NiceIntro3} alt="Intro Image illustration"/>
                <div className="Shadow"></div>
              </div>
            </div>
            <p className="t6">Parfait pour l'été</p>
            {/* <p className="t6">Populaire sur Viarte</p> */}
            <div className="row">
              {/* <p className="t4">Les activité d'été</p>  */}
              <p className="t4">disponibles cet après-midi</p>
              <button>
                <img src={arrowRight} alt="arrow right icon"/>
              </button>
            </div> 
            <div className="HomeListPrestation">
              {
                !loading ?
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
                          <FadeInImage src={offer.image_urls[0]} alt="Offer Image" />
                          {/* <img src={offer.image_urls[0]}/> */}
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
                              <img src={StartIconMiddle}/>
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



            <p className="t6">Autour de vous</p>
            <div className="row">
              <p className="t4"> À moins de 5 min à pied</p> 
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
                          <img src={offer.image_urls[0]}/>
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
                              <img src={StartIconMiddle}/>
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
            <p className="t6">Réservez une sortie de dernière minute</p>
            <div className="row">
              <p className="t4">À faire ce soir</p> 
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
                          <img src={offer.image_urls[0]}/>
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
                              <img src={StartIconMiddle}/>
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

            <p className="t6">Populaire cet été</p>
            <div className="row">
              <p className="t4">Activités les plus aimées de la saison</p> 
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
                          <img src={offer.image_urls[0]}/>
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
                              <img src={StartIconMiddle}/>
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
              <p className="t5">Accepter</p>
            </button>
            <button onClick={() => {
              generalTerms.current.classList.remove("open");
              setIsOccultView(false);
              }}
            >
              <p className="t5">Décliner</p>
            </button>
          </div>
        </div>
      </PopUpBottom>

      <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
        generalTerms.current.classList.remove("open");
        setIsOccultView(false);
      }}></div>
      </div>
    );
  }
