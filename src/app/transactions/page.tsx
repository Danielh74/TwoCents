import { Suspense } from 'react'
import { getTransactionsFromDb } from '@/lib/db/transactions'
import TransactionsClient from './TransactionsClient'

export default function Transactions() {
    const transactionsPromise = getTransactionsFromDb()

    return (
        <Suspense fallback={<p>Loading transactions...</p>}>
            <TransactionsClient transactionsPromise={transactionsPromise} />
        </Suspense>
    )
}
