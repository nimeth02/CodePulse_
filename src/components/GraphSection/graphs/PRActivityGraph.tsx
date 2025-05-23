import React from 'react';
import './GraphStyles.scss';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface PRActivityGraphProps {
  selectedTeam: string;
}

const data = [
  { name: 'Merged', value: 24 },
  { name: 'closed without Merged', value: 10 },
  { name: 'Locked', value: 2 },
];

const COLORS = ['#2979FF', '#00E6C3', '#FFC400'];

const renderCustomizedLabel = ({ cx, cy }: any) => {
  return (
    <text
      x={cx}
      y={cy}
      textAnchor="middle"
      dominantBaseline="middle"
      style={{ fontSize: 24, fontWeight: 700, fill: '#4636FF' }}
    >
      Team PR Activity
    </text>
  );
};

const CustomLegend = () => (
  <div className="pr-activity-legend">
    <div className="pr-activity-legend-row">
      <span className="pr-activity-legend-dot" style={{ background: COLORS[0] }} />
      <span>Merged</span>
    </div>
    <div className="pr-activity-legend-row">
      <span className="pr-activity-legend-dot" style={{ background: COLORS[1] }} />
      <span>closed without Merged</span>
    </div>
    <div className="pr-activity-legend-row">
      <span className="pr-activity-legend-dot" style={{ background: COLORS[2] }} />
      <span>Locked</span>
    </div>
  </div>
);

const devTableData = [
  { name: 'Developer 1', merged: 80, notMerged: 22, locked: 14 },
  { name: 'Developer 2', merged: 80, notMerged: 11, locked: 17 },
  { name: 'Developer 3', merged: 92, notMerged: 34, locked: 15 },
  { name: 'Developer 4', merged: 79, notMerged: 29, locked: 17 },
];

const getMergedColor = (value: number) => {
  if (value >= 90) return '#008000'; // dark green
  return '#7CFF7C'; // light green
};
const getNotMergedColor = (value: number) => {
  if (value >= 30) return '#D32F2F'; // lighter red
  return '#B71C1C'; // dark red
};
const getLockedColor = () => '#B71C1C';

const PRActivityGraph: React.FC<PRActivityGraphProps> = ({ selectedTeam }) => {
  return (
    <div className="pr-activity-graph scrollable-graph-section">
      <div className="pr-activity-flex">
        <div className="pr-activity-pie-container">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={150}
                innerRadius={100}
                dataKey="value"
                isAnimationActive={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <CustomLegend />
      </div>
      <div className="pr-activity-table-container">
        <table className="pr-activity-table">
          <thead>
            <tr>
              <th></th>
              <th>Merged</th>
              <th>Not Merged</th>
              <th>Locked</th>
            </tr>
          </thead>
          <tbody>
            {devTableData.map((dev, idx) => (
              <tr key={dev.name}>
                <td>{dev.name}</td>
                <td className="merged" style={{ background: getMergedColor(dev.merged) }}>{dev.merged} %</td>
                <td className="not-merged" style={{ background: getNotMergedColor(dev.notMerged) }}>{dev.notMerged} %</td>
                <td className="locked" style={{ background: getLockedColor() }}>{dev.locked} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PRActivityGraph; 