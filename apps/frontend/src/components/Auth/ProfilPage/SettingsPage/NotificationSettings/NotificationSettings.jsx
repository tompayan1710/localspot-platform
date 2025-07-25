    import "./NotificationSettings.css"
    import GoBack from '../../../../GoBack/GoBack';
    import { useNavigate } from "react-router-dom";

    import arrowRight from "../../../../../assets/images/arrowRight.png"
    import Warning from "../../../../../assets/images/Warning.png"
    import Event from "../../../../../assets/images/Event.png"
    import { useState } from "react";

    export default function NotificationSettings(){
        const navigate = useNavigate();

        const [isReservationEmail, setIsReservationEmail] = useState(true); 
        const [isSuggestionEmail, setIsSuggestionEmail] = useState(true); 

        // const UpdatePreference = async () => {
        //     const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/filter`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(filters),
        //         });

        //         if (!response.ok) {
        //         throw new Error("Erreur serveur");
        //         }

        //         const data = await response.json();

        //         return data

        //     } catch (err) {
        //         console.error("❌ Erreur getFilteredOffers:", err);
        //         return { success: false };
        //     }
        // }
        
        return(
            <div className="NotificationPage">
                <GoBack nagigation={"/settings"} text={"revenir"}/>
                <p className="t4">Email</p>
                <div className="SettingsBox">
                    <div className="SettingsRow row">
                        <div className="RowFirst row">
                        <img src={Warning} alt="Warning icon"/>
                        <div className="column">
                            <p className="t5 bold">Emails de réservation</p>
                            <p className="t6">
                                    Recevez automatiquement les détails de vos réservations&nbsp;: horaires, tickets, contacts et informations pratiques.
                            </p>
                        </div>
                        </div>
                        <button className={`switch ${isReservationEmail ? "open" : ""}`} onClick={() => {
                                setIsReservationEmail((prev) => !prev)
                                }}
                                >
                                <div></div>
                        </button>              
                    </div>
                    <div className="hline"></div>
                    <div className="SettingsRow row">
                        <div className="RowFirst row">
                        <img src={Event} alt="Event icon"/>
                        <div className="column">
                            <p className="t5 bold">Suggestions d'activités</p>
                            <p className="t6">
                                Profitez d’offres recommandées spécialement pour vous, en fonction de votre destination et du moment de votre séjour.
                            </p>
                        </div>
                        </div>
                        <button className={`switch ${isSuggestionEmail ? "open" : ""}`} onClick={() => {
                                setIsSuggestionEmail((prev) => !prev)
                                }}
                                >
                                <div></div>
                        </button>              
                    </div>
                </div>
            </div>
        )
    }