'use client'

import { use, useMemo, useState, useTransition } from 'react'
import Card from '@/components/Card'
import DeleteModal from '@/components/DeleteModal'
import { useSettings } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'
import type { Transaction, TransactionFormType, TransactionType } from '@/types/transaction'
import type { Budget } from '@/types/budget'
import TransInfoCard from '@/components/TransInfoCard'
import { useTransactions } from '@/lib/transactions-context'
import TransactionForm from '@/components/TransactionForm'
import { useMonthNavigation } from '@/lib/hooks/useMonthNavigation'

type Props = {
    type: TransactionType
    budgetsPromise?: Promise<Budget[]>
}

function makeEmptyForm(type: TransactionType): TransactionFormType {
    return {
        title: '',
        amount: 0,
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        type,
    }
}

export default function TransactionPageClient({ type, budgetsPromise }: Props) {
    const budgets = budgetsPromise ? use(budgetsPromise) : []
    const { transactions, deleteTransaction } = useTransactions()

    const [filterCategory, setFilterCategory] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<TransactionFormType>(() => makeEmptyForm(type))
    const [isPending, startTransition] = useTransition()

    const { currentMonth, currentYear, handlePreviousMonth, handleNextMonth } = useMonthNavigation(
        () => setFilterCategory('')
    )

    const { currency, showCents, language } = useSettings()
    const t = useTranslations()
    const cDec = showCents ? 2 : 0
    const tPage = type === 'income' ? t.income : t.expenses
    const totalColor = type === 'income' ? 'text-green-500' : 'text-red-500'
    const expenseCategories = type === 'expense' ? budgets.map(b => b.category).sort() : []

    const monthlyList = useMemo(() =>
        transactions
            .filter(tx => tx.type === type)
            .filter(tx => {
                const [year, month] = tx.date.split('-').map(Number)
                return year === currentYear && month === currentMonth + 1
            }),
        [transactions, type, currentMonth, currentYear]
    )

    const availableCategories = useMemo(
        () => [...new Set(monthlyList.map(tx => tx.category))].sort(),
        [monthlyList]
    )

    const filteredList = useMemo(
        () => filterCategory === '' ? monthlyList : monthlyList.filter(tx => tx.category === filterCategory),
        [monthlyList, filterCategory]
    )

    const total = useMemo(
        () => filteredList.reduce((sum, tx) => sum + tx.amount, 0),
        [filteredList]
    )

    const handleEdit = (tx: Transaction) => {
        setEditingId(tx._id)
        setFormData({
            title: tx.title,
            amount: tx.amount,
            category: tx.category,
            date: new Date(tx.date).toISOString().split('T')[0],
            notes: tx.notes ?? '',
            type,
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

    return (
        <main className="flex md:h-[calc(100vh-2rem)] flex-col gap-3 md:min-h-0">
            {deletingId && (
                <DeleteModal
                    title={tPage.deleteTitle}
                    message={tPage.confirmDelete}
                    confirmLabel={tPage.deleteBtn}
                    cancelLabel={tPage.cancelBtn}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletingId(null)}
                />
            )}

            <header className="flex flex-wrap justify-between items-center mb-2 gap-3">
                <h1 className="text-3xl font-bold">{tPage.title}</h1>
                <article className="flex items-center gap-4">
                    <section className="flex items-center gap-2">
                        <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '←' : '→'}</button>
                        <h2 className="text-lg font-semibold min-w-fit">{t.months[currentMonth]} {currentYear}</h2>
                        <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '→' : '←'}</button>
                    </section>
                    <section className="text-right border-s border-gray-300 ps-4">
                        <p className="text-gray-600">{type === 'income' ? t.income.totalIncome : t.expenses.totalExpenses}</p>
                        <p className={`text-3xl font-bold ${totalColor}`}>{currency}{total.toFixed(cDec)}</p>
                    </section>
                </article>
            </header>

            <div className="flex flex-col lg:flex-row gap-4 lg:h-full overflow-auto lg:overflow-hidden">
                <div className="flex-1 lg:min-h-0">
                    <TransactionForm
                        dataToEdit={formData}
                        id={editingId}
                        type={type}
                        expensesCategories={expenseCategories}
                        onCancel={() => { setEditingId(null); setFormData(makeEmptyForm(type)) }}
                    />
                </div>

                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title={type === 'income' ? t.income.incomeList : t.expenses.expenseList} fill>
                        <div className="mb-3 shrink-0">
                            <select
                                value={filterCategory}
                                onChange={e => setFilterCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={tPage.filterByCategory}
                            >
                                <option value="">{tPage.allCategories}</option>
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-3 w-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
                            {filteredList.length > 0 ? (
                                [...filteredList]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(tx => (
                                        <TransInfoCard
                                            key={tx._id}
                                            type={type}
                                            transaction={tx}
                                            deleteTransaction={handleDeleteRequest}
                                            editTransaction={handleEdit}
                                            pending={isPending}
                                        />
                                    ))
                            ) : (
                                <p className="text-gray-400 text-center text-sm py-8">
                                    {type === 'income'
                                        ? t.income.noRecordsFor(t.months[currentMonth], currentYear)
                                        : t.expenses.noExpensesFor(t.months[currentMonth], currentYear)
                                    }
                                </p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}
