'use client'

import { fmt } from '@/lib/utils'
import { useSettings } from '@/lib/settings-context'

interface Props {
    category: string;
    expense: number;
    budget: number;
    remaining: number;
}

function ProgressBar({ category, expense, budget, remaining }: Props) {
    const { currency, budgetWarningThreshold, showCents } = useSettings()
    const decimals = showCents ? 2 : 0
    const width = Math.min((expense / budget) * 100, 100);
    const colorClass =
        width < 50
            ? 'bg-blue-500'
            : width < budgetWarningThreshold
                ? 'bg-yellow-300'
                : 'bg-red-500';

    return (
        <div className="space-y-1">
            <div className="flex justify-between items-center text-sm">
                <span className="font-medium">{category}</span>
                <span className="text-xs text-gray-400">{currency}{fmt(expense, decimals)} / {currency}{fmt(budget, decimals)}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className={`${colorClass} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${width}%` }}
                />
            </div>
            <div className="text-xs text-gray-400">Remaining: {currency}{fmt(remaining, decimals)}</div>
        </div>
    )
}

export default ProgressBar;
