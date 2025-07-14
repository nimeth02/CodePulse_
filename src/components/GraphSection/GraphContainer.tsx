import { GraphContainerProps } from "./Types/GraphType";
import {
  ClosedGraph,
  ClosedComparisonGraph,
  CycleTimeGraph,
  PRActivityGraph,
  CycleTimeComparisonGraph,
} from "./Graphs";
import React from "react";

const GraphContainer = ({
  type,
  projectId,
  selectedTeam,
  selectedTime,
}: GraphContainerProps) => {
  console.log("Graph Container");
  const renderGraph = () => {
    switch (type) {
      case "closed":
        return (
          <ClosedGraph
            selectedTeam={selectedTeam}
            projectId={projectId}
            year={selectedTime}
          />
        );
      case "closedComparison":
        return (
          <ClosedComparisonGraph
            selectedTeam={selectedTeam}
            projectId={projectId}
            year={selectedTime}
          />
        );
      case "cycleTime":
        return (
          <CycleTimeGraph
            selectedTeam={selectedTeam}
            projectId={projectId}
            year={selectedTime}
          />
        );
      case "cycleTimeComparison":
        return (
          <CycleTimeComparisonGraph
            selectedTeam={selectedTeam}
            projectId={projectId}
            year={selectedTime}
          />
        );
      case "prActivity":
        return (
          <PRActivityGraph
            selectedTeam={selectedTeam}
            projectId={projectId}
            year={selectedTime}
          />
        );
      default:
        return <div>Invalid graph type</div>;
    }
  };

  return (
    <div className="graph-section">
      {/* <ErrorBoundary> */}
      {renderGraph()}
      {/* </ErrorBoundary> */}
    </div>
  );
};

export default React.memo(GraphContainer);
