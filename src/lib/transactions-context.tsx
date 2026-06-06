'use client'

import { createContext, useContext, useState } from 'react'
import type { Transaction, TransactionFormType } from '@/types/transaction'
import { createTransactionData, updateTransactionAction, deleteTransactionAction } from '@/app/transactions/actions'

interface TransactionsContextValue {
    transactions: Transaction[]
    createTransaction: (transactionData: TransactionFormType) => Promise<Transaction>
    updateTransaction: (id: string, transactionData: TransactionFormType) => Promise<Transaction>
    deleteTransaction: (id: string) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextValue | null>(null)

export function TransactionsProvider({
    initialTransactions,
    children,
}: {
    initialTransactions: Transaction[]
    children: React.ReactNode
}) {
    const [transactions, setTransactions] = useState(initialTransactions)

    const createTransaction = async (transactionData: TransactionFormType) => {
        const created = await createTransactionData(transactionData)
        setTransactions(prev => [created, ...prev])
        return created
    }

    const updateTransaction = async (id: string, transactionData: TransactionFormType) => {
        const updated = await updateTransactionAction(id, transactionData)
        setTransactions(prev => prev.map(tx => tx._id === id ? updated : tx))
        return updated
    }

    const deleteTransaction = async (id: string) => {
        await deleteTransactionAction(id)
        setTransactions(prev => prev.filter(tx => tx._id !== id))
    }

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction, updateTransaction, deleteTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    const ctx = useContext(TransactionsContext)
    if (!ctx) throw new Error('useTransactions must be used within TransactionsProvider')
    return ctx
}
