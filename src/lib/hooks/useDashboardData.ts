import { useMemo } from 'react'
import type { Transaction } from '@/types/transaction'
import type { Budget } from '@/types/budget'

export function useDashboardData(
    transactions: Transaction[],
    budgets: Budget[],
    currentMonth: number,
    currentYear: number
) {
    const filteredData = useMemo(() =>
        transactions.filter(tx => {
            const [year, month] = tx.date.split('-').map(Number)
            return year === currentYear && month === currentMonth + 1
        }),
        [transactions, currentMonth, currentYear]
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
        [transactions, prevMonth, prevYear]
    )

    const savingsRate = incomeAmount > 0 ? ((incomeAmount - expensesAmount) / incomeAmount) * 100 : 0

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
        [transactions, budgets, currentMonth, currentYear]
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

    return {
        filteredData,
        incomeAmount,
        expensesAmount,
        balance,
        prevMonthData,
        savingsRate,
        monthlyExpenses,
        topCategories,
        sortedTransactions,
    }
}
