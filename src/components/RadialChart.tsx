'use client';

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface PieChartProps {
    data: Array<{
        name: string;
        value: number;
    }>;
    colors?: string[];
}

export default function RadialChart({ data, colors = ['#3b82f6', '#ef4444'] }: PieChartProps) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Pie>
                <Tooltip formatter={(value: number) => `$${value}`} />
                <Legend />
            </PieChart>
        </ResponsiveContainer>
    );
}
