// src/services/qrService.js

async function getQRCodeById(id_qrcode) {
   console.log("Récupération de l'offre");
    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/qrcode/get?id_qrcode=${id_qrcode}`, {
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


export {getQRCodeById};
