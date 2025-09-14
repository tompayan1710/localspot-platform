import { useTranslation } from 'react-i18next';
import global from "../../../../assets/images/global.png"
import arrowRight from "../../../../assets/images/arrowRight.png"
import France from "../../../../assets/images/France.png"
import United_Kingdom from "../../../../assets/images/United_Kingdom.png"
import Italy from "../../../../assets/images/Italy.png"
import Germany from "../../../../assets/images/Germany.png"
import Spain from "../../../../assets/images/Spain.png"
import "./EditLanguage.css"
import GoBack from '../../../GoBack/GoBack';
import { useLocation } from 'react-router-dom';


export default function EditLanguage(){
    const { t, i18n } = useTranslation();
    const location = useLocation();
    const { origin, scrollTo } = location.state || {};


    const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    };

    return(
        <div className='EditLanguageContianer'>
            <GoBack nagigation={`${origin}`} scrollTo={`${scrollTo}`} text={t("return")}/>
            <p className="t32">{t("Languages")}</p> 
            <div className='LanguageButtonList'>
            {[
                { code: 'en', label: 'English', flag: United_Kingdom },
                { code: 'fr', label: 'Français', flag: France },
                { code: 'it', label: 'Italiano', flag: Italy },
                { code: 'de', label: 'Deutsch', flag: Germany },
                { code: 'es', label: 'Español', flag: Spain }
            ].map(({ code, label, flag }) => (
                <div
                key={code}
                className={`LanguageButtonItem ${i18n.language === code ? "selected" : ""}`}
                onClick={() => changeLanguage(code)} 
                >
                <img src={flag} alt={`${label} flag`} />
                <p className="t4">{label}</p>
                </div>
            ))}
            </div>
        </div>
    )
}
