import React from 'react';
import './styles/ContentArea.css';
import { useQrCodes } from "../../hooks/useQrCodes";
import { useScans } from "../../hooks/useScans";

import ContentAreaHome from "./ContentArea/ContentAreaHome"
import ContentAreaStatistic from "./ContentArea/ContentAreaStatistic/ContentAreaStatistic"
import GenerateQRCodes from "./ContentArea/ContentAreaGenerateQRCodes/ContentAreaGenerateQRCodes"




export default function ContentArea({menuVisible, activePage}) {
  const { markers, loading, error } = useQrCodes();
  const { scans } = useScans();

  return (
    <div className={`ContentAreaContainer ${menuVisible ? "MenueInVisible" : "" }`}>
      
      {activePage === "home" && <ContentAreaHome markers={markers} loading={loading} error={error}></ContentAreaHome>}
      {activePage === "emplacement" && <h1>emplacement Page</h1>}
      {activePage === "myoffers" && <GenerateQRCodes />}
      {activePage === "statistic" && <ContentAreaStatistic scans={scans} markers={markers}></ContentAreaStatistic>}
      {activePage === "myteam" && <h1>Mon équipe</h1>}
      {activePage === "settings" && <h1>Parametre</h1>}
    </div>
);
}


