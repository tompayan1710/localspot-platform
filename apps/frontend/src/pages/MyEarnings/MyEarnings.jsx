import "./MyEarnings.css"
import { useContext } from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext";

export default function MyEarnings() {
  const { authState } = useContext(AuthContext);

  const handleWithdraw = async () => {
    const amount = 12345; // Montant en centimes, à récupérer depuis le solde
    const method = "paypal"; // ou "iban"
    const details = "john@example.com"; // ou IBAN du prestataire

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payouts/request`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider_id: authState.user.provider_id,
        amount,
        method,
        details,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Demande enregistrée");
    } else {
      alert("❌ Erreur : " + data.error);
    }
  };

  return (
    <div className="MyEarnings">
      <p className="t4">Mes revenus</p>
      <button className="whiteButton" onClick={handleWithdraw}>
        Retirer mes gains
      </button>
    </div>
  );
}