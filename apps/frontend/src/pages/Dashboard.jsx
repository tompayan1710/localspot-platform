import { useEffect, useState } from "react";
import Map3D from "../components/Map3D";

export default function Dashboard() {
  const [qrCodes, setQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Si back et front sont sur le même domaine
    console.log("API URL =", process.env.REACT_APP_API_URL);

    fetch(`http://localhost:3000/api/qr-placements`)
    .then((res) => res.json())
      .then((data) => {
        setQrCodes(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors du fetch :", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <h1>📍 QR Codes disponibles</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table border="1" cellPadding="8" style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Description</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Adresse</th>
            </tr>
          </thead>
          <tbody>
            {qrCodes.map((qr) => (
              <tr key={qr.id}>
                <td>{qr.id}</td>
                <td>{qr.position_description}</td>
                <td>{qr.latitude}</td>
                <td>{qr.longitude}</td>
                <td>{qr.adresse || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
       {/* Section 2 : Carte */}
       <Map3D />
    </div>
  );
}
