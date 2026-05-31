'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BudgetIcon, DashboardIcon, ExpenseIcon, IncomeIcon, SettingsIcon, TransactionIcon } from './Icons'
import { useTranslations } from '@/lib/translations'

function Sidebar() {
    const pathName = usePathname()
    const t = useTranslations()

    const NAV_ITEMS = [
        { href: '/dashboard', label: t.nav.dashboard, Icon: DashboardIcon },
        { href: '/income', label: t.nav.income, Icon: IncomeIcon },
        { href: '/expenses', label: t.nav.expenses, Icon: ExpenseIcon },
        { href: '/transactions', label: t.nav.transactions, Icon: TransactionIcon },
        { href: '/budgets', label: t.nav.budgets, Icon: BudgetIcon },
        { href: '/settings', label: t.nav.settings, Icon: SettingsIcon },
    ]

    return (
        <>
            {/* Desktop sidebar */}
            <nav className="hidden md:flex w-36 lg:w-48 h-[calc(100vh-2rem)] mt-4 mb-4 ms-4 pt-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-md dark:shadow-gray-600 fixed dark:bg-gray-700 dark:shadow-md black/30">
                <div className="flex flex-col gap-8 w-full items-start ps-5 lg:ps-8 font-semibold">
                    {NAV_ITEMS.map(({ href, label, Icon }) => (
                        <Link key={href} className={`flex items-center gap-2 ${pathName === href ? 'text-blue-500' : ''}`} href={href}>
                            <span className="lg:block hidden"><Icon /></span>
                            <span className="text-sm lg:text-base">{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>

            {/* Mobile bottom nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-800 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-lg">
                <div className="flex justify-around items-center py-2">
                    {NAV_ITEMS.map(({ href, label, Icon }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex flex-col items-center gap-0.5 px-1 py-1 rounded-lg transition-colors ${pathName === href ? 'text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}
                        >
                            <Icon />
                            <span className="text-[10px] font-medium leading-tight truncate max-w-[52px] text-center">{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </>
    )
}

export default Sidebar
