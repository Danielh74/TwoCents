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
        <nav className="flex w-14 md:w-36 lg:w-48 h-[calc(100vh-2rem)] mt-4 mb-4 ms-4 pt-8 bg-white/40 backdrop-blur-md rounded-2xl shadow-md dark:shadow-gray-600 fixed dark:bg-gray-700 dark:shadow-md black/30">
            <div className="flex flex-col gap-8 w-full items-center md:items-start md:ps-5 lg:ps-8 font-semibold">
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
