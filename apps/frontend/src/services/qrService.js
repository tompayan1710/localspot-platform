// src/services/qrService.js

// L’URL de base est fournie via .env (REACT_APP_API_URL)
const API_BASE = process.env.REACT_APP_API_URL;

export async function getAllQrPlacements() {
  const response = await fetch(`${API_BASE}/api/qr-placements`);
  if (!response.ok) {
    throw new Error(
      `Erreur lors du fetch des QR placements : ${response.status} ${response.statusText}`
    );
  }
  return response.json();
}
