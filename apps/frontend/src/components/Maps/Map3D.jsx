// src/components/Map3D/Map3D.jsx

import React, { useEffect, useRef, useState, memo } from "react";
import styles from "./Map3D.module.css";


function Map3D({
  markers = [],
  onMarkerClick = () => {},
  apiKey,
  center = { lat: 43.7002, lng: 7.2620 },
  mode = "hybrid",
  range = 2500,
  tilt = 70,
  heading = 0,
  height = 500,
}) {
  const containerRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // 1. Charger le script Google Maps
  useEffect(() => {
    if (document.querySelector('script[src*="maps.googleapis.com"]')) {
      setLoaded(true);
      return;
    }
    const s = document.createElement("script");
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=alpha&libraries=maps3d`;
    s.async = true;
    s.onload = () => setLoaded(true);
    document.head.appendChild(s);
  }, [apiKey]);

  // 2. Instancier la carte et les markers chaque fois que `loaded` ou `markers` change
  useEffect(() => {
    if (!loaded || !containerRef.current) return;

    // Nettoyage : on vide le conteneur
    containerRef.current.innerHTML = "";

    // Création du composant 3D
    const mapEl = document.createElement("gmp-map-3d");
    mapEl.setAttribute("center", `${center.lat},${center.lng}`);
    mapEl.setAttribute("mode", mode);
    mapEl.setAttribute("range", range.toString());
    mapEl.setAttribute("tilt", tilt.toString());
    mapEl.setAttribute("heading", heading.toString());
    mapEl.className = styles.map; // applique width:100% & height

    /*
    "id": 2,
    "position_description": "Ceci est la description de la position",
    "created_at": "2025-04-23T21:31:29.532Z",
    "latitude": 43.722468,
    "longitude": 7.114235,
    "adresse": "4 Place Godeau, Vence, France",
    "city_id": 1,
    "city_name": "Nice"
    */
    // Ajout des markers interactifs
    markers.forEach(marker => {
      console.log(marker)
      if(marker.latitude && marker.longitude){
        const m = document.createElement("gmp-marker-3d-interactive");
        m.setAttribute("position", `${marker.latitude},${marker.longitude}`);
        m.setAttribute("label", marker.adresse);
        // attributs 3D par défaut
        m.setAttribute("altitude-mode", "relative-to-mesh");
        m.setAttribute("collision-behavior", "required");
        m.setAttribute("draws-when-occluded", "");
        m.setAttribute("extruded", "");
        m.setAttribute("size-preserved", "");
        m.addEventListener("gmp-click", () => onMarkerClick(marker));
        mapEl.appendChild(m);
      }
     
    });

    containerRef.current.appendChild(mapEl);

    // Pas de cleanup nécessaire (tout est retiré en début d’effet)
  }, [loaded, markers, center, mode, range, tilt, heading, onMarkerClick]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={containerRef}
        className={styles.mapContainer}
      />
      <h2 className={styles.title}>🗺️ Carte 3D</h2>

    </div>
  );
}


export default memo(Map3D);
