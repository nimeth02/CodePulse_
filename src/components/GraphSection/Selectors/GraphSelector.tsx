import React from "react";
import { GraphType } from "../Types/GraphType";
import { tabs } from '../Constants/graphConstants'

const GraphSelector =({activeTab,setActiveTab}:{activeTab:GraphType,setActiveTab:(activeTab:GraphType)=> void})=>{
    console.log("Graph selector")
    return (
        <div className="graph-tabs">
        {tabs.map((tab:{id:GraphType,label:string}) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
  </div>
    )
    }
    
    export default React.memo(GraphSelector);