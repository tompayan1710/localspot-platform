// services/translate.js
const DEEPL_ENDPOINT = "https://api-free.deepl.com/v2/translate"; // Pro: https://api.deepl.com
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const SUPPORTED_LANGS = ["fr", "en"];

async function translateWithDeepL(text, targetLang, sourceLang) {
  if (!text) return "";
  if (!DEEPL_API_KEY) return text;

  try {
    const params = new URLSearchParams();
    params.set("text", text);
    params.set("target_lang", targetLang.toUpperCase());
    // if (sourceLang) params.set("source_lang", sourceLang.toUpperCase());

    const resp = await fetch(DEEPL_ENDPOINT, {
      method: "POST",
      headers: {
        "Authorization": `DeepL-Auth-Key ${DEEPL_API_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params
    });

    if (!resp.ok) {
      console.error("DeepL error:", resp.status, await resp.text());
      return text;
    }
    const data = await resp.json();
    return data?.translations?.[0]?.text ?? text;
  } catch (e) {
    console.error("DeepL request failed:", e);
    return text;
  }
}

async function translateToAll(text, langs = SUPPORTED_LANGS, sourceLang) {
  const out = {};
  await Promise.all(
    langs.map(async (lang) => {
      if (sourceLang && sourceLang.toLowerCase() === lang.toLowerCase()) {
        out[lang] = text;
      } else {
        out[lang] = await translateWithDeepL(text, lang, sourceLang);
      }
    })
  );
  return out; // { fr: "...", en: "..." }
}

module.exports = {
  translateWithDeepL,
  translateToAll,
};
