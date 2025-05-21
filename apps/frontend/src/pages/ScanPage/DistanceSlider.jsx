import { useState } from "react";
import "./DurationSlider.css";
import bycicle from "../../assets/images/bycicle.webp";
import footIcon from "../../assets/images/footIcon.png";
import carIcon from "../../assets/images/carIcon.png";

export default function DistanceSlider() {
  const [value, setValue] = useState(0);

  const durations = ["5 min", "10 min", "20 min", "30 min", "45 min", "1 h"];

  return (
    <div className="duration-slider">
        <div className="durationType">
            <p className="t4">Distance à</p>
            <button><img src={footIcon} /></button>
            <button className="selected"><img src={bycicle} /></button>
            <button><img src={carIcon} /></button>
        </div>

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
