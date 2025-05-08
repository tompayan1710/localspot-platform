// Login.jsx
import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); // null, true ou false

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await login(email, password);

    setLoading(false);

    if (response.success) {
        setIsSuccess(true);
        setMessage("Connexion réussie ✅");
        localStorage.setItem("jwtToken", response.token);
        setTimeout(() => {
            navigate("/profile");
          }, 1000);
    } else {
        setIsSuccess(false);
      setMessage(response.message || "Erreur de connexion.");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Login"}
        </button>      </form>
        {message && <p className={`message ${isSuccess ? "success" : "error"}`}>{message}</p>}
        </div>
  );
}
