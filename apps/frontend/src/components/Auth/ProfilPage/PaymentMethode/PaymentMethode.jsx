import "./PaymentMethode.css"
import { useContext, useState } from "react";
import { AuthContext } from "../../authContext/authContext";

export default function PaymentMethode() {
  const { authState } = useContext(AuthContext);
  const [method, setMethod] = useState("paypal");
  const [details, setDetails] = useState("");

  const handleSave = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/payment/payouts/method`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provider_id: authState.user.provider_id,
        method,
        details
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("✅ Moyen de retrait enregistré !");
    } else {
      alert("❌ Erreur : " + data.error);
    }
  };

  return (
    <div>
      <h2 className="t4">Choisir un moyen de retrait</h2>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="paypal">PayPal</option>
        <option value="iban">Virement bancaire (IBAN)</option>
      </select>
      <input
        type="text"
        placeholder={method === "paypal" ? "Email PayPal" : "IBAN"}
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <button onClick={handleSave}>Enregistrer</button>
    </div>
  );
}
