import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import GoBack from "../../components/GoBack/GoBack";
import "./AddVersement.css";

export default function AddTitulaireForm() {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  const handleContinue = () => {
    if (name.trim() && last_name.trim()) {
      const origin = location.state.origin || "/"
      navigate("/versement/new/iban", {
        state: {
          name,
          last_name,
          origin
        }
      });
    } else {
      // Optionnel : message d’erreur si les champs sont vides
      alert("Veuillez remplir le nom et le prénom du titulaire.");
    }
  };

  return (
    <div className="AddVersement">
        <GoBack nagigation={"/payout-request"} scrollTo={""} text={"retour"} />

        <p className="t3 bold">Indiquez le nom du titulaire du compte</p>

        <div className="bodyVersement">
            <p className="t5">À qui appartient le compte ?</p>

            <div className="row">
                <input
                name="name"
                className="InputText"
                placeholder="Nom"
                value={name}
                onChange={(e) => setName(e.target.value.toUpperCase())}
                // onChange={(e) => setName(e.target.value)}
                />

                <input
                name="last_name"
                className="InputText"
                placeholder="Prénom"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                />
            </div>
        </div>
        <p className="t6">Le nom indiqué sera celui rattaché au payement effectué via cette méthode de versemment.</p>
        <button className="NavigateButton" onClick={handleContinue}>
          <p className="t5">Continuer</p>
        </button>
    </div>
  );
}
