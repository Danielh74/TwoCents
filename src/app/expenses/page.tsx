import { Suspense } from 'react'
import { getTransactionsFromDb } from '@/lib/db/transactions'
import ExpensesClient from './ExpensesClient'
import { getBudgetsFromDb } from '@/lib/db/budgets';

export default function ExpensesPage() {
    const transactionsPromise = getTransactionsFromDb();
    const budgetsPromise = getBudgetsFromDb();

    return (
        <Suspense fallback={<main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>}>
            <ExpensesClient transactionsPromise={transactionsPromise} budgetsPromise={budgetsPromise} />
        </Suspense>
    )
}
