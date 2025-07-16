import "./TopSearchBar.css"
import ViarteV from "../../assets/images/ViarteV.png"
import loupeicon from "../../assets/images/loupeicon.png"
import FiltersSearch from "../../assets/images/FiltersSearch.png"
import { forwardRef } from "react"

const TopSearchBar = forwardRef(({ setIsOccultView }, ref) => {
    return (
        <div className="TopSearchBar row" ref={ref}
        >
            <input placeholder="Commencer ma recherche" onFocus={() => {
                // Ouvre la barre de recherche
                ref.current?.classList.add("open");
                // Active aussi la vue occultante
                setIsOccultView(true);
            }}/>
            <button  onClick={() => {
                ref.current?.classList.add("open");
                setIsOccultView(true);
            }}>
                <img src={loupeicon} alt="loupe icon"/>
            </button>
        </div>
    )
})

export default TopSearchBar;