import "./CreateOffer.css"

import crossiconBlack from "../../assets/images/crossiconBlack.png"
import arrowLeft from "../../assets/images/arrowLeft.png"
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



export default function CreateOfferInformations(){
    const location = useLocation();

    const { authState, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    


    const {images_urls, city_id, adresse, latitude, longitude, type, categories, 
        departement, ville,  qrcode_url, slug} =  location.state || {};
        
        
    useEffect(() => {
        console.log("images_urls :", images_urls, "city_id :", city_id, "adresse :",adresse 
            , "latitude :", latitude, "longitude :", longitude, "type :", type, "categories: ", categories, 
            "departement :", departement, "ville :", ville,  "qrcode_url : ", qrcode_url, "slug :", slug);
        const missingData = !images_urls || !city_id || !adresse || !latitude || !longitude || !type || !categories || !departement || !ville || !qrcode_url || !slug;

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


    const durations = ["15 min", "30 min", "1 h", "2 h", "4 h", "+ 6 h"];
    const [pointImportant, setPointImportant] = useState([""]);

    const limitTitle = 60;
    const limitDescription = 300;
    const refNavigateButton = useRef(null);
    const maxPrice= 3000;
    // useEffect(() => {
    //   refNavigateButton.current.classList.add("submit");
    // }, [])


    const handleCancellable = () => {
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
        price: "",
        pricePer: "personne",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === "price") {
            const numericValue = parseInt(value, 10);
            if (numericValue > maxPrice) return; // bloque si > 999
            if (numericValue < 0) return;    // bloque aussi les négatifs
        }

        setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
        }));
    };


    const handlePointImportant = (e, index) => {
        const {name, value} = e.target;

        setPointImportant((prev) => {
            const updated = [...prev];
            updated[index] = value;
            return updated;
        })
    }


    const createOffer = async (e) => {
        e.preventDefault();
        setIsLoading(true);


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
            price: form.price,
            duration: durations[duration==-1 ? 0 : duration],
            image_urls: images_urls, // ou [images[0]] si c'est une seule
            id_hote: "1", // à récupérer dynamiquement si possible
            pricePer: form.pricePer,
            qrcode_url: qrcode_url,
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
                navigate("/profile");
            } else {
                console.error("❌ Erreur côté API :", data.error);
                alert("Erreur lors de la création de l'offre.");
            }
        } catch (err) {
                console.error("❌ Erreur réseau ou serveur :", err.message);
                alert("Erreur inattendue.");
        } finally {
            setIsLoading(false);
        }
        };

    return (
        <div className="CreateOfferContainerAll">
            <button className="CloseButton" onClick={() => navigate("/profile")}><img src={crossiconBlack}/></button>
            <div className="CreateOfferEtape"><p className="t6">3/3</p></div>
            <button className="GoBackButton"><img src={arrowLeft}/><p className="t6">précédent</p></button>
            <div className="TopDivOpacity"></div>
            <div className="CreateOfferPage5">    
                <div className="TemplateOffer">
                <div className="TemplaetOfferImg">
                    {images_urls?.length > 0 && (
                        <img src={images_urls[0]} alt="Preview de l’offre" />
                    )}
                    </div>
                    <div className="TemplateOfferInfo">
                    <div className="TemplateOfferTopDiv">
                        {
                        form.title ?
                            <p className="t5">{form.title}</p>
                            :
                            <div className="TemplateOfferTitle"></div>
                        }
                        {
                            duration > -1 ?
                            <div className="RowDuration"><img src={clockIcon} alt="clock"/><p className="t6">{durations[duration]}</p></div>
                            :
                            <div className="TemplateOfferDuration"></div>

                        }
                    </div>
                    {
                        isCancellable ?
                        <div className="RowConcellablre"><img src={disponnibleicon} alt="validate Icon"/><p className="t6">Annulation gratuite</p></div>   
                        : <></>   
                    }
                    <div className="TemplateOfferBottomDiv">
                        <div className="TemplateOfferStarList">
                            {
                                Array.from({length: 5}).map((_, index) => (
                                    <img key={index} src={starIcon} alt="start icon"/>
                                ))
                            }
                        </div>
                        {
                            form.price ? 
                            <p className="t6"><strong>À partir de {form.price} €</strong> par {form.pricePer}</p>
                            :
                            <div className="TemplateOfferPrice"></div>
                        }
                    </div>
                    </div>
                </div>
 

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


                    {/* <label className="t4">Prix</label>
                    <div className="PriceInputWrapper">
                        <span className="t6">À partir de </span>
                        <input
                            type="number"
                            name="price"
                            className="InputText"
                            value={form.price}
                            onChange={handleChange}
                            min="0"
                            max={maxPrice}
                        />
                     <span className="PriceSuffix t5">€ </span>
                     <span className="t6"> par</span>
                     <select
                    name="pricePer"
                    value={form.pricePer}
                    onChange={handleChange}
                    className="t6"
                    >
                        <option value="personne">personne</option>
                        <option value="groupe">groupe</option>
                    </select>
                    </div> */}
                    <label className="t4">Prix</label>
                    <div className="PriceContainer">
                        <input
                            type="number"
                            name="price"
                            className="InputText"
                            value={form.price}
                            onChange={handleChange}
                            min="0"
                            max={maxPrice}
                            required
                        />
                        <p>€</p>
                        <select
                            name="pricePer"
                            value={form.pricePer}
                            onChange={handleChange}
                            className="t6"
                            >
                            <option value="personne">personne</option>
                            <option value="groupe">groupe</option>
                        </select>
                    </div>
                    <label className="t4">Durée de l'activité</label>
                    <DurationSlider setValue={setDuration} value={duration}/>

                    <div className="OptionSearch">
                                            <div className="PointOpenButton" onClick={() => setOpenPointImportant(prev => !prev)}>
                                              <p className="t5">Points importants</p>
                                              <img src={arrowdownicon} />
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
                                                    className={`AddPointButton ${pointImportant[-1] == "" ? "deasable" : ""}`}  
                                                    disabled={pointImportant[pointImportant.length - 1] === ""}
                                                    onClick={() => setPointImportant(prev => [...prev, ""])}>Ajouter</button>
                                              </>
                                              : <></>
                                            }
                                          </div>


                                          
                    <label className="CheckboxLabel">
                        <label className="t4">Annulation gratuite</label>
                        <ButtonLevier toogleInput={handleCancellable} isSelected={isCancellable}/>
                    </label>
                    <p className="t6">L'annulation gratuite est un avantage est favorise la conversion.</p>

 
                     


                    <button type="submit" className="NavigateButton" ref={refNavigateButton}>{isLoading ? <Spinner /> : "Créer mon offre"}</button>

                </form>



            </div>
          </div>
    )
}