import React, { useEffect, useState } from "react";
import {
  CartesianGrid,
  ComposedChart,
  Line,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import GraphLoading from "../Components/GraphLoading";
import GraphError from "../Components/GraphError";
import { GraphProps } from "../Types/GraphType";
import { ComparisonBaseColors } from "../Constants/graphConstants";
import { useCycleTimeComparisonData } from "../hooks/useCycleTimeComparisonData";

const CustomLegend = ({ barKeys, data }: { barKeys: any[]; data: any[] }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 16,
        flexWrap: "wrap",
      }}
    >
      {barKeys.map((key: string, index: number) => {
        // Clean up the key name for display
        const displayName = key
          .replace(/averageCycleTimeInDays$/, "")
          .replace(/_/g, " ");

        return (
          <div
            key={key}
            style={{
              display: "flex",
              alignItems: "center",
              marginRight: 24,
              marginBottom: 8,
            }}
          >
            <span
              style={{
                width: 16,
                height: 16,
                background:
                  ComparisonBaseColors[index % ComparisonBaseColors.length],
                borderRadius: "50%",
                display: "inline-block",
                marginRight: 8,
              }}
            />
            <span style={{ color: "#222", fontWeight: 500 }}>
              {`${displayName}`}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const CycleTimeComparisonGraph: React.FC<GraphProps> = ({
  selectedTeam,
  year,
}) => {
  console.log("Closed Comparison Graph");

  const { error, loading, data } = useCycleTimeComparisonData( year);

  const getLineKeys = (data: any[]) => {
    const keys = new Set<string>();
    data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== "name") {
          keys.add(key);
        }
      });
    });
    return Array.from(keys).sort();
  };

  const lineKeys = getLineKeys(data);

  console.log(lineKeys);

  if (loading) {
    return <GraphLoading />;
  }

  if (error) {
    return <GraphError />;
  }

  return (
    <div className="non-merged-graph">
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart
          data={data}
          margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
          barCategoryGap={20}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 16 }} />
          <YAxis tick={{ fontSize: 16 }} />
          <Tooltip />
          {lineKeys.map((key, index) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={ComparisonBaseColors[index % ComparisonBaseColors.length]}
              strokeWidth={3}
              dot={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
      <CustomLegend barKeys={lineKeys} data={data} />
    </div>
  );
};

export default CycleTimeComparisonGraph;
