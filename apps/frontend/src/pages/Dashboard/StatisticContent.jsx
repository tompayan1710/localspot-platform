import React, { useEffect } from 'react';
import './styles/StatisticContent.css';
import scanicon from "../../assets/images/scanicon.png";
import eyeicon from "../../assets/images/eyeicon.png";
import clickicon from "../../assets/images/clickicon.png";
import emplacement from "../../assets/images/emplacementicon.png";


export default function Statistic(props) {

  return (
    <div className="ContainerStatistic">
     
     <div className='StatNumberContainer'>
        <div>
          <p className='t5'>Total des scans</p>
          <p className='t3'>107</p>
        </div>
        <img id="stat1" src={scanicon}></img>
      </div>
      <div className='StatNumberContainer'>
        <div>
          <p className='t5'>Nombre de vue</p>
          <p className='t3'>1031</p>
        </div>
        <img id="stat2" src={eyeicon}></img>
      </div>
      <div className='StatNumberContainer'>
        <div>
          <p className='t5'>Total des clics</p>
          <p className='t3'>1022</p>
        </div>
        <img id="stat3" src={clickicon}></img>
      </div>
      <div className='StatNumberContainer'>
        <div>
          <p className='t5'>Emplacements actifs</p>
          <p className='t3'>5</p>
        </div>
        <img id="stat4" src={emplacement}></img>
      </div>
    </div>
);
}
