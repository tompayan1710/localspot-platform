import "./BottomNavBar.css";
import { useNavigate } from "react-router-dom"; // 👈 pour naviguer
import { forwardRef, useContext } from "react"
import jetSkieIcon from "../../assets/images/jetSkieIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import userIconBlack from "../../assets/images/userIconBlack.png"
import mapIcon from "../../assets/images/mapIcon.webp"
import { AuthContext } from "../Auth/authContext/authContext"
import Calendar from "../../assets/images/Calendar.png"
import OffersNav from "../../assets/images/OffersNav.png"

const BottomNavBar = forwardRef((props, ref) => {
  const navigate = useNavigate(); // 👈 hook de navigation
  const { authState, logout } = useContext(AuthContext);


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

        
        {!authState.user?.provider_id && !authState.user?.provider?.is_validated && (
          <button className="NavBarButton" onClick={() => navigate("/")}>
            <img src={foodIcon} />
            <p className="t6">Restauration</p>
          </button>
        )}


        {authState.user?.provider_id ? (
        authState.user?.provider?.is_validated ? (
          <button className="NavBarButton" onClick={() => navigate("/")}>
              <img src={foodIcon} />
              <p className="t6">Restauration</p>
          </button>
        ):<></>)
        :<></>}
        <button className="NavBarButton" onClick={() => navigate("/")}>
            <img src={Calendar} />
            <p className="t6">Reservation</p>
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

