'use client';

import { PieChart, Pie, Sector, Legend, Tooltip, ResponsiveContainer, PieSectorShapeProps } from 'recharts';

interface PieChartProps {
    data: Array<{
        name: string;
        value: number;
    }>;
    colors?: string[];
}

interface DataItem {
    name: string;
    value: number;
}

export default function RadialChart({ data, colors = ['#3b82f6', '#ef4444'] }: PieChartProps) {

    const MyCustomPie = (props: PieSectorShapeProps) => {
        return <Sector {...props} fill={colors[props.index % colors.length]} />;
    };

    const renderCustomLegend = () => {
        return (
            <div className={`flex justify-center gap-5 mt-2.5 flex-wrap`}>
                {data && data.map((item: DataItem, index: number) => (
                    <div key={`legend-${index}`} className='flex items-center gap-1.5'>
                        <div
                            style={{
                                width: '12px',
                                height: '12px',
                                backgroundColor: colors[index % colors.length],
                                borderRadius: '2px',
                            }}
                        />
                        <span className='text-[14px]'>{item.name}</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <ResponsiveContainer width='50%' height={300}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    shape={MyCustomPie}
                />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend content={renderCustomLegend} />
            </PieChart>
        </ResponsiveContainer>
    );
}
