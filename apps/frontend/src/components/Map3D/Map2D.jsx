// src/components/Map2D/Map2D.jsx
import React, { useEffect, useRef } from "react";

export default function Map2D({
  apiKey,
  center = { lat: 43.7002, lng: 7.2620 },
  zoom = 14,
  height = 300,
}) {
  const mapRef = useRef(null);

  useEffect(() => {
    // Charger le script Google Maps si pas déjà présent
    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    // Initialise la carte 2D
    function initMap() {
      new window.google.maps.Map(mapRef.current, {
        center,
        zoom,
      });
    }
  }, [apiKey, center, zoom]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: `${height}px`,
        margin: "1rem 0",
      }}
    />
  );
}
