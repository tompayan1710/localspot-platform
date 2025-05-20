// Profile.jsx
import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { AuthContext } from "../../../../components/Auth/authContext/authContext";
import Spinner from "../../../../components/Spinner/Spinner";
import crossiconBlack from "../../../../assets/images/crossiconBlack.png"
import ListEmplacementsActif from "../../../../components/ListEmplacementsActif/ListEmplacementsActif";


export default function ContentAreaGenerateQRCodes({markers, loading, error}) {
  const navigate = useNavigate();
  const [OpenGenerate, setOpenGenerate] = useState(false);

  const { authState } = useContext(AuthContext);

  useEffect(() => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn(
      "ACTUELLEMENT mon loading est :",
      authState.loading,
      " IsAuth :",
      authState.isAuth
    );
    if (!authState.loading && !authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate("/login");
    }
  }, [authState.loading, authState.isAuth, navigate]); // ✅ Suivre loading et isAuth

  const toggleOpen = () => {
    setOpenGenerate((prev) => !prev);
  };

  if (authState.loading) {
    return <Spinner centerPage={true} />;
  }

  return (
    <div className="GenerateQRCodesContainer">
      <p className="t3">Mes Offres</p>

      
      <button className="generateQrcode" onClick={toggleOpen}>Toggle QR Code</button>

      <ListEmplacementsActif markers={markers} loading={loading} error={error}></ListEmplacementsActif>
      
      {OpenGenerate && (
        <div className="genqrGreyOverlay">
          <form className="genqrContainer" method="POST" action={`${process.env.REACT_APP_API_URL}/generate`}>
            <button className="closeButton" onClick={toggleOpen}><img src={crossiconBlack} alt="close button"/></button>
            <h2 className="genqrtitle t3">Générer un QR Code</h2>
            <div className="hline"></div>
            <div className="genqrContent">
              <label><label>URL à rediriger :</label></label>
              <input type="text" name="url" placeholder="https://tomsites.fr/" className="genqrInput" />
              <label>ID du présentoir (display_id) :</label>
              <input type="text" name="display_id" placeholder="1" className="genqrInput" />
              <label>ID de la catégorie (category_id) :</label>
              <input type="text" name="category_id" placeholder="1" className="genqrInput" />
              <label>Nom de l’offre (slug personnalisé) :</label>
              <input type="text" name="slug" placeholder="myslug" className="genqrInput" />
              {/* <select className="genqrInput">
                <option>Priority</option>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select> */}
              <button type="submit">Générer</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
