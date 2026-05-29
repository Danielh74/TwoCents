'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BudgetIcon, DashboardIcon, ExpenseIcon, IncomeIcon, SettingsIcon, TransactionIcon } from './Icons'

const NAV_ITEMS = [
    { href: '/', label: 'Dashboard', Icon: DashboardIcon },
    { href: '/income', label: 'Income', Icon: IncomeIcon },
    { href: '/expenses', label: 'Expenses', Icon: ExpenseIcon },
    { href: '/transactions', label: 'Transactions', Icon: TransactionIcon },
    { href: '/budgets', label: 'Budgets', Icon: BudgetIcon },
    { href: '/settings', label: 'Settings', Icon: SettingsIcon },
]

export default function MobileNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex safe-bottom">
            {NAV_ITEMS.map(({ href, label, Icon }) => {
                const isActive = pathname === href
                return (
                    <Link
                        key={href}
                        href={href}
                        className={`flex flex-1 flex-col items-center justify-center py-2 gap-0.5 transition-colors
                            ${isActive
                                ? 'text-blue-500'
                                : 'text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                    >
                        <span className="[&_svg]:size-5"><Icon /></span>
                        <span className="text-[10px] font-medium">{label}</span>
                    </Link>
                )
            })}
        </nav>
    )
}
