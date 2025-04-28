// src/hooks/useQrCodes.js
import { useState, useEffect } from "react";
import { getAllQrPlacements } from "../services/qrService";

/**
 * useQrCodes
 * Hook qui récupère la liste des QR-codes depuis l’API et
 * expose à la fois les données (markers), l’état de chargement et une éventuelle erreur.
 */
export function useQrCodes() {
  const [markers, setMarkers] = useState([]);     // tableau des QR-codes
  const [loading, setLoading] = useState(true);   // spinner pendant le fetch
  const [error, setError] = useState(null);       // pour afficher un message en cas d’erreur

  useEffect(() => {
    let cancelled = false;
    cconsole.log("🔍 useQrCodes: fnts");
    console.log("🔍 useQrCodes: fetch URL =", process.env.REACT_APP_API_URL + "/api/qr-placements");

    getAllQrPlacements()
      .then(data => {
        cconsole.log("🔍Marker");
        if (!cancelled) setMarkers(data);
      })
      .catch(err => {
        console.log("erreur pour get ALL");
        console.error("Erreur fetch QR codes :", err);
        if (!cancelled) setError(err);
      })
      .finally(() => {
        console.log("SET LOADING");
        if (!cancelled) setLoading(false);
      });

    // cleanup au démontage pour éviter des setState après un unmount
    return () => {
      cancelled = true;
    };
  }, []);

  return { markers, loading, error };
}
