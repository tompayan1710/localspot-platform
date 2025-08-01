const express = require("express");
const router = express.Router();
const { getInvitationByToken, disableInvitationLink  } = require("../../../db/Models/InvitationModel");
const { UpdateUserProvider } = require("../../../db/Models/ProviderModel");


router.get("/get_provider_by_token", async (req, res) => {
  const { invitation_token } = req.query
  try {
    
    const invitation = await getInvitationByToken(invitation_token);
    res.status(200).json({ success: true, invitation });

  } catch (error) {
    console.error("Erreur dans /invitation/get_provider_by_token?invitation_token= :", error.message);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la récupération du prestataire." });
  }
});



router.patch("/disable_link", async (req, res) => {
  const { invitation_token, id_user, id_provider } = req.query
  try {
    
    await UpdateUserProvider(id_user, id_provider);
    await disableInvitationLink(invitation_token)
    res.status(200).json({ success: true });

  } catch (error) {
    console.error("Erreur dans /invitation/disable_link?invitation_token= id_user= id_provider= :", error.message);
    res.status(500).json({ success: false, message: "Erreur serveur lors de la récupération du prestataire." });
  }
});


module.exports = router;