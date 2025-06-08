import { useNavigate } from "react-router-dom";
import "./GoBack.css";
import arrowLeft from "../../assets/images/arrowLeft.png"

export default function GoBack({nagigation, text}){
    const navigate = useNavigate();
    return (
        <button className="goBackButton" style={{opacity: "1"}} onClick={() => navigate(`${nagigation}`)}><img src={arrowLeft}/><p className="t6">{text}</p></button>
    );
}
