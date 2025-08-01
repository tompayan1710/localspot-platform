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



export const linkUserToProvider = async (invitation_token, id_user, id_provider) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/invitation/disable_link?invitation_token=${invitation_token}&id_user=${id_user}&id_provider=${id_provider}`, {
            method: "PATCH"
        });

        if (response.ok) {
            console.log("✅ Utilisateur lié au prestataire avec succès");
            return { success: true };
        } else {
            console.error("❌ Échec du lien utilisateur/prestataire");
            return { success: false };
        }
    } catch (error) {
        console.error("❌ Erreur lors de la liaison utilisateur/prestataire :", error);
        return { success: false };
    }
};
