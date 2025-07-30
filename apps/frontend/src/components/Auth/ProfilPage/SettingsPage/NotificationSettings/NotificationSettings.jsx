    import "./NotificationSettings.css"
    import GoBack from '../../../../GoBack/GoBack';
    import { useNavigate } from "react-router-dom";

    import SaveIconFillWhite from "../../../../../assets/images/SaveIconFillWhite.png"
    import Warning from "../../../../../assets/images/Warning.png"
    import Event from "../../../../../assets/images/Event.png"

    // Profile.jsx
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../../authContext/authContext"
import Spinner from "../../../../Spinner/Spinner";




    export default function NotificationSettings(){
        const navigate = useNavigate();
        
        const { authState, updateUser } = useContext(AuthContext);

        console.log(authState)
        const [form, setform] = useState({});


        useEffect(() => {
            setform({
                receive_booking_emails: authState.user?.receive_booking_emails ?? false,
                receive_activity_suggestions: authState.user?.receive_activity_suggestions ?? false,
            })
        }, [])
        useEffect(() => {
            setform({
                receive_booking_emails: authState.user?.receive_booking_emails ?? false,
                receive_activity_suggestions: authState.user?.receive_activity_suggestions ?? false,
            });
        }, [authState]);



        const handleChange = (e) => {
            const { name, value } = e.target;

            setform((prev) => ({
            ...prev,
            [name]: value,
            }))
        }
        
        const handleSubmit = async () => {
            if (!authState.user) return;

            const updates = {};

            if (form.receive_booking_emails !== authState.user.receive_booking_emails) {
                updates.receive_booking_emails = form.receive_booking_emails;
            }

            if (form.receive_activity_suggestions !== authState.user.receive_activity_suggestions) {
                updates.receive_activity_suggestions = form.receive_activity_suggestions;
            }

            if (Object.keys(updates).length === 0) {
                return;
            }

            const formData = new FormData();
            formData.append("user_id", authState.user.id);
            formData.append("fieldsToUpdate", JSON.stringify(updates));

            try {
            const res = await fetch(`${process.env.REACT_APP_API_URL}/api/user/update-profile`, {
                method: "PATCH",
                headers: {
                Authorization: `Bearer ${authState.token}`, // PAS de content-type ici !
                },
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                // TODO : mettre à jour l'état local authState si besoin
                alert("Préférence enregistré");
                updateUser(updates);
            } else {
                alert(data.message || "Erreur lors de la mise à jour.");
            }
            } catch (err) {
                console.error("Erreur :", err);
                alert("Erreur serveur.");
            }
        };

            
        useEffect(() => {
            // ✅ Redirection uniquement lorsque loading est terminé
            console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
            if (!authState.loading && !authState.isAuth) {
            console.log("🔄 Redirection car non authentifié");
            navigate("/login");
            }
        }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth


        if (authState.loading) {
            return <Spinner centerPage={true} />;
        }
            
        
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
                        <button
                            className={`switch ${form.receive_booking_emails ? "open" : ""}`}
                            onClick={() => {
                                setform((prev) => ({
                                ...prev,
                                receive_booking_emails: !prev.receive_booking_emails
                                }));
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
                        <button
                            className={`switch ${form.receive_activity_suggestions ? "open" : ""}`}
                            onClick={() => {
                                setform((prev) => ({
                                ...prev,
                                receive_activity_suggestions: !prev.receive_activity_suggestions
                                }));
                            }}
                            >
                            <div></div>
                        </button>
                    </div>  
                </div>
                <button type="submit" className="SaveButton" onClick={handleSubmit}><img src={SaveIconFillWhite}/><p>Enregistrer</p></button>
            </div>
        )
    }
