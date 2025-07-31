const db = require("../index");

async function createProvider({
    name, bio, type, sizes, logo_url, email, tel, website, instagram, facebook, moredetails
}){
    const query = (`
    INSERT INTO providers (
        name,
        bio,
        logo_url,
        tel,
        email,
        instagram,
        facebook,
        website,
        type,
        sizes,
        moredetails,
        is_validated,
        invitation_token
    ) 
    VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
    )
    RETURNING id;
    `);


    const values = [name, bio, logo_url, tel, email, instagram, facebook, website, type, sizes, moredetails, false, null];

    const result = await db.query(query, values);
    return result.rows[0];
}

async function UpdateUserProvider(id_user, id_provider) {
  const query = `
    UPDATE users
    SET provider_id = $2
    WHERE id = $1
    RETURNING id;
  `;
  const values = [id_user, id_provider];
  const result = await db.query(query, values);
  return result.rows[0];
}


async function getProviderById(id_provider) {
  const query = `
    SELECT * FROM providers
    WHERE id = $1
  `;
  const values = [id_provider];
  const result = await db.query(query, values);
  return result.rows[0];
}


async function getProviderByToken(token) {
  const query = `
    SELECT * FROM providers
    WHERE invitation_token = $1
  `;
  const values = [token];
  const result = await db.query(query, values);
  return result.rows[0];
}

module.exports = {
    createProvider,
    UpdateUserProvider,
    getProviderById,
    getProviderByToken // ⬅️ ajoute cette ligne si elle n'y est pas !
};
