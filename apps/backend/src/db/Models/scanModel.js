const db = require("../index");


async function hasRecentScan(qr_code_id, ip, interval = 3) {
  const check = await db.query(
    `SELECT id FROM scans 
     WHERE qr_code_id = $1 AND ip = $2 AND created_at > NOW() - INTERVAL '${interval} seconds'`,
    [qr_code_id, ip]
  );
  return check.rows.length > 0;
}



// 🔹 Enregistre un nouveau scan
async function createScan(qr_code_id,
  ip,
  user_agent,
  device_type,
  browser_id) {

  

  const result = await db.query(
    `INSERT INTO scans (qr_code_id,
      ip,
      user_agent,
      device_type,
      browser_id,
      created_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *`,
    [qr_code_id, ip, user_agent, device_type, browser_id]
  );
  return result.rows[0];
}

// 🔹 (optionnel) Récupère tous les scans
async function getAllScans() {
  const result = await db.query(`
    SELECT 
      scans.*, 
      qr_codes.slug, 
      browsers.name AS browser_name
    FROM scans
    LEFT JOIN qr_codes ON scans.qr_code_id = qr_codes.id
    LEFT JOIN browsers ON scans.browser_id = browsers.id
    ORDER BY scans.created_at DESC
  `);
  return result.rows;
}


module.exports = {
  createScan,
  getAllScans,
  hasRecentScan
};
