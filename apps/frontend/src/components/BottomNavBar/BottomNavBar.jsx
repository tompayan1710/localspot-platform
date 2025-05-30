import "./BottomNavBar.css";
import { useNavigate } from "react-router-dom"; // 👈 pour naviguer
import { forwardRef } from "react"
import jetskyIcon from "../../assets/images/jetskyIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import userIcon from "../../assets/images/userIcon.png"
import mapIcon from "../../assets/images/mapIcon.webp"

const BottomNavBar = forwardRef((props, ref) => {
  const navigate = useNavigate(); // 👈 hook de navigation


  return (
    <div ref={ref} className={`BottomNavBar ${props.firstRender ? "firstRender" : ""}`}>
      
      {
        props.isMap?
        <button className="MapButton" onClick={() =>console.log("Clique on map")}>
          <img src={mapIcon}/>
        </button>
        :
        <></>
      }

        <button className="NavBarButton">
            <img src={jetskyIcon}/>
        </button>
        <button className="NavBarButton">
            <img src={foodIcon} />
        </button>
        <button className="NavBarButton" onClick={() => navigate("/profile")}> 
            <img src={userIcon} />
        </button>
    </div>
  );
}
)

export default BottomNavBar

