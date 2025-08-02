export async function toggleFavorite(user_id, offer_slug) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/toggle-like`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, offer_slug }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur dans toggleFavorite :", error);
    return { success: false, message: error.message };
  }
}


export async function IsOfferFavorite(user_id, offer_slug) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/offer/is-favorite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, offer_slug }),
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur dans isOfferFavorite :", error);
    return { success: false, message: error.message };
  }
}



export async function getAllFavorites(user_id) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/getall-favorites?user_id=${user_id}`, {
      method: "GET",
    });

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur dans getAllFavorites :", error);
    return { success: false, message: error.message };
  }
}
