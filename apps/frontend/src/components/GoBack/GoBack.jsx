import { useNavigate } from "react-router-dom";
import "./GoBack.css";
import arrowLeft from "../../assets/images/arrowLeft.png"

export default function GoBack({nagigation, scrollTo, text, state = {}, conditionFn = () => true, refresh, classToAdd="", style={}}){
    const navigate = useNavigate();

    const handleClick = () => {
        const options = { state: { ...state } };  // ← on copie tout le state donné

        if (scrollTo) {
            options.state.scrollTo = scrollTo;  // ← on ajoute scrollTo s’il y en a un
        }

        if(conditionFn()){
            if(!refresh){
                navigate(nagigation, options);
            } else {
                window.location.href = "/profile?refresh=" + Date.now();
            }
        }
    };

    return (
        <button className="goBackButton" style={{opacity: "1"}} onClick={() => {
             handleClick();
        }}>
            <img src={arrowLeft} alt="arrow left"/>
            <p className={`${classToAdd ? classToAdd : "t6"}`} style={style}>{text}</p>
        </button>
    );
}
