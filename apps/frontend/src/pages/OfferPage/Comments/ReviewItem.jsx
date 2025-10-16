import { useEffect, useRef, useState } from "react";
import starIcon from "../../../assets/images/starIcon2.png";
import StartIconMiddle from "../../../assets/images/StartIconMiddle.png";
import { useTranslation } from "react-i18next";


export default function ReviewItem({ index, comment, rating, date, readMoreIsEnable, setReadMoreIsEnable }) {
  const pRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const {t, i18n} = useTranslation();
  
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

  
  // Arrondi au demi le plus proche
  const rounded = Math.round(rating * 2) / 2;
  // étoiles pleines
  const fullStars = Math.floor(rounded);
  // demi-étoile ?
  const hasHalfStar = rounded % 1 !== 0;
  // étoiles vides
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


  return (
    <>
      <div className="secondHline"></div>
      <div className={`ReviewItem ${readMoreIsEnable[index] ? "Big" : ""}`}>
        <p className="t6">{date}</p>
        {/* <div className="StarList row">
          {Array.from({ length: rating }).map((_, i) => (
            <img key={i} src={starIcon} alt="star Icon" />
          ))}
          {Array.from({ length: (5 - rating) }).map((_, i) => (
            <img key={i} className="NonChose" src={starIcon} alt="star Icon" />
          ))}
          <p className="t6 starEnd">{rating}/5</p>
        </div> */}

          <div className="StarList row">
            {/* étoiles pleines */}
            {Array.from({ length: fullStars }).map((_, i) => (
              <img key={`full-${i}`} src={starIcon} alt="star full" />
            ))}

            {/* demi-étoile */}
            {hasHalfStar && (
              <img key="half" src={StartIconMiddle} alt="star half" />
            )}
            {/* étoiles vides */}
            {Array.from({ length: emptyStars }).map((_, i) => (
              <img key={`empty-${i}`} className="NonChose" src={starIcon} alt="star empty" />
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
              {readMoreIsEnable[index] ? t("read_less") : t("read_more")}
            </p>
          </button>
        )}
      </div>
    </>
  );
}
