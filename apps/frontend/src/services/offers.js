
// ✅ Fonction pour rafraîchir l'Access Token (version simplifiée)
export const getAllOffers = async (lang) => {
    console.log("Récupération des Offres Today");

    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/getall?lang=${lang}`, {
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

 


export const getOfferBySlug = async (slug, lang) => {
    console.log("Récupération de l'offre");
    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/get?slug=${slug}${lang ? `&lang=${lang.split("-")[0].toLowerCase()}` : ""}`, {
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


export const getOffersProvider = async (provider_id, lang) => {
    console.log("Récupération des offres providers");
    try{
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/getall-provider?provider_id=${provider_id}&lang=${lang}`,{
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


export const getFilteredOffers = async (filters, lang) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/filter?lang=${lang}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(filters),
    });

    if (!response.ok) {
      throw new Error("Erreur serveur");
    }

    const data = await response.json();

    return data;

  } catch (err) {
    console.error("❌ Erreur getFilteredOffers:", err);
    return { success: false };
  }
};


export const deleteOffersProvider = async (offer_id) => {
  if (!offer_id) {
    console.error("❌ offer_id manquant");
    return { success: false, error: "Missing offer_id" };
  }

  try {

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/offer/delete?id=${offer_id}`,
      { method: "DELETE" }
    );

    if (!response.ok) {
      console.error("❌ Échec suppression de l'offre");
      return { success: false };
    }

    return await response.json();
  } catch (err) {
    console.error("❌ Erreur suppression de l'offre :", err);
    return { success: false };
  }
};
