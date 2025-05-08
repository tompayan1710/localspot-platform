// Signup.jsx
import React, { useState } from "react";
import { signup, login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Signup() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const response = await signup(email, password);
    setMessage(response.message || response.error);
    
    if (response.message) {
      const loginResponse = await login(email, password);
      if (loginResponse.token) {
        navigate("/profile");
      } else {
        setMessage("Erreur lors de la connexion automatique.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
