import { useEffect, useRef, useState } from "react";

export default function Map3D() {
  const containerRef = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    // Si le script n'existe pas déjà, on le charge
    if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyAe-fjksdOMXtdDWnGmJKEhOMiFFY4WRS0&v=alpha&libraries=maps3d";
      script.async = true;
      script.onload = () => {
        console.log("✅ Google Maps chargé");
        setScriptLoaded(true);
      };
      document.head.appendChild(script);
    } else {
      setScriptLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!scriptLoaded || !containerRef.current) return;

    // On vide le conteneur (évite les doublons)
    containerRef.current.innerHTML = "";

    const map = document.createElement("gmp-map-3d");
    map.setAttribute("center", "43.7002, 7.2620");
    map.setAttribute("mode", "hybrid");
    map.setAttribute("range", "2500");
    map.setAttribute("tilt", "70");
    map.setAttribute("heading", "0");
    map.style.width = "100%";
    map.style.height = "500px";

    const marker = document.createElement("gmp-marker-3d-interactive");
    marker.setAttribute("position", "43.722468, 7.114235");
    marker.setAttribute("label", "Clique-moi !");
    map.appendChild(marker);

    containerRef.current.appendChild(map);
  }, [scriptLoaded]);

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <h2>🗺️ Carte 3D</h2>
      <div ref={containerRef} />
    </div>
  );
}
