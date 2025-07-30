import { useEffect, useState } from "react";
import "./DurationSlider.css";

export default function DurationSlider({
  setValue,
  durations = ["15 min", "30 min", "1 h", "2 h", "4 h", "+ 6 h"],
  startValue = ""
}) {
  const maxSteps = 200;
  const steps = durations.length;
  const stepSize = maxSteps / (steps - 1);

  const [sliderValue, setSliderValue] = useState(0);

  // Initialise le slider à la bonne position en fonction de la valeur initiale
  useEffect(() => {
    if (!startValue) return;
    const index = durations.findIndex(d => d === startValue);
    if (index !== -1) {
      setSliderValue(index * stepSize);
    }
  }, [startValue]);

  // Met à jour la durée sélectionnée à chaque changement
  useEffect(() => {
    const closestIndex = Math.round(sliderValue / stepSize);
    const selectedDuration = durations[closestIndex];
    setValue(selectedDuration);
  }, [sliderValue]);

  return (
    <div className="duration-slider">
      <div className="track-wrapper">
        <input
          type="range"
          min={0}
          max={maxSteps}
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="slider"
        />
        <div className="labels">
          {durations.map((d, i) => (
            <p
              key={i}
              className="t6"
              style={{
                width: `calc(${100 / (durations.length - 1)}%)`,
                textAlign: "center"
              }}
            >
              {d}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
