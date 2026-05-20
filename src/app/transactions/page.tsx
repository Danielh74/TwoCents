'use client'

import Card from '@/components/Card';
import { Transaction } from '@/lib/definitions';
import { useTransactions } from '@/lib/useTransactions'
import { MONTHS } from '@/lib/utils';
import React, { useMemo, useState } from 'react'

function Transactions() {
    const { transactions, isLoaded } = useTransactions();
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const [expenseList, incomeList] = useMemo(() => {

        return [
            transactions.filter((t: Transaction) => t.type === 'expense'),
            transactions.filter((t: Transaction) => t.type === 'income')
        ]
    }, [transactions])

    const filteredTransactions = useMemo(() => {
        const expenses = expenseList.filter((expense: Transaction) => {
            const [year, month] = expense.date.split('-').map(Number)
            return year === currentYear && month === currentMonth + 1
        })
        const incomes = incomeList.filter((income: Transaction) => {
            const [year, month] = income.date.split('-').map(Number)
            return year === currentYear && month === currentMonth + 1
        })
        return { incomes, expenses }
    }, [expenseList, incomeList, currentMonth, currentYear]);

    const totalExpenses = useMemo(() => {
        return filteredTransactions.expenses.reduce((sum: number, expense: Transaction) => sum + expense.amount, 0)
    }, [filteredTransactions]);

    const totalIncomes = useMemo(() => {
        return filteredTransactions.incomes.reduce((sum: number, expense: Transaction) => sum + expense.amount, 0)
    }, [filteredTransactions]);

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

    if (!isLoaded) {
        return <main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>
    }

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
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">←</button>
                        <h2 className="text-lg font-semibold min-w-fit">{MONTHS[currentMonth]} {currentYear}</h2>
                        <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">→</button>
                    </div>


                </div>
            </div>

            <div className="flex gap-4 h-full overflow-hidden">
                <div className="flex-1 min-w-0 min-h-0">
                    <Card title="Incomes" fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-full scrollbar-custom pr-2">
                            {filteredTransactions.incomes.length > 0 ? (
                                [...filteredTransactions.incomes]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(income => (
                                        <div
                                            key={income.id}
                                            className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white group-hover:text-black">{income.title}</p>
                                                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                                                    <span>{income.category}</span>
                                                    <span>{income.date}</span>
                                                </div>
                                                {income.notes && (
                                                    <p className="text-xs text-gray-400 mt-2 italic">{income.notes}</p>
                                                )}
                                            </div>
                                            <div className="flex gap-2 ml-4 items-center">
                                                <span className="text-lg font-bold text-green-500 min-w-fit">
                                                    +${income.amount.toFixed(2)}
                                                </span>
                                                {/* <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(expense)}
                                                        className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(expense.id)}
                                                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-gray-400 text-center text-sm py-8">No expenses for {MONTHS[currentMonth]} {currentYear}</p>
                            )}
                        </div>
                    </Card>
                </div>

                {/* Expenses List Section */}
                <div className="flex-1 min-w-0 min-h-0">
                    <Card title="Expenses" fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-full scrollbar-custom pr-2">
                            {filteredTransactions.expenses.length > 0 ? (
                                [...filteredTransactions.expenses]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(expense => (
                                        <div
                                            key={expense.id}
                                            className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white group-hover:text-black">{expense.title}</p>
                                                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                                                    <span>{expense.category}</span>
                                                    <span>{expense.date}</span>
                                                </div>
                                                {expense.notes && (
                                                    <p className="text-xs text-gray-400 mt-2 italic">{expense.notes}</p>
                                                )}
                                            </div>
                                            <div className="flex gap-2 ml-4 items-center">
                                                <span className="text-lg font-bold text-red-500 min-w-fit">
                                                    -${expense.amount.toFixed(2)}
                                                </span>
                                                {/* <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(expense)}
                                                        className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(expense.id)}
                                                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors"
                                                    >
                                                        Delete
                                                    </button>
                                                </div> */}
                                            </div>
                                        </div>
                                    ))
                            ) : (
                                <p className="text-gray-400 text-center text-sm py-8">No expenses for {MONTHS[currentMonth]} {currentYear}</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}

export default Transactions