import { Suspense } from 'react'
import TransactionPageClient from '@/components/TransactionPageClient'
import { getBudgetsFromDb } from '@/lib/db/budgets'

export default function ExpensesPage() {
    const budgetsPromise = getBudgetsFromDb()

    return (
        <Suspense fallback={<main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>}>
            <TransactionPageClient type="expense" budgetsPromise={budgetsPromise} />
        </Suspense>
    )
}
