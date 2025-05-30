import { useState } from "react";
import { createOffer } from "./getQrcode";

export default function ProfilScan() {

  
  const [dataQRCode, setdataQRCode] = useState({});

  const [images, setImages] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    type: "",
    category: "",
    price: "",
    duration: "",
    image_urls: "",
    id_hote: "",
    image_urls: []
  })
  




 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 👉 Ajout d'images sélectionnées à la liste
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev => [...prev, ...files]); // on cumule les fichiers
  };



const uploadImages = async () => {
  const urls = [];

  const form = new FormData();
  form.append("offerId", "temp"); // temporaire

  images.forEach(file => {
    form.append("images", file); // plusieurs fichiers, même clé
  });

  const res = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/upload-offer-images`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();

  if (data.success) {
    // data.urls doit être un tableau d'URLs (vérifie bien ça dans ta route backend)
    for(const myUrl of data.urls){
      console.log(myUrl);
    }
    setFormData(prev => ({
      ...prev,
      image_urls: [...prev.image_urls, ...data.urls]
    }));
  } else {
    console.error("Erreur upload image:", data.message);
  }
};





  // 👉 Supprimer une image (preview ET URL)
  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index)); // retirer du tableau de fichiers
  };

  const removeUploadedImage = (index) => {
    setFormData(prev => ({
      ...prev,
      image_urls: prev.image_urls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      category: formData.category.split(",").map(cat => cat.trim()),
      price: parseFloat(formData.price),
      duration: parseFloat(formData.duration),
      id_hote: parseInt(formData.id_hote, 10)
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      console.log("✅ Offre créée :", result);
    } catch (err) {
      console.error("❌ Erreur lors de l'envoi :", err);
    }
  };

  const getQrcode = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/generate?id=${id}`);
      const data = await response.json();

      if (data.success) {
        setdataQRCode(data);
      } else {
        console.error("Erreur : QR code non généré");
      }
    } catch (err) {
      console.error("Erreur lors du fetch :", err);
    }
  };


  return (
    <div>
      <div className="createOffert">
        <h2>Créer une offre</h2>
        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Titre" onChange={handleChange} required />
          <textarea name="description" placeholder="Description" onChange={handleChange} required />
          <input name="location" placeholder="Localisation" onChange={handleChange} required />
          <input name="type" placeholder="Type (Hôtel, Appartement...)" onChange={handleChange} required />
          <input name="category" placeholder="Catégories (séparées par ,)" onChange={handleChange} required />
          <input name="price" type="number" step="0.01" placeholder="Prix (€)" onChange={handleChange} required />
          <input name="duration" type="number" step="0.1" placeholder="Durée (jours)" onChange={handleChange} required />
          <input name="id_hote" type="number" placeholder="ID de l'hôte" onChange={handleChange} required />

          <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          <button type="button" onClick={uploadImages}>Uploader les images</button>

          {/* Aperçu des fichiers sélectionnés (non encore uploadés) */}
          <h4>Prévisualisation locale</h4>
          <div>
            {images.map((file, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                <img src={URL.createObjectURL(file)} alt={`preview-${index}`} width={100} />
                <button type="button" onClick={() => removeImage(index)} style={{ position: 'absolute', top: 0, right: 0 }}>❌</button>
              </div>
            ))}
          </div>

          {/* Aperçu des images déjà uploadées */}
          <h4>Images uploadées sur Supabase</h4>
          <div>
            {formData.image_urls.map((url, index) => (
              <div key={index} style={{ position: 'relative', display: 'inline-block', margin: '10px' }}>
                <img src={url} alt={`img-${index}`} width={100} />
                <button type="button" onClick={() => removeUploadedImage(index)} style={{ position: 'absolute', top: 0, right: 0 }}>❌</button>
              </div>
            ))}
          </div>

          <button type="submit">Créer l'offre</button>
        </form>
      </div>

      <button className="GetQRCodeButton" onClick={() => getQrcode(1)}>
        Get QRCode img
      </button>

      {dataQRCode.qrCodeBase64 && (
        <div style={{ marginTop: "1rem" }}>
          <img src={dataQRCode.qrCodeBase64} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

