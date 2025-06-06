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
        is_validated
    ) 
    VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12
    )
    RETURNING id;
    `);


    const values = [name, bio, logo_url, tel, email, instagram, facebook, website, type, sizes, moredetails, false];

    const result = await db.query(query, values);
    return result.rows[0];
}

async function insertUserProvider(id_user, id_provider) {
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


module.exports = {
    createProvider,
    insertUserProvider,
};