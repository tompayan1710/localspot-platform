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
          editprofil: "Edit profile",
          Duration: "Duration",
          This_Morning: "This morning",

          //HOME 
          sloganstart: "Unique experiences,",
          sloganend: "close to you!",

          adult: "adult",
          adults: "adults",
          child: "child",
          children: "children",
          infant: "infant",
          infants: "infants",

          Adult:"Adult",
          Child:"Child",
          Infant:"Infant",

          years: "years",
          and_up: "and-up",
          to: "to"
        },
      },
      fr: {
        translation: {
          welcome: "Bienvenue",
          profile: "Profil",
          logout: "Se déconnecter",
          editprofil: "Modifiler le profil",
          Duration: "Duréé",
          This_Morning: "Ce matin",

          //HOME 
          sloganstart: "Des expériences uniques,",
          sloganend: "proche de vous !",

          adult: "adulte",
          adults: "adultes",
          child: "enfant",
          children: "enfants",
          infant: "bébé",
          infants: "bébés",

          Adult:"Adulte",
          Child:"Enfant",
          Infant:"Bébé",

          years: "ans",
          and_up: "et plus",
          to: "à"
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
