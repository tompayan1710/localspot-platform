// Création du contexte
import { createContext } from 'react';

export const AuthContext = createContext({isAuth: false, user: {name: "", lastname: ""}, message:"no"});
