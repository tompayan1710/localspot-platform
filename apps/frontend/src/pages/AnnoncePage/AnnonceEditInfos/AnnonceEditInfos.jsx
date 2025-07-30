import { useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AnnonceEditInfos.css";
import { AuthContext } from "../../../components/Auth/authContext/authContext";
import { useTranslation } from "react-i18next";

import Spinner from "../../../components/Spinner/Spinner";
import SaveIconFillWhite from "../../../assets/images/SaveIconFillWhite.png";
import GoBack from "../../../components/GoBack/GoBack";
import { getOfferBySlug } from "../../../services/offers";
import DurationSlider from "../../OfferPage/DurationSlider";

export default function AnnonceEditInfo() {
  const navigate = useNavigate();
  const { slug } = useParams();
  const { t } = useTranslation();

  const { authState } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [form, setForm] = useState({ 
    title: "", 
    description: "",
    duration: "",
    cancellable: false,
    total_capacity: ""
  });
  const [baseForm, setBaseForm] = useState({ 
    title: "", 
    description: "",
    duration: "",
    cancellable: false,
    total_capacity: ""
  });

  // 🔄 Récupération des données depuis l'API
  const fetchOffer = async () => {
    try {
      setIsLoading(true);
      const res = await getOfferBySlug(slug);
      if (!res.success) throw new Error("Offre introuvable");

      const { title, description, duration, cancellable, total_capacity } = res.offer;

      const formattedData = {
        title: title ?? "",
        description: description ?? "",
        duration: duration ?? "",
        cancellable: !!cancellable,
        total_capacity: total_capacity?.toString() ?? ""
      };

      setForm(formattedData);
      setBaseForm(formattedData);
    } catch (err) {
      console.error("Erreur lors du fetch de l'offre :", err);
      alert(err.message || "Erreur lors du chargement de l'offre.");
      navigate("/profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {};

    if (form.title !== baseForm.title) updates.title = form.title.trim();
    if (form.description !== baseForm.description) updates.description = form.description.trim();
    if (form.duration !== baseForm.duration) updates.duration = form.duration.trim();
    if (form.total_capacity !== baseForm.total_capacity) updates.total_capacity = parseInt(form.total_capacity);
    if (form.cancellable !== baseForm.cancellable) updates.cancellable = form.cancellable;

    if (Object.keys(updates).length === 0) {
      alert("Aucune modification détectée.");
      return;
    }

    const formData = new FormData();
    formData.append("offer_slug", slug);
    formData.append("fieldsToUpdate", JSON.stringify(updates));

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/update-info`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur lors de la mise à jour");

      alert("Offre mise à jour !");
      setBaseForm({ ...form }); // ✅ met à jour la base
    } catch (err) {
      console.error("Erreur :", err);
      alert(err.message || "Erreur serveur.");
    }
  };

  useEffect(() => {
    if (!authState.loading && !authState.isAuth) {
      navigate("/login");
    }
  }, [authState.loading, authState.isAuth, navigate]);

  if (authState.loading || isLoading) {
    return <Spinner centerPage />;
  }

  return (
    <div className="EditProfilContainer">
      <GoBack nagigation={`/annonces/${slug}`} text="revenir" />
      <p className="t2">Informations</p>
      <div className="ListInformation">
        <form onSubmit={handleSubmit}>
          <label className="t4">Titre</label>
          <input
            name="title"
            className="InputText"
            value={form.title}
            onChange={handleChange}
          />

          <label className="t4">Description</label>
          <textarea
            name="description"
            className="DescriptionInput"
            value={form.description}
            onChange={handleChange}
            rows={5}
          />

          <label className="t4">Durée</label>
          <DurationSlider
            durations={["15 min", "30 min", "1 h", "2 h", "4 h", "+ 6 h"]}
            setValue={(newDuration) =>
              setForm((prev) => ({ ...prev, duration: newDuration }))
            }
            startValue={baseForm.duration}
          />

          <label className="t4">Nombre maximum de participants</label>
          <div className="CapaciteContainer">
            <input
              type="number"
              name="total_capacity"
              className="InputText"
              value={form.total_capacity}
              onChange={handleChange}
              min={1}
              max={300}
              required
            />
            {/* <p>€</p> */}
            <p className="t6">/ participants</p>
          </div>

          <div className="CancellableContainer">
            <p className="t4">Annulation gratuite</p>
            <p className="t6">Choisissez si vos clients peuvent annuler gratuitement leur réservation</p>

            <div className="toggle-button-group">
              <button
                type="button"
                className={form.cancellable ? "active" : ""}
                onClick={() => setForm(prev => ({ ...prev, cancellable: true }))}
              >
                <p className="t6">Oui</p>
              </button>
              <button
                type="button"
                className={!form.cancellable ? "non active" : ""}
                onClick={() => setForm(prev => ({ ...prev, cancellable: false }))}
              >
                <p className="t6">Non</p>
              </button>
            </div>
          </div>

          <button type="submit" className="SaveButton">
            <img src={SaveIconFillWhite} alt="Save" />
            <p className="t6">Enregistrer</p>
          </button>
        </form>
      </div>
    </div>
  );
}
