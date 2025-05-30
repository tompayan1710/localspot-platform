import "./CreateOffer.css"

import crossiconBlack from "../../assets/images/crossiconBlack.png"
import arrowLeft from "../../assets/images/arrowLeft.png"
import jetSkieIcon from "../../assets/images/jetSkieIcon.png"
import foodIcon from "../../assets/images/foodIcon.png"
import plusicon from "../../assets/images/plusicon.png"
import trashicon from "../../assets/images/trashicon.png"
import galleryPhotosIcon from "../../assets/images/galleryPhotosIcon.png"
import { useNavigate } from "react-router-dom"

import { useRef, useState, useEffect } from "react"
import Map2D from "../../components/Maps/Map2D"

import { useJsApiLoader } from "@react-google-maps/api";


import Sortable from "sortablejs";



import { useLocation } from "react-router-dom";

export default function CreateOfferAddress(){
  const location = useLocation();
  const { type, categories } = location.state || {};

  const adresseRef = useRef(null);
  const [formData, setFormData] = useState({
    adresse: "",
    position_description: "",
    city_id: "",
    email: "",
    latitude:  43.7002,
    longitude: 7.2620,
    isOk: false,
  });

    const [errorMessage, setErrorMessage] = useState();

  // Charger l'autocomplete Google Maps
  useEffect(() => {
      console.warn(type, categories);

      console.log("Offre sélectionnée :", type, categories);



    if (!window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(adresseRef.current, {
      types: ["geocode"],
      componentRestrictions: { country: "fr" },
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (!place.geometry) return alert("Aucune position trouvée.");
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      const components = place.address_components;

      const getComponent = (types) => {
        const comp = components.find(c => types.every(t => c.types.includes(t)));
        return comp ? comp.long_name : "";
      };

      const ville = getComponent(["locality"]) || getComponent(["postal_town"]);
      const departement = getComponent(["administrative_area_level_2"]);
      //const region = getComponent(["administrative_area_level_1"]); // souvent la région
      //const pays = getComponent(["country"]);

      console.log("Ville :", ville);
      console.log("Département :", departement);
      //console.log("Région :", region);
      //console.log("Pays :", pays);


      setFormData((prev) => ({
        ...prev,
        adresse: place.formatted_address,
        latitude: lat,
        longitude: lng,
        isOk: true,
        departement: departement,
        ville: ville,
      }));
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", formData);
    // 👉 ici, envoie vers ton API backend avec fetch ou axios
  };

    const navigate = useNavigate();
    const refNavigateButton = useRef(null);

    const refCreateOfferPage2 = useRef(null);
    const refCreateOfferPage3 = useRef(null);

    const [errorSelected, setErrorSelected] = useState("");
    const [etapeNum, setEtapeNum] = useState("1/3");
    const [textInButton, setTextInButton] = useState("Ajouter l'adresse");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      refNavigateButton.current.classList.add("show");
    }, [])

    



    const goToPage3 = (e, type) => {
        // const containerTop = e.currentTarget.getBoundingClientRect().top;
        // let offset = containerTop; // distance entre le haut du container et le haut de l'écran
        if(!formData.isOk){
          setErrorSelected("Veuillez entrer une adresse valide\u00A0!");
          return;
        }
        setTimeout(() => {
            let offset = 0;

            // refTitleType.current.style.opacity = "0"; // on cache l'autre
            console.log("J'entre");
            refCreateOfferPage2.current.style.transform = `translateY(-100vh)`;
            refCreateOfferPage3.current.style.transform = `translateY(0)`;
            // refCreateOfferPage2.current.style.transform = `translateY(-100vh${150 + offset}px)`;

            // setTimeout(() => {
            //     refListCategorie.current.querySelectorAll("li").forEach((li) => {
            //         li.classList.add("startAnimation");
            //     })
            // }, 500)
            setTextInButton("Ajouter les images");

            // setTimeout(() => {
            //     refNavigateButton.current.classList.add("show");
            // }, 1000)
            setTimeout(() => {
              setEtapeNum("2/3");
            }, 800);
        },200)
    


    }







    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
      setSelectedFiles([...e.target.files]);
      console.log("Images sélectionnées :", e.target.files);
    };

    const handleFileChangeAdd = (e) => {
      setSelectedFiles((prev) => [...prev, ...Array.from(e.target.files)]);
      console.log("Images sélectionnées :", e.target.files);
    };

    const handleRemoveFile = (indexToRemove) => {
      setSelectedFiles((prev) => prev.filter((_, i) => i !== indexToRemove));
    };


    const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

    const uploadImages = async () => {
      setIsLoading(true);
      if (selectedFiles.length === 0) {
        setErrorSelected("Aucune image sélectionnée.");
        return; 
      }

      const uploadFormData = new FormData();
      selectedFiles.forEach((file) => {
        uploadFormData .append("images", file); // Important : même nom que .array("images") côté backend
      });

      uploadFormData .append("offerId", "temp"); // Remplace "temp" par un vrai ID si dispo

      let data;
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/upload-offer-images`, {
          method: "POST",
          body: uploadFormData,
        });

        
        data = await response.json();

        if (!data.success){
          console.error("❌ Erreur serveur :", data.message);
          setErrorSelected("Erreur serveur lors de l'upload.");
        }
      } catch (err) {
        console.error("❌ Erreur réseau :", err);
        setErrorSelected("Erreur réseau lors de l’upload.");
      }


     const qrRes = await fetch(`${process.env.REACT_APP_API_URL}/api/qrcode/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_hote: 1, // à récupérer dynamiquement si possible
          latitude: formData.latitude,
          longitude: formData.longitude,
          adresse: formData.adresse,
        }),
      });

      const qrData = await qrRes.json();

      if (qrData.success) {
        console.log("✅ QR code généré :", qrData.qrImageUrl);
        // Tu peux passer cette URL à la page suivante si tu veux
      } else {
        console.error("❌ Erreur QR :", qrData.message);
      }


  
      navigate("/create-offer-informations", {
          state: { 
            images_urls: data.urls,
            city_id: formData.city_id,
            adresse: formData.adresse,
            latitude: formData.latitude,
            longitude: formData.longitude,
            type: type,
            categories: categories,
            departement: formData.departement,
            ville: formData.ville,  
            qrcode_url: qrData.qrImageUrl,
            slug: qrData.slug,
          },
      });
  setIsLoading(false);
  return;
};




    // const [items, setItems] = useState(["1", "2", "3", "4"]);
    // const [isScroll, setIsScroll] = useState(false);
    const listRef = useRef(null);
    const refContainerAll = useRef(null);
              
    useEffect(() => {
      if (!listRef.current) return;

      if(selectedFiles.length>0){
        refContainerAll.current.style.overflow = "scroll";
      }

      const sortable = Sortable.create(listRef.current, {
        animation: 150,
        filter: '[data-remove]', // 👉 Ne pas activer le drag sur ce bouton
        onFilter: (evt) => {
          if (evt.target.closest('[data-remove]')) {
            const index = evt.oldIndex;
            if (index !== undefined) handleRemoveFile(index);
          }
        },
        onEnd: (evt) => {
          const newOrder = [...selectedFiles];
          const [movedItem] = newOrder.splice(evt.oldIndex, 1);
          newOrder.splice(evt.newIndex, 0, movedItem);
          setSelectedFiles(newOrder);
        },
      });

      return () => sortable.destroy();
    }, [selectedFiles]);



    
    return (
        <div className="CreateOfferContainerAll" ref={refContainerAll}>
            <button className="CloseButton" onClick={() => navigate("/profile")}><img src={crossiconBlack}/></button>
            <div className="CreateOfferEtape"><p className="t6"> {etapeNum}</p></div>
            <button className="GoBackButton"><img src={arrowLeft}/><p className="t6">précédent</p></button>
            <button className="NavigateButton" ref={refNavigateButton} onClick={() =>textInButton == "Ajouter l'adresse" ? goToPage3() : uploadImages()}>{isLoading ? "chargement" : textInButton}</button>
            <div className="TopDivOpacity"></div>
            <div className="CreateOfferPage2" ref={refCreateOfferPage2}>
                <p className="t32">Saisisez l'adresse de votre offre&nbsp;!</p>
                <p className="t6">Cette adresse sera visible par les voyageurs, veillez à ce qu’elle soit exacte.</p>
                <div className="CreateOfferMapContainer">
                  <Map2D
                      borderRadius={20}
                      zoom={15}
                      center={{ lat: formData.latitude, lng: formData.longitude}}/>
                </div>
                  <input
                    type="text"
                    ref={adresseRef}
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    required
                  />
                  {/* <p>{errorMessage}</p> */}
                <div className="CreatOfferErrorContainer"><p className="t6">{errorSelected}</p></div>
            </div>



          { !(selectedFiles.length>0) ?

            <div className="CreateOfferPage3" ref={refCreateOfferPage3}>
              <p className="t32">Ajoutez des photos qui mettent en valeur votre offre&nbsp;!</p>
              <p className="t6">
                Les photos doivent correspondre à l’offre réelle et respecter notre <a onClick={() => navigate("/content-policy")}>politique de contenu</a>. 
              </p>
              <label className="CreateOfferAddPhotos">
                <img src={galleryPhotosIcon} />
                <p className="t5">Ajouter des photos</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: "none" }}
                  onChange={handleFileChange} // fonction pour gérer les images
                />
              </label>

              {/* <input className="CreateOfferAddPhotos">
                <img src={galleryPhotosIcon}/>
                <p className="t5">Ajouter des photos</p>
              </input> */}
            <div className="CreatOfferErrorContainer"><p className="t6">{errorSelected}</p></div>
            </div>

            :

            <div className="CreateOfferPage4">
              
              <div className="TemplateOffer">
                <div className="TemplaetOfferImg">
                  <img src={URL.createObjectURL(selectedFiles[0])}/>
                </div>
                <div className="TemplateOfferInfo">
                  <div className="TemplateOfferTopDiv">
                    <div className="TemplateOfferTitle"></div>
                    <div className="TemplateOfferDuration"></div>
                  </div>
                  <div className="TemplateOfferBottomDiv">
                    <div className="TemplateOfferStarList"></div>
                    <div className="TemplateOfferPrice"></div>
                  </div>
                </div>
              </div>
              <div className="RowAddImage">
                <p className="t4">Ordre des phtotos :</p>
                <label className="CreateOfferAddPhotos">
                  <img src={plusicon} />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleFileChangeAdd} // fonction pour gérer les images
                  />
                </label>
              </div>

              
              

                    <div  ref={listRef} className="CreateOfferPhotoList">
                      {selectedFiles.map((file, index) => (
                        <div key={file.name + index} className="CreateOfferPhotoItem">
                          <div className="TakeContainer">
                            <div className="TakeVerticalBar"></div>
                              <div className="TakeVerticalBar"></div>
                            <div className="TakeVerticalBar"></div>
                          </div>
                          <div className="OverviewImageContainer">
                            <button className="RemovePhoto" onClick={() => handleRemoveFile(index)}><img src={trashicon} alt="trash icon"/></button>
                            <img src={URL.createObjectURL(file)} alt={`preview-${index}`}/>
                          </div> 
                        </div>
                      ))}
                    </div>
              


                {/* {selectedFiles.map((file, index) => (
                <div key={index} className="CreateOfferPhotoItem">
                  <div className="TakeContainer">
                    <div className="TakeVerticalBar"></div>
                      <div className="TakeVerticalBar"></div>
                    <div className="TakeVerticalBar"></div>
                  </div>
                  <div className="OverviewImageContainer">
                    <button className="RemovePhoto"><img src={trashicon} alt="trash icon"/></button>
                    <img src={URL.createObjectURL(file)} alt={`preview-${index}`}/>
                  </div>
                  
                </div>
                ))} */}
              
{/*               
              <div className="CreateOfferPhotoList">

    <Sortable
      tag="div"
      onChange={(order, sortable, evt) => {
        // Réordonner selectedFiles en fonction de l'ordre
        const newOrder = order.map((id) =>
          selectedFiles.find((file) => file.name === id)
        );
        setSelectedFiles(newOrder);
      }}
    >
      {selectedFiles.map((file, index) => (
        <div
          key={file.name}
          data-id={file.name}
          style={{
            width: 100,
            height: 100,
            margin: 10,
            borderRadius: 8,
            overflow: "hidden",
            border: "1px solid #ccc",
          }}
        >
          <img
            src={URL.createObjectURL(file)}
            alt={`preview-${index}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      ))}
    </Sortable>




                {selectedFiles.map((file, index) => (
                <div key={index} className="CreateOfferPhotoItem">
                  <div className="TakeContainer">
                    <div className="TakeVerticalBar"></div>
                      <div className="TakeVerticalBar"></div>
                    <div className="TakeVerticalBar"></div>
                  </div>
                  <div className="OverviewImageContainer">
                    <button className="RemovePhoto"><img src={trashicon} alt="trash icon"/></button>
                    <img src={URL.createObjectURL(file)} alt={`preview-${index}`}/>
                  </div>
                  
                </div>
                ))}
              </div> */}

{/*sssssssssssssssssssssssssssssssssssssssssssssssss */}
{/* 
              <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
                  {selectedFiles.map((file, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        margin: "8px",
                        width: "100px",
                        height: "100px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        border: "1px solid var(--greymiddledark)",
                      }}
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview-${index}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <button
                        onClick={() =>
                          setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
                        }
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          backgroundColor: "red",
                          color: "white",
                          border: "none",
                          borderRadius: "0 0 0 6px",
                          cursor: "pointer",
                          padding: "2px 6px",
                          fontSize: "12px",
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div> */}








             </div>

             }

          </div>
    )
}