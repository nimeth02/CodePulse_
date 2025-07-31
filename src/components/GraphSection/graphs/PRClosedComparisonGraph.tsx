import React, { useEffect, useState } from "react";
import { BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Bar } from "recharts";
import { ResponsiveContainer } from "recharts";
import GraphLoading from "../Components/GraphLoading";
import GraphError from "../Components/GraphError";
import { GraphProps } from "../Types/GraphType";
import { usePRClosedComparisonData } from "../hooks/usePRClosedComparisonData";
import { ComparisonBaseColors } from "../Constants/graphConstants";

const CustomLegend = ({ barKeys, data }: { barKeys: any[]; data: any[] }) => {
  // Count occurrences of each key in the data
  const getCount = (key: string) => {
    return data.reduce((sum, item) => sum + (item[key] || 0), 0);
  };

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
        const displayName = key.replace(/_merged$/, "").replace(/_/g, " ");

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
                background: key.endsWith("_merged")
                  ? ComparisonBaseColors[index % ComparisonBaseColors.length]
                  : "#000000",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: 8,
              }}
            />
            <span style={{ color: "#222", fontWeight: 500 }}>
              {`${displayName}(${getCount(key)})`}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const ClosedComparisonGraph: React.FC<GraphProps> = ({
  selectedTeam,
  year,
}) => {
  console.log("Closed Comparison Graph");
  const { error, loading, data } = usePRClosedComparisonData( year);

  const getBarKeys = (data: any) => {
    const keys = new Set();
    data.forEach((item: any) => {
      Object.keys(item).forEach((key) => {
        if (key !== "name" && !keys.has(key)) {
          keys.add(key);
        }
      });
    });
    return Array.from(keys).sort(); // Sort for consistent order
  };

  const barKeys = getBarKeys(data);
  console.log(barKeys);

  if (loading) {
    return <GraphLoading />;
  }

  if (error) {
    return <GraphError />;
  }

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
          <YAxis tick={{ fontSize: 16 }} />
          <Tooltip />
          {barKeys.map((key: any, index: any) => (
            <Bar
              key={key}
              dataKey={key}
              barSize={18}
              stackId={key.split("_")[0]}
              fill={
                key.endsWith("_merged")
                  ? ComparisonBaseColors[index % ComparisonBaseColors.length]
                  : "#000000"
              }
              name={key}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
      <CustomLegend barKeys={barKeys} data={data} />
    </div>
  );
};

export default ClosedComparisonGraph;
