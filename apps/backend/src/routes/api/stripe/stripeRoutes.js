require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require("express");
const router = express.Router();
const db = require('../../../db');
const authMiddleware = require("../../../auth/authMiddleware");

// --- ROUTES ---

router.get('/authorize', authMiddleware, async (req, res) => {
    const protocol = req.protocol;
    const host = req.get('host');
    const fullBaseUrl = `${protocol}://${host}`;
    
    try {
        const userResult = await db.query(
            'SELECT p.id as real_provider_id, p.stripe_account_id FROM users u JOIN providers p ON u.provider_id = p.id WHERE u.id = $1', 
            [req.user.id]
        );
        
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: "Ce compte n'est pas lié à un profil prestataire." });
        }
      
        const providerId = userResult.rows[0].real_provider_id;
        let stripeAccountId = userResult.rows[0].stripe_account_id;
      
        if (!stripeAccountId) {
            const account = await stripe.accounts.create({
                type: 'express',
                business_profile: {
                    url: 'https://viarte.eu', 
                    product_description: "Prestations de services proposées via la plateforme Viarte.",
                },
                capabilities: {
                    card_payments: { requested: true },
                    transfers: { requested: true },
                },
            });
            stripeAccountId = account.id;
            await db.query('UPDATE providers SET stripe_account_id = $1 WHERE id = $2', [stripeAccountId, providerId]);
        }

        // On récupère le token (soit du header, soit de la query via le middleware)
        // pour le propager dans les URLs de retour Stripe
        const token = req.query.token || req.headers.authorization?.split(' ')[1];

        const accountLink = await stripe.accountLinks.create({
            account: stripeAccountId,
            refresh_url: `${fullBaseUrl}/api/stripe/authorize?token=${token}`,
            return_url: `${fullBaseUrl}/api/stripe/onboarded?token=${token}`,
            type: 'account_onboarding'
        });

        res.json({ url: accountLink.url });

    } catch (err) {
        console.error("ERREUR STRIPE AUTHORIZE:", err);
        res.status(500).json({ error: "Erreur lors de l'autorisation" });
    }
});

router.get('/onboarded', authMiddleware, async (req, res) => {
  try {
    // Le middleware a déjà validé le token (depuis l'URL) et rempli req.user
    const userResult = await db.query(
        'SELECT p.id as real_provider_id, p.stripe_account_id FROM users u JOIN providers p ON u.provider_id = p.id WHERE u.id = $1', 
        [req.user.id]
    );

    if (userResult.rows.length === 0) {
        return res.redirect(`${process.env.FRONTEND_URL}/profile?error=no_provider`);
    }
    
    const providerId = userResult.rows[0].real_provider_id;
    const stripeAccountId = userResult.rows[0].stripe_account_id;

    if (!stripeAccountId) {
        return res.redirect(`${process.env.FRONTEND_URL}/profile?error=no_account`);
    }

    const account = await stripe.accounts.retrieve(stripeAccountId);

    if (account.details_submitted) {
      await db.query('UPDATE providers SET onboarding_complete = $1 WHERE id = $2', [true, providerId]);
      res.redirect(`${process.env.FRONTEND_URL}/profile?success=onboarding_finished`);
    } else {
      res.redirect(`${process.env.FRONTEND_URL}/profile?error=incomplete`);
    }
  } catch (err) {
    console.error('Erreur Stripe Onboarded:', err);
    res.redirect(`${process.env.FRONTEND_URL}/profile?error=server_error`);
  }
});

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const userResult = await db.query(
        'SELECT p.stripe_account_id FROM users u JOIN providers p ON u.provider_id = p.id WHERE u.id = $1', 
        [req.user.id]
    );
    
    const stripeAccountId = userResult.rows[0]?.stripe_account_id;
    if (!stripeAccountId) return res.status(400).json({error: "Compte Stripe non trouvé"});

    const loginLink = await stripe.accounts.createLoginLink(stripeAccountId);
    res.json({ url: loginLink.url }); 
  } catch (err) {
    console.error(err);
    res.status(500).json({error: "Impossible d'accéder au dashboard"});
  }
});

module.exports = router; 