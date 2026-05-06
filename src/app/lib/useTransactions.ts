'use client'

import { useState, useEffect } from 'react'
import { Transaction } from './definitions'
import { transactions as initialTransactions } from './data'

const STORAGE_KEY = 'twocents_transactions'

export function useTransactions() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [transactions, setTransactions] = useState(() => {

        const storedData = localStorage.getItem(STORAGE_KEY);
        if (!storedData) {
            setIsLoaded(true);
            return initialTransactions;
        }

        try {
            return JSON.parse(storedData);
        } catch (error) {
            console.error("Failed to parse transactions:", error)
            return initialTransactions
        } finally {
            setIsLoaded(true);
        }
    });

    // Save to localStorage whenever transactions change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
        }
    }, [transactions, isLoaded])

    const addTransaction = (transaction: Omit<Transaction, "id">) => {
        const newId = Math.max(...transactions.map((t: Transaction) => t.id), 0) + 1
        const newTransaction: Transaction = {
            ...transaction,
            id: newId
        }
        const updatedList = [...transactions, newTransaction];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        setTransactions(updatedList);
        return newTransaction;
    }

    const updateTransaction = (id: number, updates: Omit<Transaction, "id">) => {
        const updatedList = transactions.map((t: Transaction) => t.id === id ? { ...t, ...updates } : t);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        setTransactions(updatedList);
    }

    const deleteTransaction = (id: number) => {
        const updatedList = transactions.filter((t: Transaction) => t.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
        setTransactions(updatedList);
    }

    return {
        transactions,
        isLoaded,
        addTransaction,
        updateTransaction,
        deleteTransaction
    }
}
