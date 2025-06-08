import "./SettingsPage.css"
import GoBack from '../../../GoBack/GoBack';
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import arrowRight from "../../../../assets/images/arrowRight.png"
import NotificationLine from "../../../../assets/images/NotificationLine.png"
import trashBlack from "../../../../assets/images/trashBlack.png"
import privacy from "../../../../assets/images/privacy.png"
import { deleteAccount } from "../../../../services/auth";
import { motion, AnimatePresence } from "framer-motion";

export default function SettingsPage(){
    const navigate = useNavigate();

   const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openDeletePupUp = () => {
      setIsPopupOpen(true);
    };

    const closeDeletePopup = () => {
      setIsPopupOpen(false);
    };


    const handleDelete = () => {
      deleteAccount();
      navigate("/login");
    }

    return(
      <>
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
              <div onClick={openDeletePupUp} id="DeleteAccount"><p className="t5">Delete account</p></div>
          </div>
          
        </div>
        <AnimatePresence>
          {isPopupOpen && (
            <motion.div
              className="PopupWrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDeletePopup}
            >
              <motion.div
                className="SettingOpenPopUp"
                onClick={(e) => e.stopPropagation()}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="ContainerIcon">
                  <div className="MyBackground"></div>
                  <img src={trashBlack} alt="trash black" />
                </div>
                <p className="t4">Fermer mon compte</p>
                <p className="t6">
                  Vos données seront totalement effacées.<br />
                  Contactez le support pour tout paiement en attente.
                </p>
                <div className="hline"></div>
                <div className="rowButton">
                  <button className="cancelButton" onClick={closeDeletePopup}>
                    Annuler
                  </button>
                  <button className="deleteAccountButton" onClick={handleDelete}>
                    Supprimer
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>


        </>
    )
}