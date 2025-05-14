// ✅ src/TestRefresh.jsx
import React from "react";
const BACKEND_URL=process.env.REACT_APP_API_URL

const TestRefresh = () => {
  const handleTestRefresh = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/refresh-token`, {
        method: "GET",
        credentials: "include" // ✅ Important pour envoyer automatiquement les Cookies (Refresh Token)
      });

      const data = await response.json();
      console.log("Réponse du serveur :", data);

      if (response.ok) {
        alert(`Access Token : ${data.accessToken}`);
        localStorage.setItem("jwtToken", data.accessToken);
      } else {
        alert(`Erreur : ${data.message}`);
      }
    } catch (error) {
      console.error("Erreur de la requête :", error);
      alert("Erreur réseau");
    }
  };

  return (
    <div>
      <h2>Tester le Refresh Token</h2>
      <button onClick={handleTestRefresh}>Tester Refresh Token</button>
    </div>
  );
};

export default TestRefresh;
