import React, { useState } from 'react';
import './GraphSection.scss';
import { GraphType } from './GraphType';
import Graph from './Graph';

const GraphSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<GraphType>('merged');
  const [selectedTeam, setSelectedTeam] = useState('project');

  const teams = [
    { id: 'project', label: 'Project' },
    { id: 'team1', label: 'Team 1' },
    { id: 'team2', label: 'Team 2' }
  ];

  const getGraphTitle = (type: GraphType): string => {
    switch (type) {
      case 'merged':
        return 'Merged Pull Requests';
      case 'nonMerged':
        return 'Non Merged Pull Requests';
      case 'cycleTime':
        return 'Cycle Time Analysis';
      case 'prActivity':
        return 'PR Activity';
      default:
        return 'Graph Area';
    }
  };

  const tabs: { id: GraphType; label: string }[] = [
    { id: 'merged', label: 'Merged' },
    { id: 'nonMerged', label: 'Non Merged' },
    { id: 'cycleTime', label: 'Cycle Time' },
    { id: 'prActivity', label: 'PR Activity' }
  ];

  return (
    <div className="graph-area">
      <h2>{selectedTeam} {getGraphTitle(activeTab)}</h2>
      <div className="graph-header">
        <div className="graph-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <select 
          className="team-select"
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
        >
          {teams.map(team => (
            <option key={team.id} value={team.label}>
              {team.label}
            </option>
          ))}
        </select>
      </div>
      <div className="graph-placeholder">
        <Graph type={activeTab} selectedTeam={selectedTeam}/>
      </div>
    </div>
  );
};

export default GraphSection;    