import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useRef } from "react";
import Home from "./pages/Home";

import NotFound from "./pages/NotFound";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";

import OfferPage from "./pages/OfferPage/OfferPage";
import CreateOffer from "./pages/CreateOffer/CreateOffer";
import CreateOfferAddress from "./pages/CreateOffer/CreateOfferAddress";
import ContentPolicy from "./pages/DocumentOfficiel/ContentPolicy/ContentPolicy";
import CreateOfferInformations from "./pages/CreateOffer/CreateOfferInformation";
import BecomeProvider from "./pages/BecomeProvider/BecomeProvider";
import BecomeProviderAddInfo from "./pages/BecomeProvider/BecomeProviderAddInfo";
import BecomeProviderAddContact from "./pages/BecomeProvider/BecomeProviderContact";
import EditProfile from "./components/Auth/ProfilPage/EditProfile";
import EditLanguage from "./components/Auth/ProfilPage/EditLanguage/EditLanguage";
import SettingsPage from "./components/Auth/ProfilPage/SettingsPage/SettingsPage";
import Availability from "./pages/OfferPage/Availibility/Availability";
import PaymentPage from "./pages/OfferPage/Payment/PaymentPage";
import BookingSystem from "./components/Auth/ProfilPage/BookingSystem/BookingSystem";
import PrivacyPolicy from "./pages/DocumentOfficiel/PrivacyPolicy/PrivacyPolicy";
import LegalNotice from "./pages/DocumentOfficiel/LegalNotice/LegalNotice";
import TermsAndConditionsOfSale from "./pages/DocumentOfficiel/TermsAndConditionsOfSal/TermsAndConditionsOfSal";
import TermsOfService from "./pages/DocumentOfficiel/TermsOfService/TermsOfService";
import AvailabilityEditor from "./pages/AnnoncePage/AvailabilityEditor/AvailabilityEditor";
import AllAnnoncesPage from "./pages/AnnoncePage/AllAnnoncesPage";
import AnnoncePage from "./pages/AnnoncePage/AnnoncePage/AnnoncePage";
import NavBarTest from "./components/BottomNavBar/NavBarTest";
import PaymentMethode from "./components/Auth/ProfilPage/PaymentMethode/PaymentMethode";
import Today from "./pages/Today/Today";
import Calendar from "./pages/Calendar/Calendar";
import Activity from "./pages/Activity/Activity";
import Restauration from "./pages/Restauration/Restauration";
import ConfirmPaymentPage from "./pages/OfferPage/Payment/ConfirmPaymentPage";
import MyEarnings from "./pages/MyEarnings/MyEarnings";
import ConfirmCreation from "./pages/CreateOffer/ConfirmCreation";
import Reservations from "./pages/Reservations/Reservations";
import ReservationsElement from "./pages/Reservations/ReservationElement/ReservationElement";
import SearchingPage from "./pages/SearchingPage/SearchingPage";
import TestHeight from "./components/TestHeight/TestHeight";
import TestPage from "./components/TestHeight/TestPage";
import TestPageNav from "./components/TestHeight/TestPageNav";
import AddComment from "./pages/Comments/AddComment";
import CurrencyPage from "./components/Auth/ProfilPage/Currency/CurrencyPage";
import NotificationSettings from "./components/Auth/ProfilPage/SettingsPage/NotificationSettings/NotificationSettings";
import FormInfoPayement from "./pages/OfferPage/Payment/FormInfoPayement/FormInfoPayement";

export default function BrowserRouterAll(){
    const location = useLocation();
    const navBarRef = useRef();

    const hideNavBarOnRoutes = [
        // "/",
        "/login",
        "/signup",
        "/booking-system",
        "/settings",
        "/settings/notification",
        "/edit-language",
        "/edit-profile",
        "/become-provider",
        "/payment-methode",
        "/become-provider/add-info",
        "/become-provider/add-contact",
        "/create-offer",
        "/create-offer-address",
        "/create-offer-informations",
        "/legal-notice",
        "/privacy-policy",
        "/terms-of-service",
        "/terms-and-conditions-of-sal",
        "/content-policy",
        "/testpage",
        "/currency"
    ];
    
    //offer-page/b2f3a4ae-6cc4-4353-824e-65de72035d68/availibility
    const hideNavBarPatterns = [
    /^\/offer-page\/[^\/]+\/availibility$/,  // regex pour offer-page/:slug/availibility
    /^\/offer-page\/[^\/]+\/payment$/, 
    /^\/offer-page\/[^\/]+\/add-info$/, 
    /^\/annonces\/[^\/]+\/availability-editor$/, 
    /^\/annonces\/[^\/]+\/confirm-creation$/,
    /^\/reservations\/[^\/]+$/,
    /^\/offer-page\/[^\/]+\/add-comment$/,
    ];

    return(
        <>
        {
            !(hideNavBarOnRoutes.includes(location.pathname) ||
            hideNavBarPatterns.some(pattern => pattern.test(location.pathname))) && <NavBarTest ref={navBarRef}/>
        }
        {/* <TestHeight num={3}/>
        <TestHeight num={4}/> */}
        <Routes>
            {/* Page principale */}
            {/* <BottomNavBarNotAnimate /> */}
            <Route path="/" element={<Home navBarRef={navBarRef}/>} />
            <Route path="/searching-page" element={<SearchingPage />} />
            
            <Route path="/testpage" element={<TestPage />} />
            <Route path="/testpagenav" element={<TestPageNav />} />

            <Route path="/offer-page/:slug" element={<OfferPage />} />
            <Route path="/offer-page/:slug/availibility" element={<Availability />} />
            <Route path="/offer-page/:slug/add-info" element={<FormInfoPayement />} />
            <Route path="/offer-page/:slug/payment" element={<PaymentPage />} />
            <Route path="/confirm-payment" element={<ConfirmPaymentPage />} />
            <Route path="/offer-page/:slug/add-comment" element={<AddComment />} />

            <Route path="/activity" element={<Activity />} />

            <Route path="/restauration" element={<Restauration />} />

            <Route path="/reservations" element={<Reservations />} />
            <Route path="/reservations/:reservation_id" element={<ReservationsElement />} />



            <Route path="/today" element={<Today />} />

            <Route path="/calendar" element={<Calendar />} />
 
            <Route path="/my-earnings" element={<MyEarnings />} />

            <Route path="/annonces" element={<AllAnnoncesPage />} />
            <Route path="/annonces/:slug" element={<AnnoncePage />} />
            <Route path="/annonces/:slug/availability-editor" element={<AvailabilityEditor />} />
            <Route path="/annonces/:slug/confirm-creation" element={<ConfirmCreation />} />


            <Route path="/create-offer" element={<CreateOffer />} />
            <Route path="/create-offer-address" element={<CreateOfferAddress />} />
            <Route path="/create-offer-informations" element={<CreateOfferInformations />} />

            {/* Redirection ou 404 */}
            <Route path="/home" element={<Navigate to="/" replace />} />


            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/edit-language" element={<EditLanguage />} />
            <Route path="/payment-methode" element={<PaymentMethode />} />
            <Route path="/booking-system" element={<BookingSystem />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/settings/notification" element={<NotificationSettings />} />
        

            <Route path="/currency" element={<CurrencyPage />} />
    
            <Route path="/become-provider" element={<BecomeProvider />} />
            <Route path="/become-provider/add-info" element={<BecomeProviderAddInfo/>} />
            <Route path="/become-provider/add-contact" element={<BecomeProviderAddContact/>} />


            <Route path="/content-policy" element={<ContentPolicy />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-and-conditions-of-sal" element={<TermsAndConditionsOfSale />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />

            {/* FIN : catch-all pour tout le reste → 404 client-side */}
            <Route path="*" element={<NotFound />} />
        </Routes>
        </>
    )
}
