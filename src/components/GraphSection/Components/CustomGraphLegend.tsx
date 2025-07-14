import React from "react";
import { GraphColor } from "../Types/GraphColor";

const CustomGraphLegend = ({ colors }: { colors:GraphColor[]; }) => {
    console.log("custom legend")
    return(
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
        {colors.map((col: any) => (

            <div style={{ display: 'flex', alignItems: 'center', marginRight: 24 }}>
                <span style={{ width: 16, height: 16, background: col.color, borderRadius: '50%', display: 'inline-block', marginRight: 8 }} />
                <span style={{ color: '#222', fontWeight: 500 }}>{col.value}</span>
            </div>
        ))}
    </div>
)}

export default React.memo(CustomGraphLegend)