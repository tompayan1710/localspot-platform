export function pickI18n(field, lang, fallback = "") {
    if (!field) return fallback;
    // si jamais c'est une string JSON
    if (typeof field === "string") {
      try { field = JSON.parse(field); } catch { return fallback || field; }
    }
    return field?.[lang] || field?.en || field?.fr || Object.values(field)[0] || fallback;
}


export function plural(n, sing, plur){return n === 1 ? sing : plur};
