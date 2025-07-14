import { GraphProps } from "./Types/GraphType";
import { GraphType } from "./Types/GraphType";
import {
  ClosedGraph,
  ClosedComparisonGraph,
  CycleTimeGraph,
  PRActivityGraph,
  CycleTimeComparisonGraph  
} from './Graphs';
import './Graph.scss'
import React, { useMemo } from "react";
import ErrorBoundary from "./GraphErrorBoundaries/ErrorBoundary";

const GraphContainer = ({ type,projectId, selectedTeam,selectedTime }:GraphProps) => {
  console.log("Graph Container",selectedTeam)
  const renderGraph = () => {
    switch (type) {
      case 'closed':
        return <ClosedGraph selectedTeam={selectedTeam} projectId={projectId} year={selectedTime} />;
      case 'closedComparison':
        return <ClosedComparisonGraph selectedTeam={selectedTeam} projectId={projectId} year={selectedTime} />;
      case 'cycleTime':
          return <CycleTimeGraph selectedTeam={selectedTeam} projectId={projectId} year={selectedTime} />;
      case 'cycleTimeComparison':
          return <CycleTimeComparisonGraph selectedTeam={selectedTeam} projectId={projectId} year={selectedTime} />;
      case 'prActivity':
        return <PRActivityGraph selectedTeam={selectedTeam} projectId={projectId} year={selectedTime} />;
      default:
        return <div>Invalid graph type</div>;
    }
  }


  return (
    <div className="graph-section">
      {/* <ErrorBoundary> */}
      {renderGraph()}
      {/* </ErrorBoundary> */}
      
    </div>
  );
};

export default React.memo(GraphContainer);
