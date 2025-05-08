// src/hooks/useQrCodes.js
import { useState, useEffect } from "react";
import { getAllScans } from "../services/qrService";

/**
 * useQrCodes
 * Hook qui récupère la liste des QR-codes depuis l’API et
 * expose à la fois les données (markers), l’état de chargement et une éventuelle erreur.
 */
export function useScans() {
  const [scans, setScans] = useState([]);     // tableau des QR-codes
  const [loading, setLoading] = useState(true);   // spinner pendant le fetch
  const [error, setError] = useState(null);       // pour afficher un message en cas d’erreur

  useEffect(() => {
    let cancelled = false;
    console.log("🔍 useScans: fnts");
    console.log("🔍 useScans: fetch URL =", process.env.REACT_APP_API_URL + "/api/scans");

    getAllScans() 
      .then(data => {
        console.log("🔍Scans");
        if (!cancelled) setScans(data);
      })
      .catch(err => {
        console.log("erreur pour get ALL Scan");
        console.error("Erreur fetch Scan :", err);
        if (!cancelled) setError(err);
      })
      .finally(() => {
        console.log("SET LOADING Scan");
        if (!cancelled) setLoading(false);
      });

    // cleanup au démontage pour éviter des setState après un unmount
    return () => {
      cancelled = true;
    };
  }, []);

  return { scans, loading, error };
}
