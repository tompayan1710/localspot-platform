import "./TopSearchBar.css"
import ViarteV from "../../assets/images/ViarteV.png"
import loupeicon from "../../assets/images/loupeicon.png"
import FiltersSearch from "../../assets/images/FiltersSearch.png"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"

const TopSearchBar = forwardRef(({ setIsOccultView }, ref) => {
    const {t} = useTranslation();
    
    return (
        <div className="TopSearchBar row" ref={ref}
        >
            <button         
                className="fake-input"
                onClick={() => {
                    // Ouvre la barre de recherche
                    ref.current?.classList.add("open");
                    // Active aussi la vue occultante
                    setIsOccultView(true);
                }}
            >
                <p className="t5">{t("Start_my_search")}</p>
            </button>
            <button className="loupeButton" onClick={() => {
                ref.current?.classList.add("open");
                setIsOccultView(true);
            }}>
                <img src={loupeicon} alt="loupe icon"/>
            </button>
        </div>
    )
})

export default TopSearchBar;