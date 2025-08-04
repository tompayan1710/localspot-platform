import React from 'react';
import ReactECharts from 'echarts-for-react';

import "./MonthlyRevenueChart.css"

export default function MonthlyRevenueBarChart({ data = [], labels = [], currentBalance }) {
    
  const option = {
    tooltip: {
      trigger: 'axis',
      formatter: (params) => {
        const val = params[0].value.toFixed(2).replace('.', ',');
        return `${params[0].axisValue}<br/>Revenus : $${val}`;
      },
    },
    
    grid: { left: '1%', right: '4%', bottom: '0%',top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: labels,
      axisTick: { show: false },
      axisLine: { show: false },
        axisLabel: {
        margin: 16, // ✅ espace entre les labels (mois) et les barres
      },
    },
    yAxis: {
      type: 'value',
    //   max: 'auto',
      splitNumber: 2, 
      axisLabel: {
        formatter: (value) => `${value}€ `,
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'solid', // ✅ ligne continue
          color: '#edeff1ff',
        },
      },
    },
    series: [
      {
        name: 'Revenus',
        type: 'bar',
        barWidth: '90%', // ✅ barres plus proches
        data: data,
        
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgb(83, 83, 83)' },
              { offset: 1, color: 'rgb(55, 55, 55)' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return (
    <div className='MonthlyChart'>
        <div>
            <p className='t3 bold'>Gains disponibles :</p>
        <p className='t3 GainsEuro'>
            {currentBalance.toFixed(2).replace('.', ',')}€
        </p>
        </div>
        <ReactECharts
            option={option}
            style={{ height: '300px', width: '100%' }}
            notMerge={true}
            lazyUpdate={true}
        />
    </div>
  );
}
