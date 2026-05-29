'use client'

import { use, useState, useMemo } from 'react'
import Card from "@/components/Card"
import RadialChart from "@/components/RadialChart"
import ProgressBar from '@/components/ProgressBar'
import TransactionInfo from '@/components/TransactionInfo'
import { fmt } from '@/lib/utils'
import { BudgetIcon, ExpenseIcon, IncomeIcon, SavingsIcon } from '@/components/Icons'
import type { Transaction } from '@/types/transaction'
import type { Budget } from '@/types/budget'
import StatCard from '@/components/StatCard'
import { useSettings } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'

type Props = {
    transactionsPromise: Promise<Transaction[]>
    budgetsPromise: Promise<Budget[]>
}

export default function DashboardClient({ transactionsPromise, budgetsPromise }: Props) {
    const transactions = use(transactionsPromise)
    const budgets = use(budgetsPromise)

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    const t = useTranslations();
    const { currency, showCents, language } = useSettings();
    const cDec = showCents ? 2 : 0

    const filteredData = useMemo(() =>
        transactions.filter(tx => {
            const [year, month] = tx.date.split('-').map(Number)
            return year === currentYear && month === currentMonth + 1
        }),
        [currentMonth, currentYear, transactions]
    )

    const { incomeAmount, expensesAmount, balance } = useMemo(() =>
        filteredData.reduce(
            (acc, tx) => {
                if (tx.type === 'expense') {
                    acc.expensesAmount += tx.amount
                    acc.balance -= tx.amount
                } else {
                    acc.incomeAmount += tx.amount
                    acc.balance += tx.amount
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
            .filter(tx => {
                const [year, month] = tx.date.split('-').map(Number)
                return year === prevYear && month === prevMonth + 1
            })
            .reduce(
                (acc, tx) => {
                    if (tx.type === 'expense') acc.expenses += tx.amount
                    else acc.income += tx.amount
                    return acc
                },
                { income: 0, expenses: 0 }
            ),
        [prevMonth, prevYear, transactions]
    )

    const savingsRate = incomeAmount > 0 ? ((incomeAmount - expensesAmount) / incomeAmount) * 100 : 0

    const chartData = [
        { name: t.dashboard.income, value: incomeAmount },
        { name: t.dashboard.expenses, value: expensesAmount },
    ]

    const monthlyExpenses = useMemo(() =>
        budgets
            .map(budget => {
                const totalExpense = transactions
                    .filter(tx => {
                        const [year, month] = tx.date.split('-').map(Number)
                        return tx.type === 'expense' && tx.category === budget.category && year === currentYear && month === currentMonth + 1
                    })
                    .reduce((sum, tx) => sum + tx.amount, 0)
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
        filteredData.filter(tx => tx.type === 'expense').forEach(tx => {
            map[tx.category] = (map[tx.category] || 0) + tx.amount
        })
        return Object.entries(map).sort(([, a], [, b]) => b - a).slice(0, 3)
    }, [filteredData])

    const sortedTransactions = useMemo(() =>
        [...filteredData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        [filteredData]
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

    return (
        <main className="flex flex-col gap-4 md:h-[calc(100vh-2rem)] md:min-h-0">
            <header className="flex justify-between items-center shrink-0 pt-1">
                <div>
                    <h1 className="text-2xl font-bold">{t.dashboard.title}</h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.dashboard.subtitle}</p>
                </div>
                <section className="flex items-center gap-2">
                    <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '←' : '→'}</button>
                    <h2 className="text-lg font-semibold min-w-fit">{t.months[currentMonth]} {currentYear}</h2>
                    <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '→' : '←'}</button>
                </section>
            </header>

            <section className="grid grid-cols-2 xl:grid-cols-4 gap-4 shrink-0">
                <StatCard
                    label={t.dashboard.netBalance}
                    value={balance}
                    prefix={balance >= 0 ? `+${currency}` : `-${currency}`}
                    decimals={cDec}
                    color={balance >= 0 ? 'blue' : 'red'}
                    icon={<BudgetIcon />}
                    subtext={t.dashboard.transactionsThisMonth(filteredData.length)}
                />
                <StatCard
                    label={t.dashboard.income}
                    value={incomeAmount}
                    prefix={currency}
                    decimals={cDec}
                    color="green"
                    icon={<IncomeIcon />}
                    subtext={prevMonthData.income > 0 ? t.dashboard.vsLastMonth(`${currency}${fmt(prevMonthData.income, cDec)}`) : undefined}
                />
                <StatCard
                    label={t.dashboard.expenses}
                    value={expensesAmount}
                    prefix={currency}
                    decimals={cDec}
                    color="red"
                    icon={<ExpenseIcon />}
                    subtext={prevMonthData.expenses > 0 ? t.dashboard.vsLastMonth(`${currency}${fmt(prevMonthData.expenses, cDec)}`) : undefined}
                />
                <StatCard
                    label={t.dashboard.savingsRate}
                    value={savingsRate}
                    prefix={savingsRate < 0 ? '-' : ''}
                    suffix="%"
                    decimals={1}
                    color={savingsRate < 0 ? 'red' : 'purple'}
                    icon={<SavingsIcon />}
                    subtext={
                        incomeAmount === 0
                            ? t.dashboard.noIncome
                            : savingsRate >= 20
                                ? t.dashboard.onTrack
                                : savingsRate >= 0
                                    ? t.dashboard.belowTarget
                                    : t.dashboard.exceedsIncome
                    }
                />
            </section>

            <section className="flex flex-col lg:flex-row gap-4 lg:flex-1 lg:min-h-0">
                <Card title={t.dashboard.breakdown} fill>
                    <div className="flex flex-col h-full overflow-y-auto scrollbar-custom pr-1">
                        <RadialChart data={chartData} />
                        {topCategories.length > 0 && (
                            <div className="mt-3 border-t border-gray-100 dark:border-gray-600 pt-3">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{t.dashboard.topSpending}</p>
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

                <Card title={t.dashboard.budgetHealth} fill>
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
                            <p className="text-gray-400 text-center text-sm">{t.dashboard.noBudgets}</p>
                        )}
                    </div>
                </Card>

                <Card title={t.dashboard.recentTransactions} fill>
                    <div className="space-y-3 w-full h-full overflow-y-auto scrollbar-custom pr-2">
                        {sortedTransactions.length > 0 ? (
                            sortedTransactions.map(tx =>
                                <TransactionInfo
                                    key={tx._id}
                                    amount={tx.amount}
                                    date={tx.date}
                                    title={tx.title}
                                    type={tx.type}
                                />
                            )
                        ) : (
                            <p className="text-gray-400 text-center text-sm">{t.dashboard.noTransactions}</p>
                        )}
                    </div>
                </Card>
            </section>
        </main>
    )
}
