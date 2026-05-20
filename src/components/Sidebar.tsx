import Link from 'next/link'
import { BudgetIcon, DashboardIcon, ExpenseIcon, IncomeIcon, SettingsIcon, TransactionIcon } from './Icons'

function Sidebar() {
    return (
        <nav className={`flex w-1/6 h-[calc(100vh-2rem)] mt-4 mb-4 ml-4 pt-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-md dark:shadow-gray-600 fixed dark:bg-gray-700 dark:shadow-md black/30`}>
            <div className={`flex flex-col gap-8 ml-8 w-full items-start font-semibold text-lg`}>
                <Link className='flex gap-2' href='/'><DashboardIcon /> Dashboard</Link>
                <Link className='flex gap-2' href='/income'><IncomeIcon /> Income</Link>
                <Link className='flex gap-2' href='/expenses'><ExpenseIcon /> Expenses</Link>
                <Link className='flex gap-2' href='/transactions'><TransactionIcon /> Transactions</Link>
                <Link className='flex gap-2' href='/budgets'><BudgetIcon /> Budgets</Link>
                <Link className='flex gap-2' href='/settings'><SettingsIcon /> Settings</Link>
            </div>
        </nav>
    )
}

export default Sidebar