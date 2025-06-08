
async function getHoteById(id_hote) {
   console.log("Récupération des infos de l'hotes");
    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hote/get?id=${id_hote}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error("❌ Échec Récupération de l'hote");
            return { success: false };
        }
    } catch (error) {
        console.error("❌ Erreur Récupération de l'hote : ", error);
        return { success: false };
    }
}


export {getHoteById};