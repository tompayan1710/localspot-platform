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
    import warningRed from "../../../assets/images/warningRed.png";

    import GoBack from "../../../components/GoBack/GoBack";
    import PopUpBottom from "../../../components/PopUpBottom/PopUpBottom";
    import Spinner from "../../../components/Spinner/Spinner";
    import PopUpLogin from "../../../components/Auth/PopUpLogin/PopUpLogin";
    import { useTranslation } from "react-i18next";


    export default function Availability() {
      const { slug } = useParams();
      const location = useLocation();
      const { t, i18n } = useTranslation();
      const lang = (i18n.language || "fr").split("-")[0]; 

      const today = new Date().toLocaleDateString('fr-CA');
      const [selectedDate, setSelectedDate] = useState(location.state?.date || today);

      // const price = location.state?.price;
      // const OfferIsCancellable = location.state?.OfferIsCancellable;
      const OfferIsCancellable = false;
      const title = location.state?.title;
      const adresse = location.state?.adresse;
      const total_capacity = location.state?.total_capacity;
      const offer_provider_id = location.state?.offer_provider_id;


      const [participantAdult, setParticipantAdult] = useState(location.state?.participantAdult || 2);
      const [participantChild, setParticipantChild] = useState(location.state?.participantChild || 0);
      const [participantInfant, setParticipantInfant] = useState(location.state?.participantInfant || 0);

      const pricing = location.state?.pricing || {};
      const id_hote = location.state?.id_hote;       
      
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
              // price: price,
              offer_provider_id: offer_provider_id,
              id_hote: id_hote,
              OfferIsCancellable: OfferIsCancellable,
              participantAdult: participantAdult,
              participantChild: participantChild,
              participantInfant: participantInfant,
              pricing: pricing,
              start_hour: selectedCreneau.slot.from,
              end_hour: selectedCreneau.slot.to,
              date: selectedDate,
              total_capacity: total_capacity,
              selectedCreneau: selectedCreneau,
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


      // helper global dans le composant
      const capacityUnits = (a, c, i, adultBand, childBand, infantBand) =>
        (adultBand?.counts_toward_capacity ? a : 0) +
        (childBand?.counts_toward_capacity ? c : 0) +
        (infantBand?.counts_toward_capacity ? i : 0);

      // usage
      // const nb_participants = capacityUnits(participantAdult, participantChild, participantInfant, adult, child, infant);


      // const capacityUnits = (a, c, i) =>
      //   (adult?.counts_toward_capacity ? a : 0) +
      //   (child?.counts_toward_capacity ? c : 0) +
      //   (infant?.counts_toward_capacity ? i : 0);


      const getValidDates = (NewDisponnibility) => {
        const validDates = {};

        Object.entries(NewDisponnibility).forEach(([dateStr, slotsObj]) => {
          const slots = Object.values(slotsObj);
          const notCancallableSlots = slots.filter(slot => !slot.cancallable);

          
          // const nb_participants = participantAdult + participantChild;
          // const nb_participants = capacityUnits(participantAdult, participantChild, participantInfant);
          const nb_participants = capacityUnits(participantAdult, participantChild, participantInfant, adult, child, infant);

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
          const slot = disponnibility[selectedDate][`${creneauSlot.from}-${creneauSlot.to}`];
          
          // const nb_participants = capacityUnits(participantAdult, participantChild, participantInfant);
          const nb_participants = capacityUnits(participantAdult, participantChild, participantInfant, adult, child, infant);

          if (slot.total_reserved) {
            if (slot.total_reserved + nb_participants > total_capacity) setSelectedCreneau({ index: "no-selected" });
          } else if (nb_participants > total_capacity) {
          // if(slot.total_reserved) {
          //   if(slot.total_reserved + participantAdult + participantChild > total_capacity) setSelectedCreneau({index: "no-selected"});
          // } else if(participantAdult+participantChild > total_capacity){
            setSelectedCreneau({index: "no-selected"});
          }
        }
      }, [participantAdult, participantChild, participantInfant])


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
        const hasAnyPricing = Boolean(location.state?.pricing?.adult || location.state?.pricing?.child || location.state?.pricing?.infant);
        if (!location.state || !hasAnyPricing) {
          console.error("❌ Aucun state ou price reçu !");
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


      const plural = (n, sing, plur) => (n === 1 ? sing : plur);


    // Helpers (dans ton composant ou dans un util)
        const yearsLabel = t('years');
        const andUpLabel = t('and_up');
        const toLabel = t('to');

        const formatAgeRange = (band) => {
          if (!band) return '';
          const { age_min: min, age_max: max } = band;

          // Tous âges
          if (min == null && max == null) return t('all_ages');

          // ≤ max ans
          if (min == null && max != null) return `≤ ${max} ${yearsLabel}`;

          // min ans et plus
          if (min != null && max == null) return `${min} ${yearsLabel} ${andUpLabel}`;

          // min à max ans
          return `${min} ${toLabel} ${max} ${yearsLabel}`;
        };

        // Raccourcis
        const adult = pricing.adult;
        const child = pricing.child;
        const infant = pricing.infant;

        // Min/Max UI (respecte max_per_booking si défini, sinon 20 par défaut)
        const ADULT_MIN = adult ? 1 : 0;
        const CHILD_MIN = 0;
        const INFANT_MIN = 0;

        const ADULT_MAX = adult?.max_per_booking ?? 20;
        const CHILD_MAX = child?.max_per_booking ?? 20;
        const INFANT_MAX = infant?.max_per_booking ?? 20;



      // Libellés au pluriel
      const labels = {
        adult:  t('Adults', 'Adultes'),
        child:  t('Children', 'Enfants'),
        infant: t('Infants', 'Bébés'),
      };

      const joinFr = (arr) =>
        arr.length === 1 ? arr[0]
        : arr.length === 2 ? `${arr[0]} et ${arr[1]}`
        : `${arr.slice(0,-1).join(', ')} et ${arr.slice(-1)[0]}`;

      const buildNoSeatMessage = (adultBand, childBand, infantBand, counts) => {
        const cats = [];
        if (adultBand  && adultBand.counts_toward_capacity  === false && counts.adult  > 0) cats.push(labels.adult.toLowerCase());
        if (childBand  && childBand.counts_toward_capacity  === false && counts.child  > 0) cats.push(labels.child.toLowerCase());
        if (infantBand && infantBand.counts_toward_capacity === false && counts.infant > 0) cats.push(labels.infant.toLowerCase());

        if (!cats.length) return null; // rien à afficher
        return `Les ${joinFr(cats)} n’occupent pas de place.`;
      };

      const ruleMessage = buildNoSeatMessage(adult, child, infant, {
        adult: participantAdult,
        child: participantChild,
        infant: participantInfant,
      });

      return (
        <div className="AvailabilityContainer">
          <div className="TopDivOpacity"></div>
          <GoBack nagigation={`/offer-page/${slug}`} scrollTo={""} text={t("back")}/>
          <div className="TitleContainer">
            <p className="t32">{t("select_date_and_slot")}</p>
            <p className="t6">{t("select_date_and_slot_subtitle")}</p>
          </div>
          
          <div className="DayPickerContainer">
            <div className="CalendarContainer" style={{ "--today-label": `"${t("Today")}"` }}>
              {/* <p className="t5">Choisissez une date</p> */}
              <DayPicker
                mode="single"
                selected={new Date(selectedDate)}
                
                onSelect={(date) => {
                  // setSelectedDate(date ? date.toLocaleDateString(lang) : today)
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
              <p className="t5">{t("available_slots")}</p>
              {
                isTooFar ? <div className="NoneSlote">
                  <p className="t5">{t("too_far_date")}</p>
                </div>
                :
                disponnibility[selectedDate] && Object.keys(disponnibility[selectedDate]).length > 0 ? (
                  Object.values(disponnibility[selectedDate]).map((slot, index) => {

                    const places_disponnibles = total_capacity - (slot.total_reserved || 0);
                    // const nb_participants = participantAdult + participantChild;
                    // const nb_participants = capacityUnits(participantAdult, participantChild, participantInfant);
                    const nb_participants = capacityUnits(participantAdult, participantChild, participantInfant, adult, child, infant);

                    const isReservable = places_disponnibles >= nb_participants;

                    return (
                    <div key={index} 
                      className={`CreneauItem${selectedCreneau.index === `${selectedDate}-${index}` ? " selected" : ""}${places_disponnibles === 0 ? " complete" : ""}${!isReservable ? " notReservable" : "" }`} 
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
                          <p className="t5 bold">{t("full")}</p>
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
                              <p className="t6">{t("currently_remaining")}</p>
                              <p className={`greenColor t6`}>{places_disponnibles} {t("places")}</p>
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
                              <p className="t6">{t("currently_remaining")}</p>
                              <p className={`redColor t6`}>{places_disponnibles} {t("places")}</p>
                              <p className={`redColor t6`}>{t("too_many_people")}</p>
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
                    <p className="t5">{t("no_slot_available")}</p>
                  </div>
                }

                <div className={`CancelContainer ${selectedCreneau.index!=="no-selected" && OfferIsCancellable ? "selected" : ""}`}>
                  <img src={VerifyIcon} alt="verify icon"/>
                  <p className="t6">
                    {t("free_cancellation_deadline")} {new Date(new Date(selectedDate).setDate(new Date(selectedDate).getDate() + 1)).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long' })} {selectedCreneau.slot ? ` à ${selectedCreneau.slot.from}` : "00:00"}.
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
                <p className="t5">{t("Participants")} :</p> 
                <p className="t5">{participantAdult + participantChild + participantInfant}</p>
              </div>
              <p className="t6">
                {adult  && participantAdult  > 0 && `×${participantAdult} ${t(plural(participantAdult,'adult','adults'))}`}
                {child  && participantChild  > 0 && `\u00A0\u00A0×${participantChild} ${t(plural(participantChild, 'child','children'))}`}
                {infant && participantInfant > 0 && `\u00A0\u00A0×${participantInfant} ${t(plural(participantInfant,'infant','infants'))}`}
              </p>

            </div>
            <button>
              <p className="t6">{t("Edit")}</p>
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
            <p className="t6">{adresse}</p>
          </div>
          <div className="payementInfoContainer">
            <div className="row">
              <p className="t6">{selectedDate}</p>
              {/* <p className="t6">{selectedCreneau.slot.from} - {selectedCreneau.slot.to}</p> */}
            </div>
            <div className="payementSeparation"></div>
            {
              pricing.adult && participantAdult>0 && 
            <div className="row">
              <p className="t6">×{participantAdult}&nbsp;&nbsp;&nbsp;&nbsp;{t(plural(participantAdult, 'adult', 'adults'))}</p>
              <p className="t6">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(pricing.adult?.price * participantAdult)}
              </p>
            </div>
            }
            {
              pricing.child && participantChild>0 ?
              <div className="row">
                <p className="t6">×{participantChild}&nbsp;&nbsp;&nbsp;&nbsp;{t(plural(participantChild, 'child', 'children'))}</p>
              <p className="t6">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(pricing.child?.price * participantChild)}
              </p>
              </div> 
              : <></>
            }
            {
              pricing.infant && participantInfant>0 ?
              <div className="row">
                <p className="t6">×{participantInfant}&nbsp;&nbsp;&nbsp;&nbsp;{t(plural(participantInfant, 'infant', 'infants'))}</p>
              <p className="t6">
                {new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(pricing.infant?.price * participantInfant)}
              </p>
              </div> 
              : <></>
            }
            <div className="payementSeparation"></div>
            <div className="row">
              <p>{t("TOTAL")}</p>
              <p className="t32">{new Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR',
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                }).format(((pricing.adult?.price ?? 0) * participantAdult) + ((pricing.child?.price ?? 0) * participantChild) + ((pricing.infant?.price ?? 0) * participantInfant))}
              </p>
            </div>  
            <div className="payementSeparation"></div>
            <p className="t6">{t("all_taxes_included")}</p>
          </div>
          <button className="SuivantButton" onClick={() => TestAuth()}>
            {t("Next")}
          </button>

          <PopUpBottom 
            onClose={() => {
              ParticipantBottomRef.current.classList.remove("open");
              setIsOccultView(false);
            }}
            title={(
              <p className="t5">{("Add_participants")}</p>
            )}
            ref={ParticipantBottomRef}
          >
            <>
              {/* <p className="t5">En tout il y a <strong>{total_capacity} places</strong></p>
              <div className="AnimationHuman">

              </div> */}
              <div className="rowTotal">
                <p className="t4">{t("Participants")} :</p> 
                <p className="t4">{participantAdult + participantChild + participantInfant}</p>
              </div>
                {adult && (
                    <div className="rowAddParticipant">
                      <div className="column">
                        <p className="t5">{t('Adult')}</p>
                        <p className="t6">{formatAgeRange(adult)}</p>
                      </div>

                      <div className="row">
                        <button
                          className="buttonParticipant"
                          aria-label={t('Decrease adult')}
                          disabled={participantAdult <= ADULT_MIN}
                          onClick={() => setParticipantAdult(prev => Math.max(ADULT_MIN, prev - 1))}
                        >
                          <p className="t3">-</p>
                        </button>

                        <p className="t4">{participantAdult}</p>

                        <button
                          className="buttonParticipant"
                          aria-label={t('Increase adult')}
                          disabled={participantAdult >= ADULT_MAX}
                          onClick={() => setParticipantAdult(prev => Math.min(ADULT_MAX, prev + 1))}
                        >
                          <p className="t3">+</p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Child (rendu seulement si la bande existe) */}
                  {child && (
                    <div className="rowAddParticipant">
                      <div className="column">
                        <p className="t5">{t('Child')}</p>
                        <p className="t6">{formatAgeRange(child)}</p>
                      </div>

                      <div className="row">
                        <button
                          className="buttonParticipant"
                          aria-label={t('Decrease child')}
                          disabled={participantChild <= CHILD_MIN}
                          onClick={() => setParticipantChild(prev => Math.max(CHILD_MIN, prev - 1))}
                        >
                          <p className="t3">-</p>
                        </button>

                        <p className="t4">{participantChild}</p>

                        <button
                          className="buttonParticipant"
                          aria-label={t('Increase child')}
                          disabled={participantChild >= CHILD_MAX}
                          onClick={() => setParticipantChild(prev => Math.min(CHILD_MAX, prev + 1))}
                        >
                          <p className="t3">+</p>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Infant (rendu seulement si la bande existe) */}
                  {infant && (
                    <div className="rowAddParticipant">
                      <div className="column">
                        <p className="t5">{t('Infant')}</p>
                        <p className="t6">{formatAgeRange(infant)}</p>
                      </div>

                      <div className="row">
                        <button
                          className="buttonParticipant"
                          aria-label={t('Decrease infant')}
                          disabled={participantInfant <= INFANT_MIN}
                          onClick={() => setParticipantInfant(prev => Math.max(INFANT_MIN, prev - 1))}
                        >
                          <p className="t3">-</p>
                        </button>

                        <p className="t4">{participantInfant}</p>

                        <button
                          className="buttonParticipant"
                          aria-label={t('Increase infant')}
                          disabled={participantInfant >= INFANT_MAX}
                          onClick={() => setParticipantInfant(prev => Math.min(INFANT_MAX, prev + 1))}
                        >
                          <p className="t3">+</p>
                        </button>
                      </div>
                    </div>
                  )}

              {ruleMessage && (
                <div className="NotCountCapacity row">
                  <img src={warningRed} alt="info" />
                  <p className="t6">{ruleMessage}</p>
                </div>
              )}

            </>
          </PopUpBottom>


          <PopUpLogin setIsOccultView={setIsOccultView} state={{
                title: title,
                adresse: adresse,
                // price: price,
                offer_provider_id: offer_provider_id,
                id_hote: id_hote,
                OfferIsCancellable: OfferIsCancellable,
                participantAdult: participantAdult,
                participantChild: participantChild,
                participantInfant: participantInfant,
                pricing: pricing,
                start_hour: selectedCreneau.slot?.from || "",
                end_hour: selectedCreneau.slot?.to || "",
                date: selectedDate,
                total_capacity: total_capacity,
                selectedCreneau: selectedCreneau,
              }} 
              googleRedirectRoute={`/offer-page/${slug}/add-info`}
              navigateAfterTo={`/offer-page/${slug}/add-info`}
              navigateStateToPass={{                         // 🔁 state à passer à la navigation
                title,
                adresse,
                // price,
                offer_provider_id,
                id_hote,
                OfferIsCancellable,
                participantAdult,
                participantChild,
                participantInfant: participantInfant,
                pricing: pricing,
                start_hour: selectedCreneau.slot?.from || "",
                end_hour: selectedCreneau.slot?.to || "",
                date: selectedDate,
                total_capacity,
                selectedCreneau: selectedCreneau
              }}
              ref={LoginBottomRef}/>
  

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
