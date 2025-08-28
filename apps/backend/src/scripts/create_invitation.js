const { createInvitationToken } = require("../db/Models/InvitationModel");

(async () => { 
    const expires = new Date(Date.now() + 24 * 60 * 60 * 2000); // +24h
    const newInvitation = await createInvitationToken(5,expires);
    console.log(newInvitation);
    console.log(`Url sécurisé : ${process.env.FRONTEND_URL}/invitation?token_invitation=` + newInvitation.invitation_token)
    return;
})();

// node .\src\utils\create_invitation.js

//Lien sécurisé : viarte.eu/invitation?token_invitation=b5edab9f-22e2-40c4-9e3e-3f2a294cdd96