// src/api/offers.js
export const createOffer = async (offerData) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(offerData)
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Erreur lors de la création de l'offre :", error);
    return { success: false, error };
  }
};
