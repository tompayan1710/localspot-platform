import "./BottomNavBar.css";
import { useNavigate } from "react-router-dom"; // 👈 pour naviguer
import { forwardRef } from "react"
import jetSkieIcon from "../../assets/images/jetSkieIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import userIconBlack from "../../assets/images/userIconBlack.png"
import mapIcon from "../../assets/images/mapIcon.webp"

const BottomNavBar = forwardRef((props, ref) => {
  const navigate = useNavigate(); // 👈 hook de navigation


  return (
    <div ref={ref} className={`BottomNavBar`}>
      {
        props.isMap?
        <button className="MapButton" onClick={() =>console.log("Clique on map")}>
          <img src={mapIcon}/>
        </button>
        :
        <></>
      } 

        <button className="NavBarButton" onClick={() => navigate("/")}>
            <img src={jetSkieIcon}/>
            <p className="t6">Activité</p>
        </button>
        <button className="NavBarButton" onClick={() => navigate("/")}>
            <img src={foodIcon} />
            <p className="t6">Restauration</p>
        </button>
        <button className="NavBarButton" onClick={() => navigate("/profile")}> 
            <img src={userIconBlack} />
            <p className="t6">Profile</p>
        </button>
    </div>
  );
}
) 

export default BottomNavBar

