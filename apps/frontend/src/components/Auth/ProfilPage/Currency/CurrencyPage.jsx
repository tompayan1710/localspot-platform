import GoBack from "../../../GoBack/GoBack";
import "./CurrencyPage.css"

export default function CurrencyPage(){
    return(
        <div className="CurrencyPage">
            <GoBack nagigation={"/profile"} text={"revenir"}/>
            <div className="CurrencyContainer">
                <p className="t5">
                    L’euro (€) est actuellement la seule devise acceptée pour les paiements. Le support d'autres devises sera bientôt disponible.
                </p>
            </div>
        </div>
    )
}