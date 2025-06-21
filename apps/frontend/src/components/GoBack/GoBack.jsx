import { useNavigate } from "react-router-dom";
import "./GoBack.css";
import arrowLeft from "../../assets/images/arrowLeft.png"

export default function GoBack({nagigation, scrollTo, text}){
    const navigate = useNavigate();

    const handleClick = () => {
    // Construire l'objet state uniquement si scrollTo est défini
        const options = scrollTo
        ? { state: { scrollTo } }
        : undefined;

        navigate(nagigation, options);
    };

    return (
        <button className="goBackButton" style={{opacity: "1"}} onClick={() => {
             navigate(-1);
        }}>
            <img src={arrowLeft}/>
            <p className="t6">{text}</p>
        </button>
    );
}
