// Profile.jsx
import React, { useEffect, useState } from "react";
import { getProfile, logout } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      if (data.user) {
        setUser(data.user);
        setIsConnected(true);
      } else {
        navigate("/login");
      }
    };
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    setIsConnected(false);
    navigate("/login");
  };

  return (
    <div className="form-container">
      <h2>Profile</h2>
      <div style={{ color: isConnected ? "green" : "red" }}>
        {isConnected ? "🟢 Connecté" : "🔴 Déconnecté"}
      </div>
      {user ? (
        <div>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  );
}
