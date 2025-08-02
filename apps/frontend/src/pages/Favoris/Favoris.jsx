import "./Favoris.css"
import React, { useEffect, useState, useContext } from "react";
import { getAllFavorites, toggleFavorite } from "../../services/favorites";
import { AuthContext } from "../../components/Auth/authContext/authContext";

import favoris from "../../assets/images/favoris.png"
import favoris_selected from "../../assets/images/favoris_selected.png"
import { useNavigate } from "react-router-dom";
import FadeInImage from "../../components/Utils/FadeInImage";

export default function Favoris() {
    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [favorites, setFavorites] = useState([]);
    const [isRemovingMap, setIsRemovingMap] = useState({});


    useEffect(() => {
        async function loadFavorites() {
        if (authState.user?.id) {
            const result = await getAllFavorites(authState.user.id);
            console.error(result)
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
            <p className="t32">Favoris</p>
            <div className="FavorisList colum">
                {favorites.map((offer) => (
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
                    <div className="TitleContainer">

                    </div>
                    <div className="DescriptionContainer">

                    </div>
                    <p className={`t4 title  maxLine ${loading ? "loading shimmer" : ""}`}>{loading ? "" : offer.title}</p>

                    <p className={`t6 description maxLine ${loading ? "loading shimmer" : ""}`}>{loading ? "" : offer.description}</p>
                </div>
                </React.Fragment>
                ))}
            </div>
        </div>
    )
}
