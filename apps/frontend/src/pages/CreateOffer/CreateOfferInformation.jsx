import "./CreateOffer.css"

import crossiconBlack from "../../assets/images/crossiconBlack.png"
import arrowLeft from "../../assets/images/arrowLeft.png"
import ValidateWhiteIcon from "../../assets/images/ValidateWhiteIcon.png"
import arrowRight from "../../assets/images/arrowRight.png"
import disponnibleicon from "../../assets/images/disponnibleicon.png"
import clockIcon from "../../assets/images/clockIcon.png"
import starIcon from "../../assets/images/starIcon.png"
import arrowdownicon from "../../assets/images/arrowdownicon.png"
import { useNavigate, useLocation } from "react-router-dom"
import { useState, useRef } from "react";
import { useEffect, useContext} from "react";
import { AuthContext } from "../../components/Auth/authContext/authContext"

import ButtonLevier from "../../components/ButtonLevier/ButtonLevier"
import DurationSlider from "../OfferPage/DurationSlider"
import Spinner from "../../components/Spinner/Spinner"
import { useTranslation } from "react-i18next"
import PopUpNumber from "../../components/PopUpBottom/PopUpNumber/PopUpNumber"
import PopUpBottom from "../../components/PopUpBottom/PopUpBottom"



export default function CreateOfferInformations(){
    const location = useLocation();

    const { authState } = useContext(AuthContext);
    const navigate = useNavigate();
    const {t, i18n} = useTranslation();

    const numberPickerRefPrice = useRef(null);
    const numberPickerRef = useRef(null);
    const popUpCapacityRef = useRef(null);
    const [isOccultView, setIsOccultView] = useState(false);
    const [counter, setCounter] = useState(0);
    const [errorTarification, setErrorTarification] = useState("");


    const maxAmount = 3000.00;
    const minAmount = 5.00;
    const maxParticipant = 300;
    const minParticipant = 1;

    const {images_urls, city_id, adresse, latitude, longitude, type, categories, 
        departement, ville,  
        // qrcode_url, 
        slug} =  location.state || {};
      

        
    const togglePopup = (ref, open) => {
        if (open) {
            ref.current?.classList.add("open");
            setIsOccultView(true);
        } else {
            ref.current?.classList.remove("open");
            setIsOccultView(false);
        }
    };


    const openNumberPicker = () => {
        numberPickerRefPrice.current?.classList.add("open");
        setIsOccultView(true);
    };

    const closeNumberPicker = () => {
        numberPickerRefPrice.current?.classList.remove("open");
        setIsOccultView(false);
    };

        
    useEffect(() => {
        console.log("images_urls :", images_urls, "city_id :", city_id, "adresse :",adresse 
            , "latitude :", latitude, "longitude :", longitude, "type :", type, "categories: ", categories, 
            "departement :", departement, "ville :", ville,  
            // "qrcode_url : ", qrcode_url, 
            "slug :", slug);
        const missingData = !images_urls || !city_id || !adresse || !latitude || !longitude || !type || !categories || !departement || !ville || 
        // !qrcode_url || 
        !slug;

        if (missingData) {
            console.warn("⛔️ Données manquantes dans location.state, redirection...");
            navigate("/create-offer"); // ou la première étape
        } else if (!authState.loading && !authState.isAuth) {
            console.warn("🔒 Utilisateur non connecté, redirection...");
            navigate("/login");
        }
    }, [authState, navigate, location.state]);

    
    const [isLoading, setIsLoading] = useState(false);
    const [isCancellable, setIsCancellable] = useState(true);
    const [duration, setDuration] = useState(-1);
    const [openPointImportant, setOpenPointImportant] = useState(false);


    const [pointImportant, setPointImportant] = useState([""]);

    const limitTitle = 60;
    const limitDescription = 300;
    const refNavigateButton = useRef(null);
    const maxPrice= 3000;
    // useEffect(() => {
    //   refNavigateButton.current.classList.add("submit");
    // }, [])


    const handleCancellable = () => {
        console.log("Cliqué")
        setIsCancellable((prev) => {
            const newValue = !prev;
            setForm((formprev) => ({
                ...formprev,
                freeCancellation: newValue,
            }))
            return newValue;
        });
    }


    const [form, setForm] = useState({
        title: "",
        description: "",
        freeCancellation: isCancellable,
        priceAdult: 0,
        priceChild: 0,
        priceBaby: 0,
        counts_toward_capacity_adult: true,
        counts_toward_capacity_child: true,
        counts_toward_capacity_infant: false,
        capacite: 0,
        pricePer: "personne",
    });

    const [editingPriceType, setEditingPriceType] = useState(null);

        const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "price") {
            const numericValue = parseInt(value, 10);
            if (numericValue > maxPrice) return;
            if (numericValue < 0) return;
        }

        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handlePrice = (value) => {
        setForm((prev) => ({
            ...prev,
            [editingPriceType]: value,
        }));
    }


    const handlePointImportant = (e, index) => {
        const {name, value} = e.target;

        setPointImportant((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        })
    }

    const openNumberPickerParticipant = () => {
        numberPickerRef.current?.classList.add("open");
        setIsOccultView(true);
    };

    const closeNumberPickerParticipant = () => {
        numberPickerRef.current?.classList.remove("open");
        setIsOccultView(false);
    };

    const handleNumberChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const createOffer = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        if(form.priceAdult == 0 && form.priceChild == 0 && form.priceBaby == 0){
            setErrorTarification("Vous devez définir un prix pour au moins une catégorie de voyageurs (adulte, enfant ou bébé).");
            setIsLoading(false);
            return;
        }

        if(form.capacite == 0){
            setErrorTarification("Vous devez un nombre de participant supérieur à 0");
            setIsLoading(false);
            return;
        }

        const body = {
            title: form.title,
            description: form.description,
            adresse: adresse, // temporaire ou à ajouter dans le form
            latitude: latitude,
            longitude: longitude,
            departement: departement,
            ville: ville,
            categories: categories,
            type: type,  // idem
            city_id: city_id,
            priceAdult: form.priceAdult,
            priceChild: form.priceChild,
            priceBaby: form.priceBaby,
            price: form.priceAdult || form.priceChild || form.priceBaby,
            counts_toward_capacity_adult: form.counts_toward_capacity_adult,
            counts_toward_capacity_child: form.counts_toward_capacity_child,
            counts_toward_capacity_infant: form.counts_toward_capacity_infant,
            duration: duration,
            image_urls: images_urls, // ou [images[0]] si c'est une seule
            provider_id: authState.user.provider.id, // à récupérer dynamiquement si possible
            pricePer: form.pricePer,
            total_capacity: form.capacite,
            // qrcode_url: qrcode_url,
            slug: slug,
            cancellable: isCancellable
        }; 
        console.warn(body);
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
            });

            const data = await response.json();

            if (response.ok) { 
                console.log("✅ Offre créée :", data);
                navigate(`/annonces/${slug}/confirm-creation`);
            } else {
                console.error("❌ Erreur côté API :", data.error);
                // alert("Erreur lors de la création de l'offre.");
            }
        } catch (err) {
                console.error("❌ Erreur réseau ou serveur :", err.message);
                alert("Erreur inattendue.");
        } finally {
            setIsLoading(false);
        }
        };


    const handleOpenPricePicker = (type) => {
        // On met temporairement null pour forcer React à redéclencher le useEffect
        setEditingPriceType(null);

        // Puis on remet la vraie valeur au prochain "frame" du navigateur
        requestAnimationFrame(() => setEditingPriceType(type));
    };


    useEffect(() => {
        if (editingPriceType) {
            openNumberPicker();
        }
    }, [editingPriceType]);


    return (
        <div className="CreateOfferContainerAll">
            <button className="CloseButton" onClick={() => navigate(-3)}><img src={crossiconBlack} alt="cross icon"/></button>
            <div className="CreateOfferEtape"><p className="t6">3/3</p></div>
            <button className="GoBackButton"><img src={arrowLeft} alt="arrow left"/><p className="t6">précédent</p></button>
            <div className="TopDivOpacity"></div>
            <div className="CreateOfferPage5">    
                <form onSubmit={createOffer} className="CreateOfferForm">
                    <label className="t4">Titre</label>
                    <input
                        name="title"
                        className="InputText"
                        value={form.title}
                        onChange={handleChange}
                        maxLength={limitTitle}
                    />
                    <p className="RightInfo t6">{form.title.length}/{limitTitle}</p>

                    <label className="t4">Description</label>
                    <textarea
                        name="description"
                        className="DescriptionInput"
                        value={form.description}
                        onChange={handleChange}
                        rows={5}
                    />
                    <p className="RightInfo t6">{form.description.length}/{limitDescription}</p>

 
                    <label className="t4">Durée de l'activité</label>
                    <DurationSlider setValue={setDuration} durations={["15 min", "30 min", "1 h", "2 h", "4 h", "+ 6 h"]}/>
                    <label className="t4" style={{paddingBottom: "5px"}}>Tarification</label>
                    <div className="TarifItem"  onClick={() => handleOpenPricePicker("priceAdult")}>
                        <p className="t6">Adultes</p>
                        <p className="t32 bold">{form.priceAdult} €</p>
                    </div>
                    <div className="TarifItem"  onClick={() => handleOpenPricePicker("priceChild")}>
                        <p className="t6">Enfants</p>
                        <p className="t32 bold">{form.priceChild} €</p>
                    </div>
                    <div className="TarifItem"  onClick={() => handleOpenPricePicker("priceBaby")}>
                        <p className="t6">Bébés</p>
                        <p className="t32 bold">{form.priceBaby} €</p>
                    </div>
                    { errorTarification && 
                        <div className="ErrorDiv">
                            <div className="WaringRound">
                                <p className="t6 bold">!</p>
                            </div>
                            <p className="t6 errorTarif">{errorTarification}</p>
                        </div>
                    }
                    {/* <div className="PriceContainer row">
                        <input
                            type="number"
                            name="price"
                            className="InputText"
                            value={form.price}
                            // onChange={handleChange}
                            readOnly 
                            onClick={() => {
                                openNumberPicker();
                            }}
                            min="0"
                            max={maxPrice}
                            required
                        />
                        <p>€</p>
                        <span>
                            <p className="t6"> / personnes</p>
                        </span>
                      
                    </div>  */}
                    
                    <label className="t4" style={{paddingBottom: "5px"}}>Participants</label>
                    <div className="EnterValueContainer"  onClick={() => togglePopup(numberPickerRef, true)}>
                        <p className="t6">Nombre de participants</p>
                        <p className="t32 bold">{form.capacite}</p>
                    </div>
                    {/* <div className="CapaciteContainer">
                        <input
                            type="number"
                            name="capacite"
                            className="InputText"
                            value={form.capacite}
                            onChange={handleChange}
                            min={1}
                            max={300}
                            required
                        />
                        <p className="t6">/&nbsp;participants</p>
                    </div> */}

                    <div className="sectionContainer" onClick={() => {
                        popUpCapacityRef.current?.classList.add("open");
                        setIsOccultView(true);
                    }}>
                        <div className="column">
                            <p className="t5 bold">Qui compte dans le nombre de participants ?</p>
                            <p className="t6">Indiquez si certaines catégories, comme les enfants ou les bébés, doivent être comptées dans le nombre total de participants autorisés.</p>
                        </div>
                        <img src={arrowRight} alt="arrow Right"/>
                    </div>
                    <div className="CancellableContainer">
                        {/* <label className="t4">Annulation gratuite</label>
                        <p className="t6">Choisissez si vos clients peuvent annuler gratuitement leur réservation</p> */}

                        {/* <div className="toggle-button-group">
                            <button
                                type="button"
                                className={isCancellable ? "active" : ""}
                                onClick={handleCancellable}

                            >
                                <p className="t6">Oui</p>
                            </button>
                            <button
                                type="button"
                                className={!isCancellable ? "non active" : ""}
                                onClick={handleCancellable}
                            >
                                <p className="t6">Non</p>
                            </button>
                        </div>  */}
                    </div>
                    

                    {/* <div className="OptionSearch">
                                            <div className="PointOpenButton" onClick={() => setOpenPointImportant(prev => !prev)}>
                                              <p className="t5">Points importants</p>
                                              <img src={arrowdownicon} alt="arrow down icon"/>
                                            </div>
                                            { 
                                              openPointImportant ? 
                                              <>
                                                {
                                                    pointImportant.map((point, index) =>  {
                                                        return ( 
                                                            <input 
                                                            key={index}
                                                            type="text" 
                                                            name={`Important point ${index}`}
                                                            maxLength={90}
                                                            className="PointInput"
                                                            value={point}
                                                            onChange={(e) => handlePointImportant(e, index)}
                                                            />
                                                        )
                                                    })
                                                }
                                                
                                                <button 
                                                    className={`AddPointButton ${pointImportant[-1] === "" ? "deasable" : ""}`}  
                                                    disabled={pointImportant[pointImportant.length - 1] === ""}
                                                    onClick={() => setPointImportant(prev => [...prev, ""])}>Ajouter</button>
                                              </>
                                              : <></>
                                            }
                                          </div> */}


                                          
                    {/* <label className="CheckboxLabel">
                        <label className="t4">Annulation gratuite</label>
                        <ButtonLevier toogleInput={handleCancellable} isSelected={isCancellable}/>
                    </label> */}


                    
            
 
                     


                    <button type="submit" className="NavigateButton" ref={refNavigateButton}>
                        {isLoading ? <Spinner /> : <p className="t6">Ajouter mes informations</p>}
                    </button>

                </form>
            </div>



            <PopUpNumber
                ref={numberPickerRefPrice} 
                title={
                    editingPriceType === "priceAdult" ? "Prix Adultes" :
                    editingPriceType === "priceChild" ? "Prix Enfants" :
                    editingPriceType === "priceBaby" ? "Prix Bébés" : "Prix"
                }
                // smalltext={`${t("Minimum_price", {min: minAmount.toFixed(2).replace('.', ',')})}`}
                detailledBox={true}
                min={minAmount}
                max={maxAmount}
                errorMin={t("Error_min_price", { min: minAmount.toFixed(2).replace('.', ',') })}
                errorMax={t("Error_max_price", { max: maxAmount.toFixed(2).replace('.', ',') })}
                onClose={closeNumberPicker} 
                setReturnValue={handlePrice}
                initialValue={
                    editingPriceType ? form[editingPriceType] : 0 // ✅ envoie le bon prix actuel
                }
                counter={counter}
            />

            <PopUpNumber
                ref={numberPickerRef}
                title="Nombre maximum de participants"
                min={minParticipant}
                max={maxParticipant}
                errorMin={t("Error_min_participant", { min: minParticipant })}
                errorMax={t("Error_max_participant", { max: maxParticipant })}
                onClose={closeNumberPickerParticipant}
                setReturnValue={(value) => handleNumberChange("capacite", value)} // ✅ générique
                initialValue={form.capacite}
                counter={counter}
                allowDecimal={false}
                unit={""}
            />

            

            <PopUpBottom
                onClose={() => {
                    popUpCapacityRef.current?.classList.remove("open");
                    setIsOccultView(false);
                }}
                title={(
                <p className="t5">Capacity Pop Up</p>
                )}
                ref={popUpCapacityRef}
                duration={0.4}
                fullHeight={true}
            >
                <div className="CapacityContainer">
                    <p className="t32">Qui compte dans le nombre de participants ?</p>
                    <p className="t6">Indiquez si certaines catégories, comme les enfants ou les bébés, doivent être comptées dans le nombre total de participants autorisés.</p>
                    <div className="IsCountCapacity">
                        <label className="CustomCheckboxImage">
                            <input
                            type="checkbox"
                            id="counts_toward_capacity_child"
                            name="counts_toward_capacity_child"
                            checked={form.counts_toward_capacity_adult}
                            onChange={(e) =>
                                setForm((prev) => ({
                                ...prev,
                                counts_toward_capacity_adult: e.target.checked,
                                }))
                            }
                            />    
                            {form.counts_toward_capacity_adult && (
                            <img
                                src={ValidateWhiteIcon}
                                alt="checkbox"
                                className="CheckboxIcon"
                            />
                            )}
                        </label>
                        <p className="t6">
                            Les adultes occupent une place parmi les participants
                        </p>
                    </div>
                    <div className="IsCountCapacity">
                        <label className="CustomCheckboxImage">
                            <input
                            type="checkbox"
                            id="counts_toward_capacity_child"
                            name="counts_toward_capacity_child"
                            checked={form.counts_toward_capacity_child}
                            onChange={(e) =>
                                setForm((prev) => ({
                                ...prev,
                                counts_toward_capacity_child: e.target.checked,
                                }))
                            }
                            />    
                            {form.counts_toward_capacity_child && (
                            <img
                                src={ValidateWhiteIcon}
                                alt="checkbox"
                                className="CheckboxIcon"
                            />
                            )}
                        </label>
                        <p className="t6">
                            Les enfaints occupent une place parmi les participants
                        </p>
                    </div>
                    <div className="IsCountCapacity">
                        <label className="CustomCheckboxImage">
                            <input
                            type="checkbox"
                            id="counts_toward_capacity_child"
                            name="counts_toward_capacity_child"
                            checked={form.counts_toward_capacity_infant}
                            onChange={(e) =>
                                setForm((prev) => ({
                                ...prev,
                                counts_toward_capacity_infant: e.target.checked,
                                }))
                            }
                            />    
                            {form.counts_toward_capacity_infant && (
                            <img
                                src={ValidateWhiteIcon}
                                alt="checkbox"
                                className="CheckboxIcon"
                            />
                            )}
                        </label>
                        <p className="t6">
                            Les bébés occupent une place parmi les participants
                        </p>
                    </div>
                </div>
            </PopUpBottom>

            <div className={`occultView ${isOccultView ? "open" : ""}`}  
            onClick={(e) => {
                setCounter((prev) => prev + 1);
                // closeNumberPicker();
                numberPickerRefPrice.current?.classList.remove("open");
                numberPickerRef.current?.classList.remove("open");
                popUpCapacityRef.current?.classList.remove("open");
                setIsOccultView(false);
            }}></div>
          </div>
    )
}











// <div className="IsCountCapacity">
//                         <label className="CustomCheckboxImage">
//                             <input
//                             type="checkbox"
//                             id="counts_toward_capacity_child"
//                             name="counts_toward_capacity_child"
//                             checked={form.counts_toward_capacity_child}
//                             onChange={(e) =>
//                                 setForm((prev) => ({
//                                 ...prev,
//                                 counts_toward_capacity_child: e.target.checked,
//                                 }))
//                             }
//                             />    
//                             {form.counts_toward_capacity_child && (
//                             <img
//                                 src={ValidateWhiteIcon}
//                                 alt="checkbox"
//                                 className="CheckboxIcon"
//                             />
//                             )}
//                         </label>
//                         <p className="t6">
//                             Les enfants occupent une place parmi les participants
//                         </p>
//                     </div>

// <div className="IsCountCapacity">
//                         <label className="CustomCheckboxImage">
//                             <input
//                             type="checkbox"
//                             id="counts_toward_capacity_child"
//                             name="counts_toward_capacity_child"
//                             checked={form.counts_toward_capacity_child}
//                             onChange={(e) =>
//                                 setForm((prev) => ({
//                                 ...prev,
//                                 counts_toward_capacity_child: e.target.checked,
//                                 }))
//                             }
//                             />    
//                             {form.counts_toward_capacity_child && (
//                             <img
//                                 src={ValidateWhiteIcon}
//                                 alt="checkbox"
//                                 className="CheckboxIcon"
//                             />
//                             )}
//                         </label>
//                         <p className="t6">
//                             Les bébés occupent une place parmi les participants
//                         </p>
//                     </div>