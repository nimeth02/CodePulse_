import React from "react";
import { GraphColor } from "../Types/GraphColor";
import "../Graphs/GraphStyles.scss";

const CustomGraphLegend = ({ colors }: { colors: GraphColor[] }) => {
  return (
    <div className="custom-graph-legend">
      {colors.map((col: any, key: any) => (
        <div className="legend-item" key={key}>
          <span
            className="legend-color"
            style={{ background: col.color }}
          />
          <span className="legend-label">{col.value}</span>
        </div>
      ))}
    </div>
  );
};

export default React.memo(CustomGraphLegend);
