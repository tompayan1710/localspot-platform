import "./Favoris.css"
import React, { useEffect, useState, useContext } from "react";
import { getAllFavorites, toggleFavorite } from "../../services/favorites";
import { AuthContext } from "../../components/Auth/authContext/authContext";

import favoris from "../../assets/images/favoris.png"
import favoris_selected from "../../assets/images/favoris_selected.png"
import NoFavorite from "../../assets/images/NoFavorite.png"
import loupeicon from "../../assets/images/loupeicon.png"

import { useNavigate } from "react-router-dom";
import FadeInImage from "../../components/Utils/FadeInImage";
import WhiteButton from "../../components/Buttons/WhiteButton/WhiteButton";
import { useTranslation } from "react-i18next";

export default function Favoris() {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();
    const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [isRemovingMap, setIsRemovingMap] = useState({});


    useEffect(() => {
        async function loadFavorites() {
        if (authState.user?.id) {
            const result = await getAllFavorites(authState.user.id, lang);
            console.warn(result)
            if (result.success) {
                setFavorites(result.favorites);
            }
        }
        }

        loadFavorites();
        setTimeout(() => {
            setLoading(false)
        },1000)
    }, [authState.user?.id]);

    return (
        <div className="Favoris">
            <p className="t32">{t("Favorites")}</p>
            {/* <div className="FavorisList colum">
                {(loading ? Array.from({ length: 3 }) : favorites).map((offer) => (
                <React.Fragment key={offer.slug}>
                <div className="FavorisItem" onClick={() => navigate(`/offer-page/${offer.slug}`)}>
                    <div className={`ImageWrapper ${loading && "shimmer"}`}>
                        {
                            !loading && <FadeInImage src={offer.image_urls[0]} alt={offer.title}/>
                        }
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(authState.user.id, offer.slug);

                            setIsRemovingMap((prev) => ({
                                ...prev,
                                [offer.slug]: true,
                            }));

                            setTimeout(() => {
                                setFavorites((prev) =>
                                prev.filter((favorites) => favorites.slug !== offer.slug)
                                );
                            }, 1000);
                            }}

                        >

                            <img src={favoris} alt="favoris icon"/>
                            <img
                            className={isRemovingMap[offer.slug] ? "remove" : ""}
                            src={favoris_selected}
                            alt="favoris selected icon"
                            />
                        </button>
                        <div cla></div>
                    </div>
                    <p className={`t4 title  maxLine ${loading ? "loading shimmer" : ""}`}>{loading ? "" : offer.title}</p>

                    <p className={`t6 description maxLine ${loading ? "loading shimmer" : ""}`}>{loading ? "" : offer.description}</p>
                </div>
                </React.Fragment>
                ))}
            </div> */}
            <div className="FavorisList colum">
            {(loading ? Array.from({ length: 1 }) : favorites).map((offer, index) => (
                <React.Fragment key={offer?.slug || index}>
                <div
                    className="FavorisItem"
                    onClick={() => {
                    if (!loading) navigate(`/offer-page/${offer.slug}`, {state: {
                        origin: "/favoris"
                    }});
                    }}
                >
                    <div className={`ImageWrapper ${loading && "shimmer"}`}>
                    {!loading && (
                        <FadeInImage src={offer.image_urls[0]} alt={offer.title} />
                    )}

                    {!loading && (
                        <button
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(authState.user.id, offer.slug);
                            setIsRemovingMap((prev) => ({
                            ...prev,
                            [offer.slug]: true,
                            }));
                            setTimeout(() => {
                            setFavorites((prev) =>
                                prev.filter((fav) => fav.slug !== offer.slug)
                            );
                            }, 1000);
                        }}
                        >
                        <img src={favoris} alt="favoris icon" />
                        <img
                            className={isRemovingMap[offer.slug] ? "remove" : ""}
                            src={favoris_selected}
                            alt="favoris selected icon"
                        />
                        </button>
                    )}
                    </div>

                    <p className={`t4 title maxLine ${loading ? "loading shimmer" : ""}`}>
                    {loading ? "" : offer.title}
                    </p>
                    <p
                    className={`t6 description maxLine ${
                        loading ? "loading shimmer" : ""
                    }`}
                    >
                    {loading ? "" : offer.description}
                    </p>
                </div>
                </React.Fragment>
            ))}
            </div>

            {/* ➕ MESSAGE SI AUCUN FAVORIS */}
            {!loading && favorites.length === 0 && (
                <div className="NoFavorite">
                    <div className="MessageNone">
                        <div className="ImageWrapper">
                            <FadeInImage src={NoFavorite} alt="no favorite image"/>
                        </div>
                        <p className="t6">Vous n'avez aucun favoris pour <br></br>le moment.</p>
                        <WhiteButton text={"Rechercher des annonces"} onClick={() => navigate("/")} img={loupeicon} alt={"loupe icon"}/>
                    </div>
                </div>
            )}

        </div>
    )
}
