import React from "react";
import { MonthSelectorProps, TimeSelectorProps } from "../Types/SelectorTypes";
// import { timeOptions } from "../Constants/graphConstants";
import { useProject } from "context/ProjectContext";


const PRActivityMonthSelector: React.FC<MonthSelectorProps> = ({
    selectedMonth,setSelectedMonth
  }) => {
    
    const months = [
      'Year','January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedMonth(Number(e.target.value))
    };
  
    return (
      <select
        className="time-select"
        value={selectedMonth}
        onChange={handleChange}
        aria-label={"Select Month"}
      >
        {months.map((month, index) => (
          <option key={index} value={index}>
            {month}
          </option>
        ))}
      </select>
    );
  };
  
  export default React.memo(PRActivityMonthSelector);