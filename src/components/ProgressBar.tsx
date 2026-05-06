import React from 'react'
interface Props {
    category: string;
    expense: number;
    budget: number;
    remaining: number;
}
function ProgressBar({ category, expense, budget, remaining }: Props) {
    const width = Math.min((expense / budget) * 100, 100);
    const color = width < 50 ? 'blue' : width < 80 ? 'yellow' : 'red';
    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{category}</span>
                <span className="text-xs text-gray-400">${expense} / ${budget}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`bg-${color}-500 h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${width}%` }}
                />
            </div>
            <div className="text-xs text-gray-400">Remaining: ${remaining}</div>
        </div>
    )
}

export default ProgressBar