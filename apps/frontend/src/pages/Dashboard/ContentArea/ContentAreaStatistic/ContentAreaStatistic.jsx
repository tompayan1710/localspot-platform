import React, { useEffect, useRef } from 'react';
import '../../styles/ContentArea.css';
import { useScans } from "../../../../hooks/useScans";
import TabScanContainer from "./TabScanStatistic"


export default function ContentAreaHome({scans, scansloading, scanserror}) {

  useEffect(() => {
    console.log("Mes scans sont", scans);
  })
  return (
      <div className='ContainerStatistique'>
        <div>
          <p>Statistiquede tom</p>
          <TabScanContainer scans={scans}></TabScanContainer>
        </div>
      </div>


);
}
