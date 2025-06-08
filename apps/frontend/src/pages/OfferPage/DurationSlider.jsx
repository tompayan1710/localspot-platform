import { useState } from "react";
import "./DurationSlider.css";



export default function DurationSlider({setValue, value}) {
  //const [value, setValue] = useState(0);

  const durations = ["15 min", "30 min", "1 h", "2 h", "4 h", "+ 6 h"];
  const [sliderValue, setSliderValue] = useState(0);

  const steps = durations.length;
  const stepSize = 200 / (steps - 1); // pour découper en parts égales

  // index le plus proche
  const closestIndex = Math.round(sliderValue / stepSize);
  const selectedDuration = durations[closestIndex];

  return (
    <div className="duration-slider">
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
