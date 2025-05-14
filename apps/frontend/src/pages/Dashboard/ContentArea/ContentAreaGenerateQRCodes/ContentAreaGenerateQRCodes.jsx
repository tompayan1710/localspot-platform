// Profile.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../../../components/Auth/authContext/authContext"


export default function ContentAreaGenerateQRCodes() {
  const navigate = useNavigate();


    const { authState } = useContext(AuthContext);
  
  //   useEffect(() => {
  //   console.log("JE Fait un relog ");
  //   checkAuth();
  // }, []); 

  useEffect(() => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && !authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate("/login");
    }
  }, [authState.loading, authState.isAuth]); // ✅ Suivre loading et isAuth


  

  if (authState.loading) {
    return <div className="SinnerTester"></div>;
  }

  return (
    <>
      {authState.loading ? <div className="SinnerTester"></div> : 
      <div className="profile-container">
      <div className="principalcolumn">   
        <p className="t3">Profile</p>
        <div className="informationscontainer">
          <p>{authState.isAuth ? "Bravo tu est connecté" :"Nullos pas connecté"}</p>
        <p className="t5"><strong>Id:</strong> {authState.user?.id}</p>
        <p className="t5"><strong>Nom:</strong> {authState.user?.first_name} {authState.user?.last_name}</p>
        <p className="t5"><strong>Email:</strong> {authState.user?.email}</p>
        <p className="t5"><strong>Méthode:</strong> {authState.user?.provider}</p>
        </div> 
        <div className="informationscontainer">
          <p className="t5"><strong>Rôle:</strong> {authState.user?.role}</p>
          <p className="t5"><strong>Company ID:</strong> {authState.user?.company_id}</p>
          <p className="t5"><strong>Date de création:</strong> {new Date(authState.user?.created_at).toLocaleDateString()}</p>
        </div>  
        <button className="logout-button">Se déconnecter</button>
        <button className="logout-button">Supprimer le compte</button>
      </div>
    </div>
    }
  </>
  );
}
