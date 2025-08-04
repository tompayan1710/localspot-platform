import { useState } from "react";

export default function AddBankAccount({ onSubmit }) {
  const [iban, setIban] = useState("");
  const [confirmIban, setConfirmIban] = useState("");
  const [error, setError] = useState("");

  const ibanRegex = /^[A-Z]{2}[0-9A-Z]{13,32}$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedIban = iban.replace(/\s+/g, '').toUpperCase();
    const formattedConfirm = confirmIban.replace(/\s+/g, '').toUpperCase();

    if (formattedIban !== formattedConfirm) {
      setError("Les deux IBAN doivent être identiques.");
      return;
    }

    if (!ibanRegex.test(formattedIban)) {
      setError("L'IBAN n'est pas valide.");
      return;
    }

    setError("");
    onSubmit({ iban: formattedIban });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="iban">IBAN</label>
      <input
        id="iban"
        type="text"
        value={iban}
        onChange={(e) => setIban(e.target.value)}
        required
        placeholder="FR76 3000 6000 0112 3456 7890 189"
        autoComplete="off"
      />

      <label htmlFor="confirm-iban">Confirmez l’IBAN</label>
      <input
        id="confirm-iban"
        type="text"
        value={confirmIban}
        onChange={(e) => setConfirmIban(e.target.value)}
        required
        autoComplete="off"
      />

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit">Enregistrer</button>
    </form>
  );
}


// <AddBankAccount onSubmit={(data) => {
//   // data.iban contient l’IBAN validé
//   // Appelle ton backend ici pour le sauvegarder (chiffré si possible)
//   console.log("IBAN à enregistrer :", data.iban);
// }} />
