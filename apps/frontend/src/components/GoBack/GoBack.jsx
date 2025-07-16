import { useNavigate } from "react-router-dom";
import "./GoBack.css";
import arrowLeft from "../../assets/images/arrowLeft.png"

export default function GoBack({nagigation, scrollTo, text, state = {}, conditionFn = () => true}){
    const navigate = useNavigate();

    const handleClick = () => {
        const options = { state: { ...state } };  // ← on copie tout le state donné

        if (scrollTo) {
            options.state.scrollTo = scrollTo;  // ← on ajoute scrollTo s’il y en a un
        }

        if(conditionFn()){
            navigate(nagigation, options);
        }
    };

    return (
        <button className="goBackButton" style={{opacity: "1"}} onClick={() => {
             handleClick();
        }}>
            <img src={arrowLeft} alt="arrow left"/>
            <p className="t6">{text}</p>
        </button>
    );
}
