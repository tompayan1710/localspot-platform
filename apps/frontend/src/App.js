import React, { createContext } from "react";
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
import TestRefresh from "./pages/test-refresh";




export default function App() {
  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}   
              loadingElement={<div className="skeleton" style={{ width: "100%", height: "100%" }}></div>}
              >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Page principale */}
            <Route path="/" element={<Home />} />

            {/* Espace back-office */}
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/dashboard2" element={<Dashboard2 />} />

            {/* Redirection ou 404 */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            
            <Route path="/test-refresh" element={<TestRefresh />} />

            {/* FIN : catch-all pour tout le reste → 404 client-side */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </LoadScript>
  );
}

//export default App;
