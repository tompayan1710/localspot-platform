const fetch = require("node-fetch");

async function createQRCode() {
  const res = await fetch("http://localhost:3000/api/qrcode/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: "2a18b701-7f45-4f76-b054-1717f0607657",
      user_id: 64,
      id_hote: 4,
      latitude: 43.567945,
      longitude: 7.11491,
      adresse: "Place Masséna, Nice",
      base_url: "viarte.eu"
    })
  });

  const data = await res.json();
  console.log("Réponse API :", data);
}

createQRCode();
