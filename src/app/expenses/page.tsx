import { Suspense } from 'react'
import { getTransactionsFromDb } from '@/lib/db/transactions'
import ExpensesClient from './ExpensesClient'

export default function ExpensesPage() {
    const transactionsPromise = getTransactionsFromDb()

    return (
        <Suspense fallback={<main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>}>
            <ExpensesClient transactionsPromise={transactionsPromise} />
        </Suspense>
    )
}
