import { Suspense } from 'react'
import { getBudgetsFromDb } from '@/lib/db/budgets'
import DashboardClient from './DashboardClient'

export default function Dashboard() {
    const budgetsPromise = getBudgetsFromDb()

    return (
        <Suspense fallback={<main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>}>
            <DashboardClient budgetsPromise={budgetsPromise} />
        </Suspense>
    )
}
