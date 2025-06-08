
// ✅ Fonction pour rafraîchir l'Access Token (version simplifiée)
export const getOffersToday = async () => {
    console.log("Récupération des Offres Today");

    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/getall`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error("❌ Échec Récupération des Offres Today ");
            return { success: false };

        }
    } catch (error) {
        console.error("❌ Erreur Récupération des Offres Today", error);
        return { success: false };
    }
}




// ✅ Fonction pour rafraîchir l'Access Token (version simplifiée)
export const getOfferBySlug = async (slug) => {
    console.log("Récupération de l'offre");
    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/get?slug=${slug}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error("❌ Échec Récupération de l'offre");
            return { success: false };

        }
    } catch (error) {
        console.error("❌ Erreur Récupération de l'offre : ", error);
        return { success: false };
    }
}


export const getOffersProvider = async (provider_id) => {
    console.log("Récupération des offres providers");
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/getall-provider?provider_id=${provider_id}`,{
            method: "GET",
        })

        if(response.ok){
            const offers = await response.json();
            console.log(offers);
            return offers
        }else {
            console.error("❌ Échec Récupération de l'offre");
            return { success: false };
        }
    }catch(err){
        console.error("❌Erreur récupération des offres provider : ", err);
        return { success: false };
    }
}