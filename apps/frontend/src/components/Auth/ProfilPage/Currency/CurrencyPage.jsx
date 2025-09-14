import { useTranslation } from "react-i18next";
import GoBack from "../../../GoBack/GoBack";
import "./CurrencyPage.css"

export default function CurrencyPage(){
    const {t} = useTranslation();
    return(
        <div className="CurrencyPage">
            <GoBack nagigation={"/profile"} text={t("return")}/>
            <div className="CurrencyContainer">
                <p className="t5">
                    {t("Only_euro_text")}
                </p>
            </div>
        </div>
    )
}