import "./styles.css";

import jetskyIcon from "../../assets/images/jetskyIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import userIcon from "../../assets/images/userIcon.png"

export default function BottomNavBar() {


  return (
    <div className="BottomNavBar">
        <button className="NavBarButton">
            <img src={jetskyIcon}/>
        </button>
        <button className="NavBarButton">
            <img src={foodIcon} />
        </button>
        <button className="NavBarButton"> 
            <img src={userIcon} />
        </button>
    </div>
  );
}



