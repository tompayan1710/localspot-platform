const db = require("../index");

async function getAllPresentoirs(hote_id) {
    const query = `
        SELECT 
            p.presentoir_id,
            p.name,
            p.status,

            po.id AS presentoir_offer_id,
            po.offer_slug,

            COALESCE((
                SELECT COUNT(*) 
                FROM presentoir_scans_log log 
                WHERE log.presentoir_id = p.presentoir_id
            ), 0) AS total_scans,

            (
                SELECT MAX(log.scanned_at)
                FROM presentoir_scans_log log
                WHERE log.presentoir_id = p.presentoir_id
            ) AS last_scan

        FROM presentoirs p
        LEFT JOIN presentoir_offers po
            ON po.presentoir_id = p.presentoir_id

        WHERE p.hote_id = $1
        ORDER BY p.presentoir_id;
    `;

    const result = await db.query(query, [hote_id]);
    return result.rows;
}

// ⚡ STATS D'UNE SEULE OFFRE
async function getStatsPresentoirs(slug, hote_id) {
    const query = `
        SELECT 
            COALESCE(SUM(po.scan_count), 0) AS total_scans,

            COALESCE(SUM(
                CASE 
                    WHEN po.last_scan_at >= NOW() - INTERVAL '30 days'
                    THEN po.scan_count
                    ELSE 0
                END
            ), 0) AS monthly_scans,

            COUNT(po.presentoir_id) AS presentoir_count,

            MAX(po.qr_base_url) AS qr_base_url
        FROM presentoir_offers po
        JOIN presentoirs p 
            ON p.presentoir_id = po.presentoir_id
        WHERE po.offer_slug = $1
        AND p.hote_id = $2;
    `;

    const result = await db.query(query, [slug, hote_id]);
    return result.rows[0];
}
async function getAllStatsPresentoirs(hote_id) {
    const query = `
        WITH months AS (
            SELECT 
                to_char(date_trunc('month', CURRENT_DATE) - INTERVAL '1 month' * i, 'YYYY-MM') AS year_month
            FROM generate_series(0, 5) AS s(i)
        ),
        scans AS (
            SELECT 
                to_char(l.scanned_at, 'YYYY-MM') AS year_month,
                COUNT(*) AS scan_count
            FROM presentoir_scans_log l
            JOIN presentoirs p ON p.presentoir_id = l.presentoir_id
            WHERE p.hote_id = $1
            GROUP BY year_month
        )
        SELECT 
            m.year_month,
            COALESCE(s.scan_count, 0) AS scan_count
        FROM months m
        LEFT JOIN scans s ON s.year_month = m.year_month
        ORDER BY m.year_month;
    `;

    const result = await db.query(query, [hote_id]);

    const total = result.rows.reduce((sum, r) => sum + Number(r.scan_count), 0);

    return {
        total_scans: total,
        monthly: result.rows
    };
}


async function addScanPresentoir(presentoir_offer_id, presentoir_id, offer_slug) {
    const query = `
        INSERT INTO presentoir_scans_log (presentoir_offer_id, presentoir_id, offer_slug) 
        VALUES($1, $2, $3)
        RETURNING *;
    `;
    const result = await db.query(query, [
        presentoir_offer_id,
        presentoir_id,
        offer_slug
    ]);

    return result.rows[0];
}


// backend/db/Models/PresentoirsModel.js
async function getPresentoirOfferAndHoteInfo(presentoir_offer_id) {
    const query = `
        SELECT
            po.id AS presentoir_offer_id,
            po.offer_slug,
            po.presentoir_id,

            p.name AS presentoir_name,
            p.status,
            p.hote_id,

            h.id AS hote_id,
            h.name AS hote_name,
            h.location AS hote_location,
            h.type AS hote_type,
            h.created_at AS hote_created_at,
            h.updated_at AS hote_updated_at,
            h.latitude AS hote_latitude,
            h.longitude AS hote_longitude,
            h.city_id AS hote_city_id,
            h.image_urls AS hote_images,
            h.logo_img AS logo_img
        FROM presentoir_offers po
        JOIN presentoirs p ON p.presentoir_id = po.presentoir_id
        JOIN hotes h ON h.id = p.hote_id
        WHERE po.id = $1;
    `;

    const result = await db.query(query, [presentoir_offer_id]);
    return result.rows[0];
}




module.exports = { 
    getAllPresentoirs, 
    getStatsPresentoirs,
    getAllStatsPresentoirs,
    addScanPresentoir,
    getPresentoirOfferAndHoteInfo
};
