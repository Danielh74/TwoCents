import React from 'react'
interface Props {
    title: string;
    date: string;
    type: string;
    amount: number;
}

function TransactionInfo({ title, date, type, amount }: Props) {
    return (
        <div className="flex justify-between items-center text-sm border-b border-gray-200 pb-2 last:border-b-0">
            <div className="flex-1">
                <p className="font-medium">{title}</p>
                <p className="text-xs text-gray-400">{date}</p>
            </div>
            <span className={`font-semibold ${type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                {type === 'income' ? '+' : '-'}${amount}
            </span>
        </div>
    )
}

export default TransactionInfo