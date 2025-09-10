import React from "react";
import { TimeSelectorProps } from "../Types/SelectorTypes";
// import { timeOptions } from "../Constants/graphConstants";
import { useProject } from "context/ProjectContext";

const TimeSelector = ({ selectedTime, setSelectedTime }: TimeSelectorProps) => {
  const { project } = useProject();

  const startYear =project?.providerType == "github" && project?.projectCreatedAt
    ? new Date(project.projectCreatedAt).getFullYear()
    : 2010; // fallback year

  const currentYear = new Date().getFullYear();
  // Generate years from currentYear down to startYear
  const timeOptions = [];
  for (let year = currentYear; year >= startYear; year--) {
    timeOptions.push(year);
  }

  return (
    <select
      className="time-select"
      value={selectedTime}
      onChange={(e) => setSelectedTime(Number(e.target.value))}
      aria-label="Select time for graph data"
    >
      {timeOptions.map((time, key) => (
        <option key={key} value={time}>
          {time}
        </option>
      ))}
    </select>
  );
};

export default React.memo(TimeSelector);
