"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartData {
    week: string;
    products: number;
}

export default function ProductsChart({data}: {data: ChartData[]}) {
    console.log(data);
    return <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                <XAxis 
                    dataKey="week" 
                    stroke="#666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}/>
                <YAxis 
                    stroke="#666" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    allowDecimals={false}/>
                
                <Area 
                    type="monotone" 
                    dataKey="products" 
                    stroke="#7c3aed" 
                    fill="#c4b5fd" 
                    fillOpacity={0.6} 
                    strokeWidth={2}
                    dot={{fill : "#8b5cf6"}}
                    activeDot={{fill: "#8b5cf6", r: 4 }}/>

                <Tooltip 
                    contentStyle={{
                        backgroundColor: "white", 
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}
                    labelStyle={{fontWeight: "500", color: "#374151"}}
                />
            </AreaChart>
        </ResponsiveContainer>
    </div>;
}