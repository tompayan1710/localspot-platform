// import React, { createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import NotFound from "./pages/NotFound";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";
import AuthProvider from "./components/Auth/authContext/authProvider";
import { LoadScript } from "@react-google-maps/api";
import OfferPage from "./pages/OfferPage/OfferPage";
import ProfilScan from "./pages/Profil/ProfilScan";
import CreateOffer from "./pages/CreateOffer/CreateOffer";
import CreateOfferAddress from "./pages/CreateOffer/CreateOfferAddress";
import ContentPolicy from "./pages/DocumentOfficiel/ContentPolicy/ContentPolicy";
import TestSortable from "./pages/TestSortable";
import CreateOfferInformations from "./pages/CreateOffer/CreateOfferInformation";


//Pour sauvegarder : pg_dump "postgresql://postgres:TomPayan-1710@localhost:5432/localspot" -f viarte_backup.sql
//Pour restaurer : psql "postgresql://postgres:TomPayan-1710@localhost:5432/localspot" < viarte_backup.sql


//Pour se connecter : psql "postgresql://localspot_db_user:L9F2Y94DgXgIJmseoNngbbo0Hajqidlr@dpg-d058idc9c44c738g2kt0-a.oregon-postgres.render.com/localspot_db"
/*
Pour tout supprimer : (pas les types personnalisé, les dommaines et autres)

DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN (
        SELECT tablename FROM pg_tables
        WHERE schemaname = 'public'
    ) LOOP
        EXECUTE 'DROP TABLE IF EXISTS ' || quote_ident(r.tablename) || ' CASCADE';
    END LOOP;
END $$;
*/
//Pour envoyer depuis cmd : psql "postgresql://localspot_db_user:L9F2Y94DgXgIJmseoNngbbo0Hajqidlr@dpg-d058idc9c44c738g2kt0-a.oregon-postgres.render.com/localspot_db" < viarte_backup.sql

const LIBRARIES = ["places"];


export default function App() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}   
              loadingElement={<div className="skeleton" style={{ width: "100%", height: "100%" }}></div>}
              libraries={LIBRARIES}
              >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Page principale */}
            
            <Route path="/" element={<Home />} />
            <Route path="/offer-page/:slug" element={<OfferPage />} />



            <Route path="/test-sortable" element={<TestSortable />} />

            <Route path="/create-offer" element={<CreateOffer />} />
            <Route path="/create-offer-address" element={<CreateOfferAddress />} />
            <Route path="/create-offer-informations" element={<CreateOfferInformations />} />

            {/* Espace back-office */}
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/dashboard2" element={<Dashboard2 />} />

            {/* Redirection ou 404 */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profilscan" element={<ProfilScan />} />
            

            <Route path="/content-policy" element={<ContentPolicy />} />

            {/* FIN : catch-all pour tout le reste → 404 client-side */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoadScript>
  );
}

//export default App;
