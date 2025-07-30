// backend/utils/supabaseClient.js
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // ⚠️ bien utiliser la service_key ici, jamais la anon key
);

module.exports = supabase;
