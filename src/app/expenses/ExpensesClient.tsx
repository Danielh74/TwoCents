'use client'

import { use, useMemo, useState, useTransition } from 'react'
import Card from '@/components/Card'
import DeleteModal from '@/components/DeleteModal'
import { useSettings } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'
import type { Transaction, TransactionFormType } from '@/types/transaction'
import type { Budget } from '@/types/budget'
import TransInfoCard from '@/components/TransInfoCard'
import { useTransactions } from '@/lib/transactions-context'
import TransactionForm from '@/components/TransactionForm'

type Props = {
    budgetsPromise: Promise<Budget[]>
}

const initialForm: TransactionFormType = {
    title: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    type: 'expense'
}

export default function ExpensesClient({ budgetsPromise }: Props) {
    const budgets = use(budgetsPromise);
    const { transactions, deleteTransaction } = useTransactions()

    const EXPENSE_CATEGORIES = budgets.map(b => b.category).sort()

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [filterCategory, setFilterCategory] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<TransactionFormType>(initialForm)
    const [isPending, startTransition] = useTransition()

    const { currency, showCents, language } = useSettings()
    const t = useTranslations()
    const cDec = showCents ? 2 : 0

    const monthlyExpenseList = useMemo(() => {
        return transactions
            .filter(tx => tx.type === 'expense')
            .filter(tx => {
                const [year, month] = tx.date.split('-').map(Number)
                return year === currentYear && month === currentMonth + 1
            })
    }, [transactions, currentMonth, currentYear])

    const availableCategories = useMemo(
        () => [...new Set(monthlyExpenseList.map(tx => tx.category))].sort(),
        [monthlyExpenseList]
    )

    const filteredExpenseList = useMemo(
        () => filterCategory === '' ? monthlyExpenseList : monthlyExpenseList.filter(tx => tx.category === filterCategory),
        [monthlyExpenseList, filterCategory]
    )

    const totalExpenses = useMemo(
        () => filteredExpenseList.reduce((sum, tx) => sum + tx.amount, 0),
        [filteredExpenseList]
    )

    const handleEdit = (expense: Transaction) => {
        setEditingId(expense._id)
        setFormData({
            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            date: expense.date,
            notes: expense.notes ?? '',
            type: 'expense'
        })
    }

    const handleDeleteRequest = (transactionId: string) => {
        setDeletingId(transactionId)
    }

    const handleDeleteConfirm = () => {
        if (!deletingId) return
        const id = deletingId
        setDeletingId(null)
        startTransition(async () => {
            await deleteTransaction(id)
        })
    }

    const handlePreviousMonth = () => {
        setFilterCategory('')
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
        else setCurrentMonth(currentMonth - 1)
    }

    const handleNextMonth = () => {
        setFilterCategory('')
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
        else setCurrentMonth(currentMonth + 1)
    }

    return (
        <main className="flex md:h-[calc(100vh-2rem)] flex-col gap-3 md:min-h-0">
            {deletingId && (
                <DeleteModal
                    title={t.expenses.deleteTitle}
                    message={t.expenses.confirmDelete}
                    confirmLabel={t.expenses.deleteBtn}
                    cancelLabel={t.expenses.cancelBtn}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletingId(null)}
                />
            )}

            <header className="flex flex-wrap justify-between items-center mb-2 gap-3">
                <h1 className="text-3xl font-bold">{t.expenses.title}</h1>
                <article className="flex items-center gap-4">
                    <section className="flex items-center gap-2">
                        <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '←' : '→'}</button>
                        <h2 className="text-lg font-semibold min-w-fit">{t.months[currentMonth]} {currentYear}</h2>
                        <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '→' : '←'}</button>
                    </section>
                    <section className="text-right border-s border-gray-300 ps-4">
                        <p className="text-gray-600">{t.expenses.totalExpenses}</p>
                        <p className="text-3xl font-bold text-red-500">{currency}{totalExpenses.toFixed(cDec)}</p>
                    </section>
                </article>
            </header>

            <div className="flex flex-col lg:flex-row gap-4 lg:h-full overflow-auto lg:overflow-hidden">
                <div className="flex-1 lg:min-h-0">
                    <TransactionForm
                        dataToEdit={formData}
                        id={editingId}
                        type='expense'
                        expensesCategories={EXPENSE_CATEGORIES}
                    />
                </div>

                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title={t.expenses.expenseList} fill>
                        <div className="mb-3 shrink-0">
                            <select
                                value={filterCategory}
                                onChange={e => setFilterCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={t.expenses.filterByCategory}
                            >
                                <option value="">{t.expenses.allCategories}</option>
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-3 w-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
                            {filteredExpenseList.length > 0 ? (
                                [...filteredExpenseList]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(expense => (
                                        <TransInfoCard
                                            key={expense._id}
                                            type="expense"
                                            transaction={expense}
                                            deleteTransaction={handleDeleteRequest}
                                            editTransaction={handleEdit}
                                            pending={isPending}
                                        />
                                    ))
                            ) : (
                                <p className="text-gray-400 text-center text-sm py-8">{t.expenses.noExpensesFor(t.months[currentMonth], currentYear)}</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}
