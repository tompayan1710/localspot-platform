// ✅ src/services/fetchWithAuth.js
import { jwtDecode } from "jwt-decode";

let isRefreshing = false; // ✅ Verrou de renouvellement
let refreshPromise = null; 

// ✅ Fonction pour gérer les requêtes avec Access Token + Refresh automatique
export const fetchWithAuth = async (url, options = {}) => {
    const accessToken = localStorage.getItem("jwtToken");

    if (!accessToken) {
        console.warn("Aucun JWT trouvé, l'utilisateur n'est pas connecté.");
        return {
            success: false,
            message: "Vous n'êtes pas connecté"
        };
    }

    // ✅ Vérifier si le token est expiré AVANT de faire la requête
    const isExpired = isTokenExpired(accessToken);
    if (isExpired) {
        console.warn("✅ Le token est expiré, tentative de rafraîchissement...");
        const refreshSuccess = await refreshAccessToken();
        if (!refreshSuccess) {
            localStorage.removeItem("jwtToken");
            return { success: false, message: "Session expirée, veuillez vous reconnecter." };
        }
    }

    // ✅ Ajouter automatiquement l'Access Token (mis à jour si besoin) dans les headers
    options.headers = {
        ...options.headers,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`
    };

    try {
        // ✅ Faire la requête avec Fetch
        const response = await fetch(url, options);

        // ✅ Si la réponse est autorisée (200), tout va bien
        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
        }

        if (response.status === 403) {
            console.warn("🚫 Accès interdit : Votre compte n'existe plus ou vous n'avez pas les droits.");
            localStorage.removeItem("jwtToken"); // Supprime le token car l'utilisateur n'existe plus
            return { isAuth: false, message: "Votre compte n'existe plus ou vous n'avez pas les droits." };
        }

        // ✅ Si une autre erreur survient, la traiter normalement
        const errorData = await response.json();
        return { success: false, message: errorData.message || "Erreur de la requête" };

    } catch (error) {
        console.error("Erreur dans fetchWithAuth:", error);
        return { success: false, message: error.message || "Erreur réseau" };
    }
};

// ✅ Fonction pour vérifier si le Token est expiré
const isTokenExpired = (token) => {
    try {
        const decoded = jwtDecode(token);
        if (!decoded || !decoded.exp) {
            return true; // Considérer expiré s'il n'a pas de date d'expiration
        }






        const expirationDate = new Date(decoded.exp * 1000);
        const currentDate = new Date(); // ✅ Date actuelle
        const isExpired = decoded.exp * 1000 < currentDate;


        console.log(`✅ ISTOKEN EXPIRED Date actuelle: ${currentDate.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })}`);

        console.log(`✅ ISTOKEN EXPIRED Date d'expiration du token: ${expirationDate.toLocaleString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })}`);

        console.log(`✅ISTOKEN EXPIRED Token expiration: ${expirationDate} - Expiré : ${isExpired}`);
        return isExpired;
    } catch (error) {
        console.error("❌ Erreur lors de la vé  rification du Token :", error.message);
        return true;
    }
};



// ✅ Fonction pour rafraîchir l'Access Token (version simplifiée)
const refreshAccessToken = async () => {
    console.log("🔄 Tentative de rafraîchissement de l'Access Token...");

    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const refreshResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/refresh-token`, {
            method: "GET",
            credentials: "include" // ✅ Important pour envoyer automatiquement les Cookies (Refresh Token)
        });

        if (refreshResponse.ok) {
            const refreshData = await refreshResponse.json();
            const newAccessToken = refreshData.newAccessToken;

            // ✅ Afficher le nouveau token et ses informations
            const decoded = jwtDecode(newAccessToken);
            const creationDate = new Date().toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            const expirationDate = new Date(decoded.exp * 1000).toLocaleString('fr-FR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            console.log("✅ Nouveau Access Token reçu :", newAccessToken);
            console.log("✅ NOUVEAU Date de création du nouveau token (heure exacte) :", creationDate);
            console.log("✅ NOUVEAU Date d'expiration du nouveau token (heure exacte) :", expirationDate);

            // ✅ Stocker le nouveau token dans localStorage
            localStorage.setItem("jwtToken", newAccessToken);
            return true;
        } else {
            console.error("❌ Échec du renouvellement de l'Access Token (réponse serveur). : ", refreshResponse.error);
            localStorage.removeItem("jwtToken");
            return false;
        }
    } catch (error) {
        console.error("❌ Erreur lors du renouvellement de l'Access Token:", error);
        localStorage.removeItem("jwtToken");
        return false;
    }
};
