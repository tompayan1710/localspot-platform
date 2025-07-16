import { useEffect, useState } from "react";
import "./SliderPrice.css";
import { Range } from 'react-range';

export default function SliderPrice({ minValue, setMinValue, maxValue, setMaxValue }) {
  const MIN_PRICE = 25;
  const MAX_PRICE = 3000;

  const sliderMin = 0;
  const sliderMax = 200;

  const [range, setRange] = useState([sliderMin, sliderMax]);

  const toDisplayValue = (v) => {
    const logMin = Math.log10(MIN_PRICE);
    const logMax = Math.log10(MAX_PRICE);
    const scale = logMin + (v / (sliderMax - sliderMin)) * (logMax - logMin);
    return Math.round(Math.pow(10, scale));
  };

  useEffect(() => {
    const [a, b] = range;
    setMinValue(toDisplayValue(a));
    setMaxValue(toDisplayValue(b));
  }, [range]);

  return (
    <div className="slider-price">
      <div className="row">
        <p className="t4 bold">€{minValue}</p>
        <p className="t4 bold">€{maxValue}</p>
      </div>

      <div className="range-container">
        <Range
            step={1}
            min={sliderMin}
            max={sliderMax}
            values={range}
            onChange={([a, b]) => {
            const MIN_DISTANCE = 20;

            if (b - a < MIN_DISTANCE) {
                // Trop proches : on bloque ou ajuste
                if (range[0] !== a) {
                // L'utilisateur déplace le min (gauche)
                setRange([b - MIN_DISTANCE, b]);
                } else {
                // L'utilisateur déplace le max (droite)
                setRange([a, a + MIN_DISTANCE]);
                }
            } else {
                setRange([a, b]);
            }
            }}
            renderTrack={({ props, children }) => {
                const [minVal, maxVal] = range;
                const percentMin = (minVal / (sliderMax - sliderMin)) * 100;
                const percentMax = (maxVal / (sliderMax - sliderMin)) * 100;

                return (
                    <div
                    {...props}
                    className="track"
                    >
                    {/* bande rouge par-dessus */}
                    <div
                        className="selected-range"
                        style={{
                        position: "absolute",
                        top: "-1px",    // ← pour recentrer verticalement
                        left: `${percentMin}%`,
                        width: `${percentMax - percentMin}%`,
                        borderRadius: "4px",
                        }}
                    />
                    {children}
                    </div>
                );
            }}

            renderThumb={({ props, index }) => (
                <div {...props} className="thumb" key={index}>
                {/* <p className="tooltip t5">
                    {toDisplayValue(range[index])}€
                </p> */}
                </div>
            )}
        />
      </div>
    </div>
  );
}
