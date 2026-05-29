'use client';

import Card from '@/components/Card';
import { Transaction } from '@/types/transaction';
import { deleteTransactionAction } from './actions';
import { MONTHS } from '@/lib/utils';
import { use, useMemo, useState, useTransition } from 'react'
import { useSettings, formatDate } from '@/lib/settings-context'

type Props = {
    transactionsPromise: Promise<Transaction[]>
}

function TransactionsList({ transactionsPromise }: Props) {
    const initialTransactions = use(transactionsPromise)

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [transactions, setTransactions] = useState(initialTransactions)
    const [isPending, startTransition] = useTransition()

    const { currency, showCents, dateFormat } = useSettings()
    const cDec = showCents ? 2 : 0

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
                    <span>{formatDate(t.date, dateFormat)}</span>
                </div>
                {t.notes && <p className="text-xs text-gray-400 mt-2 italic">{t.notes}</p>}
            </div>
            <div className="flex gap-2 ml-4 items-center">
                <span className={`text-lg font-bold min-w-fit ${t.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {t.type === 'income' ? '+' : '-'}{currency}{t.amount.toFixed(cDec)}
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
        <main className="flex md:h-[calc(100vh-2rem)] flex-col gap-3 p-4 md:min-h-0">
            <div className="flex flex-wrap justify-between items-center mb-2 gap-3">
                <h1 className="text-3xl font-bold">Transactions</h1>
                <div className="flex items-center gap-2">
                    <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">←</button>
                    <h2 className="text-lg font-semibold min-w-fit">{MONTHS[currentMonth]} {currentYear}</h2>
                    <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">→</button>
                </div>
                <div className="flex text-center gap-4 border border-gray-300 dark:border-gray-600 px-4 py-1 rounded-lg">
                    <div>
                        <p className="text-xs text-gray-500">Income</p>
                        <p className="text-xl font-bold text-green-500">{currency}{totalIncomes.toFixed(cDec)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">Expenses</p>
                        <p className="text-xl font-bold text-red-500">{currency}{totalExpenses.toFixed(cDec)}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:h-full overflow-auto lg:overflow-hidden">
                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title="Incomes" fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
                            {filteredTransactions.incomes.length > 0
                                ? [...filteredTransactions.incomes]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(renderTransaction)
                                : <p className="text-gray-400 text-center text-sm py-8">No income for {MONTHS[currentMonth]} {currentYear}</p>
                            }
                        </div>
                    </Card>
                </div>

                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title="Expenses" fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
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
