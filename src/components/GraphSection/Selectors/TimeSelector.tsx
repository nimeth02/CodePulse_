import React from "react";

const TimeSelector =({selectedTime,setSelectedTime,timeOptions}:{selectedTime:number,setSelectedTime:(selectedTeam:number)=>void,timeOptions:number[]})=>{
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