import React, { useState } from "react";
import arrowrighticon from "../../assets/images/arrowrighticon.png"
import arrowlefticon from "../../assets/images/arrowlefticon.png"
import "./Carousel.css";

const images = [
  "https://picsum.photos/id/1018/600/400",
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1016/600/400",
  "https://picsum.photos/id/1019/600/400",
  "https://picsum.photos/id/1020/600/400",
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  const goToPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="CarrouselContainer">
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((src, index) => (
            <img key={index} src={src} alt={`slide-${index}`} className="slide" />
          ))}
        </div>

        <button className="nav left" onClick={goToPrev}>
          <img src={arrowlefticon}/>
        </button>
        <button className="nav right" onClick={goToNext}>
          <img src={arrowrighticon}/>
        </button>

        <div className="dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
