import { useEffect } from "react"
import ValidateWhiteIcon from "../../assets/images/ValidateWhiteIcon.png"
import { useNavigate, useParams } from "react-router-dom"

export default function ConfirmCreation() {
    const navigate = useNavigate()
    const { slug } = useParams();

    useEffect(() => {
        const timeout = setTimeout(() => {
            navigate(`/annonces/${slug}/availability-editor`, {
                state: {
                    origin: "confirm-creation"
                }
            });
        }, 1500)

        return () => clearTimeout(timeout) // Nettoyage si le composant est démonté avant les 2.5s
    }, [])

    return(
        <div className="ConfirmCreation">
            <div className="SuccesOreol">
                <div className="SuccesIcon">
                    <img src={ValidateWhiteIcon} alt="Validate White Icon"/>
                </div>
            </div>
            <p className="t2">Félicitation !</p>
            <p className="SuccesMessage t6">
                Votre annonce a été créée avec succès. Pour qu'elle soit visible, il vous suffit d'ajouter des disponibilités.
            </p>
        </div>   
    )
}