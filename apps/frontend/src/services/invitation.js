export const getInvitationByToken = async (invitation_token) => {
    console.log("Récupération de l'id du provider");
    try {
        // ✅ Requête pour obtenir un nouveau token (Refresh Token doit être dans les cookies)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/invitation/get_provider_by_token?invitation_token=${invitation_token}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error("❌ Échec Récupération de l'id du provider");
            return { success: false };

        }
    } catch (error) {
        console.error("❌ Erreur Récupération de l'id du provider : ", error);
        return { success: false };
    }
}