import React from 'react';
import './GraphStyles.scss';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CycleTimeGraphProps {
  selectedTeam: string;
}

const data = [
  { name: 'Jan', Organization: 90, SriLanka: 60, Sweden: 50 },
  { name: 'Feb', Organization: 80, SriLanka: 70, Sweden: 49 },
  { name: 'Mar', Organization: 73, SriLanka: 50, Sweden: 43 },
  { name: 'Apr', Organization: 70, SriLanka: 60, Sweden: 50 },
  { name: 'May', Organization: 65, SriLanka: 55, Sweden: 49 },
  { name: 'Jun', Organization: 65, SriLanka: 55, Sweden: 43 },
  { name: 'Jul', Organization: 58, SriLanka: 45, Sweden: 48 },
  { name: 'Aug', Organization: 75, SriLanka: 77, Sweden: 55 },
  { name: 'Sep', Organization: 80, SriLanka: 82, Sweden: 62 },
];

const COLORS = {
  Organization: '#2979FF',
  SriLanka: '#00B8D9',
  Sweden: '#FFC400',
};

const CustomLegend = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
      <span style={{ width: 16, height: 16, background: COLORS.Organization, borderRadius: '50%', display: 'inline-block', marginRight: 8 }} />
      <span style={{ color: '#222', fontWeight: 500 }}>Organization</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
      <span style={{ width: 16, height: 16, background: COLORS.SriLanka, borderRadius: '50%', display: 'inline-block', marginRight: 8 }} />
      <span style={{ color: '#222', fontWeight: 500 }}>Sri Lanka (created)</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ width: 16, height: 16, background: COLORS.Sweden, borderRadius: '50%', display: 'inline-block', marginRight: 8 }} />
      <span style={{ color: '#222', fontWeight: 500 }}>Sweden (created)</span>
    </div>
  </div>
);

const CycleTimeGraph: React.FC<CycleTimeGraphProps> = ({ selectedTeam }) => {
  return (
    <div className="cycle-time-graph">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 16 }} />
          <YAxis tick={{ fontSize: 16 }} domain={[40, 110]} />
          <Tooltip />
          <Line type="monotone" dataKey="Organization" stroke={COLORS.Organization} strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="SriLanka" stroke={COLORS.SriLanka} strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="Sweden" stroke={COLORS.Sweden} strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
};

export default CycleTimeGraph; 