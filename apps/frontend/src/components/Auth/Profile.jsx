// Profile.jsx
import { useEffect, useContext } from "react";
import { deleteAccount } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "./authContext/authContext"
import Spinner from "../Spinner/Spinner";

export default function Profile() {
  const navigate = useNavigate();


    const { authState, logout } = useContext(AuthContext);


 
    
  useEffect(() => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && !authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate("/login");
    }
  }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth




  
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleDelete = () => {
    deleteAccount();
    navigate("/login");
  }


  

  if (authState.loading) {
    return <div className="SinnerTester"></div>;
  }

  return (
    <>
      {authState.loading ? <Spinner centerPage={true}/> : 
      <div className="profile-container">
        <div className="principalcolumn">   

          <p className="t2">Profile</p>
          <p className="t4">Mes offres</p>
          <div className="ProfileOfferContainer">
            <div className="ProfileOfferItem">
              <div className="ProfileOfferImg"></div>
              <div className="ProfileOfferTitle"></div>
              <div className="ProfileOfferDescription"></div>
              <div className="ProfileOfferComplement"></div>
              <div className="ProfileOfferPrice"></div>
            </div>
            <div className="ProfileOfferItem">
              <div className="ProfileOfferImg"></div>
              <div className="ProfileOfferTitle"></div>
              <div className="ProfileOfferTitle"></div>
            </div>
          </div>
          <button className="ProfileAddOffertContainer" onClick={() => {navigate("/create-offer")}}>
            Ajouter une offre
          </button>
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
          <button className="logout-button" onClick={() => navigate("/become-provider")}>Devenir prestataire</button>

          <button className="logout-button" onClick={handleLogout}>Se déconnecter</button>
          <button className="logout-button" onClick={handleDelete}>Supprimer le compte</button>
        </div>
      </div>
      }
  </>
  );
}
