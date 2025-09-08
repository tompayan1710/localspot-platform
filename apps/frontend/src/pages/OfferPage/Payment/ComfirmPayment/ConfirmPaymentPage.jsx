import "./ConfirmPaymentPage.css"
import ValidateProgress from "../../../../assets/images/validateGreen.png"
import ViarteFontLinear from "../../../../assets/images/ViarteFontLinear.png"
import { useNavigate } from "react-router-dom";

export default function ConfirmPayementPage() {
  const navigate = useNavigate();

  return (
    <div className="ConfirmPayement">
      {/* <div className="ViarteFont">
        <img src={ViarteFontLinear} alt="Viarte font"/>
      </div> */}
      <div className="SuccesIcon">
          <img src={ValidateProgress} alt="Validate White Icon"/>
        </div>
      <p className="t3 bold intro">Merci</p>
      <p className="t3 bold intro">Votre réservation a bien été reçue</p>
      <p className="SuccesMessage t6">
        {/* Votre paiement a été validé avec succès.<br></br>   */}
        Vous recevrez un e-mail avec votre ticket de réseravtion
        {/* Vous recevrez un e-mail de confirmation contenant tous les détails de votre réservation. */}
      </p>
      {/* <div className="hline88"></div> */}
      <div className="NavigateButton column">
        <button onClick={() => navigate("/")}>
          <p className="t4">Retour à l’accueil</p>
        </button>
        <button onClick={() => navigate("/reservations")}>
          <p className="t4">Voir mes réservations</p>
        </button>
      </div>
    </div>
  );
}
