import "./Footer.css"
import ViarteV from "../../assets/images/ViarteV.png"
import copieIconWhite from "../../assets/images/copieIconWhite.png"; 
import arrowRight from "../../assets/images/arrowRight.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { linearTheme } from "../../services/themeModifier";

export default function Footer({paddingBottom, isOtherTheme}) {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const email = "tompayan1710@gmail.com";

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
    <div id={"Footer"} className="FooterContainer" style={{ paddingBottom: paddingBottom || "70px" }}>
      <img src={ViarteV} alt="ViarteV"/>
      <p className="t6">
        Les offres affichées ont fait l'objet d'une sélection rigoureuse et d’un contrôle qualité strict, dans le but de vous proposer des prestations de grande qualité. 
      </p>
      <div className="whiteHline"></div>
      <div className="BottomContainer">
        <p className="t5">Language</p>
        <button id="language" className="LanguageButton" onClick={() => {
          navigate("/edit-language", {
            state: {
              origin: "/",
              scrollTo: "Footer"
            }
          })
        }}>
          <p className="t6">francais</p> 
          <img src={arrowRight} alt="arrowRight"/>
        </button>
        <p className="t5">Contact</p>
        <button onClick={handleCopy} className="CopyButton">
          <p className="t6">tom.payan@viarte.eu</p>
          <img src={copieIconWhite} alt="Copier l’email" />
          <span className={`${copied ? "copied" : ""} CopiedFeedback t6`}>Copié</span>
        </button>
          
        <p className="t5">Ressources légales</p>
        <a className="t6" href="/legal-notice">Mentions légales</a>
        <a className="t6" href="/privacy-policy">Politique de confidentialité</a>
        <a className="t6" href="/terms-of-service">Conditions Générales d’Utilisation</a>
        <a className="t6" href="/terms-and-conditions-of-sal">Conditions Générales de Vente</a>
        <a className="t6" href="/content-policy">Content Policy</a>
        <div className="whiteHline"></div>
        <p className="t6">© 2025 Viarte. Tous droits réservés.</p>
        
      </div>
    </div>
  );
}




