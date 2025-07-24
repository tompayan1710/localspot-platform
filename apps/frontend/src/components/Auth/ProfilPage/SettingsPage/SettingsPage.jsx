import "./SettingsPage.css"
import GoBack from '../../../GoBack/GoBack';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import arrowRight from "../../../../assets/images/arrowRight.png"
import NotificationLine from "../../../../assets/images/NotificationLine.png"
import trashBlack from "../../../../assets/images/trashBlack.png"
import Pin from "../../../../assets/images/Pin (3).png"
import Document from "../../../../assets/images/Document.png"
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
        <div className='SettingsPageContainer'>
          <GoBack nagigation={"/profile"} text={"revenir"}/>
          <p className="t2">Settings</p> 
          <div className="SettingsListContainer">
            <p className="t4">General</p>
            <div className="SettingsBox">
              <div className="SettingsRow row" onClick={() => navigate("notification")}>
                <div className="RowFirst row">
                  <img src={NotificationLine} alt="notifications icon"/>
                  <p className="t4">Notifications</p>
                </div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
            </div>
            <div className="SettingsBox">
              <div className="SettingsRow row">
                <div className="RowFirst row">
                  <img src={Pin} alt="notifications icon"/>
                  <p className="t4">Adresse de facturation</p>
                </div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
            </div>
            <p className="t4">Documents</p>
            <div className="SettingsBox" onClick={() => navigate("/terms-of-service")}>
              <div className="SettingsRow row">
                <div className="RowFirst row">
                  <img src={Document} alt="Document icon"/>
                  <p className="t4">Conditions générales</p>
                </div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
              <div className="hline"></div>
              <div className="SettingsRow row">
                <div className="RowFirst row" onClick={() => navigate("/privacy-policy")}>
                  <img src={Document} alt="Document icon"/>
                  <p className="t4">Politique de confidentialité</p>
                </div>
                <img src={arrowRight} alt="arrow right"/>
              </div>
            </div>
          </div>
        </div>
        {/* <div onClick={openDeletePupUp} id="DeleteAccount"><p className="t5">Delete account</p></div> */}
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






