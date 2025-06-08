import { useState } from "react";
import "./DurationSlider.css";
import bycicle from "../../assets/images/bycicle.png";
import footIcon from "../../assets/images/footIcon.png";
import carIcon from "../../assets/images/carIcon.png";


export default function DistanceSlider() {
  const [sliderValue, setSliderValue] = useState(0);
  const [transport, setTransport] = useState("walk"); // "walk", "bike", "car"

   const durations = ["5 min", "10 min", "20 min", "30 min", "45 min", "1 h"];
  const steps = durations.length;
  const stepSize = 200 / (steps - 1); // pour découper en parts égales

  // index le plus proche
  const closestIndex = Math.round(sliderValue / stepSize);
  const selectedDuration = durations[closestIndex];


  return (
    <div className="duration-slider">
        <div className="durationType">
            <p className="t4">Distance /</p>
            <button  className={transport === "walk" ? "selected" : ""} onClick={(e) => {
              e.preventDefault();
              setTransport("walk");
            }}><img src={footIcon} /></button>
            <button  className={transport === "bike" ? "selected" : ""}  onClick={(e) => {
              e.preventDefault();
              setTransport("bike");
            }}><img src={bycicle} /></button>
            <button  className={transport === "car" ? "selected" : ""}   onClick={(e) => {
              e.preventDefault();
              setTransport("car");
            }}><img src={carIcon} /></button>
        </div>

      <div className="track-wrapper">
        <input
          type="range"
          min={0}
          max={200}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
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
