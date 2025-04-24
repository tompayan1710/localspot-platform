const http = require("http");

// Options pour faire une requête GET sur /q/abc123
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/q/abc123",
  method: "GET",
};

const req = http.request(options, (res) => {
  console.log(`📥 Status: ${res.statusCode}`);
  console.log("📦 Headers:", res.headers);

  res.on("data", (chunk) => {
    console.log("🔹 Data chunk:", chunk.toString());
  });
});

req.on("error", (error) => {
  console.error("❌ Erreur de requête :", error);
});

req.end();
