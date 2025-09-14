import GoBack from "../../components/GoBack/GoBack"
import "./AddComment.css"
import starIcon from "../../assets/images/starIcon2.png"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../components/Auth/authContext/authContext";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner/Spinner";
import ErrorPageTemplate from "../ErrorPageTemplate/ErrorPageTemplate";

import ProtectedIllustration from "../../assets/images/ProtectedIllustration.png";
import { useTranslation } from "react-i18next";

export default function AddComment() {
    const {t} = useTranslation();
    const [selectedStar, setSelectedStar] = useState(4);
    const [commentText, setCommentText] = useState("");

    const { authState } = useContext(AuthContext);
    const { slug } = useParams();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const res_id = searchParams.get("res_id"); 

    const [loadingCanComment, setLoadingCanComment] = useState(authState.loading);
    const [haveReservation, setHaveReservation] = useState(false);
    const [canComment, setCanComment] = useState(false);

    async function haveRightToComment() {
         if (!authState.isAuth) {
            setCanComment(false);
            setLoadingCanComment(false);
            return;
        }

        if (!authState.user) {
            setCanComment(false);
            setLoadingCanComment(false);
            return;
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/right-comment?user_id=${authState.user.id}&res_id=${res_id}`, {
            method: "GET",
        });

        const data = await response.json();

        if (data.success) {
            setCanComment(data.canComment);
            setHaveReservation(data.have_reservation)
            console.log("canComment API →", data.canComment);
        } else {
            alert(data.message || "Une erreur est survenue.");
        }

        setTimeout(() => {
            setLoadingCanComment(false);
        }, 1000);
    }


    async function submitComment() {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/comments/add-comment`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            // user_id: user_id,             // Tu dois les avoir en local ou contexte
            user_id: authState.user.id,
            reservation_id: res_id,
            offer_slug: slug,
            rating: selectedStar + 1,              // ⭐ important, sinon ça commence à 0
            comment: commentText                   // ← Tu dois stocker le texte dans un state
            }),
        });

        const data = await response.json();

        if (data.success) {
            alert("Commentaire ajouté avec succès !");
            navigate("/");
        } else {
            alert(data.message || "Une erreur est survenue.");
        }
    }

    useEffect(() => {
        console.warn(authState);
        // console.warn(authState.user.id);
    }, [authState]);

    useEffect(() => {
        if (authState.user && res_id) {
            haveRightToComment();
        }
    }, [authState, res_id]);


    if(loadingCanComment || authState.loading){
        return <Spinner centerPage={true}></Spinner>
    }

    // if(!authState.isAuth){
    //     return <div>
    //         <p className="t4">Vous n'avez pas le droit de commenter</p>
    //     </div>
    // }
    if(!authState.isAuth){
        return <ErrorPageTemplate 
            img={ProtectedIllustration} 
            alt={"Alt"} widthImg={"140px"} 
            heightImg={"auto"} 
            title={t("Restricted_access")}
            description={t("Restricted_access_description")}
            textButton={t("Restricted_access_button")} 
            onClickButton={() => navigate("/login", {state: {origin: "/"}})}
            >
        </ErrorPageTemplate>
    }

    if(!haveReservation){
        return <ErrorPageTemplate 
            img={ProtectedIllustration} 
            alt={"Alt"} widthImg={"140px"} 
            heightImg={"auto"} 
            title={t("No_reservation_found")}
            description={t("No_reservation_found_description")}
            textButton={t("No_reservation_found_button")} 
            onClickButton={() => navigate("/")}
            >
        </ErrorPageTemplate>
    }
    
    if(!canComment){
        return <ErrorPageTemplate 
            img={ProtectedIllustration} 
            alt={"Alt"} widthImg={"140px"} 
            heightImg={"auto"} 
            title={t("Already_commented")}
            description={t("Already_commented_description")}
            textButton={t("Already_commented_button")} 
            onClickButton={() => navigate("/")}
            >
        </ErrorPageTemplate>
    }

    return (
        <div className="AddComment">
            
            <GoBack nagigation={"/reservation"} text={t("My_reservations")} />
            <div className="AddCommentContainer">
            <p className="t3">{t("Rate_your_experience")}</p>
            <p className="t5">{t("Rate_experience_question")}&nbsp;?</p>

            <div className="AllStars">
                {
                Array.from({ length: 5 }).map((_, index) => (
                    <button 
                    className={`StarButton ${index <= selectedStar ? "chose" : ""}`} 
                    key={index}
                    onClick={() => setSelectedStar(index)}
                    >
                    <img src={starIcon} alt="Icône étoile" />
                    </button>
                ))
                }
            </div>

            <p className="t5">{t("Share_more_question")}&nbsp;?</p>
            <textarea 
                placeholder={t("Describe_your_experience_here" )}
                rows="5" 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
            />

            <div className="row">
                <div className="IContainer">
                <p>!</p>
                </div>
                <p className="t6">
                    {t("Remain_respectful_text")}
                </p>
            </div>
            </div>

            <button className="SubmitButton" onClick={submitComment}>
                <p className="t5">{t("Send_my_review")}</p>
            </button>


        </div>
    )
}