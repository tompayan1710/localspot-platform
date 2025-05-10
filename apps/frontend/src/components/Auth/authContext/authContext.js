// Création du contexte
import { createContext } from 'react';

export const AuthContext = createContext({isAuth: true, user: {name: "tom", lastname: "payan"}, message:"Ceci est le message de base"});
