// Création du contexte
import React, { useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import { getProfile } from "../../../services/auth"

const base_url = process.env.REACT_APP_API_URL;
// Fournisseur de contexte
const AuthProvider = ({ children }) => {
    const [userdata, setUser] = useState(null);
    const [isAuth, setisAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    const [authState, setAuthState] = useState({
        user: null,
        isAuth: false,
        message: "",
        loading: true,
    });

    
    useEffect(() => {
        checkAuth();
    }, [])

    const checkAuth = async () => {
        try{
            const response = await getProfile();
            console.log("voici mon response :", response);
            if(response.isAuth){
                setAuthState({
                    user: response.user,
                    isAuth: true,
                    message: "Authentifié avec succès",
                    loading: false
                });

            }else(
                setAuthState({
                    user: null,
                    isAuth: false,
                    message: response.message || "Vous n'êtes pas connecté",
                    loading: false
                })
            )
        }catch(error) {
            console.error("Erreur lors de la vérification de l'authentification:", error);
            setAuthState({
                user: null,
                isAuth: false,
                message: "Erreur réseau. Serveur inaccessible.",
                loading: false
            });

        }   
    }
  return(
    <AuthContext.Provider value={{authState, checkAuth}}>
        {children}
    </AuthContext.Provider>
  )
}


export default AuthProvider;