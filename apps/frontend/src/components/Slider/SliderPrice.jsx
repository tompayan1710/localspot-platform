import { useEffect, useState } from "react";
import "./SliderPrice.css";
import { Range } from "react-range";

export default function SliderPrice({ minValue, setMinValue, maxValue, setMaxValue, resetTrigger }) {
  const MIN_PRICE = 25;
  const MAX_PRICE = 3000;
  const sliderMin = 0;
  const sliderMax = 200;
  const MIN_DISTANCE = 5;

  const toDisplayValue = (v) => {
    const logMin = Math.log10(MIN_PRICE);
    const logMax = Math.log10(MAX_PRICE);
    const scale = logMin + (v / (sliderMax - sliderMin)) * (logMax - logMin);
    return Math.round(Math.pow(10, scale));
  };

  const toSliderValue = (price) => {
    const logMin = Math.log10(MIN_PRICE);
    const logMax = Math.log10(MAX_PRICE);
    const logPrice = Math.log10(price);
    return ((logPrice - logMin) / (logMax - logMin)) * (sliderMax - sliderMin);
  };

  const initialRange = [
    toSliderValue(minValue),
    toSliderValue(maxValue)
  ];

  const [range, setRange] = useState(initialRange);

  // ✅ Seul endroit où on met à jour min/max
  const handleChange = ([a, b]) => {
    if (b - a < MIN_DISTANCE) {
      if (range[0] !== a) {
        setRange([b - MIN_DISTANCE, b]);
      } else {
        setRange([a, a + MIN_DISTANCE]);
      }
    } else {
      setRange([a, b]);
    }

    setMinValue(toDisplayValue(a));
    setMaxValue(toDisplayValue(b));
  };

  // ✅ Reset quand `resetTrigger` change
  useEffect(() => {
    const newRange = [
      toSliderValue(minValue),
      toSliderValue(maxValue)
    ];
    setRange(newRange);
  }, [resetTrigger]);

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
          onChange={handleChange}
          renderTrack={({ props, children }) => {
            const [minVal, maxVal] = range;
            const percentMin = (minVal / (sliderMax - sliderMin)) * 100;
            const percentMax = (maxVal / (sliderMax - sliderMin)) * 100;

            return (
              <div {...props} className="track">
                <div
                  className="selected-range"
                  style={{
                    position: "absolute",
                    top: "-1px",
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
            <div {...props} className="thumb" key={index}></div>
          )}
        />
      </div>
    </div>
  );
}
