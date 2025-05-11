import React, { useEffect } from 'react';
import '../styles/ContentArea.css';
import UsingMap2D from '../UsingMap2D'
import StatisticContent from '../StatisticContent'
import ListEmplacementsActif from "../../../components/ListEmplacementsActif/ListEmplacementsActif";





  


export default function ContentAreaHome({ markers, loading, error , scans, scansloading, scanserror}) {

  useEffect(() => {
    console.log("Mes scans sont", scans);
  })
  return (
      <div className='ContainerHome'>
        <div className='Map2DContainer'>
          <UsingMap2D markers={markers} loading={loading} error={error}></UsingMap2D>
        </div>
        <StatisticContent></StatisticContent>
        {/* <ListScrollable></ListScrollable>
        <TestSlide /> */}
        <ListEmplacementsActif markers={markers} loading={loading} error={error}></ListEmplacementsActif>
        <div>
          <p>lksjfsi</p>
        </div>
      </div>


);
}
