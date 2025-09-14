
export function pickI18n(field, lang, fallback = "") {
    if (!field) return fallback;
    // si jamais c'est une string JSON
    if (typeof field === "string") {
      try { field = JSON.parse(field); } catch { return fallback || field; }
    }
    return field?.[lang] || field?.en || field?.fr || Object.values(field)[0] || fallback;
}


export function plural(n, sing, plur){return n === 1 ? sing : plur};


// utils/formatDate.js
export function formatDate(dateString, lang, options = {}) {
  if (!dateString) return "";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
    ...options, // permet de personnaliser
  }).format(date);
}
