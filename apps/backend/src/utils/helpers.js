// helper.js

function formatDateYYYYMMDD(date, lang = "en") {
  if (!(date instanceof Date)) date = new Date(date);

  return date.toLocaleDateString(lang, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
}

function formatHumanAtTime(date, lang = "en", time = null) {
  let d = date instanceof Date ? date : new Date(date);

  if (time) {
    // Fusionne heure si fournie (ex: "09:00")
    const [h, m] = time.split(":");
    d.setHours(parseInt(h, 10), parseInt(m, 10));
  }

  return d.toLocaleString(lang, {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}


module.exports = { formatDateYYYYMMDD, formatHumanAtTime };
