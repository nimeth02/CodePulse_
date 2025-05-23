import React from 'react';
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts';
import { Bar } from 'recharts';
import { ResponsiveContainer } from 'recharts';

interface NonMergedGraphProps {
  selectedTeam: string;
}
const data = [
  { name: 'Jan', Organization: 40, SriLankan: 18, Sweden: 9 },
  { name: 'Feb', Organization: 30, SriLankan: 25, Sweden: 7 },
  { name: 'Mar', Organization: 26, SriLankan: 15, Sweden: 13 },
  { name: 'Apr', Organization: 28, SriLankan: 0, Sweden: 13 },
  { name: 'May', Organization: 45, SriLankan: 30, Sweden: 4 },
  { name: 'Jun', Organization: 60, SriLankan: 18, Sweden: 17 },
  { name: 'Jul', Organization: 47, SriLankan: 13, Sweden: 11 },
  { name: 'Aug', Organization: 80, SriLankan: 17, Sweden: 17 },
  { name: 'Sep', Organization: 47, SriLankan: 28, Sweden: 17 },
];

const COLORS = {
  Organization: '#2979FF',
  SriLankan: '#00B8D9',
  Sweden: '#FFC400',
};

const CustomLegend = () => (
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
      <span style={{ width: 16, height: 16, background: COLORS.Organization, borderRadius: '50%', display: 'inline-block', marginRight: 8 }} />
      <span style={{ color: '#222', fontWeight: 500 }}>Organization(20)</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
      <span style={{ width: 16, height: 16, background: COLORS.SriLankan, borderRadius: '50%', display: 'inline-block', marginRight: 8 }} />
      <span style={{ color: '#222', fontWeight: 500 }}>Sri Lankan(12)</span>
    </div>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <span style={{ width: 16, height: 16, background: COLORS.Sweden, borderRadius: '50%', display: 'inline-block', marginRight: 8 }} />
      <span style={{ color: '#222', fontWeight: 500 }}>Sweden(8)</span>
    </div>
  </div>
);
const NonMergedGraph: React.FC<NonMergedGraphProps> = ({ selectedTeam }) => {
  return (
    <div className="non-merged-graph">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 16 }} />
          <YAxis tick={{ fontSize: 16 }} domain={[0, 90]} />
          <Tooltip />
          <Bar dataKey="Organization" fill={COLORS.Organization} barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="SriLankan" fill={COLORS.SriLankan} barSize={18} radius={[4, 4, 0, 0]} />
          <Bar dataKey="Sweden" fill={COLORS.Sweden} barSize={18} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend />
    </div>
  );
};

export default NonMergedGraph; 