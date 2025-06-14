import "./BottomNavBar.css";
import { useNavigate } from "react-router-dom"; // 👈 pour naviguer
import { forwardRef, useContext, useState } from "react"
import jetSkieIcon from "../../assets/images/jetSkieIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import userIconBlack from "../../assets/images/userIconBlack.png"
import mapIcon from "../../assets/images/mapIcon.webp"
import Calendar from "../../assets/images/Calendar.png"
import Explore from "../../assets/images/Explore.png"
import OffersNav from "../../assets/images/OffersNav.png"
import { AuthContext } from "../Auth/authContext/authContext"

const BottomNavBarNotAnimate = forwardRef((props, ref) => {
  const navigate = useNavigate(); // 👈 hook de navigation
  const { authState, logout } = useContext(AuthContext);
const [activeTab, setActiveTab] = useState("explorer");

  return (
    <div ref={ref} className={`BottomNavBarNotAnimate`}>
      {
        props.isMap?
        <button className="MapButton" onClick={() =>console.log("Clique on map")}>
          <img src={mapIcon}/>
        </button>
        :
        <></>
      } 

       


        {!authState.user?.provider_id && !authState.user?.provider?.is_validated && (
          <>
          <button className="NavBarButton" onClick={() => setActiveTab("explorer")}>
            <div className={`IconWrapper ${activeTab === "explorer" ? "active" : ""}`}>
              <img src={Explore} />
              <p className="t6">Explorer</p>
            </div>
                         
          </button>
           <button className="NavBarButton" onClick={() =>  setActiveTab("activity")}> 
            <div className={`IconWrapper ${activeTab === "activity" ? "active" : ""}`}>
              <img src={jetSkieIcon}/>
              <p className="t6">Activité</p>
            </div>
            </button>
            <button className="NavBarButton" onClick={() => setActiveTab("restauration")}>
              <div className={`IconWrapper ${activeTab === "restauration" ? "active" : ""}`}>
                <img src={foodIcon}/>
                <p className="t6">Restauration</p>
              </div>
            </button>
          </>
        )}

                
        {authState.user?.provider_id ? (
          authState.user?.provider?.is_validated ? (
            <>
            <button className="NavBarButton" onClick={() => navigate("/")}>
              <img src={OffersNav} />
              <p className="t6">Mes offres</p>
            </button>
            <button className="NavBarButton" onClick={() => navigate("/")}>
              <img src={Calendar} />
              <p className="t6">Reservation</p>
            </button>
            
          </>
          ):<></>)
        :<></>}
        <button className="NavBarButton" onClick={() => setActiveTab("profile")}> 
          <div className={`IconWrapper ${activeTab === "profile" ? "active" : ""}`}>
            <img src={userIconBlack}/>
            <p className="t6">Profile</p>
          </div>
        </button>
    </div>
  );
}
)

export default BottomNavBarNotAnimate

