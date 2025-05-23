import React from 'react';
import { GraphProps } from "./GraphType";
import {
  MergedGraph,
  NonMergedGraph,
  CycleTimeGraph,
  PRActivityGraph
} from './graphs';
import './Graph.scss'

const Graph: React.FC<GraphProps> = ({ type, selectedTeam }) => {
  const renderGraph = () => {
    switch (type) {
      case 'merged':
        return <MergedGraph selectedTeam={selectedTeam} />;
      case 'nonMerged':
        return <NonMergedGraph selectedTeam={selectedTeam} />;
      case 'cycleTime':
        return <CycleTimeGraph selectedTeam={selectedTeam} />;
      case 'prActivity':
        return <PRActivityGraph selectedTeam={selectedTeam} />;
      default:
        return <div>Invalid graph type</div>;
    }
  };

  return (
    <div className="graph-section">
      {renderGraph()}
    </div>
  );
};

export default Graph;
