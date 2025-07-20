import "./NavBarTest.css";
import { useNavigate, useLocation } from "react-router-dom"; // 👈 pour naviguer
import { forwardRef, useContext, useEffect, useState } from "react"
import jetSkieIcon from "../../assets/images/jetSkieIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import userIconBlack from "../../assets/images/userIconBlack.png"
import mapIcon from "../../assets/images/mapIcon.webp"
import Calendar from "../../assets/images/Calendar.png"
import Explore from "../../assets/images/Explore.png"
import OffersNav from "../../assets/images/OffersNav.png"
import EuroNav from "../../assets/images/EuroNav.png"
import ReservationsIcon from "../../assets/images/ReservationsIcon.png"
import ExploreIcon from "../../assets/images/ExploreIcon.png"
import Today from "../../assets/images/Today.png"
import { AuthContext } from "../Auth/authContext/authContext"

const NavBarTest = forwardRef(({ isMap }, ref) => {
  const navigate = useNavigate(); // 👈 hook de navigation
  const location = useLocation();  // 👈

  const { authState } = useContext(AuthContext);

  const [hidden, setHidden] = useState(false); // état pour cacher / montrer la navbar
  const [lastScrollY, setLastScrollY] = useState(0);


  const [activeTab, setActiveTab] = useState("explorer");


  const currentPath = location.pathname;

  const getActiveTab = () => {
    if (currentPath.startsWith("/annonces")) return "annonces";
    if (currentPath.startsWith("/today")) return "today";
    if (currentPath.startsWith("/calendar")) return "calendar";
    if (currentPath.startsWith("/activity")) return "activity";
    if (currentPath.startsWith("/restauration")) return "restauration";
    if (currentPath.startsWith("/profile")) return "profile";
    if (currentPath.startsWith("/my-earnings")) return "my-earnings";
    if (currentPath.startsWith("/reservation")) return "reservations";
    return "explorer";
  };

    // const [activeTab, setActiveTab] = useState(props.activeTab || "explorer");


  //  useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY > lastScrollY && currentScrollY > 100) {
  //       setHidden(true); // scroll vers le bas ⇒ cacher
  //     } else {
  //       setHidden(false); // scroll vers le haut ⇒ montrer
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);


  useEffect(() => {
    console.log("activeTab a changé :", activeTab);
  }, [activeTab]);

  return (
    <div ref={ref} className={`BottomNavBarNotAnimate Test ${hidden ? "hidden" : ""}`}>
      {
        isMap?
        <button className="MapButton" onClick={() => console.log("Clique on map")}>
          <img src={mapIcon} alt="map icon"/>
        </button>
        :
        <></>
      } 

       

        {/* CLIENT */}
        {!authState.user?.provider_id && !authState.user?.provider?.is_validated && (
          <>
          {/* <button className="NavBarButton" onClick={() => setActiveTab("explorer")}> */}
          <button className="NavBarButton" 
            onClick={() => {
              // setActiveTab("explorer");
              navigate("/");
            }}
          >
            <div className={`IconWrapper ${activeTab === "explorer" ? "active" : ""}`}>
              <img src={ExploreIcon} alt="explore icon"/>
              <p className="t6">Explorer</p>
            </div>
                         
          </button>
           {/* <button className="NavBarButton" onClick={() =>  setActiveTab("activity")}>  */}
           {/* <button className="NavBarButton" 
              onClick={() => {
                // setActiveTab("activity");
                navigate("/activity");
              }}
           > 
            <div className={`IconWrapper ${activeTab === "activity" ? "active" : ""}`}>
              <img src={jetSkieIcon} alt="activity icon"/>
              <p className="t6">Activité</p>
            </div>
            </button> */}
            {/* <button className="NavBarButton" onClick={() => setActiveTab("restauration")}> */}
            {/* <button className="NavBarButton"
              onClick={() => {
                // setActiveTab("restauration");
                navigate("/restauration");
              }}
            >
              <div className={`IconWrapper ${activeTab === "restauration" ? "active" : ""}`}>
                <img src={foodIcon} alt="restauration icon"/>
                <p className="t6">Restauration</p>
              </div>
            </button> */}

            <button className="NavBarButton"
              onClick={() => {
                // setActiveTab("restauration");
                navigate("/reservations");
              }}
            >
              <div className={`IconWrapper ${activeTab === "reservations" ? "active" : ""}`}>
                <img src={ReservationsIcon} alt="reservations icon"/>
                <p className="t6">Reservations</p>
              </div>
            </button>
          </>
        )}

        {/* PROVIDER    */}
        {authState.user?.provider_id ? (
          authState.user?.provider?.is_validated ? (
            <>
            <button className="NavBarButton" onClick={() => {
              // setActiveTab("today");
              navigate("/today");
            }}>
              <div className={`IconWrapper ${activeTab === "today" ? "active" : ""}`}>
                <img src={Today} alt="Today icon"/>
                <p className="t6">Aujourd'hui</p>
              </div>
            </button>
            <button className="NavBarButton" onClick={() => {
              // setActiveTab("calendar");
              navigate("/calendar");
            }}>
              <div className={`IconWrapper ${activeTab === "calendar" ? "active" : ""}`}>
                <img src={Calendar} alt="calendar icon"/>
                <p className="t6">Calendar</p>
              </div>
            </button>
            {/* <button className="NavBarButton" onClick={() => setActiveTab("myoffers")}> */}
            
            <button className="NavBarButton" onClick={() => {
              // setActiveTab("annonces");
              navigate("/my-earnings");
            }}>
              <div className={`IconWrapper ${activeTab === "my-earnings" ? "active" : ""}`}>
                <img src={EuroNav} alt="My Earnings icon"/>
                {/* My Earnings */}
                <p className="t6">Mes&nbsp;Revenus</p>
              </div>
            </button>
            <button className="NavBarButton" onClick={() => {
              // setActiveTab("annonces");
              navigate("/annonces");
            }}>
              <div className={`IconWrapper ${activeTab === "annonces" ? "active" : ""}`}>
                <img src={OffersNav} alt="annonces icon"/>
                <p className="t6">Annonces</p>
              </div>
            </button>            
          </>
          ):<></>)
        :<></>}
        {/* <button className="NavBarButton" onClick={() => setActiveTab("profile")}>  */}
        <button className="NavBarButton" onClick={() => {
              // setActiveTab("profile");
              navigate("/profile");
            }}> 
          <div className={`IconWrapper ${activeTab === "profile" ? "active" : ""}`}>
            <img src={userIconBlack} alt="user icon"/>
            <p className="t6">Profile</p>
          </div>
        </button>
    </div>
  );
}
)

export default NavBarTest

