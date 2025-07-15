import { GraphColor } from "../Types/GraphColor";

export const ClosedGraph_Legend: GraphColor[] = [
  { dataKey: "merged", value: "Merged", color: "#2979FF" },
  { dataKey: "nonMerged", value: "Abondened", color: "#FFC400" },
  { dataKey: "abondened", value: "Not Updated", color: "#FF1276" },
];

export const CycleaTimeGraph_Legend: GraphColor[] = [
  { dataKey: "averageCycleTime", value: "Average CycleTime", color: "#2979FF" },
  { dataKey: "count", value: "Count", color: "#FFC400" },
];


export const PRActivityGraph_Legend: GraphColor[] = [
  { dataKey: "Merged", value: "Merged", color: "#2979FF" },
  { dataKey: "Not Merged", value: "Closed without Merged", color: "#00E6C3" },
];

