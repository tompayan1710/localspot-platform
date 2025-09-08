import "./ButtonLanguage.css"

import arrow from "../../../assets/images/arrowRight.png"
import France from "../../../assets/images/France.png"
import United_Kingdom from "../../../assets/images/United_Kingdom.png"
import Italy from "../../../assets/images/Italy.png"
import Germany from "../../../assets/images/Germany.png"
import global from "../../../assets/images/globalThink.png"

import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import PopUpBottom from "../../PopUpBottom/PopUpBottom"
import FadeInImage from "../../Utils/FadeInImage"



export default function ButtonLanguage({home=false, offerPage= false, footer=false, popUp=false}){
    const LanguageRef = useRef(null);
    const ButtonLanguageRef = useRef(null); 

    const { i18n } = useTranslation();
    const [isOccultView, setIsOccultView] = useState(false);
    
    
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    
    const languagesSupply = [
        { code: 'en', label: 'English', flag: United_Kingdom },
        { code: 'fr', label: 'Français', flag: France },
        // { code: 'it', label: 'Italiano', flag: Italy },
        // { code: 'de', label: 'Deutsch', flag: Germany },
    ]
   
    const currentCode = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];
    // Trouve l’entrée correspondante, fallback sur la première
    const currentLang = languagesSupply.find(l => l.code === currentCode) || languagesSupply[0];
    // const { i18n } = useTranslation();


    return(
        <>  
            <div ref={ButtonLanguageRef} className={`ButtonLanguage ${home ? "Home" : offerPage ? "offerPage" :  footer ? "Footer" : ""} ${popUp ? "popUp" : ""} ${isOccultView ? "selected" : ""}`}>
                <button onClick={() =>{
                    LanguageRef.current.classList.add("open");
                    setIsOccultView(true);
                    }}
                >
                    {

                        footer ?
                        <img id={"global"} src={global} alt="global"/>
                        : <div className="ImageWrapper">
                            <FadeInImage className="paysflag" src={currentLang.flag} alt={`${currentLang.label} flag`}/>
                        </div>
                    }
                    {/* <img className="paysflag" src={currentLang.flag} alt={`${currentLang.label} flag`} /> */}
                    <p className="t5">{currentLang.label}</p>
                    <img src={arrow} className={"ArrowRight"} alt="arrow icon"/>
                </button>
            </div>

            <PopUpBottom
                onClose={() => {
                LanguageRef.current.classList.remove("open");
                // CancelBottomRef.current.style.bottom = "-100%";
                setIsOccultView(false);
                }}
                title={(
                <p className="t5">Language</p> 
                )}
                ref={LanguageRef}
                fullHeight={true}
            >
                <div className='EditLanguageContianer'>
                    <p className="t32">Language</p> 
                    <div className='LanguageButtonList'>
                    {languagesSupply.map(({ code, label, flag }) => (
                        <div
                        key={code}
                        className={`LanguageButtonItem ${code === currentCode ? "selected" : ""}`}
                        onClick={() => {
                            changeLanguage(code);

                            LanguageRef.current.classList.remove("open");
                            setIsOccultView(false);
                        }}
                        >
                        <img src={flag} alt={`${label} flag`} />
                        <p className="t4">{label}</p>
                        </div>
                    ))}
                    </div>
                    {/* <div className="CenterDiv">
                        <p className="t6 CenterP">Le changement de langue n’est pas encore disponible. L’application est actuellement uniquement en français.</p>
                    </div> */}
                </div>
            </PopUpBottom>

            <div className={`occultView ${isOccultView ? "open" : ""}`} 
            onClick={() => {
                LanguageRef.current.classList.remove("open");
                setIsOccultView(false);
            }}></div>
        </>
    )
}