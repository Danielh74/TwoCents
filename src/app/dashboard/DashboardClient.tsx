'use client'

import { use } from 'react'
import { useMonthNavigation } from '@/lib/hooks/useMonthNavigation'
import { useDashboardData } from '@/lib/hooks/useDashboardData'
import Card from "@/components/Card"
import RadialChart from "@/components/RadialChart"
import ProgressBar from '@/components/ProgressBar'
import TransactionInfo from '@/components/TransactionInfo'
import { fmt } from '@/lib/utils'
import { BudgetIcon, ExpenseIcon, IncomeIcon, SavingsIcon } from '@/components/Icons'
import type { Budget } from '@/types/budget'
import StatCard from '@/components/StatCard'
import { useSettings } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'
import { useTransactions } from '@/lib/transactions-context'

type Props = {
    budgetsPromise: Promise<Budget[]>
}

export default function DashboardClient({ budgetsPromise }: Props) {
    const { transactions } = useTransactions()
    const budgets = use(budgetsPromise)

    const { currentMonth, currentYear, handlePreviousMonth, handleNextMonth } = useMonthNavigation()

    const t = useTranslations()
    const { currency, showCents, language } = useSettings()
    const cDec = showCents ? 2 : 0

    const {
        filteredData,
        incomeAmount,
        expensesAmount,
        balance,
        prevMonthData,
        savingsRate,
        monthlyExpenses,
        topCategories,
        sortedTransactions,
    } = useDashboardData(transactions, budgets, currentMonth, currentYear)

    const chartData = [
        { name: t.dashboard.income, value: incomeAmount },
        { name: t.dashboard.expenses, value: expensesAmount },
    ]

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
