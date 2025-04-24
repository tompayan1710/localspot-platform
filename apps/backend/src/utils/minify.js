// apps/backend/src/utils/minify.js
function minify(html) {
    return html.replace(/\n/g, "").replace(/\s+/g, " ").trim();
  }
  
  module.exports = minify;
  