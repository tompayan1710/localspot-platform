import "./Availability.css";
import { useEffect, useState, useRef, useContext } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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
  const [selectedDate, setSelectedDate] = useState(new Date);
  const { slug } = useParams();
  const location = useLocation();
  const price = location.state?.price;
  const OfferIsCancellable = location.state?.OfferIsCancellable;
  const title = location.state?.title;
  const adresse = location.state?.adresse;
  const total_capacity = location.state?.total_capacity;


  const [participantAdult, setParticipantAdult] = useState(location.state?.participantAdult || 2);
  const [participantReduced, setParticipantReduced] = useState(location.state?.participantReduced || 1); 
                  
  const creneauRef = useRef(null); // ← Étape 1
  const [barStyle, setBarStyle] = useState({ width: 0, angle: 0 });
  const [isOccultView, setIsOccultView] = useState(false);
  const [selectedCreneau, setSelectedCreneau] = useState({index: "no-selected"});

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

    // setSelectedDate(new Date);
  }, []); // ✅ vide = déclenché au premier rendu

  // 2. Un autre pour la date sélectionnée



  

  /*Login*/
  const { authState } = useContext(AuthContext);

  const TestAuth = () => {
    if(selectedCreneau.index==="no-selected"){
      alert("Veuillez sélectionner un créneau");
      return;
    }
    // ✅ Redirection uniquement lorsque loading est terminé
    console.warn("ACTUELLEMENT mon loading est :", authState.loading, " IsAuth :", authState.isAuth)
    if (!authState.loading && authState.isAuth) {
      navigate(`/offer-page/${slug}/payement`, {
        state: {
          title: title,
          adresse: adresse,
          price: price,
          OfferIsCancellable: OfferIsCancellable,
          participantAdult: participantAdult,
          participantReduced: participantReduced,
          start_hour: selectedCreneau.slot.from,
          end_hour: selectedCreneau.slot.to,
          date: selectedDate,
          total_capacity: total_capacity,
        }
      });
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

  const [exceptionalAvailable, setExceptionalAvailable] = useState({});
  const [unavailable, setUnavailable] = useState({});

  const [availability, setAvailability] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: []
  });

  const [slots, setSlots] = useState([]);

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

  const isToday = (selectedDate) => {
    if (!selectedDate) return false;

    const today = new Date();
    return (
      selectedDate.getFullYear() === today.getFullYear() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getDate() === today.getDate()
    );
  };

  const getDisponnibility = async (slug) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/availibility/getall?slug=${slug}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      });
      const {status, recurring, exceptionalAvailable, exceptionalUnavailable } = await response.json();
      console.warn("✅LES DONNES");
      console.warn(recurring);
      console.warn(exceptionalAvailable);
      console.warn(exceptionalUnavailable);
      setAvailability((prev) => {
        const newAvailability = {...prev};

        for (const day of Object.keys(recurring)) {
          const newSlots = recurring[day].map(slot => ({
            ...slot,
            id: Date.now() + Math.random() // 👈 unique id généré
          }));
          newAvailability[day] = newSlots;
          }
          return newAvailability;
        })

        setExceptionalAvailable((prev) => {
          const newExceptionalAvailable = {...prev};

          for (const day of Object.keys(exceptionalAvailable)) {
            const newSlots = exceptionalAvailable[day].map(slot => ({
              ...slot,
              id: Date.now() + Math.random() // 👈 unique id généré
            }));
            newExceptionalAvailable[day] = newSlots;
          }
          return newExceptionalAvailable;
        })

        setUnavailable(exceptionalUnavailable);

        console.log("Réponse API :", status, recurring, exceptionalAvailable, exceptionalUnavailable);
        } catch (error) {
          console.error("Erreur lors de l’envoi :", error);
      }
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/`);
    }


  

  useEffect(() => {
    console.log(location.state);
    if (!location.state || !location.state.price) {
      console.warn("❌ Aucun state ou price reçu !");
      navigate(`/offer-page/${slug}`);
    }
    getDisponnibility(slug);
  }, [])


  const getTotalReserved = async (slug, date, start_hour, end_hour) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reservations/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          offer_slug: slug,
          date: date,
          start_hour,
          end_hour
        })
      });

      const data = await response.json();
      console.warn("🔍 Data backend :", data);

      return data; // ✅ OBLIGATOIRE !
    } catch (error) {
      console.error("❌ Erreur getTotalReserved front :", error);
      return { found: false }; // ✅ Toujours retourner un objet même en cas d'erreur
    }
  };


  const getSlotsOfByDate = async () => {
    console.log("Premier rendue")
    if (selectedDate) {
      const formattedDate = selectedDate.toLocaleDateString('fr-CA'); // → "2025-07-25"
      const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      const dayOfWeek = days[selectedDate.getDay()];

      console.log("✅ Date sélectionnée :", formattedDate);
      console.log("🕐 Jour de la semaine :", dayOfWeek);

      const recurring = availability[dayOfWeek] || [];
      const exceptional = exceptionalAvailable[formattedDate] || [];
      const cancellable = unavailable[formattedDate] || [];

      console.log(recurring);
      console.log(exceptional);
      console.log(cancellable);
      // 🔄 Fusion dans un objet (clé = from-to)
      const slotsObject = {};
      for (const slot of recurring) {
        const key = `${slot.from}-${slot.to}`;
        if (!slotsObject[key]) {
          const res = await getTotalReserved(slug, formattedDate, slot.from, slot.to);
          console.log(res)
          slot.total_reserved = res.found ? res.slot.total_reserved : 0;
          // slot.total_reserved = 
          slotsObject[key] = slot;
        }
      }

      for (const slot of exceptional) {
        const key = `${slot.from}-${slot.to}`;
        slotsObject[key] = slot;
      }

      for (const slot of cancellable) {
        const key = `${slot.from}-${slot.to}`;
        if (slotsObject[key]) {
          slot.cancallable = true;
          slotsObject[key] = slot;
        }
      }
      

      console.log("📦 Objet des créneaux fusionnés :", slotsObject);

      setSlots(() => {
        const slotstemp = []
        Object.entries(slotsObject).map(([_, slot]) => {
          slotstemp.push(slot);
        })
        return slotstemp;
      })
      
      // setSlots
    }
  }

  useEffect(() => {
    const fetchSlots = async () => {
      setSelectedCreneau({ index: "no-selected" });
      await getSlotsOfByDate();
    };
    fetchSlots();
  }, [selectedDate]);


  // 1️⃣ Quand la date change → comme tu fais déjà


// 2️⃣ Quand les données changent → pour relancer le calcul une fois les créneaux chargés
  useEffect(() => {
    getSlotsOfByDate();
  }, [availability, exceptionalAvailable, unavailable]);


  useEffect(() => {
    console.log("SLOTS !")
    console.log(slots);
  }, [slots])

  const [datesWithSlot, setDatesWithSlot] = useState([]);

useEffect(() => {
  const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

  const result = [];

  for (let i = 0; i < 30; i++) {
    const date = new Date(); // aujourd'hui
    date.setDate(date.getDate() + i); // +i jours

    const formatted = date.toLocaleDateString('fr-CA'); // "YYYY-MM-DD"
    const dayName = daysOfWeek[date.getDay()];

    const recurring = availability[dayName] || [];
    const exceptional = exceptionalAvailable[formatted] || [];

    // S'il y a au moins un créneau dans l'un ou l'autre
    if ((recurring && recurring.length > 0) || (exceptional && exceptional.length > 0)) {
      result.push(date);
    }
  }

  setDatesWithSlot(result);
}, [availability, exceptionalAvailable]);

  return (
    <div className="AvailabilityContainer">
      <div className="TopDivOpacity"></div>
      <GoBack nagigation={`/offer-page/${slug}`} scrollTo={""} text={"revenir"}/>
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
            modifiers={{
              hasSlots: datesWithSlot,
            }}
            modifiersClassNames={{
              hasSlots: `day-has-slots green`,
            }}
          />
        </div>
        
        <div className="CreneauPicker" ref={creneauRef}>
          <p className="t5">Creneaux disponnibles : </p>
          {
            slots.length > 0 ?
            slots.map((slot,index) => (
              <div key={index} className={`CreneauItem ${selectedCreneau.index === `${selectedDate}-${index}` ? "selected" : ""} ${slot.cancallable ? "Full" : ""}`} 
                    onClick={() => {
                      if(slot.cancallable){
                        setSelectedCreneau({index: "no-selected"})
                      }else{
                        setSelectedCreneau({index : `${selectedDate}-${index}`, slot: slot})
                      }}}>
                {
                  slot.cancallable ?
                    <div className="NoCreneau" 
                    style={{
                      '--bar-width': `${barStyle.width}px`,
                      '--bar-angle': `${barStyle.angle}deg`
                    }}></div>
                    : <></>
                }
                <div>
                  <p className="t6">Il reste actuellement :</p>
                  <p className={`${total_capacity - slot.total_reserved > 4 ? "greenColor" : "orangeColor"} t6`}>{total_capacity - slot.total_reserved} places</p>
                </div>
                <p className="t5">{slot.from} - {slot.to}</p>
              </div>
            ))
             :
            <div className="NoneSlote">
              <p className="t5">Aucun créneau n'est disponible pour ce jour.</p>
            </div>
          }
          
          <div className={`CancelContainer ${selectedCreneau.index!=="no-selected" && OfferIsCancellable ? "selected" : ""}`}>
            <img src={VerifyIcon} alt="verify icon"/>
            <p className="t6">
              Date limite d’annulation gratuite : {new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })} {selectedCreneau.slot ? ` à ${selectedCreneau.slot.from}` : "00:00"}.
            </p>
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
            <p className="t5">{participantAdult + participantReduced}</p>
          </div>
          <p className="t6">
            ×{participantAdult} adult
            {participantReduced > 0 && `\u00A0\u00A0×${participantReduced} reduced`}
          </p>
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
          <p className="t6">{selectedDate.toDateString()}</p>
          {/* <p className="t6">{selectedCreneau.slot.from} - {selectedCreneau.slot.to}</p> */}
        </div>
        <div className="payementSeparation"></div>
        <div className="row">
          <p className="t6">×{participantAdult}&nbsp;&nbsp;&nbsp;&nbsp;adult</p>
          <p className="t6">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(price * participantAdult)}
          </p>

        </div>
        {
          participantReduced>0 ?
          <div className="row">
            <p className="t6">×{participantReduced}&nbsp;&nbsp;&nbsp;&nbsp;reduced</p>
          <p className="t6">
            {new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(price * participantReduced)}
          </p>
          </div> 
          : <></>
        }
        <div className="payementSeparation"></div>
        <div className="row">
          <p>TOTAL</p>
          <p className="t32">{new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR',
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            }).format(price * (participantReduced + participantAdult))}
          </p>
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
          <p className="t6">En tout il y a <strong>{total_capacity} places</strong></p>
          <p className="t6">il reste actuellement <strong className={`${10<3 ? "short" : ""}`}>10 places</strong></p>
          <div className="AnimationHuman">

          </div>
          <div className="rowTotal">
            <p className="t5">Participants :</p> 
            <p className="t5">{participantAdult + participantReduced}</p>
          </div>
          <div className="rowAddParticipant">
            <div className="column">
              <p className="t5">Adult</p>
              <p className="t6">18 ans et plus</p>
            </div>
            <div className="row">
              <button className="buttonParticipant" disabled={participantAdult === 1} onClick={() => {
                setParticipantAdult((prev) => prev - 1)
              }}>
                <p className="t3">-</p>
              </button>
              <p className="t4">{participantAdult}</p>
              <button className="buttonParticipant" disabled={participantAdult === 10} onClick={() => {
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
              <button className="buttonParticipant" disabled={participantReduced === 0} onClick={() => {
                setParticipantReduced((prev) => prev - 1)
                }}>
                <p className="t3">-</p>
              </button>
              <p className="t4">{participantReduced}</p>
              <button className="buttonParticipant" disabled={participantReduced === 10} onClick={() => {setParticipantReduced((prev) => prev + 1)}}>
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
