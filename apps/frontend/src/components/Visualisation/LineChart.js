// src/components/LineChart.jsx
import React from "react";
import ReactECharts from "echarts-for-react";

export default function LineChart({ height = "100%", width = "100%" }) {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: '#eee',
      textStyle: { color: '#333' },
      padding: 10
    },
    grid: {
      top: 10,
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#666' }
    },
    yAxis: {
      type: 'value',
      axisLine: { lineStyle: { color: '#ccc' } },
      axisLabel: { color: '#666' },
      splitLine: { lineStyle: { type: 'dashed', color: '#eee' } }
    },
    series: [ 
      {
        name: 'Scans',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          color: '#3B82F6', // bleu moderne
          width: 3
        },
        itemStyle: {
          color: '#3B82F6',
          borderColor: '#fff',
          borderWidth: 2
        },
        areaStyle: {
          color: 'rgba(59, 130, 246, 0.15)' // zone remplie
        },
        data: [120, 140, 130, 180, 160, 190, 210]
      }
    ]
  };

  return (      
    <ReactECharts option={option} style={{ height: height }} />
  );
}
