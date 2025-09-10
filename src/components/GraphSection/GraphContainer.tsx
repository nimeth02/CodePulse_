import { GraphContainerProps } from "./Types/GraphType";
import {
  ClosedGraph,
  ClosedComparisonGraph,
  CycleTimeGraph,
  PRActivityGraph,
  CycleTimeComparisonGraph,
} from "./Graphs";
import React from "react";
import ErrorBoundary from "../Common/ErrorBoundaries/ErrorBoundary";

const GraphContainer = ({
  type,
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
            year={selectedTime}
          />
        );
      case "closedComparison":
        return (
          <ClosedComparisonGraph
            selectedTeam={selectedTeam}
            year={selectedTime}
          />
        );
      case "cycleTime":
        return (
          <CycleTimeGraph
            selectedTeam={selectedTeam}
            year={selectedTime}
          />
        );
      case "cycleTimeComparison":
        return (
          <CycleTimeComparisonGraph
            selectedTeam={selectedTeam}
            year={selectedTime}
          />
        );
      case "prActivity":
        return (
          <PRActivityGraph
            selectedTeam={selectedTeam}
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
