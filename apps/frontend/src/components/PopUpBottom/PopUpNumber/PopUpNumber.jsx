import { forwardRef, useEffect, useState } from "react";
import PopUpBottom from "../PopUpBottom";
import DeleteIcon from "../../../assets/images/RemoveIcon.png";
import arrowBottom from "../../../assets/images/arrowBottom.png";
import "./PopUpNumber.css"; 

const PopUpNumber = forwardRef(({ title, smalltext = "", detailledBox=false, onClose, initialValue = "", min, errorMin, max, errorMax, setReturnValue, allowDecimal = true, unit = "€"}, ref) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");


  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    setValue(initialValue?.toString() ?? "0");
  }, [initialValue]);


  const appendNumber = (num) => {
    setValue((prev) => {
      // gestion du point
      // ✅ Interdiction du point si non autorisé
      if (!allowDecimal && num === ".") return prev;

      // gestion du point (si autorisé)
      if (num === "." && (prev === "" || prev === "0")) return "0.";
      if (num === "." && prev.includes(".")) return prev;

      if (prev === "0" && num === "0") return prev;
      if (prev === "0" && num !== "0") return num;
      const newValue = prev + num;

      if (newValue.includes(".")) {
        const [intPart, decimalPart] = newValue.split(".");
        if (decimalPart.length > 2) return prev;
      }

      // gestion max
      if (parseFloat(newValue) > max) {
        setError(errorMax);
        return prev;
      } else if(parseFloat(newValue) < min){
        setError(errorMin)
      } else {
        setError(""); // reset l'erreur si valide
      }

      return newValue;
    });
  };

  const deleteLast = () => {
    setValue((prev) => {
      if (!prev) return ""; // rien à effacer

      const newVal = prev.slice(0, -1);

      if (newVal === "" || newVal === "0") {
        setError("");
        return "0";  // toujours string !
      }

      const numeric = parseFloat(newVal);

      if (isNaN(numeric)) {
        setError("");
      } else if (numeric < min) {
        setError(errorMin);
      } else if (numeric <= max) {
        setError("");
      }

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
            <p className="t3">{unit}</p>
          </div>
          {error ? 
            <div className="InfoErrorDiv row">
              <div className="InfoError"><p className="t6 bold">!</p></div>
              <p className="t6 error-text">{error}</p> 
            </div>
            :
          <p className="t6">{smalltext}</p>
          }

          {
            detailledBox ?
            <div className="EarningDetails" onClick={() => {
              setOpenDetails((prev) => !prev)
            }}>
              <div className={`details ${openDetails ? "open" : ""}`}>
                <div className="row">
                  <p className="t6">Commission hébergeur</p>
                  <p className="t6">{(parseFloat(value || 0) * parseFloat(process.env.REACT_APP_HOTEL_COMMISSION_RATE)).toFixed(2)} €</p>
                </div>
                <div className="hline"></div>
                <div className="row">
                  <p className="t6">Frais de service</p>
                  <p className="t6">{(parseFloat(value || 0) * parseFloat(process.env.REACT_APP_PLATFORM_COMMISSION_RATE)).toFixed(2)} €</p>
                </div>
                <div className="hline"></div>
                <div className="row">
                  <p className="t6">Montant perçu</p>
                  <p className="t6">{(parseFloat(value || 0) * parseFloat(process.env.REACT_APP_PROVIDER_EARNING_RATE)).toFixed(2)} €</p>
                </div>
              </div>
              <div className="earningresume">
                <p className="t5">Vous gagnez : {(parseFloat(value || 0) * parseFloat(process.env.REACT_APP_PROVIDER_EARNING_RATE)).toFixed(2)} €</p>
                <img className={`${openDetails ? "rotate" : ""}`} src={arrowBottom} alt="arrow Bottom"/>
              </div>
            </div> 
            :
            <></>
          }
        </div>

        <div className="column">
          <div className="Numpad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button key={n} onClick={() => appendNumber(n.toString())}>
                <p className="t32">{n}</p>
              </button>
            ))}
            {/* <button onClick={() => appendNumber(".")}>
              <p className="t2 point">.</p>
            </button> */}
            {allowDecimal ? (
              <button onClick={() => appendNumber(".")}>
                <p className="t2 point">.</p>
              </button>
            ) : (
              <button disabled className="DisabledPoint">
                <p className="t2 point"></p>
              </button>
            )}
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
                if(value>max){
                  setError(errorMax);
                  return;
                }else if(value<min){
                  setError(errorMin);
                  return
                }else {
                  setError("");
                  setReturnValue(value);
                  onClose();
                }
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
