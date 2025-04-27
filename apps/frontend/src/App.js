import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Page principale */}
        <Route path="/" element={<Home />} />

        {/* Espace back-office */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirection ou 404 */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        
        {/* FIN : catch-all pour tout le reste → 404 client-side */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

//export default App;
