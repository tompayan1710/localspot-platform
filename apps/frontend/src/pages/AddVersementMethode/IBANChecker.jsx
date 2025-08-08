import { useEffect, useState } from "react";
import "./AddVersement.css";

export default function IBANChecker({ referenceIban, setIsValidRepeat, base }) {
  const [value, setValue] = useState("");

  // Quand le referenceIban change (donc modif de l'input principal)
  useEffect(() => {
    const cleanedRef = referenceIban.replace(/\s/g, "").toUpperCase();
    setValue(""); // on vide le champ de confirmation

    if (cleanedRef.length === 0) {
      // Si y'a pas de ref, on décide selon base
      setIsValidRepeat(base ? true : false);
    } else {
      // S'il y a un ref mais pas encore de confirmation, on dit valide que si base
      setIsValidRepeat(false);
    }
  }, [referenceIban]);

  const handleChange = (e) => {
    const cleanedInput = e.target.value.replace(/\s/g, "").toUpperCase();
    const cleanedRef = referenceIban.replace(/\s/g, "").toUpperCase();

    setValue(cleanedInput);

    if (cleanedInput === cleanedRef) {
      setIsValidRepeat(true);
    } else {
      setIsValidRepeat(false);
    }
  };

  return (
    <div className="IbanCheckerWrapper">
      <div className="IbanVisual">
        {referenceIban.split("").map((refChar, i) => {
          const userChar = value[i];
          const isCorrect = userChar === refChar;

          const filledIndexes = [...value].map((c, idx) => c && idx).filter((v) => typeof v === "number");
          const firstFilled = filledIndexes[0];
          const lastFilled = filledIndexes[filledIndexes.length - 1];

          const isFirst = i === firstFilled;
          const isLast = i === lastFilled;

          return (
            <div
              key={i}
              className={`char-block 
                            ${userChar ? (isCorrect ? "valid" : "invalid") : ""} 
                            ${isFirst ? "first-letter" : ""} 
                            ${isLast ? "last-letter" : ""}`}
            >
              {userChar || ""}
            </div>
          );
        })}
      </div>

      <input
        type="text"
        value={value}
        placeholder="Confirmez le numéro IBAN"
        onChange={handleChange}
        className="RealInput"
        maxLength={referenceIban.length}
        autoComplete="off"
        spellCheck={false}
      />
    </div>
  );
};
