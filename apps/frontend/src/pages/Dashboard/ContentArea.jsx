import React, { useEffect } from 'react';
import './styles/ContentArea.css';
import Map2D from '../../components/Map3D/Map2D'
import UsingMap2D from './UsingMap2D'
import StatisticContent from './StatisticContent'
import ListScrollable from '../../components/ListScrollable/ListeScrollable'
import TestSlide from './TestSlide'


export default function ContentArea(props) {

  return (
    <div className={`ContentAreaContainer ${props.menuVisible ? "MenueInVisible" : "" }`}>
      <div className='Map2DContainer'>
        <UsingMap2D></UsingMap2D>
      </div>
      <StatisticContent></StatisticContent>
      <ListScrollable></ListScrollable>
      <TestSlide />
    </div>
);
}
