import react, { useState } from "react";
import "./PayementPage.css"
import GoBack from "../../../components/GoBack/GoBack";
import { useParams } from "react-router-dom";
import PayPalLogo from "../../../assets/images/PayPalLogo.png";
import logoCB from "../../../assets/images/logoCB.png";


export default function PayementPage() {
    const { slug } = useParams();
    const [ selectedMethode, setSelectedMethode ] = useState(0);

    return (
        <div className="PayementPageContainer">
            <GoBack nagigation={`/offer-page/${slug}/availibility`} scrollTo={""} text={"revenir"}/>
            <div className="TopDivOpacity"></div>
            <div className="TitleContainer">
                <p className="t32">Sélectionnez un moyen de payement</p>
            </div>
            <div className="MethodesContainer">
                <div className={`MethodeItem ${selectedMethode === 1 ? "selected" : ""}`} onClick={() => {
                    setSelectedMethode(1);
                }}>
                    <div className="row">
                        <img src={PayPalLogo} alt="paypal logo"/>
                        <p className="t4">PayPal</p>
                    </div>
                    <div className={`round`}>
                        <div className={`${selectedMethode === 1 ? "underRound" : ""}`}></div>
                    </div>
                </div>
                <div className={`MethodeItem ${selectedMethode === 2 ? "selected" : ""}`} onClick={() => {
                    setSelectedMethode(2);
                }}>
                    <div className="row">
                        <img src={logoCB} alt="carte bancaire logo"/>
                        <p className="t4">Carte bancaire</p>
                    </div>
                    <div className={`round`}>
                        <div className={`${selectedMethode === 2 ? "underRound" : ""}`}></div>
                    </div>
                </div>
            </div>
            <div className={`CBContainer ${selectedMethode === 2 ? "show" : "desapear"}`}>
                <div className="hline"></div>
                <form className="CBForm">
                    <label className="t6">
                    Nom du titulaire de la carte
                    <input type="text" placeholder="Entrez votre nom" required />
                    </label>

                    <label className="t6">
                    Numéro de carte
                    <input type="text" placeholder="0000 0000 0000 0000" maxLength="19" required />
                    </label>

                    <div className="rowInput">
                    <label className="t6">
                        Date d’expiration
                        <input type="text" placeholder="MM/AA" maxLength="5" required />
                    </label>

                    <label className="t6">
                        CVV
                        <input type="text" placeholder="•••" maxLength="4" required />
                    </label>
                    </div>

                    <label className="checkboxContainer t6">
                    <input type="checkbox" />
                    Enregistrer la carte pour de futurs paiements
                    </label>
                </form>
                </div>
        </div>
    )
}