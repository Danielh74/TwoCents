'use client';

import Card from '@/components/Card';
import { Transaction } from '@/types/transaction';
import { deleteTransactionAction } from './actions';
import { use, useMemo, useState, useTransition } from 'react'
import { useSettings, formatDate } from '@/lib/settings-context'
import { useTranslations } from '@/lib/translations'

type Props = {
    transactionsPromise: Promise<Transaction[]>
}

function TransactionsList({ transactionsPromise }: Props) {
    const transactions = use(transactionsPromise);

    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

    const { currency, showCents, dateFormat, language } = useSettings();
    const t = useTranslations();
    const cDec = showCents ? 2 : 0;

    const [expenseList, incomeList] = useMemo(() => [
        transactions.filter((tx) => tx.type === 'expense'),
        transactions.filter((tx) => tx.type === 'income'),
    ], [transactions])

    const filteredTransactions = useMemo(() => {
        const filter = (list: Transaction[]) =>
            list.filter((tx) => {
                const [year, month] = tx.date.split('-').map(Number)
                return year === currentYear && month === currentMonth + 1
            })
        return { incomes: filter(incomeList), expenses: filter(expenseList) }
    }, [expenseList, incomeList, currentMonth, currentYear])

    const totalExpenses = useMemo(
        () => filteredTransactions.expenses.reduce((sum, tx) => sum + tx.amount, 0),
        [filteredTransactions]
    )

    const totalIncomes = useMemo(
        () => filteredTransactions.incomes.reduce((sum, tx) => sum + tx.amount, 0),
        [filteredTransactions]
    )

    const handlePreviousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    const renderTransaction = (tx: Transaction) => (
        <div
            key={tx._id}
            className="flex justify-between items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
        >
            <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white group-hover:text-black">{tx.title}</p>
                <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{tx.category}</span>
                    <span>{formatDate(tx.date, dateFormat)}</span>
                </div>
                {tx.notes && <p className="text-xs text-gray-400 mt-2 italic">{tx.notes}</p>}
            </div>
            <div className="flex gap-2 ms-4 items-center">
                <span className={`text-lg font-bold min-w-fit ${tx.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                    {tx.type === 'income' ? '+' : '-'}{currency}{tx.amount.toFixed(cDec)}
                </span>
            </div>
        </div>
    )

    return (
        <main className="flex md:h-[calc(100vh-2rem)] flex-col gap-3 p-4 md:min-h-0">
            <div className="flex flex-wrap justify-between items-center mb-2 gap-3">
                <h1 className="text-3xl font-bold">{t.transactions.title}</h1>
                <section className="flex items-center gap-2">
                    <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '←' : '→'}</button>
                    <h2 className="text-lg font-semibold min-w-fit">{t.months[currentMonth]} {currentYear}</h2>
                    <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">{language === 'en' ? '→' : '←'}</button>
                </section>
                <div className="flex text-center gap-4 border border-gray-300 dark:border-gray-600 px-4 py-1 rounded-lg">
                    <div>
                        <p className="text-xs text-gray-500">{t.transactions.income}</p>
                        <p className="text-xl font-bold text-green-500">{currency}{totalIncomes.toFixed(cDec)}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500">{t.transactions.expenses}</p>
                        <p className="text-xl font-bold text-red-500">{currency}{totalExpenses.toFixed(cDec)}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:h-full overflow-auto lg:overflow-hidden">
                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title={t.transactions.incomes} fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
                            {filteredTransactions.incomes.length > 0
                                ? [...filteredTransactions.incomes]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(renderTransaction)
                                : <p className="text-gray-400 text-center text-sm py-8">{t.transactions.noIncomeFor(t.months[currentMonth], currentYear)}</p>
                            }
                        </div>
                    </Card>
                </div>

                <div className="flex-1 min-w-0 lg:min-h-0">
                    <Card title={t.transactions.expenses} fill>
                        <div className="space-y-3 w-full overflow-y-auto max-h-96 lg:max-h-full scrollbar-custom pr-2">
                            {filteredTransactions.expenses.length > 0
                                ? [...filteredTransactions.expenses]
                                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                                    .map(renderTransaction)
                                : <p className="text-gray-400 text-center text-sm py-8">{t.transactions.noExpensesFor(t.months[currentMonth], currentYear)}</p>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </main>
    )
}

export default TransactionsList
