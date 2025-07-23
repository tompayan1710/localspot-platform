import { useEffect, useState } from "react";
import React from "react";

import Lorier from "../../../assets/images/Lorier.png"
import starIcon from "../../../assets/images/starIcon2.png"
import StartIconMiddle from "../../../assets/images/StartIconMiddle.png"
// import Lorier from "../../../assets/images/Lorier.png"

import "./OfferComments.css"
import ReviewItem from "./ReviewItem";
import Spinner from "../../../components/Spinner/Spinner";

export default function OfferComments({ offerSlug, children }) {
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
            const note = comment.rating;
            tempStat[note]++;
            tempAverage+=comment.rating
        })

        setAverage(tempAverage/comments.length);
        setStatComments(tempStat);
    };

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/comments/getall?slug=${offerSlug}`
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
  }, [offerSlug]);

  if (loading) return (
    <div className="CommentsExceptContainer">
        <Spinner />
    </div>
  ) 
  if (comments.length === 0) return (
    <div className="CommentsExceptContainer">
        <p className="t5">Aucun commentaire pour cette offre.</p>
    </div>
  )

  const fullStars = Math.floor(average);      // nombre d’étoiles pleines
        const hasHalfStar = average % 1 >= 0.25 && average % 1 < 0.75; // demi-étoile ?
const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);


  return (
        <div className="ClientReviewContainer"> 
            {
                children
            }      
            <p className="t1">{average.toFixed(1)} / 5</p>
            <div className="StarsList">
                {
                    Array.from({ length: Math.floor(average) }).map((_, i) => (
                    <img key={`full-${i}`} src={starIcon} alt="star full" />
                    ))
                }
                {
                    (average % 1 >= 0.25 && average % 1 < 0.75) && (
                    <img key="half" src={StartIconMiddle} alt="star half" />
                    )
                }
                {
                    Array.from({ length: 5 - Math.floor(average) - ((average % 1 >= 0.25 && average % 1 < 0.75) ? 1 : 0) }).map((_, i) => (
                    <img key={`empty-${i}`} className="NonChose" src={starIcon} alt="star empty" />
                    ))
                }
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
                  <p className="t5">les avis des participants</p>
                  {/* <p className="t6">Les commentaires partagés vous permettent de découvrir les ressentis et avis d'autres participants.</p> */}
                  <p className="t6">Les commentaires reflètent les ressentis de participants ayant réellement vécu l’expérience.</p>
                </div>
              </div>
              <p className="t5 BasedOn">Based on {comments.length} reviews :</p>
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
                        new Date(comment.created_at).toLocaleDateString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        })
                    }
                    readMoreIsEnable={readMoreIsEnable}
                    setReadMoreIsEnable={setReadMoreIsEnable}
                  />
                  </div>
                )
              })
            }
        </div>
            
        <p className="seeMore t5">Voir <strong>+</strong></p>
    </div>
  );
}
