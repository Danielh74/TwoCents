'use client'

import { use, useMemo, useState, useTransition } from 'react'
import Card from '@/components/Card'
import { useSettings, formatDate } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'
import type { Transaction, CreateTransactionInput } from '@/types/transaction'
import { createTransactionData, updateTransactionAction, deleteTransactionAction } from '@/app/transactions/actions'

type Props = {
    transactionsPromise: Promise<Transaction[]>
}

interface IncomeForm {
    title: string
    amount: string
    category: string
    date: string
    notes: string
}

const EMPTY_FORM: IncomeForm = {
    title: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
}

export default function IncomeClient({ transactionsPromise }: Props) {
    const initialTransactions = use(transactionsPromise)

    const [transactions, setTransactions] = useState(initialTransactions)
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<IncomeForm>(EMPTY_FORM)
    const [isPending, startTransition] = useTransition()

    const { currency, showCents, dateFormat } = useSettings()
    const t = useTranslations()
    const cDec = showCents ? 2 : 0

    const filteredIncomeList = useMemo(() => {
        return transactions
            .filter(tx => tx.type === 'income')
            .filter(tx => {
                const [year, month] = tx.date.split('-').map(Number)
                return year === currentYear && month === currentMonth + 1
            })
    }, [transactions, currentMonth, currentYear])

    const totalIncome = useMemo(
        () => filteredIncomeList.reduce((sum, tx) => sum + tx.amount, 0),
        [filteredIncomeList]
    )

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleEdit = (income: Transaction) => {
        setEditingId(income._id)
        setFormData({
            title: income.title,
            amount: income.amount.toString(),
            category: income.category,
            date: income.date,
            notes: income.notes ?? '',
        })
    }

    const handleCancel = () => {
        setEditingId(null)
        setFormData(EMPTY_FORM)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.title || !formData.amount || !formData.category || !formData.date) {
            alert(t.income.fillRequired)
            return
        }

        const data: CreateTransactionInput = {
            title: formData.title,
            amount: parseFloat(formData.amount),
            category: formData.category,
            date: formData.date,
            notes: formData.notes,
            type: 'income',
        }

        if (editingId !== null) {
            startTransition(async () => {
                const updated = await updateTransactionAction(editingId, data)
                setTransactions(prev => prev.map(tx => tx._id === editingId ? updated : tx))
                setEditingId(null)
                setFormData(EMPTY_FORM)
            })
        } else {
            startTransition(async () => {
                const created = await createTransactionData(data)
                setTransactions(prev => [created, ...prev])
                setFormData(EMPTY_FORM)
            })
        }
    }

    const handleDelete = (id: string) => {
        if (!confirm(t.income.confirmDelete)) return
        startTransition(async () => {
            await deleteTransactionAction(id)
            setTransactions(prev => prev.filter(tx => tx._id !== id))
        })
    }

    const handlePreviousMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1) }
        else setCurrentMonth(currentMonth - 1)
    }

    const handleNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1) }
        else setCurrentMonth(currentMonth + 1)
    }

    return (
        <main className="flex md:h-[calc(100vh-2rem)] flex-col gap-3 p-4 md:min-h-0">
            <header className="flex flex-wrap justify-between items-center mb-2 gap-3">
                <h1 className="text-3xl font-bold">{t.income.title}</h1>
                <article className="flex items-center gap-4">
                    <section className="flex items-center gap-2">
                        <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">←</button>
                        <h2 className="text-lg font-semibold min-w-fit">{t.months[currentMonth]} {currentYear}</h2>
                        <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">→</button>
                    </section>
                    <section className="text-right border-s border-gray-300 ps-4">
                        <p className="text-gray-600">{t.income.totalIncome}</p>
                        <p className="text-3xl font-bold text-green-500">{currency}{totalIncome.toFixed(cDec)}</p>
                    </section>
                </article>
            </header>

            <div className="flex flex-col lg:flex-row flex-1 gap-4 lg:min-h-0 overflow-auto lg:overflow-hidden">
                <div className="flex-1 lg:min-h-0">
                    <Card title={editingId ? t.income.editTitle : t.income.addNew}>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.income.titleField}</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder={t.income.placeholderTitle}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.income.amount}</label>
                                    <input
                                        type="number"
                                        name="amount"
                                        value={formData.amount}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.income.category}</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">{t.income.selectCategory}</option>
                                        {t.income.categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.income.date}</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.income.notes}</label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleInputChange}
                                    placeholder={t.income.placeholderNotes}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50"
                                >
                                    {editingId ? t.income.updateBtn : t.income.addBtn}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
                                    >
                                        {t.income.cancelBtn}
                                    </button>
                                )}
                            </div>
                        </form>
                    </Card>
                </div>

                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title={t.income.incomeList} fill>
                        <div className="space-y-3 w-full h-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
                            {filteredIncomeList.length > 0 ? (
                                [...filteredIncomeList]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(income => (
                                        <div
                                            key={income._id}
                                            className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                                        >
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white">{income.title}</p>
                                                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                                                    <span>{income.category}</span>
                                                    <span>{formatDate(income.date, dateFormat)}</span>
                                                </div>
                                                {income.notes && <p className="text-xs text-gray-400 mt-2 italic">{income.notes}</p>}
                                            </div>
                                            <div className="flex gap-2 ms-4 items-center">
                                                <span className="text-lg font-bold text-green-500 min-w-fit">
                                                    +{currency}{income.amount.toFixed(cDec)}
                                                </span>
                                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(income)}
                                                        disabled={isPending}
                                                        className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded transition-colors disabled:opacity-50"
                                                    >
                                                        {t.income.editBtn}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(income._id)}
                                                        disabled={isPending}
                                                        className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded transition-colors disabled:opacity-50"
                                                    >
                                                        {t.income.deleteBtn}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
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
