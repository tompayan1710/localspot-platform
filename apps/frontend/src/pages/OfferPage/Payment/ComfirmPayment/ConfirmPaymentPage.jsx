import "./ConfirmPaymentPage.css"
import ValidateProgress from "../../../../assets/images/validateGreen.png"
import ViarteFontLinear from "../../../../assets/images/ViarteFontLinear.png"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ConfirmPayementPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="ConfirmPayement">
      {/* <div className="ViarteFont">
        <img src={ViarteFontLinear} alt="Viarte font"/>
      </div> */}
      <div className="SuccesIcon">
          <img src={ValidateProgress} alt="Validate White Icon"/>
        </div>
      <p className="t3 bold intro">{t("Thank_you")}</p>
      <p className="t3 bold intro">{t("Reservation_received")}</p>
      <p className="SuccesMessage t6">
        {t("Reservation_email_ticket")}
      </p>
      {/* <div className="hline88"></div> */}
      <div className="NavigateButton column">
        <button onClick={() => navigate("/")}>
          <p className="t4">{t("Back_to_home")}</p>
        </button>
        <button onClick={() => navigate("/reservations")}>
          <p className="t4">{t("View_my_reservations")}</p>
        </button>
      </div>
    </div>
  );
}
