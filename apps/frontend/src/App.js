import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Dashboard2 from "./pages/Dashboard2";
import NotFound from "./pages/NotFound";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Profile from "./components/Auth/Profile";

export default function App() {
  return (
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
        
        {/* FIN : catch-all pour tout le reste → 404 client-side */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

//export default App;
