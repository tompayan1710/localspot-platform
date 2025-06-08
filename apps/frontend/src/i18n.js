// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector) // détecte automatiquement la langue du navigateur
  .use(initReactI18next)  // bind avec React
  .init({
    fallbackLng: 'fr', // langue par défaut
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          profile: "Profile",
          logout: "Log out",
          editprofil: "Edit profile"
          // ajoute tes traductions ici
        },
      },
      fr: {
        translation: {
          welcome: "Bienvenue",
          profile: "Profil",
          logout: "Se déconnecter",
          editprofil: "Modifiler le profil"
        },
      },
      it: {
        translation: {
          welcome: "Bienvenue",
          profile: "Italie",
          logout: "Se déconnecter",
          editprofil: "Modifiler le profil"
        },
      },
      de: {
        translation: {
          welcome: "Bienvenue",
          profile: "Allemagne",
          logout: "Se déconnecter",
          editprofil: "Modifiler le profil"
        },
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
