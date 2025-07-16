import "./TopSearchBar.css"
import ViarteV from "../../assets/images/ViarteV.png"
import loupeicon from "../../assets/images/loupeicon.png"

export default function TopSearchBar() {
    return (
        <div className="TopSearchBar row">
            <input placeholder="Commencer ma recherche"/>
            <button>
                <img src={loupeicon} alt="loupe icon"/>
            </button>
        </div>
    )
}