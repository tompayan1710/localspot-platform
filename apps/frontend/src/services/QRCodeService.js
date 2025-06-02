// src/services/qrService.js

// L’URL de base est fournie via .env (REACT_APP_API_URL)
const API_BASE = process.env.REACT_APP_API_URL;

async function getQRCodeBySlug(slug) {
   console.log("Récupération de l'offre");
    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/qrcode/get?slug=${slug}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error("❌ Échec Récupération de du QRCode");
            return { success: false };

        }
    } catch (error) {
        console.error("❌ Erreur Récupération du QRCode : ", error);
        return { success: false };
    }
}


export {getQRCodeBySlug};
