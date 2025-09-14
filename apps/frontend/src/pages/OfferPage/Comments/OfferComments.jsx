import { useEffect, useState } from "react";
import React from "react";

import Lorier from "../../../assets/images/Lorier.png"
import starIcon from "../../../assets/images/starIcon2.png"
import StartIconMiddle from "../../../assets/images/StartIconMiddle.png"
// import Lorier from "../../../assets/images/Lorier.png"

import "./OfferComments.css"
import ReviewItem from "./ReviewItem";
import Spinner from "../../../components/Spinner/Spinner";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../../services/translation";

export default function OfferComments({ offerSlug, children }) {
  const {t, i18n} = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [readMoreIsEnable, setReadMoreIsEnable] = useState({});
  const [average, setAverage] = useState(1);
  const [statComments, setStatComments] = useState({
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0
  });


    const getStat = (comments) => {
        const tempStat = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        let tempAverage = 0;

        comments.forEach(comment => {
            const note = Number(comment.rating);
            tempStat[Math.round(note)]++;
            tempAverage+=comment.rating
        })

        if (comments.length > 0) {
          setAverage(tempAverage / comments.length);
        } else {
          setAverage(0); // ou 1 si tu veux par défaut
        }
        setStatComments(tempStat);
    };

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/comments/getall?slug=${offerSlug}&lang=${lang}`
        );
        const data = await response.json();

        if (data.success) {
            setComments(data.comments);
            getStat(data.comments);
        } else {
          console.error("Erreur:", data.error);
        }
      } catch (err) {
        console.error("Erreur réseau:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchComments();
  }, [offerSlug, lang]);

  useEffect(() => {
    console.warn(comments);
  }, [comments]);


  useEffect(() => {
    console.warn(average);
  }, [average]);


  if (loading) return (
    <div className="CommentsExceptContainer">
        <Spinner />
    </div>
  ) 
  if (comments.length === 0) return (
    <div className="CommentsExceptContainer">
        <p className="t5">{t("No_comment")}</p>
    </div>
  )

  // Arrondi au demi le plus proche
  const rounded = Math.round(average * 2) / 2;
  // étoiles pleines
  const fullStars = Math.floor(rounded);
  // demi-étoile ?
  const hasHalfStar = rounded % 1 !== 0;
  // étoiles vides
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


  
  return (
        <div className="ClientReviewContainer"> 
            {
                children
            }      
            <p className="t1">{Number(average).toFixed(1)} / 5</p>
            <div className="StarsList">
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
          </div>


              <div className="validateReview">
                <div className="row">
                  <img src={Lorier} alt="lorier illustration"/>
                </div>
                <div className="column">
                  {/* <p>Seul Les personnes ayant acheter "participer" on la possibilité de commenter</p> */}
                  {/* <p>les commentaires des autres personnes serve à vous décrire leur ressentie et autre</p> */}
                  {/* Avis 100 % authentiques. */}
                  {/* Seules les personnes ayant réservé cette activité peuvent partager leur ressenti pour vous guider dans votre choix */}
                  <p className="t5">{t("participants_opinions")}</p>
                  {/* <p className="t6">Les commentaires partagés vous permettent de découvrir les ressentis et avis d'autres participants.</p> */}
                  <p className="t6">{t("participants_opinions_para")}</p>
                </div>
              </div>
              <p className="t5 BasedOn">{t("based_on_review", { count: comments.length })}</p>
              <div className="rankStarContainer">
              {
                Object.entries(statComments)
                    .sort((a, b) => b[0] - a[0])
                    .map(([rating, count]) => {
                  return (
                    <React.Fragment key={`rank-${rating}`}>
                    <p key={`start${rating}`} className="t6 starStart">{rating}&nbsp;star{rating>1 ? "s" : ""}</p>
                    <div key={`progression${rating}`} className="rankProgression">
                      <div className="rankGoldProgression" style={{width: `${(count / comments.length) * 100}%`}}></div>
                    </div>
                    <p key={`number${rating}`} className="t6 starEnd">{count}</p>
                    
                </React.Fragment>
                  )
                })
              }
            </div>
            <div id={"secondHline"}></div>
            <div className="ReviewItemColumn">
            {
              comments.map((comment, index) => {
                return (
                  <div key={`review-${index}`}>
                  <ReviewItem
                    index={index}
                    comment={comment.comment}
                    rating={comment.rating}
                    date={
                      formatDate(comment.created_at, lang)
                    }
                    readMoreIsEnable={readMoreIsEnable}
                    setReadMoreIsEnable={setReadMoreIsEnable}
                  />
                  </div>
                )
              })
            }
        </div>
            

        <button className="seeMore row" onClick={() => {}}>
          <p className="t32">{t("See")}&nbsp;<strong>+</strong></p>
        </button>

        {/* <p className="seeMore t5">Voir <strong>+</strong></p> */}
    </div>
  );
}
