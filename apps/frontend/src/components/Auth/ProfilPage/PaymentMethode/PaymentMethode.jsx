import "./PaymentMethode.css"
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../authContext/authContext";

import editPenIcon from "../../../../assets/images/editPenIcon.png"
import ValidateProgress from "../../../../assets/images/ValidateProgress.png"
import warningRed from "../../../../assets/images/warningRed.png"
import bankicon from "../../../../assets/images/bankicon.png"
import plus from "../../../../assets/images/plus.png"

import FadeInImage from "../../../Utils/FadeInImage";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "../../../GoBack/GoBack";
import EditVersement from "../../../PopUpBottom/EditVersement/EditVersement";
import VersementList from "../../../PopUpBottom/EditVersement/VersementList/VersementList";

export default function PaymentMethode() {
  const [isOccultView, setIsOccultView] = useState(false);
  const [versements, setVersements] = useState([]);
  const [selectedVersement, setselectedVersement] = useState(0);

  const editPopUp = useRef(null);
  const deletePopUp = useRef(null);


  return (
    <div className="PaymentMethode">
      <GoBack nagigation={"/profile"} text={"retour"}/>
      <p className="t4">Methode de versements</p>
      <VersementList setIsOccultView={setIsOccultView} editPopUp={editPopUp} deletePopUp={deletePopUp} selectedVersement={selectedVersement} setselectedVersement={setselectedVersement} versements={versements} setVersements={setVersements} selectionnable={false} origin={"/payment-methode"}/>



      <div className={`occultView ${isOccultView ? "open" : ""}`}  
        onClick={(e) => {
          setIsOccultView(false);

          // Fermer les deux si elles sont ouvertes
          if (editPopUp.current) editPopUp.current.classList.remove("open");
          if (deletePopUp.current) deletePopUp.current.classList.remove("open");
      }}></div>

    </div>
    
  );
}
