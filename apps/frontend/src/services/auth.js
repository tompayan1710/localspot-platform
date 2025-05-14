// src/services/api.js
import { fetchWithAuth } from "./fetchWithAuth";

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
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            // Gère les erreurs de réponse (401, 404, 500)
            const errorData = await response.json();
            return { success: false, message: errorData.error || "Erreur inconnue" };
        }

        const data = await response.json(); // ✅ Ici tu définis la variable data correctement
        console.log("Réponse de l'API Login :", data);
        if (!data.token) {
            return { success: false, message: "Échec de la connexion, no token il respond" };
        }
        else{
            console.log("Attention Enregistrement jwtToken");
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
  const response = await fetchWithAuth(`${URL_BASE}/api/auth/getprofile`, {
    method: "GET"
  });

  if (response.success) {
    return {
      isAuth: true,
      user: response.data.user,
      message: "Authenticated successfully"
    };
  } else {
    return {
      isAuth: false,
      message: response.message || "Unauthorized"
    };
  }
};

// Déconnexion
export const logoutService = async () => {
  localStorage.removeItem("jwtToken");

   // ✅ Demander au serveur de supprimer le Refresh Token (HttpOnly)
   
  await fetch(`${URL_BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include" // ✅ Important pour envoyer les Cookies
    });

  console.log("Déconnecté Avec logoutService");
};

    
export const deleteAccount = async () => {
  const token = localStorage.getItem("jwtToken");

  if (!token) {
    console.log("No token provided to delete account");
    return { isAuth: false, error: "No token provided to delete account" };
  }

  try{
    const response = await fetch(`${URL_BASE}/api/auth/deleteaccount`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }
    )

    if (!response.ok) {
      console.error("Erreur API:", response.statusText);
      return { success: false, status: response.status, error: "Erreur inconnue" };
    }

    const data = await response.json();
    
    // ✅ Si la suppression est réussie, on retire le token
    if (data.success) {
      localStorage.removeItem("jwtToken");
    }

    return data;
  } catch (error) {
    console.error("Erreur dans la suppression du compte: ", error);
    return  { success: false, status: 500, error: "Erreur réseau ou serveur" };
  }
}
