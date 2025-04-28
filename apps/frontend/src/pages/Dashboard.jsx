// src/pages/Dashboard.jsx
import { useState } from "react";
import { useQrCodes } from "../hooks/useQrCodes";
import Map2D from "../components/Map3D/Map2D";
import BottomSheet from "../components/BottomSheet/BottomSheet";

export default function Dashboard() {
  const { markers, loading, error } = useQrCodes();
  const [selected, setSelected]     = useState(null);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          flex: "0 0 auto",
          padding: "1rem",
          backgroundColor: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.25rem" }}>LocalSpot Dashboard</h1>
      </header>

      {/* MAIN CONTENT */}
      <main
        style={{
          flex: "1 1 auto",
          overflowY: "auto",
          padding: "0rem",
        }}
      >
        {loading && <p>Chargement de la carte…</p>}
        {error && <p style={{ color: "red" }}>Erreur : {error.message}</p>}

        {!loading && !error && (
          <Map2D
            apiKey={process.env.REACT_APP_GOOGLE_MAPS_KEY}
            markers={markers}
            onMarkerClick={setSelected}
          />
        )}

        
        <BottomSheet open={!!selected} onClose={() => setSelected(null)}>
          {selected && (
            <div style={{ padding: "1rem" }}>
              <h2 style={{ marginTop: 0 }}>{selected.label}</h2>
              <p>{selected.position_description}</p>
              <p>
                📍 {selected.latitude}, {selected.longitude}
              </p>
            </div>
          )}
        </BottomSheet>
        
      </main>

      {/* 
      <footer
        style={{
          flex: "0 0 auto",
          padding: "0.5rem 1rem",
          textAlign: "center",
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd",
          fontSize: "0.875rem",
        }}
      >
        
        © {new Date().getFullYear()} LocalSpot
      </footer>
      */}
    </div>
  );
}
