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
      console.log("No token provided to get Profile");
      return { isAuth: false, message: "No token providedfs" };
    }
  
    try {
      const response = await fetch(`${URL_BASE}/api/auth/getprofile`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.status === 403) {
        console.warn("🚫 Accès interdit : Votre compte n'existe plus ou vous n'avez pas les droits.");
        localStorage.removeItem("jwtToken"); // Supprime le token car l'utilisateur n'existe plus
        return { isAuth: false, message: "Votre compte n'existe plus ou vous n'avez pas les droits." };
      }
      
      // ✅ Vérifie si la réponse est réussie
      if (!response.ok) {
        console.log("Erreur API: Vous avez un token, mais vous n'avait pas les droit pour accéder à cette route");
        return { isAuth: false, message: "Unauthorized" };
      }


      const data = await response.json(); // ✅ Utilise await ici

      if(data.isAuth){
        return {
          isAuth: true,
          user: data.user,
          message: "Authenticated successfully"
        };
      }else{
        return {
          isAuth: false,
          error: data.error
        };
      }
      
    } catch (error) {
      console.log("Erreur de la requête: ", error);
      return { isAuth: false, message: error };
    }
  };
  

// Déconnexion
export const logout = () => {
  localStorage.removeItem("jwtToken");
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
