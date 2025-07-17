import { forwardRef, useContext, useRef, useState } from "react";
import PopUpBottom from "../../PopUpBottom/PopUpBottom";
import { GoogleAuthButton } from "../GoogleAuthButton";
import Spinner from "../../Spinner/Spinner";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../authContext/authContext";
import { login, signup } from "../../../services/auth";

const PopUpLogin = forwardRef(({ setIsOccultView, state={}, googleRedirectRoute="/", navigateAfterTo, navigateStateToPass = {}}, ref) => {
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    
    const navigate = useNavigate();
    // const { checkAuth } = useContext(AuthContext);


    const location = useLocation();
    const scrollTo = location.state?.scrollTo || undefined;
    const { checkAuth } = useContext(AuthContext);

    const closePopUp = () => {
        setTimeout(() => {
            setIsOccultView(false);
            ref.current.classList.remove("open");

            if (navigateAfterTo) {
                if (Object.keys(navigateStateToPass).length > 0) {
                    navigate(navigateAfterTo, { state: navigateStateToPass });
                } else {
                    navigate(navigateAfterTo); // 👈 Pas de state si vide
                }
            }
            return;
        }, 1000)
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


        const response = await login(email, password);
        console.log(response)
        if (response.success) {
            // ✅ Il a déjà un compte → on le connecte
            setIsSuccess(true);
            setMessage("Authentifié avec succès");
        }else if(response.status==404){
            console.log("Création de l'utilisateur")
            const signupResponse = await signup(email, password);
            const response = await login(email, password);
            setIsSuccess(true);
            setMessage("Authentifié avec succès");
        } else{
            setIsSuccess(false);
            setMessage(response.message || "Erreur de connexion.");
        }
        checkAuth(); 
        setLoading(false);
        closePopUp();
    }


    return(
        <PopUpBottom
            onClose={() => {
                ref.current.classList.remove("open");
                setIsOccultView(false);
            }}
            title={<p className="t5">Connectez-vous ou inscrivez-vous pour continuer</p>}
            ref={ref}
        >
            <div className="LoginContainer">
                <GoogleAuthButton state={state}
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
    )
}
)
export default PopUpLogin;
