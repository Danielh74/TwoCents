import Link from 'next/link'
import React from 'react'

function Sidebar() {
    return (
        <nav className={`flex w-1/6 h-[calc(100vh - 2rem)] mt-4 mb-4 ml-4 bg-white/10 backdrop-blur-lg rounded-xl pt-8`}>
            <div className={`flex flex-col gap-8 ml-8 w-full items-start font-semibold text-lg`}>
                <Link href='/'>Dashboard</Link>
                <Link href='/income'>Income</Link>
                <Link href='/expenses'>Expenses</Link>
                <Link href='/transactions'>Transactions</Link>
                <Link href='/budgets'>Budgets</Link>
                <Link href='/settings'>Setting</Link>
            </div>
        </nav>
    )
}

export default Sidebar