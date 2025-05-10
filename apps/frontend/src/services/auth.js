// src/services/api.js
const URL_BASE = process.env.REACT_APP_API_URL; // Remplace par ton URL backend

// Inscription
export const signup = async (email, password) => {
  const response = await fetch(`${URL_BASE}/api/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  });
  return response.json();
};

// Connexion
export const login = async (email, password) => {
    try{
        const response = await fetch(`${URL_BASE}/api/auth/login`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            // Gère les erreurs de réponse (401, 404, 500)
            const errorData = await response.json();
            return { success: false, message: errorData.error || "Erreur inconnue" };
        }

        const data = await response.json(); // ✅ Ici tu définis la variable data correctement

        if (!data.token) {
            return { success: false, message: "Échec de la connexion, no token il respond" };
        }
        else{
            localStorage.setItem("jwtToken", data.token); // Stocke le JWT
            return { success: true, user: data.user, token: data.token };
        }

    } catch (error) {
    // Gère les erreurs réseau (serveur inaccessible)
    return { success: false, message: "Erreur réseau. Serveur inaccessible." };
    }
    
};

// src/services/auth.js

// Accès au profil protégé
export const getProfile = async () => {
    const token = localStorage.getItem("jwtToken");
  
    if (!token) {
      console.log("No token provided");
      return { isAuth: false, message: "No token providedfs" };
    }
  
    try {
      const response = await fetch(`${URL_BASE}/api/auth/profile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
  
      // ✅ Vérifie si la réponse est réussie
      if (!response.ok) {
        console.error("Erreur API:", response.statusText);
        return { isAuth: false, message: "Unauthorized" };
      }
  
      const data = await response.json();
      return {
        isAuth: true,
        user: data.user,
        message: "Authenticated successfully"
      };
    } catch (error) {
      console.error("Erreur de la requête:", error);
      return { isAuth: false, message: "Erreur réseau. Serveur inaccessible." };
    }
  };
  

// Déconnexion
export const logout = () => {
  localStorage.removeItem("jwtToken");
};
