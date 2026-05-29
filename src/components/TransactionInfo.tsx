'use client'

import { fmt } from '@/lib/utils'
import { useSettings, formatDate } from '@/lib/settings-context'

interface Props {
    title: string;
    date: string;
    type: string;
    amount: number;
}

function TransactionInfo({ title, date, type, amount }: Props) {
    const { currency, dateFormat, showCents } = useSettings()

    return (
        <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2 last:border-b-0">
            <div className="flex-1">
                <p className="font-medium">{title}</p>
                <p className="text-xs text-gray-400">{formatDate(date, dateFormat)}</p>
            </div>
            <span className={`font-semibold ${type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                {type === 'income' ? '+' : '-'}{currency}{fmt(amount, showCents ? 2 : 0)}
            </span>
        </div>
    )
}

export default TransactionInfo
