"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#4CAF50', '#FF5733', '#9575CD', '#FFD700'];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export const CoursesPieChart = ({ data }: any) => {
    // Extract the relevant property from the data object
    const categoryTitles = data ? data : [];
    
    // Count occurrences of each category title
    const titleCounts: Record<string, number> = {};
    categoryTitles.forEach((title: string) => {
        titleCounts[title] = (titleCounts[title] || 0) + 1;
    });

    // Convert titleCounts into an array of objects with name and value properties
    const chartData = Object.entries(titleCounts).map(([name, value]) => ({ name, value }));
  
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart width={400} height={400}>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {chartData && chartData.length > 0
                        ? chartData.map((entry: any, index: any) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))
                        : null}
                </Pie>
                {(!chartData || chartData.length === 0) && (
                    <g>
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            fill=''
                        >
                            No Data
                        </text>
                    </g>
                )}
                <Legend verticalAlign="bottom" height={36} />
            </PieChart>
        </ResponsiveContainer>
    );
};
