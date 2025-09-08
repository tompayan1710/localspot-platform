import Validate from "../../../assets/images/validateGreen.png"

import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"; // pour récupérer slug & token de l'URL

import "./ValidateReservation.css"
import Footer from "../../../components/Footer/Footer";

export default function ValidateReservation() { 
  const [loading, setLoading] = useState(true);
  const [isValid, setIsValid] = useState(null);
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");
  const token = searchParams.get("token_validate");

  const validate = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reservation_individual/validate?slug=${slug}&token_validate=${token}`
      );

      const data = await res.json();

      if (!res.ok || !data.valid) {
        setIsValid(false);
      } else {
        setIsValid(true);
        setReservation(data.reservation);
      }
    } catch (err) {
      console.error("❌ Erreur validation ticket:", err);
      setIsValid(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (slug && token) {
      validate();
    }
  }, [slug, token]);

  useEffect(() => {
    console.log(reservation)
  }, [reservation]);

  if (loading) return <p>⏳ Vérification en cours...</p>;

  if (!isValid) return <p>Ticket invalide</p>;

  return (
    // <div id="ResValidate">
    //   <p className="t2">Ticket validé</p>
    //   <p>Nom : {reservation.name}</p>
    //   <p>Email : {reservation.email}</p>
    //   <p>Offre : {reservation.offer_slug}</p>
    // </div>
    <>
      <div className="ResValidate">
        <div className="SuccesIcon">
            <img src={Validate} alt="Validate White Icon"/>
          </div>
        <p className="t3 bold intro">Réservation validée</p>
        <p className="SuccesMessage t6">
          {/* Votre paiement a été validé avec succès.<br></br>   */}
          Cette réservation est valide...
          {/* Vous recevrez un e-mail de confirmation contenant tous les détails de votre réservation. */}
        </p>
        <div className="InfoValid">
          <p className="t4 bold">Order details</p>
          <div className="row">
            <p className="t6">Order number</p>
            <p className="t6 bold">REF-{reservation.id}</p>
          </div>
          <div className="row">
            <p className="t6">Date</p>
            <p className="t6 bold">REF-{reservation.date}</p>
          </div>
        </div>
      </div>
      <Footer paddingBottom={"90px"} isOtherTheme={true}/>
    </>
  );
}
