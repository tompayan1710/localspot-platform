import { forwardRef, useState } from "react";
import PopUpBottom from "../PopUpBottom";
import DeleteIcon from "../../../assets/images/RemoveIcon.png";
import "./PopUpNumber.css";

const PopUpNumber = forwardRef(({ title, smalltext = "", onClose, max, setReturnValue }, ref) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const appendNumber = (num) => {
    setValue((prev) => {
      const newValue = prev + num;

      // gestion du point
      if (num === "." && (prev === "" || prev === "0")) return "0.";
      if (num === "." && prev.includes(".")) return prev;

      // gestion max
      if (parseFloat(newValue) > max) {
        setError(`Le montant ne peut pas dépasser ${max} €`);
        return prev;
      } else {
        setError(""); // reset l'erreur si valide
      }

      return newValue;
    });
  };

  const deleteLast = () => {
    setValue((prev) => {
      const newVal = prev.slice(0, -1);
      if (parseFloat(newVal) <= max) setError(""); // reset erreur si on revient dans les clous
      return newVal;
    });
  };

  return (
    <PopUpBottom ref={ref} onClose={onClose} isHeader={false} fullHeight={true}>
      <div className="NumberPicker column">
        <p className="t4">{title}</p>

        <div className="AmountContainer column">
          <div className="DisplayAmount row">
            <p className="t3">{value || "0"}</p>
            <div className="Cursor"></div>
            <p className="t3">€</p>
          </div>
          {error ? <p className="t6 error-text">{error}</p> :
          <p className="t6">{smalltext}</p>}
        </div>

        <div className="column">
          <div className="Numpad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button key={n} onClick={() => appendNumber(n.toString())}>
                <p className="t32">{n}</p>
              </button>
            ))}
            <button onClick={() => appendNumber(".")}>
              <p className="t2 point">.</p>
            </button>
            <button onClick={() => appendNumber("0")}>
              <p className="t32">0</p>
            </button>
            <button className="DeleteIcon" onClick={deleteLast}>
              <img src={DeleteIcon} alt="Supprimer" />
            </button>
          </div>

          <div className="NavButtons">
            <button className="Cancellable" onClick={() => {
                onClose();
                setTimeout(() => {
                    setValue("");
                }, 300)
            }}>
              <p className="t5">Annuler</p>
            </button>
            <button className="Validate" onClick={() => {
                setReturnValue(value);
                onClose();
            }}>
              <p className="t5">Valider</p>
            </button>
          </div>
        </div>
      </div>
    </PopUpBottom>
  );
});

export default PopUpNumber;
