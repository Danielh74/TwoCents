'use client'

import { use, useState, useTransition } from 'react'
import Card from '@/components/Card'
import type { Budget, CreateBudgetInput } from '@/types/budget'
import type { Category } from '@/types/category'
import { createBudgetAction, updateBudgetAction, deleteBudgetAction } from './actions'
import { useTranslations } from '@/lib/translations'

type Props = {
    budgetsPromise: Promise<Budget[]>
    categoriesPromise: Promise<Category[]>
}

interface BudgetForm {
    category: string
    value: string
}

const EMPTY_FORM: BudgetForm = { category: '', value: '' }

export default function BudgetsClient({ budgetsPromise, categoriesPromise }: Props) {
    const initialBudgets = use(budgetsPromise)
    const categories = use(categoriesPromise)

    const [budgets, setBudgets] = useState(initialBudgets)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState<BudgetForm>(EMPTY_FORM)
    const [isPending, startTransition] = useTransition()

    const t = useTranslations()

    const usedCategories = new Set(budgets.map(b => b.category))
    const availableCategories = categories.filter(c => !usedCategories.has(c.name) || c.name === formData.category)

    const handleEdit = (budget: Budget) => {
        setEditingId(budget._id)
        setFormData({ category: budget.category, value: budget.value.toString() })
        setShowForm(true)
    }

    const handleCancel = () => {
        setEditingId(null)
        setFormData(EMPTY_FORM)
        setShowForm(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!formData.category || !formData.value) return

        const data: CreateBudgetInput = {
            category: formData.category,
            value: parseFloat(formData.value),
        }

        if (editingId) {
            startTransition(async () => {
                const updated = await updateBudgetAction(editingId, data)
                setBudgets(prev => prev.map(b => b._id === editingId ? updated : b))
                handleCancel()
            })
        } else {
            startTransition(async () => {
                const created = await createBudgetAction(data)
                setBudgets(prev => [...prev, created])
                handleCancel()
            })
        }
    }

    const handleDelete = (id: string) => {
        if (!confirm(t.budgets.confirmDelete)) return
        startTransition(async () => {
            await deleteBudgetAction(id)
            setBudgets(prev => prev.filter(b => b._id !== id))
        })
    }

    return (
        <main className='flex flex-col w-full gap-6'>
            <section className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>{t.budgets.title}</h1>
                    <p className='text-sm text-gray-400 mt-1'>{t.budgets.subtitle}</p>
                </div>
                {!showForm && (
                    <button
                        onClick={() => setShowForm(true)}
                        disabled={availableCategories.length === 0}
                        className='cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        <span>{t.budgets.addBudget}</span>
                    </button>
                )}
            </section>

            {showForm && (
                <section>
                    <Card title={editingId ? t.budgets.editTitle : t.budgets.addNew}>
                        <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4 sm:items-end'>
                            <div className='flex-1'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>{t.budgets.category}</label>
                                <select
                                    value={formData.category}
                                    onChange={e => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                    disabled={!!editingId}
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100'
                                >
                                    <option value=''>{t.budgets.selectCategory}</option>
                                    {availableCategories.map(c => (
                                        <option key={c._id} value={c.name}>{c.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex-1'>
                                <label className='block text-sm font-medium text-gray-700 mb-1'>{t.budgets.monthlyLimit}</label>
                                <input
                                    type='number'
                                    value={formData.value}
                                    onChange={e => setFormData(prev => ({ ...prev, value: e.target.value }))}
                                    placeholder='0.00'
                                    step='0.01'
                                    min='0'
                                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                />
                            </div>
                            <div className='flex gap-2'>
                                <button
                                    type='submit'
                                    disabled={isPending}
                                    className='bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50'
                                >
                                    {editingId ? t.budgets.updateBtn : t.budgets.addBtn}
                                </button>
                                <button
                                    type='button'
                                    onClick={handleCancel}
                                    className='bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors'
                                >
                                    {t.budgets.cancelBtn}
                                </button>
                            </div>
                        </form>
                    </Card>
                </section>
            )}

            <section className='grid grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
                {budgets.map(budget => (
                    <div key={budget._id}>
                        <Card title={budget.category}>
                            <div className='w-full text-center mt-2'>
                                <p className='text-2xl font-bold text-blue-400'>${budget.value}</p>
                                <p className='text-xs text-gray-400 mt-1'>{t.budgets.monthlyLimitLabel}</p>
                            </div>
                            <div className='flex gap-2 mt-4'>
                                <button
                                    onClick={() => handleEdit(budget)}
                                    disabled={isPending}
                                    className='flex-1 text-sm text-gray-300 cursor-pointer px-3 py-1 rounded-md hover:text-white hover:bg-white/10 transition-colors duration-200 disabled:opacity-50'
                                >
                                    {t.budgets.editBtn}
                                </button>
                                <button
                                    onClick={() => handleDelete(budget._id)}
                                    disabled={isPending}
                                    className='flex-1 text-sm text-red-400 cursor-pointer px-3 py-1 rounded-md hover:text-white hover:bg-red-500/20 transition-colors duration-200 disabled:opacity-50'
                                >
                                    {t.budgets.deleteBtn}
                                </button>
                            </div>
                        </Card>
                    </div>
                ))}
                {budgets.length === 0 && (
                    <p className='col-span-2 lg:col-span-4 text-center text-gray-400 py-12'>{t.budgets.noBudgets}</p>
                )}
            </section>
        </main>
    )
}
