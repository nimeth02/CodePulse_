import React from "react";
import { TimeSelectorProps } from '../Types/SelectorTypes';
import { timeOptions } from "../Constants/graphConstants";

const TimeSelector =({selectedTime,setSelectedTime}: TimeSelectorProps)=>{
  console.log("Time selector")
return (
    <select 
          className="time-select"
          value={selectedTime}
          onChange={(e) => setSelectedTime(Number(e.target.value))}
           aria-label="Select time for graph data"
        >
          {timeOptions.map((time,key) => (
            <option key={key} value={time}>
              {time}
            </option>
          ))}
        </select>
)
}

export default React.memo(TimeSelector);