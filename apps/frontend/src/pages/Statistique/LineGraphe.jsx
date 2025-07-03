
import "./LineGraphe.css"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


const data = [
  { name: 'Lun', value: 30 },
  { name: 'Mar', value: 45 },
  { name: 'Mer', value: 28 },
  { name: 'Jeu', value: 60 },
  { name: 'Ven', value: 35 },
  { name: 'Sam', value: 70 },
  { name: 'Dim', value: 50 },
];

export default function AnnonceChart() {
  return (
    <div className="AnnonceChartContainer">
      <h3>Statistiques Hebdomadaires</h3>
      <ResponsiveContainer width="100%" height={250}>
<LineChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" stroke="#999" />
          <YAxis stroke="#999" />
          <Tooltip
            contentStyle={{ backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #ddd" }}
            labelStyle={{ color: "#333" }}
            itemStyle={{ color: "#333" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 6, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
