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
import PopUpLogin from "../../../components/Auth/PopUpLogin/PopUpLogin";

export default function Availability() {
  const { slug } = useParams();
  const location = useLocation();

  const today = new Date().toLocaleDateString('fr-CA');
  const [selectedDate, setSelectedDate] = useState(location.state?.date || today);

  const price = location.state?.price;
  const OfferIsCancellable = location.state?.OfferIsCancellable;
  const title = location.state?.title;
  const adresse = location.state?.adresse;
  const total_capacity = location.state?.total_capacity;
  const offer_provider_id = location.state?.offer_provider_id;

  const [participantAdult, setParticipantAdult] = useState(location.state?.participantAdult || 2);
  const [participantReduced, setParticipantReduced] = useState(location.state?.participantReduced || 1); 
                  
  const creneauRef = useRef(null); // ← Étape 1
  const [barStyle, setBarStyle] = useState({ width: 0, angle: 0 });
  const [isOccultView, setIsOccultView] = useState(false);
  const [selectedCreneau, setSelectedCreneau] = useState(location.state?.selectedCreneau || {index: "no-selected"});
  const [datesWithSlots, setDatesWithSlots] = useState({});

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
      navigate(`/offer-page/${slug}/add-info`, {
        state: {
          title: title,
          adresse: adresse,
          price: price,
          offer_provider_id: offer_provider_id,
          OfferIsCancellable: OfferIsCancellable,
          participantAdult: participantAdult,
          participantReduced: participantReduced,
          start_hour: selectedCreneau.slot.from,
          end_hour: selectedCreneau.slot.to,
          date: selectedDate,
          total_capacity: total_capacity,
          selectedCreneau: selectedCreneau
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




  const [disponnibility, setDisponnibility] = useState({});

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
  
      console.log("Réponse API :", status, recurring, exceptionalAvailable, exceptionalUnavailable);


      const DataReservation= await getCreneauReserved(slug);

      if(!DataReservation.success){
        console.error("❌: Erreur pendant la récupération des réservations");
        return;
      }
      const allcreneau =  DataReservation.data
      console.log(allcreneau);

      setDisponnibility(() => {
        const NewDisponnibility = {};
        for (let i = 0; i < 30; i++) {
          const date = new Date(); // aujourd'hui
          date.setDate(date.getDate() + i); // +i jours

          const formattedDate = date.toLocaleDateString('fr-CA'); // "YYYY-MM-DD"
          console.log("✅ ", i , " : ", formattedDate);

          const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
          const dayOfWeek = days[date.getDay()];

          const recurringSlots = recurring[dayOfWeek] || [];
          const exceptional = exceptionalAvailable[formattedDate] || [];
          const cancellable = exceptionalUnavailable[formattedDate] || []
          // 🔄 Fusion dans un objet (clé = from-to)
          const slotsObject = {};
          for (const slot of recurringSlots) {
            const key = `${slot.from}-${slot.to}`;
            if (!slotsObject[key]) {
              // reservedData.data
              // const res = await getTotalReserved(slug, formattedDate, slot.from, slot.to);
              // console.log(res)
              // slot.total_reserved = res.found ? res.slot.total_reserved : 0;
              // slot.total_reserved = 
              slotsObject[key] =  { ...slot};//Pour avoir une ref mémoir différente pour chaque slot de chaque date
            }
          }

          for (const slot of exceptional) {
            const key = `${slot.from}-${slot.to}`;
            slotsObject[key] = slot;
          }

          for (const slot of cancellable) {
            const key = `${slot.from}-${slot.to}`;
            if (slotsObject[key]) {
              // slot.cancallable = true;
              // slotsObject[key] = slot;
              delete slotsObject[key];
            }
          }
        
          
          NewDisponnibility[formattedDate] = slotsObject;
          // setSlots(() => {
          //   const slotstemp = []
          //   Object.entries(slotsObject).map(([_, slot]) => {
          //     slotstemp.push(slot);
          //   })
          //   return slotstemp;
          // })
        }



        // reservedData
        for(const creneau of allcreneau){
          console.log(creneau)
          const creneauDate = new Date(creneau.date)
          const formatedDateCreneau = creneauDate.toLocaleDateString('fr-CA');
          const key = `${creneau.start_hour}-${creneau.end_hour}`;

          if (
            NewDisponnibility[formatedDateCreneau] &&
            NewDisponnibility[formatedDateCreneau][key]
          ) {
            NewDisponnibility[formatedDateCreneau][key].total_reserved = creneau.total_reserved;
          } else {
            console.warn("❌ Créneau non trouvé dans disponibilités : ", formatedDateCreneau, key);
          }
        }


        getValidDates(NewDisponnibility);


        // console.log(NewDisponnibility)
        return NewDisponnibility
      })
      } catch (error) {
          console.error("Erreur lors de l’envoi :", error);
      }
        // const response = await fetch(`${process.env.REACT_APP_API_URL}/`);
    }


  const getValidDates = (NewDisponnibility) => {
    const validDates = {};

    Object.entries(NewDisponnibility).forEach(([dateStr, slotsObj]) => {
      const slots = Object.values(slotsObj);
      const notCancallableSlots = slots.filter(slot => !slot.cancallable);

      const nb_participants = participantAdult + participantReduced;
      const validSlots = notCancallableSlots.filter(slot => {
        const places_disponnibles = total_capacity - (slot.total_reserved || 0);
        return places_disponnibles >= nb_participants;
      });

      if (validSlots.length > 0) {
        validDates[dateStr] = 'green'; // point vert si au moins un slot valide
      } else if (slots.length > 0) {
        validDates[dateStr] = 'red'; // point rouge si créneaux mais tous cancellables
      }
    });

    setDatesWithSlots(validDates);
  }
  
  useEffect(() => {
    getValidDates(disponnibility);

    if (!Object.keys(disponnibility).length) return;
    if(selectedCreneau.index==="no-selected"  || !selectedCreneau.slot){
      return;
    }else{
      const creneauSlot = selectedCreneau.slot
      const slot = disponnibility[selectedDate][`${creneauSlot.from}-${creneauSlot.to}`]
      if(slot.total_reserved) {
        if(slot.total_reserved + participantAdult + participantReduced > total_capacity) setSelectedCreneau({index: "no-selected"});
      } else if(participantAdult+participantReduced > total_capacity){
        setSelectedCreneau({index: "no-selected"});
      }
    }
  }, [participantAdult, participantReduced])


  const getCreneauReserved = async (slug) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/reservations/getall?offer_slug=${slug}`, {
        method: "GET",
      });

      const data = await response.json();
      console.warn("🔍 Data backend :", data);

      return data; // ✅ OBLIGATOIRE !
    } catch (error) {
      console.error("❌ Erreur getTotalReserved front :", error);
      return {}; // ✅ Toujours retourner un objet même en cas d'erreur
    }
  };



  useEffect(() => {
    console.log(location.state);
    if (!location.state || !location.state.price) {
      console.warn("❌ Aucun state ou price reçu !");
      navigate(`/offer-page/${slug}`);
    }
    const fetchData = async () => {
      await getDisponnibility(slug);
    }
    fetchData();
  }, [])


  useEffect(() => {
    console.warn(disponnibility);
  }, [disponnibility])
  

  const lastDate = new Date();
  lastDate.setDate(new Date().getDate() + 31);
  const dateToCompare = new Date(selectedDate);
  const isTooFar = dateToCompare > lastDate;

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
            selected={new Date(selectedDate)}
            onSelect={(date) => {
              setSelectedDate(date ? date.toLocaleDateString('fr-CA') : today)
              setSelectedCreneau({index: "no-selected"})
            }}
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
              hasGreenSlot: Object.keys(datesWithSlots).filter(dateStr => datesWithSlots[dateStr] === 'green').map(dateStr => new Date(dateStr)),
              hasRedSlot: Object.keys(datesWithSlots).filter(dateStr => datesWithSlots[dateStr] === 'red').map(dateStr => new Date(dateStr)),
            }}
            modifiersClassNames={{
              hasGreenSlot: 'day-has-slots green',
              hasRedSlot: 'day-has-slots red',
            }}         
          />
        </div>
        
        <div className="CreneauPicker" ref={creneauRef}>
          <p className="t5">Creneaux disponnibles : </p>
          {
            isTooFar ? <div className="NoneSlote">
              <p className="t5">Clara ma copine d'amour</p>
            </div>
            :
            disponnibility[selectedDate] && Object.keys(disponnibility[selectedDate]).length > 0 ? (
              Object.values(disponnibility[selectedDate]).map((slot, index) => {

                const places_disponnibles = total_capacity - (slot.total_reserved || 0);
                const nb_participants = participantAdult + participantReduced;
                const isReservable = places_disponnibles >= nb_participants;

                return (
                <div key={index} 
                  className={`CreneauItem ${selectedCreneau.index === `${selectedDate}-${index}` ? "selected" : ""} 
                              ${places_disponnibles === 0 && "complete"} ${!isReservable && "notReservable" }`} 
                      onClick={() => {
                        if(!isReservable || selectedCreneau.index === `${selectedDate}-${index}`){
                          setSelectedCreneau({index: "no-selected"})
                        }else{
                          setSelectedCreneau({index : `${selectedDate}-${index}`, slot: slot})
                        }}}>
                  {
                    places_disponnibles === 0 &&
                    <>
                    <div className="CompleteOverlay">
                      <p className="t5 bold">COMPLET</p>
                    </div>
                    <div className={`NoCreneau`}  
                      style={{
                        '--bar-width': `${barStyle.width}px`,
                        '--bar-angle': `${barStyle.angle}deg`,
                    }}></div>
                    </>
                    
                  }
                  <div className="CreneauContent">
                    { 
                      isReservable ?
                        <>
                        <div>
                          <p className="t6">Il reste actuellement :</p>
                          <p className={`greenColor t6`}>{places_disponnibles} places</p>
                        </div>
                        </>
                        : 
                        <>
                        {
                          places_disponnibles!==0 &&
                          <div className={`NoCreneau`}  
                          style={{
                            '--bar-width': `${barStyle.width}px`,
                            '--bar-angle': `${barStyle.angle}deg`,
                        }}></div>
                        }
                      
                        <div>
                          <p className="t6">Il reste actuellement :</p>
                          <p className={`redColor t6`}>{places_disponnibles} places</p>
                          <p className={`redColor t6`}> Vous êtes trop nombreux.</p>
                        </div>
                        </>
                    }
                    <p className="t5">{slot.from} - {slot.to}</p>
                  </div>
                </div>
                )
              }))
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
          <p className="t6">{selectedDate}</p>
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
          {/* <p className="t5">En tout il y a <strong>{total_capacity} places</strong></p>
          <div className="AnimationHuman">

          </div> */}
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
                setParticipantAdult((prev) => prev - 1);
              }}>
                <p className="t3">-</p>
              </button>
              <p className="t4">{participantAdult}</p>
              <button className="buttonParticipant" disabled={participantAdult === 10} onClick={() => {
                setParticipantAdult((prev) => prev + 1);
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
                setParticipantReduced((prev) => prev - 1);
                }}>
                <p className="t3">-</p>
              </button>
              <p className="t4">{participantReduced}</p>
              <button className="buttonParticipant" disabled={participantReduced === 10} onClick={() => {
                setParticipantReduced((prev) => prev + 1);
                }}>
                <p className="t3">+</p>
              </button>
            </div>
          </div>
        </>
      </PopUpBottom>


      <PopUpLogin setIsOccultView={setIsOccultView} state={{
            title: title,
            adresse: adresse,
            price: price,
            OfferIsCancellable: OfferIsCancellable,
            participantAdult: participantAdult,
            participantReduced: participantReduced,
            start_hour: selectedCreneau.slot?.from || "",
            end_hour: selectedCreneau.slot?.to || "",
            date: selectedDate,
            total_capacity: total_capacity,
            selectedCreneau: selectedCreneau,
          }} 
          googleRedirectRoute={`/offer-page/${slug}/payment`}
          navigateAfterTo={`/offer-page/${slug}/payment`}
          navigateStateToPass={{                         // 🔁 state à passer à la navigation
            title,
            adresse,
            price,
            OfferIsCancellable,
            participantAdult,
            participantReduced,
            start_hour: selectedCreneau.slot?.from || "",
            end_hour: selectedCreneau.slot?.to || "",
            date: selectedDate,
            total_capacity,
            selectedCreneau: selectedCreneau
          }}
          ref={LoginBottomRef}/>
      {/* <PopUpBottom
        onClose={() => {
          LoginBottomRef.current.classList.remove("open");
          setIsOccultView(false);
        }}
        title={<p className="t5">Connectez-vous ou inscrivez-vous pour continuer</p>}
        ref={LoginBottomRef}
      >
        <div className="LoginContainer">
          <GoogleAuthButton state={{
            title: title,
            adresse: adresse,
            price: price,
            OfferIsCancellable: OfferIsCancellable,
            participantAdult: participantAdult,
            participantReduced: participantReduced,
            start_hour: selectedCreneau.slot?.from || "",
            end_hour: selectedCreneau.slot?.to || "",
            date: selectedDate,
            total_capacity: total_capacity,
          }}
          redirectRoute={`/offer-page/${slug}/payment`}
          />
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
      </PopUpBottom> */}

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
