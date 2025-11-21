// backend/routes/presentoirs/presentoirsRoutes.js
const express = require("express");
const router = express.Router();
const { getAllPresentoirs, getStatsPresentoirs, getAllStatsPresentoirs, addScanPresentoir, getPresentoirOfferAndHoteInfo } = require("../../../db/Models/PresentoirsModel");
const pool = require("../../../db/index");

// -------------------------
// GET ALL PRESENTOIRS
// -------------------------
function groupPresentoirs(rows) {
    const map = {};

    rows.forEach(r => {
        if (!map[r.presentoir_id]) {
            map[r.presentoir_id] = {
                presentoir_id: r.presentoir_id,
                name: r.name,
                status: r.status,
                offers: [],
                total_scans: r.total_scans,  // déjà correct
                last_scan: r.last_scan       // déjà correct
            };
        }

        if (r.offer_slug) {
            map[r.presentoir_id].offers.push({
                presentoir_offer_id: r.presentoir_offer_id,
                offer_slug: r.offer_slug,
            });
        }
    });

    return Object.values(map);
}


router.get("/getall", async (req, res) => {
    const hote_id = req.query.hote_id;

    if (!hote_id) {
        return res.status(400).json({ success: false, message: "hote_id requis" });
    }

    try {
        const rows = await getAllPresentoirs(hote_id);
        const presentoirs = groupPresentoirs(rows);

        res.json({
            success: true,
            presentoirs
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Erreur serveur" });
    }
});

// -------------------------
// GET PRESENTOIR STATS
// -------------------------
router.get("/stats", async (req, res) => {
    const { slug, hote_id } = req.query;

    if (!slug || !hote_id) {
        return res.status(400).json({
            success: false,
            message: "slug et hote_id requis"
        });
    }

    try {
        const stats = await getStatsPresentoirs(slug, hote_id);

        return res.json({
            success: true,
            stats
        });

    } catch (error) {
        console.error("Erreur dans /presentoirs/stats :", error);

        return res.status(500).json({
            success: false,
            message: "Erreur serveur."
        });
    }
});


// -------------------------
// GET PRESENTOIR STATS
// -------------------------
// 📌 Stats globales des présentoirs d’un hôtel
router.get("/allstats", async (req, res) => {
    const { hote_id } = req.query;

    if (!hote_id) {
        return res.status(400).json({ success: false, error: "hote_id manquant" });
    }

    try {
        const result = await pool.query(
            `
            WITH last_months AS (
                SELECT 
                    to_char(date_trunc('month', CURRENT_DATE) - (interval '1 month' * i), 'YYYY-MM') AS year_month
                FROM generate_series(5, 0, -1) AS i
            ),
            monthly_scans AS (
                SELECT 
                    to_char(date_trunc('month', sl.scanned_at), 'YYYY-MM') AS year_month,
                    COUNT(*) AS scan_count
                FROM presentoir_scans_log sl
                JOIN presentoir_offers po ON po.id = sl.presentoir_offer_id
                JOIN presentoirs p ON p.presentoir_id = po.presentoir_id
                WHERE p.hote_id = $1
                GROUP BY 1
            )
            SELECT 
                lm.year_month,
                COALESCE(ms.scan_count, 0) AS scan_count
            FROM last_months lm
            LEFT JOIN monthly_scans ms ON lm.year_month = ms.year_month
            ORDER BY lm.year_month;
            `,
            [hote_id]
        );

        const total = result.rows.reduce((sum, r) => sum + Number(r.scan_count), 0);

        res.json({
            success: true,
            stats: {
                total_scans: total,
                monthly: result.rows
            }
        });

    } catch (error) {
        console.error("❌ Erreur /allstats :", error);
        res.status(500).json({ success: false, error: "Erreur serveur" });
    }
});




// -------------------------
// ADD PRESENTOIR SCAN
// -------------------------
router.get("/addscan", async (req, res) => {
    const { presentoir_offer_id, presentoir_id, offer_slug } = req.query;

    if (!presentoir_offer_id || !presentoir_id || !offer_slug) {
        return res.status(400).json({
            success: false,
            message: "presentoir_offer_id, presentoir_id et offer_slug requis"
        });
    }

    try {
        await addScanPresentoir(presentoir_offer_id, presentoir_id, offer_slug);

        return res.json({ success: true });

    } catch (error) {
        console.error("Erreur dans /presentoirs/addscan :", error);

        return res.status(500).json({
            success: false,
            message: "Erreur serveur."
        });
    }
});


router.get("/getpresentoirofferandhoteinfo", async (req, res) => {
    const { presentoir_offer_id } = req.query;

    if (!presentoir_offer_id) {
        return res.status(400).json({
            success: false,
            message: "presentoir_offer_id requis"
        });
    }

    try {
        const data = await getPresentoirOfferAndHoteInfo(presentoir_offer_id);
        return res.json({ success: true, data });

    } catch (err) {
        console.error("Erreur getpresentoirofferandhoteinfo :", err);
        return res.status(500).json({ success: false });
    }
});

module.exports = router;
