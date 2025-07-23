import { useEffect, useRef, useState } from "react";
import starIcon from "../../../assets/images/starIcon2.png";

export default function ReviewItem({ index, comment, rating, date, readMoreIsEnable, setReadMoreIsEnable }) {
  const pRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (pRef.current) {
        const el = pRef.current;

        const hasOverflow = el.scrollHeight > el.clientHeight;
        setIsTruncated(hasOverflow); // 👈 tu mets à true uniquement si ça dépasse
      }
    }, 0); // ⏱ 0 = laisse le temps au navigateur d’appliquer les styles

    return () => clearTimeout(timer); // nettoyage
  }, []);

  return (
    <>
      <div className="secondHline"></div>
      <div className={`ReviewItem ${readMoreIsEnable[index] ? "Big" : ""}`}>
        <p className="t6">{date}</p>
        <div className="StarList row">
          {Array.from({ length: rating }).map((_, i) => (
            <img key={i} src={starIcon} alt="star Icon" />
          ))}
          {Array.from({ length: (5 - rating) }).map((_, i) => (
            <img key={i} className="NonChose" src={starIcon} alt="star Icon" />
          ))}
          <p className="t6 starEnd">{rating}/5</p>
        </div>
        <p
          ref={pRef}
          className={`t6 ${readMoreIsEnable[index] ? "expanded" : "clamped"}`}
        >
          {comment}
        </p>

        {isTruncated && (
          <button
            className="readMore"
            onClick={() =>
              setReadMoreIsEnable((prev) => ({
                ...prev,
                [index]: !prev[index],
              }))
            }
          >
            <p className="t6">
              {readMoreIsEnable[index] ? "read less" : "read more"}
            </p>
          </button>
        )}
      </div>
    </>
  );
}
