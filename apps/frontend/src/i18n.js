// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const globalLang = [
  { code: 'fr', label: 'Français' },
  { code: 'en', label: 'English' },
  { code: 'it', label: 'Italiano' },
  { code: 'de', label: 'Deutsch' },
  // tu peux en rajouter d’autres ici plus tard
];

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

          //HOME 
          sloganstart: "Unique experiences,",
          sloganend: "close to you!",

          This_afternoon: "This afternoon",
          This_Morning: "This morning",
          The_most_loved: "The most loved",

          Start_my_search:"Start my search",
          Filters: "Filters",
          Time_of_day: "Time of day",
          Price_range: "Price range",
          Date: "Date",
          No_date_specified: "No date specified",
          Clear_all: "Clear all",

          Categories: "Categories",
          "Nautiques": "Water sports",
          "Culture & Patrimoine": "Culture & Heritage",
          "Bien-être": "Wellness",
          "Nature & Aventure": "Nature & Adventure",
          "Loisirs & Divertissement": "Leisure & Entertainment",
          "Sports & Sensations Fortes": "Sports & Thrills",
          "En Famille": "Family Friendly",
          "Matin":"Morning",
          "Après-midi": "Afternoon",
          "Soir": "Evening",



          //Offer Page
          Duration: "Duration",
          Activite: "Activity",
          //Comment
          No_comment: "No comments for this offer.",
          Customer_Riviews: "Customer Riviews",
          Customer_Para: "After participating in the activity, travelers are invited to share their experience by leaving a comment. These reviews are 100% authentic, written only by participants who have actually had the experience.",
          participants_opinions: "participants' opinions",
          participants_opinions_para: "The comments reflect the feelings of participants who have actually had the experience.",
          "based_on_review": "Based on {{count}} review",
          "based_on_review_plural": "Based on {{count}} reviews",


          //FOOTER
          footer_message: "The offers displayed have undergone rigorous selection and strict quality control, with the aim of providing you with high-quality services.",
          Language: "Language",
          Contact: "Contact",
          Copied: "Copied",

          Legal_resources: "Legal resources",
          Legal_Notice: "Legal Notice",
          Privacy_Policy: "Privacy Policy",
          Terms_Of_Service: "Terms of Service",
          Terms_And_Conditions_Of_Sal: "Terms and Conditions of Sal",
          Content_Policy: "Content policy",
          All_rights_reserved: "All rights reserved",


          //BOTTOM NAV BAR
          Explore: "Explore",
          Favorites: "Favorites",
          Reservations: "Reservations",
          Today: "Today",
          Calendar: "Calendar",
          Listings: "Listings",
          Payments: "Payments",
          Profile: "Profile",



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
          to: "to",

          Apply: "Apply",
          Add: "Add",
          See: "See",
        },
      },
      fr: {
        translation: {
          welcome: "Bienvenue",
          profile: "Profil",
          logout: "Se déconnecter",
          editprofil: "Modifiler le profil",

          //HOME 
          sloganstart: "Des expériences uniques,",
          sloganend: "proche de vous !",

          This_afternoon: "This afternoon",
          This_Morning: "Ce matin",
          The_most_loved: "Les plus aimées",

          Start_my_search:"Commencer ma recherche",
          Filters: "Filtres",
          Time_of_day: "Moment de la journée",
          Price_range: "Tranche de prix",
          Date: "Date",
          No_date_specified: "Aucun date spécifié",
          Clear_all: "Effacer tout",


          Categories: "Catégories",
          "Nautiques": "Nautiques",
          "Culture & Patrimoine": "Culture & Patrimoine",
          "Bien-être": "Bien-être",
          "Nature & Aventure": "Nature & Aventure",
          "Loisirs & Divertissement": "Loisirs & Divertissement",
          "Sports & Sensations Fortes": "Sports & Sensations Fortes",
          "En Famille": "En Famille",
          "Matin":"Matin",
          "Après-midi": "Après-midi",
          "Soir": "Soir",


          //Offer Page
          Duration: "Duréé",
          Activite: "Activité",
          //Comments
          No_comment: "Aucun commentaire pour cette offre.",
          Customer_Riviews: "Avis des clients",
          Customer_Para:"Après avoir participé à l’activité, les voyageurs sont invités à partager leur expérience en laissant un commentaire. Ces avis sont 100 % authentiques, rédigés uniquement par les participants ayant réellement vécu l’expérience.",
          participants_opinions: "les avis des participants",
          participants_opinions_para: "Les commentaires reflètent les ressentis de participants ayant réellement vécu l’expérience.",
          "based_on_review": "Basé sur {{count}} avis",


          //FOOTER
          footer_message: "Les offres affichées ont fait l'objet d'une sélection rigoureuse et d’un contrôle qualité strict, dans le but de vous proposer des prestations de grande qualité.",
          Language: "Langue",
          Contact: "Contact",
          Copied: "Copié",

          Legal_resources: "Ressources légales",
          Legal_Notice: "Mentions légales",
          Privacy_Policy: "Politique de confidentialité",
          Terms_Of_Service: "Conditions Générales d’Utilisation",
          Terms_And_Conditions_Of_Sal: "Conditions Générales de Vente",
          Content_Policy: "Politique de contenu",
          All_rights_reserved: "Tous droits réservés",


          //BOTTOM NAV BAR
          Explore: "Explorer",
          Favorites: "Favoris",
          Reservations: "Reservations",
          Today: "Aujourd'hui",
          Calendar: "Calendrier",
          Listings: "Annonces",
          Payments: "Paiements",
          Profile: "Profil",


          //ALL


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
          to: "à",

          Apply: "Appliquer",
          Add: "Ajouter",
          See: "Voir",
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
