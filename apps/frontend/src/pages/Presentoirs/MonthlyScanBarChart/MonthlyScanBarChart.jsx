import React from 'react';
import ReactECharts from 'echarts-for-react';

import "./MonthlyScanBarChart.css"
import { useTranslation } from 'react-i18next';

export default function MonthlyScanBarChart({ data = [], labels = [], solde, loading }) {
  // Placeholder data pour affichage initial
  const {t, i18n} = useTranslation();
  const lang = (i18n.resolvedLanguage || i18n.language || "fr").split("-")[0];

  const now = new Date();
  const placeholderLabels = [];
  const formatter = new Intl.DateTimeFormat(lang, {
    month: "short",
  });

  for (let i = 6 - 1; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = formatter.format(month); // exemple : "juil." pour juillet
    placeholderLabels.push(key);
  }
  const placeholderData = new Array(6).fill(0);
  // const placeholderLabels = ['févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.'];

  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#ffffff',
      borderRadius: 8,
      extraCssText: `
        box-shadow: 0px 0px 0px 1px rgba(0,0,0,0.02),0px 5px 20px 0px rgba(0,0,0,0.058);
        padding: 10px;
      `,
      formatter: (params) => {
            const { axisValue, value } = params[0];
            return `
            <div style="color:#333; font-family: sans-serif;">
                <p style="font-size: 14px;">${axisValue}</p>
                <span>${t("Scans")} : <strong>${value}</strong></span>
            </div>
            `;
        }
    },


    grid: { left: '1%', right: '4%', bottom: '0%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: loading ? placeholderLabels : labels,
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: { margin: 16 },
    },
    yAxis: {
        type: 'value',
        min: 0,
        max: Math.max(...data, 4),   // Au moins 4 pour éviter l'échelle bizarre
        interval: Math.ceil(Math.max(...data, 4) / 4), // 4 divisions propres
        axisLabel: {
            formatter: (value) => value
        },
        splitLine: {
            show: true,
            lineStyle: {
                type: 'solid',
                color: '#edeff1ff'
            }
        }
    },

    series: [
      {
        name: 'Revenus',
        type: 'bar',
        barWidth: '90%',
        data: loading ? placeholderData : data,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            // linear-gradient(180deg, rgb(83, 83, 83), rgb(55, 55, 55))
            colorStops: [
              { offset: 0, color: 'rgb(83, 83, 83)' }, // Gris clair pendant le loading
              { offset: 1, color: 'rgb(55, 55, 55)' },
            ],
          },
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return (
    <div className='MonthlyChartScan'>
        <div>
            <p className='t3 bold'>{t("Total_scans")}</p>
            {!loading ? (
            <p className='t3 AllScans'>
                {solde}
            </p>
            ) : (
            <div className='AllScansSquellette shimmer'></div>
            )}
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

