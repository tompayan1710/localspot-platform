const fetch = require("node-fetch");

async function createQRCode() {
  const res = await fetch("http://localhost:3000/api/qrcode/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: "9630f266-e89f-4ebf-b5f6-88801cb1f07b",
      user_id: 64,
      id_hote: 4,
      base_url: "viarte.eu"
    })
  });

  const data = await res.json();
  console.log("Réponse API :", data);
}

createQRCode();
