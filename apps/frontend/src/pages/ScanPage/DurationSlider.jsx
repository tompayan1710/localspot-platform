import { useState } from "react";
import "./DurationSlider.css";

export default function DurationSlider() {
  const [value, setValue] = useState(0);

  const durations = ["30 min", "1 h", "2 h", "3 h", "4 h", "+ 5 h"];

  return (
    <div className="duration-slider">
      <p className="t4">Durée de l'activité</p>

      <div className="track-wrapper">
        <input
          type="range"
          min={0}
          max={durations.length - 1}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="slider"
        />
        <div className="labels">
          {durations.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
