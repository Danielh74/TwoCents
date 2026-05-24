import { Suspense } from 'react'
import { getTransactionsFromDb } from '@/lib/db/transactions'
import IncomeClient from './IncomeClient'

export default function IncomePage() {
    const transactionsPromise = getTransactionsFromDb()

    return (
        <Suspense fallback={<main className="flex h-[calc(100vh-2rem)] items-center justify-center p-4">Loading...</main>}>
            <IncomeClient transactionsPromise={transactionsPromise} />
        </Suspense>
    )
}
