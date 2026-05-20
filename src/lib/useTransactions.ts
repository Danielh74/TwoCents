'use client'

import { useState, useEffect } from 'react'
import { Transaction } from './definitions'
import { transactions as initialTransactions } from './data'

const STORAGE_KEY = 'twocents_transactions'

export function useTransactions() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const fetchData = () => {
            const data = localStorage.getItem(STORAGE_KEY)
            if (data) {
                try {
                    const parsedData = JSON.parse(data);
                    setTransactions(parsedData);
                } catch (error) {
                    console.error("Failed to parse the data:", error);
                    setTransactions(initialTransactions)
                }
            } else {
                setTransactions(initialTransactions)
            }
            setIsLoaded(true);
        };

        fetchData();
    }, [])

    // Save to localStorage whenever transactions change
    useEffect(() => {
        if (!isLoaded) return;

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(transactions)
        );
    }, [transactions, isLoaded]);

    const addTransaction = (transaction: Omit<Transaction, "id">) => {
        const newId = Math.max(...transactions.map((t: Transaction) => t.id), 0) + 1
        const newTransaction: Transaction = {
            ...transaction,
            id: newId
        }

        setTransactions([...transactions, newTransaction]);
        return newTransaction;
    }

    const updateTransaction = (id: number, updates: Omit<Transaction, "id">) => {
        const updatedList = transactions.map((t: Transaction) => t.id === id ? { ...t, ...updates } : t);
        setTransactions(updatedList);
    }

    const deleteTransaction = (id: number) => {
        const updatedList = transactions.filter((t: Transaction) => t.id !== id);
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
