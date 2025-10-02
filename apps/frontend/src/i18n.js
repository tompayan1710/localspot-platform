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
          Starting_at: "Starting at",
          per_person: "per person",
          See_availability: "See availability",
          Select_participants: "Select participants",
          //Availibility
          Verify_your_personal_information: "Verify your personal information",
          Fast_and_secure_booking: "Fast and secure booking",
          Full_name: "Full name",
          Email: "Email",
          Phone_number: "Phone number",
          Enter_your_number: "Enter your number",
          Phone_info: "Your number will only be used in case of important changes regarding your booking.",
          Next: "Next",
          Name_will_be_used_for_booking: "The indicated name will be used for the entire booking and associated with all participants.",
          //Payement
          Informations: "Informations",
          Payment: "Payment",
          Select_a_payment_method: "Select a payment method",
          Confirm_and_pay: "Confirm and pay",
          //Confirm Payment 
          Reservation_received: "Your reservation has been received",
          Reservation_email_ticket: "You will receive an email with your reservation ticket",
          Back_to_home: "Back to home",
          View_my_reservations: "View my reservations",

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


          //Not found
          not_found_title: "Page not found",
          not_found_description: "The page you are looking for does not exist or has been moved.",
          back_to_home: "Back to home page",


          //Add Comment 
          Restricted_access: "Restricted access",
          Restricted_access_description: "You must be logged in to leave a comment on your activity.",
          Restricted_access_button: "Log in",

          No_reservation_found: "No reservation found",
          No_reservation_found_description: "You need to book an activity before you can leave a review.",
          No_reservation_found_button: "See offers",

          Already_commented: "Review already posted",
          Already_commented_description: "You have already left a review for this activity. Only one review is allowed per booking.",
          Already_commented_button: "See offers",

          Rate_your_experience: "Rate your experience",
          Rate_experience_question: "How would you rate your business",
          Share_more_question: "Would you like to share more details",
          Describe_your_experience_here: "Describe your experience here",
          Remain_respectful_text: "Offensive, abusive, or inappropriate comments are not permitted. Please remain respectful.",
          Send_my_review: "Send my review",





          //Reservations 
          Reservations: "Reservations",
          Participant: "Participant",
          Participants: "Participants",

          //Ticket
          Reservation: "Reservation",
          Done_at: "Done at",
          Activity: "Activity",
          Start: "Start",
          Address: "Address",
          Client: "Client",
          Email: "Email",
          Phone: "Phone",
          Payment: "Payment",
          Payment_status: "Payment status",
          TOTAL: "TOTAL",
          all_taxes_included: "(all taxes included)",
          Thank_you: "Thank you!",
          Your_ticket_has_been_issued: "Your ticket has been issued successfully",
          Transaction_details: "Transaction details",
          text_entrance_scan: "This digital ticket can be scanned at the entrance.",
          not_specified: "not specified",
          Download_receipt: "Download receipt",


          //Profile
          Personal_account: "Personal account",
          View_profile: "View profile",
          Easily_manage_your_activities: "Easily manage your activities, track your reservations, and update your offers in real time.",
          View_my_listings: "View my listings",
          one_month: "1 month",
          cours_weekend: "Camille has a class scheduled <br/> this weekend.",
          Discover_best_activities_near: "Discover the best activities near you, with ease.",
          Search_for_listings: "Search for listings",
          Profil_validation_description: "Your service provider profile is currently being validated. You will be notified as soon as it is activated.",
          Become_provider: "Become provider",
          Request_processed_within: "Your request will be processed within 24 hours and we will respond promptly.",
          Languages: "Languages",
          Settings: "Settings",
          Account_settings: "Account settings",
          Languages: "Languages",
          Currency: "Currency",
          Booking_system: "Booking system",
          Payment_methods: "Payment methods",
          Log_out: "Log out",

          Switch_to_traveler_mode: "Switch to traveler mode",
          Switch_to_provider_mode: "Switch to provider mode",

          General: "General",
          Notifications: "Notifications",
          Documents: "Documents",
          Email: "Email",
          Reservation_emails: "Reservation emails",
          Reservation_emails_description: "Receive your booking details automatically: schedules, tickets, contacts, and practical information.",
          Suggestions_for_activities: "Suggestions for activities",
          Suggestions_for_activities_description: "Enjoy offers recommended especially for you, based on your destination and the time of your stay.",

          Only_euro_text: "The euro (€) is currently the only currency accepted for payments. Support for other currencies will be available soon.",
          Payout_method: "Payout method",
          Add_a_payout_method: "Add a payout method",
          Add_a_payout_method_description: "Adding a payment method allows you to receive your winnings.",



          //Payout
          Account_holder: "Account holder",
          SWIFT_BIC_code: "SWIFT/BIC code",
          Optional_for_European_accounts: "Optional for European accounts (SEPA)",
          Ensure_accurate_info: "Ensure that the information entered is accurate before confirming.",
          IBAN_text: "The IBAN (International Bank Account Number) identifies your bank account. It appears on your bank account details (RIB).",
          IBAN_number: "IBAN number",
          Confirm_the_IBAN_number: "Confirm the IBAN number",
          Please_fill_in_holder_name: "Please fill in the account holder's first and last name.",
          Enter_account_holder_name: "Enter the account holder's name",
          Who_owns_the_account: "Who owns the account?",
          Holder_name_info: "The name entered will be linked to the payment made through this payout method.",
          Enter_bank_details: "Please enter your bank details",
          SWIFT_explanation: "The SWIFT (or BIC) code identifies your bank internationally. It usually has 8 or 11 alphanumeric characters.",
          Confirm_deletion_payout: "Do you confirm the deletion of this payment method?",
          Confirm_deletion_payout_text: "This method will no longer be available once deleted, but you can add a new one at any time if necessary.",




          //Availibility 
          select_date_and_slot: "Select a date and a time slot",
          select_date_and_slot_subtitle: "Indicate when you would like to take part in this activity. The available slots will automatically adapt.",
          available_slots: "Available slots:",
          too_far_date: "You can only book up to one month in advance",
          no_slot_available: "No slots are available for this day.",
          free_cancellation_deadline: "Free cancellation deadline:",
          participants: "Participants",
          modify: "Edit",
          TOTAL: "TOTAL",
          Next: "Next",
          Add_participants: "Add participants",
          does_not_count_capacity: "do not count towards capacity.",
          login_or_signup: "Log in or sign up to continue",
          please_accept_terms: "Please accept the terms and conditions to continue",
          terms_accept_text: "To finalize your booking, you must accept our terms of use and terms of sale.",
          terms_continue: "By continuing, you agree to our",
          terms_of_service: "Terms of Service",
          terms_of_sale: "Terms of Sale",
          full: "FULL",
          currently_remaining: "Currently remaining:",
          too_many_people: "You are too many.",
          years: "years",
          and_up: "and up",
          all_ages: "All ages",
          places: "places",


          //My-earnings
          Earnings_: "Earnings:",
          Available_earnings: "Available earnings:",
          Withdraw_my_earnings: "Withdraw my earnings",
          Withdrawal_notice: "Once the transfer is complete, a payment confirmation will be sent to you by email.",
          Receive_my_payments: "Receive my payments",
          Provide_withdrawal_method: "To receive your earnings, please provide a valid withdrawal method.",
          Configure_withdrawal_account: "Set up a withdrawal account",
          History: "History",
          See_more: "see more",
          No_transactions_yet: "No transactions yet",
          No_transactions_message: "Your transaction history will appear here as soon as a transaction is made.",
          See_my_offers: "See my offers",
          View_more: "View more",
          Transaction_received: "received",
          Transaction_withdrawal: "withdrawal",
          Places_sold: "{{total_reserved}} tickets sold - {{start_hour}} to {{end_hour}}",
          Withdrawal_via: "Withdrawal via bank transfer",
          received: "received",
          withdrawal: "withdrawal",
          Withdrawal: "Withdrawal",
          // Transaction-Info
          Earning: "Earning",
          Payout: "Withdrawal",
          Reference: "Reference",
          Total_amount_received: "Total amount received",
          Received_on: "Received on",
          Title: "Title",
          Duration: "Duration",
          Status: "Status",
          Start: "Start",
          End: "End",
          Reserved_by: "Reserved by",
          Phone: "Phone",
          See_reservation: "See reservation",
          Total_amount: "Total amount",
          Hotel_commission: "Hotel commission",
          Platform_commission: "Viarte commission",
          Total_withdrawal_amount: "Total withdrawal amount",
          Sender: "Sender",
          Viarte_account: "Viarte Account",
          Beneficiary: "Beneficiary",
          Method: "Method",
          Issued_on: "Issued on",
          Sent_on: "Sent on",
          Last_name: "Last name",
          First_name: "First name",
          Details: "Details",
          Payout_of: "Payout of",
          Your_transactions_are_safe: "Your transactions are safe.",
          Learn_more: "Learn more",
          Secured_by: "Secured by",
          Full: "Full",
          Available: "Available",
          Waiting: "Waiting",
          Sent: "Sent",
          Failed: "Failed",





          //Payout-Request
          Withdraw_my_earnings: "Withdraw my earnings",
          My_balance: "My balance",
          Pending: "Pending",
          Already_withdrawn: "Already withdrawn",
          Payout_method: "Payout method",
          Amount: "Amount",
          Custom_amount: "Custom amount",
          Available_max: "Maximum available amount: {{max}}",
          Error_min: "The amount cannot be less than {{min}} €",
          Error_max: "The amount cannot exceed {{max}} €",
          Security_limit: "For security reasons, the maximum amount allowed per transfer is €3000.",


          //Calendar
          Choose_a_date: "Choose a date",
          Reservations: "Reservations",
          Full_in_brackets: "(FULL)",
          Currently_no_reservations: "Currently no reservations",
          You_can_allow_last_minute: "You can allow customers to book up to 1 hour before the activity starts. This way you can capture last-minute clients",
          Travelers_cannot_book_more_than_30_days: "Travelers cannot book an activity more than 30 days in advance.",
          Today: "Today",
          Ongoing: "Ongoing",
          Upcoming: "Upcoming",
          //Today
          Currently_no_reservations_today: "No reservations for today.",
          See_my_earnings: "See my earnings",
          Ongoing: "Ongoing",
          Upcoming: "Upcoming",
          Completed: "Completed",

          //Listings
          My_listings: "My listings",
          No_offers: "No offers",
          Add_a_listing: "Add a listing",

          //Alert
          Please_fill_in_holder_name: "Please fill in the first and last name of the account holder.",
          The_phone_number_is_invalid: "The phone number is invalid",
          No_changes_detected: "No changes detected.",
          Profile_updated_successfully: "Profile updated successfully!",
          Error_updating_profile: "Error updating profile.",
          Server_error: "Server error.",

          //ALL
          adult: "adult",
          adults: "adults",
          child: "child",
          children: "children",
          infant: "infant",
          infants: "infants",

          Adult:"Adult",
          Adults:"Adults",
          Child:"Child",
          Children:"Children",
          Infant:"Infant",
          Infants:"Infants",

          Last_name: "Last name",
          First_name: "First name",

          years: "years",
          and_up: "and-up",
          to: "to",
          at: "at",

          Apply: "Apply",
          Add: "Add",
          See: "See",
          Save: "Save",
          Edit: "Edit",
          Cancel: "Cancel",
          delete: "delete",
          Delete: "Delete",
          Continue: "Continue",

          return: "return",
          back: "back",

          My_reservations: "My reservations",
          Account: "Account",
          Login: "Login",
          Related_Email: "Related Email",
          Full_name: "Full name",
          Enter_your_number: "Enter your number",
          pending: "pending",
          confirmed: "confirmed",
          canceled: "canceled",

          Total: "Total",
          Send: "Send",
          See_also: "See also",
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
          Starting_at: "À partir de",
          per_person: "par personne",
          See_availability: "Voir les disponnibilités",
          Select_participants: "Sélectionner les participants",
          //Availibility
          Verify_your_personal_information: "Vérifier vos informations personnels",
          Fast_and_secure_booking: "Réservation rapide et sécurisée",
          Full_name: "Nom complet",
          Email: "E-mail",
          Phone_number: "Numéro de téléphone",
          Enter_your_number: "Entrez votre numéro",
          Phone_info: "Votre numéro sera utilisé uniquement en cas de changements importants concernant votre réservation.",
          Next: "Suivant",
          Name_will_be_used_for_booking: "Le nom indiqué sera utilisé pour toute la réservation et sera associé à tous les participants.",
          //Payement
          Informations: "Informations",
          Payment: "Paiement",
          Select_a_payment_method: "Sélectionnez un moyen de payement",
          Confirm_and_pay: "Confirmer et payer",
          //Confirm Payment
          Reservation_received: "Your reservation has been received",
          Reservation_email_ticket: "You will receive an email with your reservation ticket",
          Back_to_home: "Back to home",
          View_my_reservations: "View my reservations",
          //Confirm Payment
          Reservation_received: "Votre réservation a bien été reçue",
          Reservation_email_ticket: "Vous recevrez un e-mail avec votre ticket de réservation",
          Back_to_home: "Retour à l’accueil",
          View_my_reservations: "Voir mes réservations",

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



          //Not found
          not_found_title: "Page introuvable",
          not_found_description: "La page que vous cherchez n’existe pas ou a été déplacée.",
          back_to_home: "Revenir à l'acceuil",


          //Add Comment
          Restricted_access: "Accès restreint",
          Restricted_access_description: "Vous devez être connecté pour laisser un commentaire sur votre activité.",
          Restricted_access_button: "Se connecter",

          No_reservation_found: "Aucune réservation trouvée",
          No_reservation_found_description: "Vous devez réserver une activité avant de pouvoir partager un avis.",
          No_reservation_found_button: "Voir les offres",

          Already_commented: "Avis déjà publié",
          Already_commented_description: "Vous avez déjà laissé un commentaire pour cette activité. Un seul avis est autorisé par réservation.",
          Already_commented_button: "Voir les offres",

          Rate_your_experience: "Notez votre expérience",
          Rate_experience_question: "Comment évalueriez-vous votre activité",
          Share_more_question: "Vous souhaitez partager plus de détails",
          Describe_your_experience_here: "Décrivez votre expérience ici...",
          Remain_respectful_text: "Les propos offensants, injurieux ou inappropriés ne sont pas autorisés. Merci de rester respectueux.",
          Send_my_review: "Envoyer mon avis",

          //Reservations 
          Reservations: "Réservations",
          Participant: "Participant",
          Participants: "Participants",

          //Ticket
          Reservation: "Réservation",
          Done_at: "Effectué le",
          Activity: "Activité",
          Start: "Début",
          Address: "Adresse",
          Client: "Client",
          Email: "Email",
          Phone: "Téléphone",
          Payment: "Paiement",
          Payment_status: "Statut du paiement",
          TOTAL: "TOTAL",
          all_taxes_included: "(toutes taxes comprises)",
          Thank_you: "Merci !",
          Your_ticket_has_been_issued: "Votre billet a été émis avec succès",
          Transaction_details: "Détails de la transaction",
          text_entrance_scan: "Ce ticket numérique peut être scanné à l’entrée.",
          not_specified: "non renseigné",
          Download_receipt: "Télécharger le reçu",




          //Profile
          Personal_account: "Compte personnel",
          View_profile: "Voir le profile",
          Easily_manage_your_activities: "Gérez facilement vos activités, suivez vos réservations et mettez à jour vos offres en temps réel.",
          View_my_listings: "Voir mes annonces",
          one_month: "1 mois",
          cours_weekend: "Camille a un cours prévu <br/> ce week-end",
          Discover_best_activities_near: "Découvrez les meilleures activités autour de vous, en toute simplicité.",
          Search_for_listings: "Recherchez des annonces",
          Profil_validation_description: "Votre profil prestataire est en cours de validation. Vous serez notifié dès son activation",
          Become_provider: "Devenir prestataire",
          Request_processed_within: "Votre demande sera traitée sous 24h et notre réponse vous sera rapidement communiquée.",
          Settings: "Paramètres",
          Account_settings: "Paramètres du compte",
          Languages: "Langues",
          Currency: "Monnaie",
          Booking_system: "Système de réservation",
          Payment_methods: "Modes de paiement",
          Log_out: "Déconnexion",
          Switch_to_traveler_mode: "Basculer en mode voyageur",
          Switch_to_provider_mode: "Basculer en mode prestataire",
          General: "Général",
          Notifications: "Notifications",
          Documents: "Documents",
          Email: "Email",
          Reservation_emails: "Emails de réservation",
          Reservation_emails_description: "Recevez automatiquement les détails de vos réservations : horaires, tickets, contacts et informations pratiques.",
          Suggestions_for_activities: "Suggestions d'activités",
          Suggestions_for_activities_description: "Profitez d’offres recommandées spécialement pour vous, en fonction de votre destination et du moment de votre séjour.",
          Only_euro_text: "L’euro (€) est actuellement la seule devise acceptée pour les paiements. Le support d'autres devises sera bientôt disponible.",
          Payout_method: "Methode de versements",
          Add_a_payout_method: "Ajouter un mode de versement",
          Add_a_payout_method_description: "Ajouter mode de versement vous permet de recevoir vos gains.",

          //Payout
          Account_holder: "Titulaire du compte",
          SWIFT_BIC_code: "code SWIFT/BIC",
          Optional_for_European_accounts: "Facultatif pour les comptes européens (SEPA)",
          Ensure_accurate_info: "Assurez-vous que les informations saisies sont exactes avant de valider.",
          IBAN_text: "Le numéro IBAN (International Bank Account Number) identifie votre compte bancaire. Il figure sur votre relevé d’identité bancaire (RIB).",
          IBAN_number: "Numéro IBAN",
          Confirm_the_IBAN_number: "Confirmez le numéro IBAN",
          Please_fill_in_holder_name: "Veuillez remplir le nom et le prénom du titulaire.",
          Enter_account_holder_name: "Indiquez le nom du titulaire du compte",
          Who_owns_the_account: "À qui appartient le compte ?",
          Holder_name_info: "Le nom indiqué sera celui rattaché au paiement effectué via cette méthode de versement.",
          Enter_bank_details: "Veuillez saisir vos coordonnées bancaires",
          SWIFT_explanation: "Le code SWIFT (ou BIC) permet d’identifier votre établissement bancaire à l’international. Il comporte généralement 8 ou 11 caractères alphanumériques.",
          Confirm_deletion_payout: "Confirmez vous la suppression de ce mode de versement ?",
          Confirm_deletion_payout_text: "Cette méthode ne sera plus disponible une fois supprimée, mais vous pourrez en ajouter une nouvelle à tout moment si nécessaire.",


          //Availibility
          select_date_and_slot: "Sélectionnez une date et un créneau",
          select_date_and_slot_subtitle: "Indiquez quand vous souhaitez participer à cette activité. Les créneaux disponibles s’adapteront automatiquement.",
          available_slots: "Créneaux disponibles :",
          too_far_date: "Vous ne pouvez réserver qu'un mois à l'avance",
          no_slot_available: "Aucun créneau n'est disponible pour ce jour.",
          free_cancellation_deadline: "Date limite d’annulation gratuite :",
          participants: "Participants",
          modify: "Modifier",
          total: "TOTAL",
          Next: "Suivant",
          Add_participants: "Ajouter des participants",
          does_not_count_capacity: "n’occupent pas de place.",
          login_or_signup: "Connectez-vous ou inscrivez-vous pour continuer",
          please_accept_terms: "Veuillez accepter les conditions générales pour continuer",
          terms_accept_text: "Pour finaliser votre réservation, vous devez accepter nos conditions générales d’utilisation et de vente.",
          terms_continue: "En poursuivant, vous acceptez nos",
          terms_of_service: "Conditions Générales d’Utilisation",
          terms_of_sale: "Conditions Générales de Vente",
          full: "COMPLET",
          currently_remaining: "Il reste actuellement :",
          too_many_people: "Vous êtes trop nombreux.",
          years: "ans",
          and_up: "et plus",
          all_ages: "Tous âges",
          places: "places",

          //My-Earning
          Earnings_: "Revenus :",
          Available_earnings: "Available_earnings:",
          Withdraw_my_earnings: "Retirer mes gains",
          Withdrawal_notice: "À l’issue du virement, une attestation de virement vous sera envoyée par e-mail.",
          Receive_my_payments: "Recevoir mes paiements",
          Provide_withdrawal_method: "Afin de recevoir vos gains, merci de renseigner un mode de versement valide.",
          Configure_withdrawal_account: "Configurer un compte de versement",
          History: "Historique",
          See_more: "voir plus",
          No_transactions_yet: "Actuellement aucune transaction",
          No_transactions_message: "Votre historique de transaction sera visible ici dès qu’une transaction aura été effectuée.",
          See_my_offers: "Voir mes annonces",
          View_more: "Voir plus",
          Transaction_received: "reçu",
          Transaction_withdrawal: "retrait",
          Places_sold: "{{total_reserved}} places vendues - {{start_hour}} à {{end_hour}}",
          Withdrawal_via: "Retrait via versement",
          received: "reçu",
          withdrawal: "retrait",
          Withdrawal: "Retrait",
          //Transaction-Info
          Earning: "Encaissement",
          Payout: "Retrait",
          Reference: "Référence",
          Total_amount_received: "Montant total encaissé",
          Received_on: "Encaissé le",
          Title: "Titre",
          Duration: "Durée",
          Status: "Statut",
          Start: "Début",
          End: "Fin",
          Reserved_by: "Réservé par",
          Phone: "Téléphone",
          See_reservation: "Voir la réservation",
          Total_amount: "Montant total",
          Hotel_commission: "Commission hôtel",
          Platform_commission: "Commission Viarte",
          Total_withdrawal_amount: "Montant total du retrait",
          Sender: "Émetteur",
          Viarte_account: "COMPTE Viarte",
          Beneficiary: "Bénéficiaire",
          Method: "Méthode",
          Issued_on: "Émis le",
          Sent_on: "Envoyé le",
          Last_name: "Nom",
          First_name: "Prénom",
          Details: "Détails",
          Payout_of: "Versement de",
          Your_transactions_are_safe: "Vos transactions en toute sérénité.",
          Learn_more: "En savoir plus",
          Secured_by: "Sécurisé par",
          Full: "Complet",
          Available: "Places disponibles",
          Waiting: "En attente",
          Sent: "Envoyé",
          Failed: "Échoué",
          //all-history-transactions
          History: "Historique",
          Currently_no_transactions : "Actuellement aucune transactions",
          Your_transaction_history_will_be_visible: "Your transaction history will be visible here as soon as a transaction has been completed",

          //Payout-Request
          Withdraw_my_earnings: "Retirer mes gains",
          My_balance: "Mon solde",
          Pending: "En attente",
          Already_withdrawn: "Déjà retiré",
          Payout_method: "Mode de versement",
          Amount: "Montant",
          Custom_amount: "Personnalisé",
          Available_max: "Montant maximum disponible : {{max}}",
          Error_min: "Le montant ne peut pas être inférieur à {{min}} €",
          Error_max: "Le montant ne peut pas dépasser {{max}} €",
          Security_limit: "Pour des raisons de sécurité, le montant maximum autorisé par virement est de {{max}} €.",


          //Calendar
          Choose_a_date: "Choisissez une date",
          Reservations: "Réservations",
          Full_in_brackets: "(COMPLET)",
          Currently_no_reservations: "Actuellement aucune réservation",
          You_can_allow_last_minute: "Vous pouvez permettre aux clients de réserver jusqu’à 1 heure avant le début de l’activité. Grâce à cela capter les clients de dernière minutes",
          Travelers_cannot_book_more_than_30_days: "Les voyageurs ne peuvent pas réserver une activité plus de 30 jours à l’avance.",
          Today: "Aujourd'hui",
          Ongoing: "En cours",
          Upcoming: "Bientôt", 
          //Today
          Currently_no_reservations_today: "Aucune réservations pour aujourd'hui.",
          See_my_earnings: "Voir mes revenus",
          Ongoing: "En cours",
          Upcoming: "Bientôt",
          Completed: "Terminé",

          //Listings
          My_listings: "Mes annonces",
          No_offers: "Aucune offres",
          Add_a_listing: "Ajouter une annonce",


          //Alert
          Please_fill_in_holder_name: "Veuillez remplir le nom et le prénom du titulaire.",
          The_phone_number_is_invalid: "Le numéro de téléphone est invalide",
          No_changes_detected: "Aucune modification détectée.",
          Profile_updated_successfully: "Profil mis à jour !",
          Error_updating_profile: "Erreur lors de la mise à jour.",
          Server_error: "Erreur serveur.",

          //ALL
          adult: "adulte",
          adults: "adultes",
          child: "enfant",
          children: "enfants",
          infant: "bébé",
          infants: "bébés",

          Adult:"Adulte",
          Adults:"Adultes",
          Child:"Enfant",
          Children:"Enfants",
          Infant:"Bébé",
          Infants:"Bébés",

          Last_name: "Nom",
          First_name: "Prénom",

          years: "ans",
          and_up: "et plus",
          to: "à",
          at: "à",

          Apply: "Appliquer",
          Add: "Ajouter",
          See: "Voir",
          Save: "Enregistrer",
          Edit: "Modifier",
          Cancel: "Annuler",
          delete: "supprimer",
          Delete: "Supprimer",
          Continue: "Continue",
          return: "revenir",
          back: "retour",

          My_reservations: "Mes réservations",
          Account: "Compte",
          Login: "Connexion",
          Related_Email: "Email associé",
          Full_name: "Nom complet",
          Enter_your_number: "Entrez votre numéro",
          pending: "en attente",
          confirmed: "confirmé",
          canceled: "annulé",

          Total: "Total",
          Send: "Envoyer",
          See_also: "À voir aussi"
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
