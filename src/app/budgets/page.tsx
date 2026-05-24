import { Suspense } from 'react'
import { getBudgetsFromDb } from '@/lib/db/budgets'
import { getCategoriesByTypeFromDb } from '@/lib/db/categories'
import BudgetsClient from './BudgetsClient'

export default function BudgetsPage() {
    const budgetsPromise = getBudgetsFromDb()
    const categoriesPromise = getCategoriesByTypeFromDb('expense')

    return (
        <Suspense fallback={<main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>}>
            <BudgetsClient budgetsPromise={budgetsPromise} categoriesPromise={categoriesPromise} />
        </Suspense>
    )
}
