import googleicon from "../../assets/images/googleicon.png";

const backend_url = process.env.REACT_APP_API_URL

export const GoogleAuthButton = () => {
    const handleGoogleLogin = () => {
        // ✅ Redirige vers le Backend (Google OAuth) - Rechargement complet de la page
        window.location.href = `${backend_url}/api/auth/googleoauth2`;
    };

    return (
        <button className="GoogleAuthButton" onClick={handleGoogleLogin}>
            <img src={googleicon} alt="google logo"/>
            <p>Continuer avec Google</p>
        </button>
    )
}

