'use client';

import { useState } from 'react';
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
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const renderCustomShape = (props: PieSectorShapeProps) => {
        const isActive = activeIndex === props.index;
        const isInactive = activeIndex !== null && activeIndex !== props.index;

        const fill = isInactive ? '#d1d5db' : colors[props.index % colors.length];
        const scale = isActive ? 1.15 : (isInactive ? 0.9 : 1);

        return (
            <g
                onMouseEnter={() => setActiveIndex(props.index)}
                onMouseLeave={() => setActiveIndex(null)}
                style={{ cursor: 'pointer', transition: 'all 0.3s ease-out' }}
            >
                <Sector
                    {...props}
                    fill={fill}
                    outerRadius={props.outerRadius! * scale}
                    filter={isActive ? 'drop-shadow(0 0 8px rgba(0,0,0,0.3))' : 'none'}
                    opacity={isInactive ? 0.6 : 1}
                />
            </g>
        );
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
        <ResponsiveContainer width='50%' height={270}>
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
                    shape={renderCustomShape}
                    isAnimationActive={false}
                />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend content={renderCustomLegend} />
            </PieChart>
        </ResponsiveContainer>
    );
}

