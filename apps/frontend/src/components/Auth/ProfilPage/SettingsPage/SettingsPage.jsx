import "./SettingsPage.css"
import GoBack from '../../../GoBack/GoBack';
import { useNavigate } from "react-router-dom";

import arrowRight from "../../../../assets/images/arrowRight.png"
import NotificationLine from "../../../../assets/images/NotificationLine.png"
import privacy from "../../../../assets/images/privacy.png"

export default function SettingsPage(){
    const navigate = useNavigate();
    return(
        <div className='SettingsPageContianer'>
            <GoBack nagigation={"/profile"} text={"revenir"}/>
            <p className="t2">Settings</p> 
            <div className="SettingsListContainer">
                        <div className="SettingsListItem" onClick={() => navigate("/settings")}>
                          <div className="SettingsRow">
                            <div className="RowFirst"><img src={NotificationLine} alt="notifications icon"/><p className="t4">Notifications</p></div>
                            <img src={arrowRight} alt="arrow right"/>
                          </div>
                          <div className="hline"></div>
                        </div>

                        <div className="SettingsListItem">
                          <div className="SettingsRow">
                            <div className="RowFirst"><img src={privacy} alt="log out icon"/><p className="t4">Log out</p></div>
                            <img src={arrowRight} alt="arrow right"/>
                          </div>
                          <div className="hline"></div>
                        </div>
                      </div>

        </div>
    )
}