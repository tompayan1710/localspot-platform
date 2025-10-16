const fetch = require("node-fetch");

async function createQRCode() {
  const res = await fetch("http://localhost:3000/api/qrcode/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      slug: "5576bba5-c3d4-4ea7-b84f-d375e1d1e74f",
      user_id: 64,
      id_hote: 4,
      base_url: "viarte.eu"
    })
  });

  const data = await res.json();
  console.log("Réponse API :", data);
}

createQRCode();
