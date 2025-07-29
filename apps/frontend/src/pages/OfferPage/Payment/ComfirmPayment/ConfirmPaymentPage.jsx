import "./ConfirmPaymentPage.css"
import ValidateProgress from "../../../../assets/images/ValidateProgress.png"
import ViarteFontLinear from "../../../../assets/images/ViarteFontLinear.png"
import { useNavigate } from "react-router-dom";

export default function ConfirmPayementPage() {
  const navigate = useNavigate();

  return (
    <div className="ConfirmPayement">
      <div className="ViarteFont">
        <img src={ViarteFontLinear} alt="Viarte font"/>
      </div>
      <div className="SuccesIcon">
          <img src={ValidateProgress} alt="Validate White Icon"/>
        </div>
      <p className="t2 bold">PAIEMENT RÉUSSI</p>
      <p className="SuccesMessage t6">
        Votre paiement a été validé avec succès. Merci d’avoir choisi notre service !  
        Vous recevrez un e-mail de confirmation contenant tous les détails de votre réservation.
      </p>
      <div className="hline88"></div>
      <div className="NavigateButton column">
        <button onClick={() => navigate("/")}>
          <p className="t4">Retour à l’accueil</p>
        </button>
        <button>
          <p className="t4">Voir mon ticket</p>
        </button>
      </div>
    </div>
  );
}
