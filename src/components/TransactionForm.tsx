import React, { useEffect, useTransition } from 'react'
import Card from './Card'
import { useTranslations } from '@/lib/translations'
import type { TransactionFormType, TransactionType } from '@/types/transaction'
import { useTransactions } from '@/lib/transactions-context'
import { useForm } from 'react-hook-form'

type Props = {
    id: string | null
    type: TransactionType
    dataToEdit: TransactionFormType
    expensesCategories: string[]
    onCancel: () => void
}

function makeEmptyForm(type: TransactionType): TransactionFormType {
    return {
        title: '',
        amount: 0.00,
        category: '',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        type,
    }
}

function TransactionForm({ id = null, type, dataToEdit, expensesCategories = [], onCancel }: Props) {
    const { updateTransaction, createTransaction } = useTransactions()
    const t = useTranslations()
    const [isPending, startTransition] = useTransition()

    const { register, handleSubmit, reset, formState: { errors } } = useForm<TransactionFormType>({
        defaultValues: makeEmptyForm(type)
    })

    const transactionType = type === 'income' ? t.income : t.expenses
    const transactionCategories = type === 'income' ? t.income.categories : expensesCategories

    useEffect(() => {
        if (id) {
            reset(dataToEdit)
        } else {
            reset(makeEmptyForm(type))
        }
    }, [dataToEdit, id, type, reset])

    const onSubmit = (data: TransactionFormType) => {
        if (id !== null) {
            startTransition(async () => {
                await updateTransaction(id, data)
                reset(makeEmptyForm(type))
                onCancel()
            })
        } else {
            startTransition(async () => {
                await createTransaction(data)
                reset(makeEmptyForm(type))
            })
        }
    }

    const handleCancel = () => {
        reset(makeEmptyForm(type))
        onCancel()
    }

    return (
        <Card title={id ? transactionType.editTitle : transactionType.addNew}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{transactionType.titleField}</label>
                    <input
                        type="text"
                        id="title"
                        {...register("title", { required: 'Title is required' })}
                        placeholder={transactionType.placeholderTitle}
                        className={`w-full px-3 py-2 border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.title && <small className='text-red-500'>{errors.title.message}</small>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{transactionType.amount}</label>
                        <input
                            type="number"
                            id="amount"
                            {...register("amount", {
                                required: 'Amount is required',
                                min: { value: 0.01, message: 'Amount must be greater than 0' }
                            })}
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                            className={`w-full px-3 py-2 border ${errors.amount ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.amount && <small className='text-red-500'>{errors.amount.message}</small>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{transactionType.category}</label>
                        <select
                            id="category"
                            className={`w-full px-3 py-2 border ${errors.category ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            {...register("category", { required: 'Category is required' })}
                        >
                            <option value="">{transactionType.selectCategory}</option>
                            {transactionCategories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        {errors.category && <small className='text-red-500'>{errors.category.message}</small>}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{transactionType.date}</label>
                    <input
                        type="date"
                        id="date"
                        {...register("date", {
                            required: 'Date is required',
                            max: { value: new Date().toISOString().split('T')[0], message: "Date cannot be in the future" }
                        })}
                        className={`w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                    {errors.date && <small className='text-red-500'>{errors.date.message}</small>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{transactionType.notes}</label>
                    <textarea
                        id="notes"
                        {...register("notes")}
                        placeholder={transactionType.placeholderNotes}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={isPending}
                        className={`flex-1 ${type === 'income' ? 'bg-green-500' : 'bg-red-500'} hover:cursor-pointer hover:${type === 'income' ? 'bg-green-600' : 'bg-red-600'} text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50`}
                    >
                        {id ? transactionType.updateBtn : transactionType.addBtn}
                    </button>
                    {id && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-md transition-colors"
                        >
                            {transactionType.cancelBtn}
                        </button>
                    )}
                </div>
            </form>
        </Card>
    )
}

export default TransactionForm
