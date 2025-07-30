import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import Spinner from "../../../components/Spinner/Spinner";
import GoBack from "../../../components/GoBack/GoBack";
import { getOfferBySlug } from "../../../services/offers";
import FadeInImage from "../../../components/Utils/FadeInImage";

import "./AnnonceEditPhotos.css"; // à créer pour le style

import crossicon from "../../../assets/images/crossicon.png";
import SaveIconFillWhite from "../../../assets/images/SaveIconFillWhite.png";
import trashBlack from "../../../assets/images/trashBlack.png";
import galleryPhotosIcon from "../../../assets/images/galleryPhotosIcon.png";

export default function AnnonceEditPhotos() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([]); // Liste des URL déjà présentes
  const [newFiles, setNewFiles] = useState([]); // Fichiers ajoutés

  // 🔁 Fetch données
  const fetchPhotos = async () => {
    try {
      setIsLoading(true);
      const res = await getOfferBySlug(slug);
      if (!res.success) throw new Error("Offre introuvable");
      setPhotos(res.offer.image_urls || []);
    } catch (err) {
      alert(err.message || "Erreur");
      navigate("/profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, [slug]);

  // ✅ Ajouter des nouvelles images
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Supprimer les fichiers déjà présents (par nom + taille)
    const newUniqueFiles = files.filter((file) => {
        return !newFiles.some(
        (existing) => existing.name === file.name && existing.size === file.size
        );
    });

    if (newUniqueFiles.length < files.length) {
        alert("⚠️ Certaines images sont déjà sélectionnées.");
    }

    setNewFiles((prev) => [...prev, ...newUniqueFiles]);
    };


  // ❌ Supprimer une image existante
  const handleRemoveExisting = (urlToRemove) => {
    setPhotos((prev) => prev.filter((url) => url !== urlToRemove));
  };

  // ❌ Supprimer une nouvelle image avant envoi
  const handleRemoveNew = (index) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("offer_slug", slug);
    formData.append("remaining_urls", JSON.stringify(photos)); // Les URL conservées
    newFiles.forEach((file) => formData.append("new_photos", file)); // Les nouvelles

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/update-photos`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de l’upload");

        alert("Photos mises à jour !");
        navigate(`/annonces/${slug}`)
    } catch (err) {
      console.error(err);
      alert(err.message || "Erreur serveur");
    }
  };

  if (authState.loading || isLoading) {
    return <Spinner centerPage />;
  }

  return (
    <div className="EditPhotosContainer">
      <GoBack nagigation={`/annonces/${slug}`} text="Revenir" />
      <p className="t2">Modifier les photos</p>

      <form onSubmit={handleSubmit}>
        <p className={"SectionLabel t32"}>Photos actuelles</p>
        <div className="PhotosContainer">
          {photos.map((url, i) => (
            <div key={i} className="photoItem">
              <img src={url} alt={`Image ${i + 1}`} />
              <button type="button" className="deleteBtn" onClick={() => handleRemoveExisting(url)}>
                <FadeInImage src={crossicon} alt="cross icon"/>
              </button>
            </div>
          ))}
        </div>

        <p className={"SectionLabel t32"}>Ajouter de nouvelles photos</p>
        {/* <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        /> */}
        <label className="CreateOfferAddPhotos">
            <img src={galleryPhotosIcon} alt="gallery photos icon"/>
            <p className="t5">Ajouter des photos</p>
            <input
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange} // fonction pour gérer les images
            />
        </label>

        {newFiles.length > 0 && (
        <div className="column">
            {newFiles.map((file, i) => (
            <div key={i} className="NewPhotoItem row">
                <div className="row">
                    <img className={"ImageNew"} src={URL.createObjectURL(file)} alt={`New ${i}`} />
                    <div className="Details column">
                        <p className="t6">{file.type}, {(file.size / 1024).toFixed(0)} KB</p>
                        <p className="t5">{file.name}</p>
                    </div>
                </div>
                <button type="button" className="removeBtn" onClick={() => handleRemoveNew(i)}>
                    <img src={trashBlack} alt="trash icon"/>
                </button>
            </div>
            ))}
        </div>
        )}


        <button type="submit" className="SaveButton">
          <img src={SaveIconFillWhite} alt="Save" />
          <p>Enregistrer</p>
        </button>
      </form>
    </div>
  );
}
