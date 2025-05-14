// Création du contexte
import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getProfile, logoutService } from "../../../services/auth"

// Fournisseur de contexte
const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        isAuth: false,
        message: "",
        loading: true,
    });

    
    useEffect(() => {
        console.log("AuthProvider : Je vérifie avec un checkAuth");
        checkAuth();
    }, [])

    const checkAuth = async () => {
        setAuthState(prevState => ({ ...prevState, loading: true }));
        console.log("Je met le loading à TRUE");
        try {
            const response = await getProfile();
            console.log("Auth Contexte response :", response);

            setAuthState({
                user: response.isAuth ? response.user : null,
                isAuth: response.isAuth,
                message: response.isAuth ? "Authentifié avec succès" : response.message || "Vous n'êtes pas connecté",
                loading: false
            });
        } catch (error) {
            console.error("Erreur lors de la vérification de l'authentification:", error);
            setAuthState({
                user: null,
                isAuth: false,
                message: "Erreur réseau. Serveur inaccessible.",
                loading: false
            });
        } finally {
            console.log("Je met le loading à FALSE ");
        }      
    };


    const logout = async () => {
    await logoutService(); // ✅ Appelle la fonction logout de auth.js
    setAuthState({
        user: null,
        isAuth: false,
        message: "Déconnecté",
        loading: false
    });
    };



  return(
    <AuthContext.Provider value={{authState, checkAuth, logout}}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;