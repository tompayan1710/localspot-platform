import "./Availability.css";
import { useEffect, useState, useRef, useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from '../../../components/Auth/authContext/authContext';
import { GoogleAuthButton } from "../../../components/Auth/GoogleAuthButton"
import Map2DPin from "../../../assets/images/Map2DPin.png";
import VerifyIcon from "../../../assets/images/VerifyIcon.png";
import arrowRight from "../../../assets/images/arrowRight.png";
import arrowLeft from "../../../assets/images/arrowLeft.png";
import GoBack from "../../../components/GoBack/GoBack";
import PopUpBottom from "../../../components/PopUpBottom/PopUpBottom";
import Spinner from "../../../components/Spinner/Spinner";

export default function Availability() {
  const [selectedDate, setSelectedDate] = useState();
  const { slug } = useParams();

  const creneauRef = useRef(null); // ← Étape 1
  const [barStyle, setBarStyle] = useState({ width: 0, angle: 0 });
  const [isOccultView, setIsOccultView] = useState(false);
  const [participantAdult, setParticipantAdult] = useState(4);
  const [participantReduced, setParticipantReduced] = useState(0); 
  const [selectedCreneau, setSelectedCreneau] = useState(0);

  const ParticipantBottomRef = useRef(null); 
  const LoginBottomRef = useRef(null); 
  // 1. Une seule fois au montage, pour mesurer la largeur
  useEffect(() => {
    if (creneauRef.current) {
      const width = creneauRef.current.offsetWidth;
      const height = 70;
      const hypotenuse = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
      const angleDeg = Math.atan2(height, width) * (180 / Math.PI) - 1;
      setBarStyle({ width: hypotenuse, angle: angleDeg });

      console.log("Largeur de CreneauPicker:", width);
      console.log("Hauteur de CreneauPicker:", height);
    }
  }, []); // ✅ vide = déclenché au premier rendu

  // 2. Un autre pour la date sélectionnée
  useEffect(() => {
    if (selectedDate) {
      console.log("Date sélectionnée :", selectedDate);
    }
  }, [selectedDate]);



  /*Login*/
  const { authState } = useContext(AuthContext);

  const TestAuth = () => {
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && authState.isAuth) {
      console.log("🔄 Redirection car non authentifié");
      navigate(`/offer-page/${slug}/payement`);
    }else{
      LoginBottomRef.current.classList.add("open");
      setIsOccultView(true);
    }

  } // ✅ Suivre loading et isAuth



  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  // const { checkAuth } = useContext(AuthContext);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (password.length < 6) {
      setMessage("Veuillez rentrer un mot de passe de plus de 6 caractères");
      setLoading(false);
      setIsSuccess(false);
      return;
    }
  }

  return (
    <div className="AvailabilityContainer">
      <div className="TopDivOpacity"></div>
      <GoBack nagigation={`/offer-page/${slug}/availibility`} scrollTo={""} text={"revenir"}/>
      <div className="TitleContainer">
        <p className="t32">Sélectionnez une date et un créneaux</p>
        <p className="t6">Indiquez quand vous souhaitez participer à cette activité. Les créneaux disponibles s’adapteront automatiquement.</p>
      </div>
      
      <div className="DayPickerContainer">
        <div className="CalendarContainer">
          {/* <p className="t5">Choisissez une date</p> */}
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={[{ before: new Date() }]}
            weekStartsOn={1}
            required
            captionLayout="buttons" // <-- OBLIGATOIRE pour voir les boutons flèches
            components={{
              IconLeft: () => (
                <img
                  src={arrowLeft}
                  alt="Précédent"
                  style={{ width: 18, height: 18, objectFit: "contain" }}
                />
              ),
              IconRight: () => (
                <img
                  src={arrowRight}
                  alt="Suivant"
                  style={{ width: 18, height: 18, objectFit: "contain" }}
                />
              ),
            }}
          />
        </div>
        
        <div className="CreneauPicker" ref={creneauRef}>
          <p className="t5">Creneaux disponnibles : </p>
          <div className="CreneauItem Full"  onClick={() => {
            setSelectedCreneau(undefined)
          }}>
            <div className="NoCreneau" 
            style={{
              '--bar-width': `${barStyle.width}px`,
              '--bar-angle': `${barStyle.angle}deg`
            }}></div>
            <div>
              <p className="t6">Il reste actuellement :</p>
              <p className="t6">5 places</p>
            </div>
            <p className="t5">10:30 - 12:30</p>
          </div>
          <div  className={`CreneauItem ${selectedCreneau === 1 ? "selected" : ""}`} onClick={() => {setSelectedCreneau(1)}}>
            <div>
              <p className="t6">Il reste actuellement :</p>
              <p className="t6">5 places</p>
            </div>
            <p className="t5">10:30 - 12:30</p>
          </div>
          <div 
          className={`CreneauItem ${selectedCreneau === 2 ? "selected" : ""}`} onClick={() => {setSelectedCreneau(2)}}>
            <div>
              <p className="t6">Il reste actuellement :</p>
              <p className="t6">5 places</p>
            </div>
            <p className="t5">10:30 - 12:30</p>
          </div>
          <div className={`CancelContainer ${selectedCreneau ? "selected" : ""}`}>
            <img src={VerifyIcon} alt="verify icon"/>
            <p className="t6">Date limite d’annulation gratuite : 26 juin à 16:45.</p>
          </div>
        </div>
      </div>
      {/* {selectedDate && (
        <p className="t5">
          Vous avez choisi le : {selectedDate.toLocaleDateString()}
        </p>
      )} */}
      {/* <p className="t6">Largeur mesurée : {creneauWidth}px</p> */}
      <div className="ParticipantContainer" onClick={() => {
          ParticipantBottomRef.current.classList.add("open")
          setIsOccultView(true);
        }}>
        <div>
          <div className="row">
            <p className="t5">Participants :</p> 
            <p className="t5">2</p>
          </div>
          <p className="t6">×2 adult</p>
        </div>
        <button>
          <p className="t6">Modifier</p>
          {/* <img src={arrowRight} alt="arrow right"/> */}
        </button>
        {/* <img src={arrowRight} alt="arrow right"/> */}
      </div>
      <div className="Availline"></div>
      {/* <div className="row">
        <img src={dureeIcon} alt="duree icon"/>
        <p className="t6">Durée 2h</p>
      </div>
      <div className="Availline"></div> */}
      <div className="addresseContainer">
        <img src={Map2DPin} alt="adresse icon"/>
        <p className="t6">04 place Godeau, Vence, France</p>
      </div>
      <div className="payementInfoContainer">
        <div className="row">
          <p className="t6">×2&nbsp;&nbsp;&nbsp;&nbsp;adult</p>
          <p className="t6">145.00 €</p>
        </div>
         <div className="row">
          <p className="t6">×2&nbsp;&nbsp;&nbsp;&nbsp;réduit</p>
          <p className="t6">145.00 €</p>
        </div>
        <div className="payementSeparation"></div>
        <div className="row">
          <p>TOTAL</p>
          <p className="t32">350€</p>
        </div>  
        <div className="payementSeparation"></div>
        <p className="t6">Toutes taxes comprises</p>
      </div>
      <button className="SuivantButton" onClick={() => TestAuth()}>
        Suivant
      </button>

      <PopUpBottom 
        onClose={() => {
          ParticipantBottomRef.current.classList.remove("open");
          setIsOccultView(false);
        }}
        title={(
          <p className="t5">Ajouter des participants</p>
        )}
        ref={ParticipantBottomRef}
      >
        <>
          <p className="t6">il reste actuellement <strong className={`${10<3 ? "short" : ""}`}>10 places</strong></p>
          <div className="AnimationHuman">

          </div>
          <div className="rowTotal">
            <p className="t5">Participants :</p> 
            <p className="t5">2</p>
          </div>
          <div className="rowAddParticipant">
            <div className="column">
              <p className="t5">Adult</p>
              <p className="t6">18 ans et plus</p>
            </div>
            <div className="row">
              <button className="buttonParticipant" onClick={() => {
                setParticipantAdult((prev) => prev - 1)
              }}>
                <p className="t3">-</p>
              </button>
              <p className="t4">{participantAdult}</p>
              <button className="buttonParticipant" onClick={() => {
                setParticipantAdult((prev) => prev + 1)
              }}>
                <p className="t3">+</p>
              </button>
            </div>
          </div>
          <div className="rowAddParticipant">
            <div className="column">
              <p className="t5">Tarif réduit</p>
              <p className="t6">Moins de 18 ans</p>
            </div>
            <div className="row">
              <button className="buttonParticipant" onClick={() => {
                setParticipantReduced((prev) => prev - 1)
                }}>
                <p className="t3">-</p>
              </button>
              <p className="t4">{participantReduced}</p>
              <button className="buttonParticipant" onClick={() => {setParticipantReduced((prev) => prev + 1)}}>
                <p className="t3">+</p>
              </button>
            </div>
          </div>
        </>
      </PopUpBottom>

      <PopUpBottom
        onClose={() => {
          LoginBottomRef.current.classList.remove("open");
          setIsOccultView(false);
        }}
        title={<p className="t5">Connectez-vous ou inscrivez-vous pour continuer</p>}
        ref={LoginBottomRef}
      >
        <div className="LoginContainer">
          <GoogleAuthButton />
          <div className="orcontainer">
            <div className="orhline"></div>
            <p className="t6">ou</p>
            <div className="orhline"></div>
          </div>

          <form className="emailPasswordForm" onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className={`t6 errorMessage ${isSuccess ? "succesColor" : "errorColor"} ${message ? "visible" : ""}`}>
              {message}
            </p>
            <button type="submit">
              {loading ? "..." : "Continuer"}
              {loading && <Spinner />}
            </button>
          </form>
        </div>
      </PopUpBottom>

      <PopUpBottom
        onClose={() => {
          // LoginBottomRef.current.classList.remove("open");
          setIsOccultView(false);
        }}
        title={<p className="t5">Veuillez accepter les conditions générales pour continuer</p>}
        // ref={LoginBottomRef}
      >
        <div className="LoginContainer">
          <p className="t6" style={{ margin: "16px 0" }}>
            Pour finaliser votre réservation, vous devez accepter nos conditions générales d’utilisation et de vente.
          </p>
          <p className="t6">
            En poursuivant, vous acceptez nos{" "}
            <a href="/terms-of-service" className="t6" target="_blank" rel="noopener noreferrer">
              Conditions Générales d’Utilisation
            </a>{" "}
            ainsi que nos{" "}
            <a href="/terms-and-conditions-of-sale" className="t6" target="_blank" rel="noopener noreferrer">
              Conditions Générales de Vente
            </a>.
          </p>
        </div>
      </PopUpBottom>


      <div className={`occultView ${isOccultView ? "open" : ""}`} onClick={() => {
        ParticipantBottomRef.current.classList.remove("open");
        LoginBottomRef.current.classList.remove("open");
        setIsOccultView(false);
      }}></div>
    </div>
  );
}
