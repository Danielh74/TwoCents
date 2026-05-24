'use client';

import Card from '@/components/Card';
import { Transaction } from '@/types/transaction';
import { deleteTransactionAction } from './actions';
import { MONTHS } from '@/lib/utils';
import { use, useMemo, useState, useTransition } from 'react'

type Props = {
    transactionsPromise: Promise<Transaction[]>
}

function TransactionsList({ transactionsPromise }: Props) {
    const initialTransactions = use(transactionsPromise)

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [transactions, setTransactions] = useState(initialTransactions)
    const [isPending, startTransition] = useTransition()

    const [expenseList, incomeList] = useMemo(() => [
        transactions.filter((t) => t.type === 'expense'),
        transactions.filter((t) => t.type === 'income'),
    ], [transactions])

    const filteredTransactions = useMemo(() => {
        const filter = (list: Transaction[]) =>
            list.filter((t) => {
                const [year, month] = t.date.split('-').map(Number)
                return year === currentYear && month === currentMonth + 1
            })
        return { incomes: filter(incomeList), expenses: filter(expenseList) }
    }, [expenseList, incomeList, currentMonth, currentYear])

    const totalExpenses = useMemo(
        () => filteredTransactions.expenses.reduce((sum, t) => sum + t.amount, 0),
        [filteredTransactions]
    )

    const totalIncomes = useMemo(
        () => filteredTransactions.incomes.reduce((sum, t) => sum + t.amount, 0),
        [filteredTransactions]
    )

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const handleDelete = (id: string) => {
        startTransition(async () => {
            await deleteTransactionAction(id)
            setTransactions((prev) => prev.filter((t) => t._id !== id))
        })
    }

    const renderTransaction = (t: Transaction) => (
        <div
            key={t._id}
            className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
        >
            <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-black">{t.title}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{t.category}</span>
                    <span>{t.date}</span>
                </div>
                {t.notes && <p className="text-xs text-gray-400 mt-2 italic">{t.notes}</p>}
            </div>
            <div className="flex gap-2 ml-4 items-center">
                <span className={`text-lg font-bold min-w-fit ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
                </span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => handleDelete(t._id)}
                        disabled={isPending}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors disabled:opacity-50"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )

    return (
        <main className="flex h-[calc(100vh-2rem)] flex-col gap-3 p-4 min-h-0">
            <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold">Transactions</h1>
                <div className="flex text-center border gap-4 border-gray-300 pl-4">
                    <div>
                        <p className="text-gray-600">Total Income</p>
                        <p className="text-3xl font-bold text-green-500">${totalIncomes.toFixed(2)}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Total Expenses</p>
                        <p className="text-3xl font-bold text-red-500">${totalExpenses.toFixed(2)}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">←</button>
                    <h2 className="text-lg font-semibold min-w-fit">{MONTHS[currentMonth]} {currentYear}</h2>
                    <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">→</button>
                </div>
            </div>

            <div className="flex gap-4 h-full overflow-hidden">
                <div className="flex-1 min-w-0 min-h-0">
                    <Card title="Incomes" fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-full scrollbar-custom pr-2">
                            {filteredTransactions.incomes.length > 0
                                ? [...filteredTransactions.incomes]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(renderTransaction)
                                : <p className="text-gray-400 text-center text-sm py-8">No income for {MONTHS[currentMonth]} {currentYear}</p>
                            }
                        </div>
                    </Card>
                </div>

                <div className="flex-1 min-w-0 min-h-0">
                    <Card title="Expenses" fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-full scrollbar-custom pr-2">
                            {filteredTransactions.expenses.length > 0
                                ? [...filteredTransactions.expenses]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(renderTransaction)
                                : <p className="text-gray-400 text-center text-sm py-8">No expenses for {MONTHS[currentMonth]} {currentYear}</p>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}

export default TransactionsList
