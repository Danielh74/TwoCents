'use client'

import { use, useState, useMemo } from 'react'
import Card from "@/components/Card"
import RadialChart from "@/components/RadialChart"
import ProgressBar from '@/components/ProgressBar'
import TransactionInfo from '@/components/TransactionInfo'
import { fmt, MONTHS } from '@/lib/utils'
import { BudgetIcon, ExpenseIcon, IncomeIcon, SavingsIcon } from '@/components/Icons'
import type { Transaction } from '@/types/transaction'
import type { Budget } from '@/types/budget'
import StatCard from '@/components/StatCard'
import { useSettings } from '@/lib/settings-context'

type Props = {
    transactionsPromise: Promise<Transaction[]>
    budgetsPromise: Promise<Budget[]>
}

export default function DashboardClient({ transactionsPromise, budgetsPromise }: Props) {
    const transactions = use(transactionsPromise)
    const budgets = use(budgetsPromise)

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const filteredData = useMemo(() =>
        transactions.filter(t => {
            const [year, month] = t.date.split('-').map(Number)
            return year === currentYear && month === currentMonth + 1
        }),
        [currentMonth, currentYear, transactions]
    )

    const { incomeAmount, expensesAmount, balance } = useMemo(() =>
        filteredData.reduce(
            (acc, t) => {
                if (t.type === 'expense') {
                    acc.expensesAmount += t.amount
                    acc.balance -= t.amount
                } else {
                    acc.incomeAmount += t.amount
                    acc.balance += t.amount
                }
                return acc
            },
            { incomeAmount: 0, expensesAmount: 0, balance: 0 }
        ),
        [filteredData]
    )

    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear

    const prevMonthData = useMemo(() =>
        transactions
            .filter(t => {
                const [year, month] = t.date.split('-').map(Number)
                return year === prevYear && month === prevMonth + 1
            })
            .reduce(
                (acc, t) => {
                    if (t.type === 'expense') acc.expenses += t.amount
                    else acc.income += t.amount
                    return acc
                },
                { income: 0, expenses: 0 }
            ),
        [prevMonth, prevYear, transactions]
    )

    const savingsRate = incomeAmount > 0 ? ((incomeAmount - expensesAmount) / incomeAmount) * 100 : 0

    const chartData = [
        { name: 'Income', value: incomeAmount },
        { name: 'Expenses', value: expensesAmount },
    ]

    const monthlyExpenses = useMemo(() =>
        budgets
            .map(budget => {
                const totalExpense = transactions
                    .filter(t => {
                        const [year, month] = t.date.split('-').map(Number)
                        return t.type === 'expense' && t.category === budget.category && year === currentYear && month === currentMonth + 1
                    })
                    .reduce((sum, t) => sum + t.amount, 0)
                return {
                    category: budget.category,
                    budget: budget.value,
                    expense: totalExpense,
                    remaining: budget.value - totalExpense,
                }
            })
            .sort((a, b) => (b.expense / b.budget) - (a.expense / a.budget)),
        [currentMonth, currentYear, transactions, budgets]
    )

    const topCategories = useMemo(() => {
        const map: Record<string, number> = {}
        filteredData.filter(t => t.type === 'expense').forEach(t => {
            map[t.category] = (map[t.category] || 0) + t.amount
        })
        return Object.entries(map).sort(([, a], [, b]) => b - a).slice(0, 3)
    }, [filteredData])

    const sortedTransactions = useMemo(() =>
        [...filteredData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [filteredData]
    )

    const { currency, showCents } = useSettings()
    const cDec = showCents ? 2 : 0

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

    return (
        <main className="flex flex-col gap-4 md:h-[calc(100vh-2rem)] md:min-h-0">
            <header className="flex justify-between items-center shrink-0 pt-1">
                <div>
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your financial overview</p>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-700 rounded-xl px-4 py-2 shadow-sm">
                    <button
                        onClick={handlePreviousMonth}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-300"
                    >
                        ←
                    </button>
                    <span className="text-sm font-semibold w-36 text-center">{MONTHS[currentMonth]} {currentYear}</span>
                    <button
                        onClick={handleNextMonth}
                        className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-500 dark:text-gray-300"
                    >
                        →
                    </button>
                </div>
            </header>

            <section className="grid grid-cols-2 xl:grid-cols-4 gap-4 shrink-0">
                <StatCard
                    label="Net Balance"
                    value={balance}
                    prefix={balance >= 0 ? `+${currency}` : `-${currency}`}
                    decimals={cDec}
                    color={balance >= 0 ? 'blue' : 'red'}
                    icon={<BudgetIcon />}
                    subtext={`${filteredData.length} transaction${filteredData.length !== 1 ? 's' : ''} this month`}
                />
                <StatCard
                    label="Income"
                    value={incomeAmount}
                    prefix={currency}
                    decimals={cDec}
                    color="green"
                    icon={<IncomeIcon />}
                    subtext={prevMonthData.income > 0 ? `vs ${currency}${fmt(prevMonthData.income, cDec)} last month` : undefined}
                />
                <StatCard
                    label="Expenses"
                    value={expensesAmount}
                    prefix={currency}
                    decimals={cDec}
                    color="red"
                    icon={<ExpenseIcon />}
                    subtext={prevMonthData.expenses > 0 ? `vs ${currency}${fmt(prevMonthData.expenses, cDec)} last month` : undefined}
                />
                <StatCard
                    label="Savings Rate"
                    value={savingsRate}
                    prefix={savingsRate < 0 ? '-' : ''}
                    suffix="%"
                    decimals={1}
                    color={savingsRate < 0 ? 'red' : 'purple'}
                    icon={<SavingsIcon />}
                    subtext={
                        incomeAmount === 0
                            ? 'No income recorded'
                            : savingsRate >= 20
                                ? 'On track'
                                : savingsRate >= 0
                                    ? 'Below 20% target'
                                    : 'Spending exceeds income'
                    }
                />
            </section>

            <section className="flex flex-col lg:flex-row gap-4 lg:flex-1 lg:min-h-0">
                <Card title="Breakdown" fill>
                    <div className="flex flex-col h-full overflow-y-auto scrollbar-custom pr-1">
                        <RadialChart data={chartData} />
                        {topCategories.length > 0 && (
                            <div className="mt-3 border-t border-gray-100 dark:border-gray-600 pt-3">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Top Spending</p>
                                <div className="space-y-2">
                                    {topCategories.map(([category, amount]) => (
                                        <div key={category} className="flex justify-between items-center text-sm">
                                            <span className="text-gray-600 dark:text-gray-300">{category}</span>
                                            <span className="font-semibold text-red-500">-{currency}{fmt(amount, cDec)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </Card>

                <Card title="Budget Health" fill>
                    <div className="space-y-4 w-full h-full overflow-y-auto scrollbar-custom pr-2">
                        {monthlyExpenses.length > 0 ? (
                            monthlyExpenses.map(budget =>
                                <ProgressBar
                                    key={budget.category}
                                    budget={budget.budget}
                                    category={budget.category}
                                    expense={budget.expense}
                                    remaining={budget.remaining}
                                />
                            )
                        ) : (
                            <p className="text-gray-400 text-center text-sm">No budgets set</p>
                        )}
                    </div>
                </Card>

                <Card title="Recent Transactions" fill>
                    <div className="space-y-3 w-full h-full overflow-y-auto scrollbar-custom pr-2">
                        {sortedTransactions.length > 0 ? (
                            sortedTransactions.map(t =>
                                <TransactionInfo
                                    key={t._id}
                                    amount={t.amount}
                                    date={t.date}
                                    title={t.title}
                                    type={t.type}
                                />
                            )
                        ) : (
                            <p className="text-gray-400 text-center text-sm">No transactions this month</p>
                        )}
                    </div>
                </Card>
            </section>
        </main>
    )
}
