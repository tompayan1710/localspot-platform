import GoBack from "../../../GoBack/GoBack"
import "./PayementMethode.css"

export default function PayementMethode(){
    return (
        <div className="PayementMethode">
            <GoBack nagigation={"/profile"} scrollTo={""} text={"revenir"}/>
            <p>Payement Methode</p>
        </div>
    )
}