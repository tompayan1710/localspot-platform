const db = require("../index");

// 🔹 Crée un nouveau QR code
async function createQRCode(slug, user_id, id_hote) {
  const query = `
    INSERT INTO qr_codes (slug, user_id, id_hote)
    VALUES ($1, $2, $3)
    RETURNING id;
  `;
  const values = [slug, user_id, id_hote];
  const result = await db.query(query, values);
  return result.rows[0].id;
}

async function UpdateQRCode(id_qrcode, image_url){
  const result = await db.query(
    'UPDATE qr_codes SET image_url = $1 WHERE id = $2 RETURNING *',
    [image_url, id_qrcode]
  );
  return result.rows[0];
}


async function getQRCodeById(id_qrcode) {
  const query = `
    SELECT * FROM qr_codes WHERE qr_codes.id = $1
  `;
  const values = [id_qrcode];
  const result = await db.query(query, values);
  return result;
}

module.exports = {
  createQRCode,
  getQRCodeById,
  UpdateQRCode,
};