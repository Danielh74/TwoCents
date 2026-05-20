'use client'

import { useState, useMemo } from 'react'
import { budgets } from "@/lib/data"
import Card from "@/components/Card"
import RadialChart from "@/components/RadialChart"
import ProgressBar from '@/components/ProgressBar'
import TransactionInfo from '@/components/TransactionInfo'
import { MONTHS } from '@/lib/utils'
import { useTransactions } from '@/lib/useTransactions'
import ThemeToggler from '@/components/ThemeToggler'

export default function Dashboard() {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // May (0-indexed)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const { transactions, isLoaded } = useTransactions();

    const filteredData = useMemo(() => {
        return transactions.filter(transaction => {
            const [year, month] = transaction.date.split('-').map(Number);
            return year === currentYear && month === currentMonth + 1;
        });
    }, [currentMonth, currentYear, transactions]);

    const { incomeAmount, expensesAmount, balance } = useMemo(() => {
        return filteredData.reduce(
            (acc, current) => {
                if (current.type === 'expense') {
                    acc.expensesAmount += Number(current.amount);
                    acc.balance -= Number(current.amount);
                };
                if (current.type === 'income') {
                    acc.incomeAmount += Number(current.amount);
                    acc.balance += Number(current.amount);
                }
                return acc;
            }, { incomeAmount: 0, expensesAmount: 0, balance: 0 })
    }, [filteredData]);

    const chartData = [
        { name: 'Income', value: incomeAmount },
        { name: 'Expenses', value: expensesAmount }
    ];

    const monthlyExpenses = useMemo(() => {
        return budgets.map(budget => {
            const totalExpense = transactions.filter(transaction => {
                const [year, month] = transaction.date.split('-').map(Number);
                return transaction.type === 'expense' && transaction.category === budget.category && year === currentYear && month === currentMonth + 1;
            }).reduce((sum, transaction) => sum + transaction.amount, 0);

            return {
                category: budget.category,
                budget: budget.value,
                expense: totalExpense,
                remaining: budget.value - totalExpense
            }
        });
    }, [currentMonth, currentYear, transactions]);

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    if (!isLoaded) {
        return <main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>
    }

    return (
        <main className={`flex h-[calc(100vh-2rem)] flex-col gap-3 min-h-0`}>
            <article className={`flex-6 flex justify-center min-h-0`}>
                <Card title="Overview" fill>
                    <div className={`flex flex-col w-full h-full`}>
                        <div className="flex justify-between items-center mb-2 pb-4 border-b border-gray-200">
                            <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">←</button>
                            <h2 className="text-lg font-semibold">{MONTHS[currentMonth]} {currentYear}</h2>
                            <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">→</button>
                        </div>
                        <div className={`flex flex-1 justify-center w-full overflow-y-auto scrollbar-custom pr-2`}>
                            <div className='flex flex-col justify-start flex-1 gap-3'>
                                <figure className="flex  justify-between">
                                    <span>Total income this month:</span>
                                    <span className='text-green-500 font-bold text-lg'>+{incomeAmount}</span>
                                </figure>
                                <figure className="flex justify-between">
                                    <span>Total expenses this month:</span>
                                    <span className='text-red-500 font-bold text-lg'>-{expensesAmount}</span>
                                </figure>
                                <figure className="flex justify-between">
                                    <span>Total balance:</span>
                                    <span className={`${balance > 0 ? "text-green-500" : "text-red-500"} font-bold text-lg`}>{balance > 0 ? '+' : '-'}{balance}</span>
                                </figure>
                            </div>

                            <div className='flex flex-2'>
                                <RadialChart data={chartData} />
                            </div>

                        </div>
                    </div>
                </Card>
            </article>
            <article className={`flex-4 flex gap-3 justify-around min-h-0`}>
                <Card title="Budgets" fill>
                    <div className="space-y-4 w-full h-full overflow-y-auto scrollbar-custom pr-2">
                        {monthlyExpenses.map(budget =>
                            <ProgressBar
                                key={budget.category}
                                budget={budget.budget}
                                category={budget.category}
                                expense={budget.expense}
                                remaining={budget.remaining}
                            />
                        )}
                    </div>
                </Card>
                <Card title="Transactions" fill>
                    <div className="space-y-4 w-full h-full overflow-y-auto scrollbar-custom pr-2">
                        {filteredData.length > 0 ? (
                            [...filteredData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(transaction =>
                                <TransactionInfo
                                    key={transaction.id}
                                    amount={transaction.amount}
                                    date={transaction.date}
                                    title={transaction.title}
                                    type={transaction.type} />
                            )
                        ) : (
                            <p className="text-gray-400 text-center text-sm">No transactions this month</p>
                        )}
                    </div>
                </Card>
                <Card title="Settings" fill>
                    <div className="flex flex-col gap-5 justify-around space-y-3 w-full text-sm overflow-y-auto h-full scrollbar-custom pr-2">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="text-gray-600">Currency</span>
                            <span className="font-medium">USD</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="text-gray-600">Theme</span>
                            <ThemeToggler />
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                            <span className="text-gray-600">Notifications</span>
                            <span className="font-medium text-green-500">Enabled</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-600">Export Data</span>
                            <span className="text-blue-500 cursor-pointer hover:underline">Download</span>
                        </div>
                    </div>
                </Card>
            </article>
        </main>
    )
}
