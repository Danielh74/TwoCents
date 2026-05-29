'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BudgetIcon, DashboardIcon, ExpenseIcon, IncomeIcon, SettingsIcon, TransactionIcon } from './Icons'

const NAV_ITEMS = [
    { href: '/dashboard', label: 'Dashboard', Icon: DashboardIcon },
    { href: '/income', label: 'Income', Icon: IncomeIcon },
    { href: '/expenses', label: 'Expenses', Icon: ExpenseIcon },
    { href: '/transactions', label: 'Transactions', Icon: TransactionIcon },
    { href: '/budgets', label: 'Budgets', Icon: BudgetIcon },
    { href: '/settings', label: 'Settings', Icon: SettingsIcon },
];

function Sidebar() {
    const pathName = usePathname();
    return (
        <nav className="flex w-14 md:w-36 lg:w-48 h-[calc(100vh-2rem)] mt-4 mb-4 ml-4 pt-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-md dark:shadow-gray-600 fixed dark:bg-gray-700 dark:shadow-md black/30">
            <div className="flex flex-col gap-8 w-full items-center md:items-start md:pl-5 lg:pl-8 font-semibold">
                {NAV_ITEMS.map(({ href, label, Icon }) => (
                    <Link key={href} className={`flex items-center gap-2 ${pathName === href && 'text-blue-500'}`} href={href}>
                        <span className="md:hidden lg:block"><Icon /></span>
                        <span className="hidden md:block md:text-sm lg:text-base">{label}</span>
                    </Link>
                ))}
            </div>
        </nav>
    )
}

export default Sidebar
