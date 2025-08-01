const db = require("../index");
const { v4: uuidv4 } = require("uuid"); // Assure-toi que 'uuid' est installé (npm install uuid)


async function getInvitationByToken(token) {
  const query = `
    SELECT * FROM invitation_tokens
    WHERE invitation_token = $1
  `;
  const values = [token];
  const result = await db.query(query, values);
  return result.rows[0];
}

async function disableInvitationLink(invitation_token ) {
  const query = `
    UPDATE invitation_tokens
    SET is_used = TRUE, used_at = NOW()
    WHERE invitation_token = $1
    RETURNING *;
  `;
  const values = [invitation_token ];
  const result = await db.query(query, values);
  return result.rows[0]; // renvoie la ligne mise à jour, si besoin
}

async function createInvitationToken(provider_id, expires_at = null) {
  // Si aucune date d'expiration n'est fournie → on met +24h
  if (!expires_at) {
    expires_at = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h en ms
  }

  const token = uuidv4(); // Génère un UUID sécurisé

  const query = `
    INSERT INTO invitation_tokens (invitation_token, provider_id, expires_at)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const values = [token, provider_id, expires_at];
  const result = await db.query(query, values);
  return result.rows[0]; // Retourne la ligne insérée
}


module.exports = {
    getInvitationByToken,
    disableInvitationLink,
    createInvitationToken
};
