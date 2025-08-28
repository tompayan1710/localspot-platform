// scripts/fill_missing_translations.js
// Usage: node scripts/fill_missing_translations.js
require('dotenv').config();

// ⬇️ Adapte ce chemin selon ton projet :
const db = require('../db/index'); // <- doit exporter { query: (text, params) => ... }

// Si tu es en Node < 18, décommente la ligne suivante pour polyfiller fetch :
// global.fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_ENDPOINT = 'https://api-free.deepl.com/v2/translate';

// 👉 Ta liste officielle des langues supportées
const SUPPORTED_LANGS = [
  'fr',
  'en',
  // 'it',
  // 'de', // décommente si tu veux aussi backfiller l’allemand
];

if (!DEEPL_API_KEY) {
  console.error('❌ DEEPL_API_KEY manquant.');
  process.exit(1);
}

// ---- helpers ----
function toObj(jsonish) {
  if (!jsonish) return {};
  if (typeof jsonish === 'object') return jsonish;
  try { return JSON.parse(jsonish); } catch { return {}; }
}

async function translateDeepL(text, targetLang, sourceLang /* 'FR' ou undefined */) {
  const txt = (text || '').toString().trim();
  if (!txt) return '';
  const params = new URLSearchParams();
  params.set('text', txt);
  params.set('target_lang', targetLang.toUpperCase());
  if (sourceLang) params.set('source_lang', sourceLang.toUpperCase());

  const resp = await fetch(DEEPL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params
  });

  if (!resp.ok) {
    const body = await resp.text().catch(() => '');
    console.warn(`⚠️ DeepL ${resp.status}: ${body.slice(0, 200)}`);
    // fallback: on garde le texte source si la trad échoue
    return txt;
  }
  const data = await resp.json();
  return data?.translations?.[0]?.text ?? txt;
}

// ---- main ----
async function main() {
  console.log('🔎 Lecture de toutes les offres…');
  const { rows } = await db.query(`
    SELECT slug, title, description, title_i18n, description_i18n
    FROM offers
    ORDER BY created_at DESC
  `);

  let updated = 0, skipped = 0;

  for (const row of rows) {
    const { slug } = row;
    const title_i18n = toObj(row.title_i18n);
    const desc_i18n  = toObj(row.description_i18n);

    // Source FR (ou fallback sur le brut si FR absent)
    const srcTitleFR = title_i18n.fr || row.title || '';
    const srcDescFR  = desc_i18n.fr  || row.description || '';

    const titlePatch = {};
    const descPatch  = {};

    for (const lang of SUPPORTED_LANGS) {
      // ----- TITLE -----
      if (!title_i18n[lang]) {
        if (lang === 'fr') {
          if (srcTitleFR) titlePatch.fr = srcTitleFR;
        } else {
          const t = await translateDeepL(srcTitleFR || row.title || '', lang, srcTitleFR ? 'FR' : undefined);
          if (t) titlePatch[lang] = t;
        }
      }
      // ----- DESCRIPTION -----
      if (!desc_i18n[lang]) {
        if (lang === 'fr') {
          if (srcDescFR) descPatch.fr = srcDescFR;
        } else {
          const d = await translateDeepL(srcDescFR || row.description || '', lang, srcDescFR ? 'FR' : undefined);
          if (d) descPatch[lang] = d;
        }
      }
    }

    // Rien de neuf à ajouter ?
    if (Object.keys(titlePatch).length === 0 && Object.keys(descPatch).length === 0) {
      skipped++;
      continue;
    }

    // Merge JSONB sans écraser l'existant
    await db.query(
      `
      UPDATE offers
      SET
        title_i18n       = COALESCE(title_i18n, '{}'::jsonb)       || $2::jsonb,
        description_i18n = COALESCE(description_i18n, '{}'::jsonb) || $3::jsonb
      WHERE slug = $1
      `,
      [slug, JSON.stringify(titlePatch), JSON.stringify(descPatch)]
    );

    console.log(`✅ ${slug} | +title:[${Object.keys(titlePatch).join(',')}] +desc:[${Object.keys(descPatch).join(',')}]`);
    updated++;
  }

  console.log('🎉 Terminé.', { updated, skipped });
}

main().catch(err => {
  console.error('💥 Erreur:', err);
  process.exit(1);
});
