import { useParams } from "react-router-dom";
import googleicon from "../../assets/images/googleicon.png";
import FadeInImage from "../Utils/FadeInImage";

const backend_url = process.env.REACT_APP_API_URL

export const GoogleAuthButton = ({state, redirectRoute='/'}) => {
     const { slug } = useParams();
    const handleGoogleLogin = () => {
        if(state){
            sessionStorage.setItem("paymentParams", JSON.stringify(state));
        }

        const redirectAfterLogin = encodeURIComponent(redirectRoute);
        window.location.href = `${backend_url}/api/auth/googleoauth2?redirect=${redirectAfterLogin}`;
    };


    return (
        <button className="GoogleAuthButton" onClick={handleGoogleLogin}>
            <div className="ImageWrapper">
                <FadeInImage src={googleicon} alt="google logo"/>
            </div>
            <p className="t5">Continuer avec Google</p>
        </button>
    )
}

