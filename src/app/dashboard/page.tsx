import { Suspense } from 'react'
import { getTransactionsFromDb } from '@/lib/db/transactions'
import { getBudgetsFromDb } from '@/lib/db/budgets'
import DashboardClient from './DashboardClient'

export default function Dashboard() {
    const transactionsPromise = getTransactionsFromDb();
    const budgetsPromise = getBudgetsFromDb();

    return (
        <Suspense fallback={<main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>}>
            <DashboardClient transactionsPromise={transactionsPromise} budgetsPromise={budgetsPromise} />
        </Suspense>
    )
}
