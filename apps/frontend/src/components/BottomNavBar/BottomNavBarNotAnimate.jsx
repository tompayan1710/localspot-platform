import "./BottomNavBar.css";
import { useNavigate } from "react-router-dom"; // 👈 pour naviguer
import { forwardRef, useContext, useEffect, useState } from "react"
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
  const { authState } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("explorer");

  const [hidden, setHidden] = useState(false); // état pour cacher / montrer la navbar
  const [lastScrollY, setLastScrollY] = useState(0);

   useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true); // scroll vers le bas ⇒ cacher
      } else {
        setHidden(false); // scroll vers le haut ⇒ montrer
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);


  return (
    <div ref={ref} className={`BottomNavBarNotAnimate ${hidden ? "hidden" : ""}`}>
      {
        props.isMap?
        <button className="MapButton" onClick={() =>console.log("Clique on map")}>
          <img src={mapIcon} alt="map icon"/>
        </button>
        :
        <></>
      } 

       


        {!authState.user?.provider_id && !authState.user?.provider?.is_validated && (
          <>
          {/* <button className="NavBarButton" onClick={() => setActiveTab("explorer")}> */}
          <button className="NavBarButton" onClick={() => navigate("/")}>
            <div className={`IconWrapper ${activeTab === "explorer" ? "active" : ""}`}>
              <img src={Explore} alt="explore icon"/>
              <p className="t6">Explorer</p>
            </div>
                         
          </button>
           {/* <button className="NavBarButton" onClick={() =>  setActiveTab("activity")}>  */}
           <button className="NavBarButton" onClick={() =>  navigate("/")}> 
            <div className={`IconWrapper ${activeTab === "activity" ? "active" : ""}`}>
              <img src={jetSkieIcon} alt="activity icon"/>
              <p className="t6">Activité</p>
            </div>
            </button>
            {/* <button className="NavBarButton" onClick={() => setActiveTab("restauration")}> */}
            <button className="NavBarButton" onClick={() => navigate("/")}>
              <div className={`IconWrapper ${activeTab === "restauration" ? "active" : ""}`}>
                <img src={foodIcon} alt="restauration icon"/>
                <p className="t6">Restauration</p>
              </div>
            </button>
          </>
        )}

                
        {authState.user?.provider_id ? (
          authState.user?.provider?.is_validated ? (
            <>
            <button className="NavBarButton" onClick={() => setActiveTab("myoffers")}>
              <div className={`IconWrapper ${activeTab === "myoffers" ? "active" : ""}`}>
                <img src={OffersNav} alt="offers icon"/>
                <p className="t6">Annonces</p>
              </div>
            </button>
            <button className="NavBarButton" onClick={() => setActiveTab("calendar")}>
              <div className={`IconWrapper ${activeTab === "calendar" ? "active" : ""}`}>
                <img src={Calendar} alt="calendar icon"/>
                <p className="t6">Calendar</p>
              </div>
            </button>
            
          </>
          ):<></>)
        :<></>}
        {/* <button className="NavBarButton" onClick={() => setActiveTab("profile")}>  */}
        <button className="NavBarButton" onClick={() => navigate("/profile")}> 
          <div className={`IconWrapper ${activeTab === "profile" ? "active" : ""}`}>
            <img src={userIconBlack} alt="user icon"/>
            <p className="t6">Profile</p>
          </div>
        </button>
    </div>
  );
}
)

export default BottomNavBarNotAnimate

