import "./Footer.css"
import ViarteV from "../../assets/images/ViarteV.png"
import copieIconWhite from "../../assets/images/copieIconWhite.png"; 
import arrowRight from "../../assets/images/arrowRight.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { linearTheme } from "../../services/themeModifier";
import ButtonLanguage from "../Buttons/ButtonLanguage/ButtonLanguage";
import { useTranslation } from "react-i18next";

export default function Footer({paddingBottom, isOtherTheme}) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const email = "tompayan1710@gmail.com";
  const { t, i18n } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1000); // Reset après 2s
    });
  };


  useEffect(() => {
    if(isOtherTheme){
      const from = [255, 255, 255];    // blanc
      const to = [38, 38, 38]; 
      const cleanup = linearTheme(from, to);

      return cleanup; // ✅ on nettoie l'écouteur au démontage du composant
    }
  }, []);


  return (
    <div id={"Footer"} className="FooterContainer" 
      // style={{ paddingBottom: paddingBottom || "150px" }}
    >
      <img src={ViarteV} alt="ViarteV"/>
      <p className="t6">
        {t("footer_message")}
      </p>
      <div className="whiteHline"></div>
      <div className="BottomContainer">
        <p className="t5" style={{marginBottom: 0}}>{t("Language")}Language</p>
        {/* <button id="language" className="LanguageButton" onClick={() => {
          navigate("/edit-language", {
            state: {
              origin: "/",
              scrollTo: "Footer"
            }
          }) 
        }}>
          <p className="t6">francais</p> 
          <img src={arrowRight} alt="arrowRight"/>
        </button> */}
        <ButtonLanguage footer={true} popUp={false}/>

        <p className="t5">{t("Contact")}</p>
        <button onClick={handleCopy} className="CopyButton">
          <p className="t6">tom.payan@viarte.eu</p>
          <img src={copieIconWhite} alt="Copier l’email" />
          <span className={`${copied ? "copied" : ""} CopiedFeedback t6`}>{t("Copied")}</span>
        </button>
          
        <p className="t5">{t("Legal_resources")}</p>
        <a className="t6" href="/legal-notice">{t("Legal_resources")}</a>
        <a className="t6" href="/privacy-policy">{t("Privacy_Policy")}</a>
        <a className="t6" href="/terms-of-service">{t("Terms_Of_Service")}</a>
        <a className="t6" href="/terms-and-conditions-of-sal">{t("Terms_And_Conditions_Of_Sal")}</a>
        <a className="t6" href="/content-policy">{t("Content_Policy")}</a>
        <div className="whiteHline"></div>
        <p className="t6">© 2025 Viarte. {t("All_rights_reserved")}.</p>
        <div style={{height: paddingBottom || "150px"}}></div>
      </div>
    </div>
  );
}




