// RequireAuth.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./components/Auth/authContext/authContext";

export default function RequireAuth({ children }) {
  const { authState } = useContext(AuthContext);
  const location = useLocation();

  if (authState.loading) return null; // ou <Spinner /> 

  if (!authState.isAuth) {
    
    return <Navigate to="/login" replace state={{ origin: "/", scrollTo: "" }} />;
  }

  return children;
}
