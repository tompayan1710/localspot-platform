const express = require("express");
const router = express.Router();
const { getInvitationByToken } = require("../../../db/Models/InvitationModel");



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

module.exports = router;