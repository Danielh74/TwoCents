'use client'

import { useMemo, useState, useTransition } from 'react'
import Card from '@/components/Card'
import DeleteModal from '@/components/DeleteModal'
import { useSettings } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'
import type { Transaction, TransactionFormType } from '@/types/transaction'
import TransInfoCard from '@/components/TransInfoCard'
import { useTransactions } from '@/lib/transactions-context'
import TransactionForm from '@/components/TransactionForm'

const EMPTY_FORM: TransactionFormType = {
    title: '',
    amount: 0,
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    type: 'income'
}

export default function IncomeClient() {
    const { transactions, deleteTransaction } = useTransactions()

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [filterCategory, setFilterCategory] = useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<TransactionFormType>(EMPTY_FORM)
    const [isPending, startTransition] = useTransition()

    const { currency, showCents, language } = useSettings()
    const t = useTranslations()
    const cDec = showCents ? 2 : 0

    const monthlyIncomeList = useMemo(() => {
        return transactions
            .filter(tx => tx.type === 'income')
            .filter(tx => {
                const [year, month] = tx.date.split('-').map(Number)
                return year === currentYear && month === currentMonth + 1
            })
    }, [transactions, currentMonth, currentYear])

    const availableCategories = useMemo(
        () => [...new Set(monthlyIncomeList.map(tx => tx.category))].sort(),
        [monthlyIncomeList]
    )

    const filteredIncomeList = useMemo(
        () => filterCategory === '' ? monthlyIncomeList : monthlyIncomeList.filter(tx => tx.category === filterCategory),
        [monthlyIncomeList, filterCategory]
    )

    const totalIncome = useMemo(
        () => filteredIncomeList.reduce((sum, tx) => sum + tx.amount, 0),
        [filteredIncomeList]
    )

    const handleEdit = (income: Transaction) => {
        setEditingId(income._id)
        setFormData({
            title: income.title,
            amount: income.amount,
            category: income.category,
            date: new Date(income.date).toISOString().split('T')[0],
            notes: income.notes ?? '',
            type: 'income'
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
        <main className="flex md:h-[calc(100vh-2rem)] flex-col gap-3 p-4 md:min-h-0">
            {deletingId && (
                <DeleteModal
                    title={t.income.deleteTitle}
                    message={t.income.confirmDelete}
                    confirmLabel={t.income.deleteBtn}
                    cancelLabel={t.income.cancelBtn}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletingId(null)}
                />
            )}

            <header className="flex flex-wrap justify-between items-center mb-2 gap-3">
                <h1 className="text-3xl font-bold">{t.income.title}</h1>
                <article className="flex items-center gap-4">
                    <section className="flex items-center gap-2">
                        <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '←' : '→'}</button>
                        <h2 className="text-lg font-semibold min-w-fit">{t.months[currentMonth]} {currentYear}</h2>
                        <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '→' : '←'}</button>
                    </section>
                    <section className="text-right border-s border-gray-300 ps-4">
                        <p className="text-gray-600">{t.income.totalIncome}</p>
                        <p className="text-3xl font-bold text-green-500">{currency}{totalIncome.toFixed(cDec)}</p>
                    </section>
                </article>
            </header>

            <div className="flex flex-col lg:flex-row flex-1 gap-4 lg:min-h-0 overflow-auto lg:overflow-hidden">
                <div className="flex-1 lg:min-h-0">
                    <TransactionForm
                        id={editingId}
                        type='income'
                        dataToEdit={formData}
                    />
                </div>

                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title={t.income.incomeList} fill>
                        <div className="mb-3 shrink-0">
                            <select
                                value={filterCategory}
                                onChange={e => setFilterCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                aria-label={t.income.filterByCategory}
                            >
                                <option value="">{t.income.allCategories}</option>
                                {availableCategories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-3 w-full h-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
                            {filteredIncomeList.length > 0 ? (
                                [...filteredIncomeList]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(income => (
                                        <TransInfoCard
                                            key={income._id}
                                            type="income"
                                            transaction={income}
                                            deleteTransaction={handleDeleteRequest}
                                            editTransaction={handleEdit}
                                            pending={isPending}
                                        />
                                    ))
                            ) : (
                                <p className="text-gray-400 text-center text-sm py-8">{t.income.noRecordsFor(t.months[currentMonth], currentYear)}</p>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}
