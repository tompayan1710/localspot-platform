import { use, useEffect, useRef, useState } from "react";
import "./SearchingPage.css"

import ViarteV from "../../assets/images/ViarteV.png"
import ViarteFont from "../../assets/images/ViarteFont.png"
import FiltersSearch from "../../assets/images/FiltersSearch.png";
import SearchNotFount from "../../assets/images/SearchNotFount.png";

import TopSearchBar from "../../components/SearchBar/TopSearchBar";
import OffersCard from "../../components/OffersCard/OffersCard";
import PopUpBottom from "../../components/PopUpBottom/PopUpBottom";
import FilterElement from "../../components/SearchBar/FilterElement/FilterElement";
import { useLocation } from "react-router-dom";
import { getFilteredOffers, getAllOffers } from "../../services/offers";
import Spinner from "../../components/Spinner/Spinner";


export default function SearchingPage(){
    const [isOccultView, setIsOccultView] = useState(false);
    const searchBarRef = useRef(null);

    const location = useLocation();
    const [ filtersOptions, setFiltersOptions ] = useState({})
    const [ loadingFiltered, setLoadingFiltered] = useState(true);
    const [ filteredOffers, setFilteredOffers ]= useState([])

    const [ loadingAll, setLoadingAll] = useState(true);
    const [ allOffers, setAllOffers ]= useState([])

    // useEffect(() => {
    //     if(filters){
    //         console.log(filters.priceRange); // minValue
    //         console.log(filters.date); // la date choisie
    //         console.log(filters.moment); // moment de la journée
    //         console.log(filters.participants.adults); // nb adultes
    //         console.log(filters.categories); // tableau de catégories
    //     }else {
    //         console.log("NO STATE passed")
    //     }
    // })
const fetchFilteredOffers = async (filteredOption) => {
            setLoadingFiltered(true);
            setFilteredOffers([]);
            setFiltersOptions(location.state);

            try {
                
                const offers = await getFilteredOffers(filteredOption);
                // const offers = await getFilteredOffers({
                //     priceRange: { min: 30, max: 150 },
                //     date: "2025-07-15",
                //     moment: "Matin", // ou "Après-midi", "Soir"
                //     categories: ["Bien-être", "Loisirs & Divertissement"],
                //     total_participants: 2+1
                // });

                console.log("Offres filtrées :", offers);
                setFilteredOffers(Array.isArray(offers) ? offers : []);
            } catch (err) {
                console.error("Erreur lors du filtrage des offres :", err);
                setFilteredOffers([]); // fallback
            } finally {
                setLoadingFiltered(false);
            }
        };

    useEffect(() => {
        fetchFilteredOffers(location.state); // 👈 on appelle la fonction ici
    }, [location.state]);


    useEffect(() => {
        setLoadingAll(true)
        const fetchAllOffers = async () => {
            try {
                const offers = await getAllOffers();

                console.log("Offres :", offers.offers);
                setAllOffers(Array.isArray(offers.offers) ? offers.offers : []);
            } catch (err) {
                console.error("Erreur recupération AllOffres :", err);
                setAllOffers([]); // fallback
            } finally {
                setLoadingAll(false);
            }
        };

        if(filteredOffers.length === 0 ){
            fetchAllOffers()
        }

    }, [filteredOffers])


        useEffect(() => {
      if (isOccultView) {
        document.body.style.overflow = "hidden";   // bloque le scroll du body
      } else {
        document.body.style.overflow = "";         // réactive le scroll
      }
    }, [isOccultView]);

    
    return (

        <div className="SearchingPage">
            {/* <OffersCard offers={homeOffersByCategory.thisAfternoon} loading={loading}/> */}
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
            
            <div className="SearchingBody">
                {
                    loadingFiltered ?

                    <Spinner centerPage={true}/>
                    :
                    (
                        filteredOffers.length > 0 ?
                        <div className="ListOffers">
                            <p className="t5">
                                {filteredOffers.length} résultat{filteredOffers.length !== 1 ? "s" : ""} trouvé{filteredOffers.length !== 1 ? "s" : ""}
                            </p>
                            <OffersCard offers={filteredOffers} loading={loadingFiltered} vertical={true}/>
                        </div>
                        :
                        <>
                            <div className="NotFount">
                                <img src={SearchNotFount} alt="Search not fount"/>
                                <p className="t32 bold">Aucune offre trouvé</p>
                            </div>
                            <div className="ListOffers">
                                <div id={"Suggestions"}>
                                    <p className="t4">Quelques suggestions :</p>
                                </div>
                                <OffersCard offers={allOffers} loading={loadingAll} vertical={true}/>
                            </div>
                        </>                        
                    )
                    
                }
            </div>
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

                {filtersOptions && (
                <FilterElement
                    key={JSON.stringify(filtersOptions)}
                    setIsOccultView={setIsOccultView}
                    searchBarRef={searchBarRef}
                    setFiltersOptions={setFiltersOptions}
                    moment={filtersOptions.moment || ""}
                    date={filtersOptions.date || ""}
                    priceRange_min={filtersOptions.priceRange?.min || 25}
                    priceRange_max={filtersOptions.priceRange?.max || 3000}
                    categoriesList={filtersOptions.categories || []}
                    nb_adult={filtersOptions.nb_adult || 0}
                    nb_reduced={filtersOptions.nb_reduced || 0}
                    fetchFilteredOffers={fetchFilteredOffers}
                />
                )}

                {/* priceRange_min={filtersOptions.priceRange.min} priceRange_max=3000,  */}
            </PopUpBottom>

            <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
                console.warn("IsOccult 1")
                searchBarRef.current.classList.remove("open");
                setIsOccultView(false);
            }}></div>
        </div>
    )
}