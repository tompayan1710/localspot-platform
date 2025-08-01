const db = require("../index");

async function getInvitationByToken(token) {
  const query = `
    SELECT * FROM invitation_tokens
    WHERE invitation_token = $1
  `;
  const values = [token];
  const result = await db.query(query, values);
  return result.rows[0];
}

module.exports = {
    getInvitationByToken
};
