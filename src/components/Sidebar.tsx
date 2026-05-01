import Link from 'next/link'

function Sidebar() {
    return (
        <nav className={`flex w-1/6 h-[calc(100vh - 2rem)] mt-4 mb-4 ml-4 pt-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg`}>
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