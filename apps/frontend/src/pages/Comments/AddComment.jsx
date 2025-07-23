import GoBack from "../../components/GoBack/GoBack"
import "./AddComment.css"
import starIcon from "../../assets/images/starIcon2.png"
import { useState } from "react"

export default function AddComment() {
    const [selectedStar, setSelectedStar] = useState(2);
    const [commentText, setCommentText] = useState("");

    async function submitComment() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/add-comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            user_id: 41,             // Tu dois les avoir en local ou contexte
            reservation_id: 40,
            offer_slug: "07782d1c-50b9-477e-9114-2a9892c08800",
            rating: selectedStar + 1,              // ⭐ important, sinon ça commence à 0
            comment: commentText                   // ← Tu dois stocker le texte dans un state
            }),
        });

        const data = await response.json();

        if (data.success) {
            alert("Commentaire ajouté avec succès !");
        } else {
            alert(data.message || "Une erreur est survenue.");
        }
    }


    return (
        <div className="AddComment">
            <GoBack nagigation={"/reservation"} text={"Mes réservations"} />
            <div className="AddCommentContainer">
            <p className="t3">Notez votre expérience</p>
            <p className="t5">Comment évalueriez-vous votre activité&nbsp;?</p>

            <div className="AllStars">
                {
                Array.from({ length: 5 }).map((_, index) => (
                    <button 
                    className={`StarButton ${index <= selectedStar ? "chose" : ""}`} 
                    key={index}
                    onClick={() => setSelectedStar(index)}
                    >
                    <img src={starIcon} alt="Icône étoile" />
                    </button>
                ))
                }
            </div>

            <p className="t5">Vous souhaitez partager plus de détails&nbsp;?</p>
            <textarea 
                placeholder="Décrivez votre expérience ici..." 
                rows="5" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />

            <div className="row">
                <div className="IContainer">
                <p>!</p>
                </div>
                <p className="t6">
                Les propos offensants, injurieux ou inappropriés ne sont pas autorisés. Merci de rester respectueux.
                </p>
            </div>
            </div>

            <button className="SubmitButton" onClick={submitComment}>
                <p className="t5">Envoyer mon avis</p>
            </button>


        </div>
    )
}