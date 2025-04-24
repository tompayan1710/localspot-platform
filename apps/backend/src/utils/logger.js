// apps/backend/src/utils/logger.js

const isProd = process.env.NODE_ENV === "production";

function log(...args) {
  if (!isProd) {
    console.log(...args);
  }
}

module.exports = {
  log,
};
