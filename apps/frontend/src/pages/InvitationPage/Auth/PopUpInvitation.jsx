import { forwardRef, useContext, useId, useRef, useState } from "react";
import PopUpBottom from "../../../components/PopUpBottom/PopUpBottom";
import { GoogleInvitationButton } from "./GoogleInvitationButton";
import Spinner from "../../../components/Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import { login, signup } from "../../../services/auth";
import "./style.css"
import { linkUserToProvider } from "../../../services/provider";
import UserFind from "../../../assets/images/UserFind.png"

const PopUpInvitation = forwardRef(({ setIsOccultView, googleRedirectRoute="/", idProvider, confirmLinkRef }, ref) => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [ userId, setUserId ] = useState();
    const [isConfirmOccult, setIsConfirmOccult] = useState(false);

    const PopUpConfirmRef = confirmLinkRef;

    const navigate = useNavigate();
    // const { checkAuth } = useContext(AuthContext);


    const { checkAuth } = useContext(AuthContext);

    const closePopUp = () => {
        setTimeout(() => {
            setIsOccultView(false);
            ref.current.classList.remove("open");
            return;
        }, 0)
    }

    const handleContinue = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        if (password.length < 6) {
            setMessage("Veuillez rentrer un mot de passe de plus de 6 caractères");
            setLoading(false);
            setIsSuccess(false);
            return;
        }

        let user_id;
        let is_already = false;
        const response = await login(email, password);
        console.log(response)
        if (response.success) {
            // ✅ Il a déjà un compte → on le connecte
            setIsSuccess(true);
            setMessage("Authentifié avec succès");
            user_id = response.user.id
            is_already = true;
        }else if(response.status==404){
            console.log("Création de l'utilisateur")
            const signupResponse = await signup(email, password);
            const response = await login(email, password);
            setIsSuccess(true);
            setMessage("Authentifié avec succès");
            user_id = response.user.id;
        } else{
            setIsSuccess(false);
            setMessage(response.message || "Erreur de connexion.");
        }

        console.error(user_id);
        
        // if()
        if (is_already) {
            console.warn("L'utilisateur existe déjà");
            setUserId(user_id); // ✅ FIX
            PopUpConfirmRef.current.classList.add("open");
            setLoading(false);
            return;
        }else {
            await linkUserToProvider(user_id, idProvider);
            

            checkAuth(); 
            setLoading(false);
            closePopUp();
            
            setTimeout(() => {
                navigate("/profile")
            }, 500)
        }
    }


    return(
        <>
        <PopUpBottom
            onClose={() => {
                ref.current.classList.remove("open");
                setIsOccultView(false);
            }}
            title={<p className="t5">Connectez-vous ou inscrivez-vous pour continuer</p>}
            ref={ref}
        >
            <div className="LoginContainer">
                <GoogleInvitationButton
                redirectRoute={googleRedirectRoute}
                />
                <div className="orcontainer">
                    <div className="orhline"></div>
                    <p className="t6">ou</p>
                    <div className="orhline"></div>
                </div>

                <form className="emailPasswordForm" onSubmit={handleContinue}>
                    <input
                    type="email"
                    placeholder="Adresse e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                    <input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                    <p className={`t6 errorMessage ${isSuccess ? "succesColor" : "errorColor"} ${message ? "visible" : ""}`}>
                    {message}
                    </p>
                    <button type="submit">
                        {
                            !loading ? <p className="t5">Continue</p>
                            : <Spinner />
                        }
                    </button>
                </form>
            </div>
            
        </PopUpBottom>

        <PopUpBottom
                onClose={() => {
                    ref.current.classList.remove("open");
                    PopUpConfirmRef.current.classList.remove("open");
                    setIsConfirmOccult(false);
                }}
                // title={<p className="t5">Veuillez accepter les conditions générales pour continuer</p>}
                isHeader={true}
                ref={PopUpConfirmRef}
                fullHeight={true}
                >
                <div className="ConfirmLink">
                    <div className="column">
                        <div className="ImageWrapper">
                            <img src={UserFind} alt="User find illustration"/> 
                        </div>
                        <p className="t4">Un compte existant a été détecté</p>

                        <div className="QuestionContainer column">
                            <p className="t32 bold">
                                Souhaitez-vous associer ce compte à votre espace prestataire&nbsp;?
                            </p>
                            <p className="t5">
                                Un compte existe déjà avec cette adresse e-mail. Votre compte vous donnera immédiatement accès à votre espace prestataire.
                            </p>
                        </div>
                    </div>
                    <div className="column">
                        <p className="End t6">
                            Aucune donnée ne sera perdue, vous conserverez toutes vos informations personnelles.
                        </p>
                        <div className="ButtonConfirmLink row" style={{ marginTop: "1rem" }}>
                            <button
                            className="CancelButton"
                            onClick={() => {
                                PopUpConfirmRef.current.classList.remove("open");
                                setIsConfirmOccult(false);
                                setIsOccultView(false);
                            }}
                            >
                                
                                <p className="t6">Annuler</p>
                            </button>
                            <button
                            className="ConfirmButton"
                            onClick={async () => {
                                await linkUserToProvider(userId, idProvider);        // ✅ Lier
                                checkAuth();                   // ✅ Refresh Auth
                                setIsConfirmOccult(false);     
                                PopUpConfirmRef.current.classList.remove("open");
                                ref.current.classList.remove("open");
                                setIsOccultView(false);

                                setTimeout(() => {
                                navigate("/profile");        // ✅ Redirection après
                                }, 500);
                            }}
                            >
                            <p className="t6">Lier le compte</p>
                            </button>

                        </div>
                    </div>
                </div>

            </PopUpBottom>
            <div className={`occultView ${isConfirmOccult ? "open" : ""}`}  
                onClick={(e) => {
                    ref.current.classList.remove("open");
                    PopUpConfirmRef.current.classList.remove("open");
                    setIsConfirmOccult(false);
                    setIsOccultView(false);
            }}></div>
        </>
    )
}
)
export default PopUpInvitation;
