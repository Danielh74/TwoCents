'use client'

import { useState, useMemo } from 'react'
import { budgets, transactions } from "./lib/data"
import SummaryCard from "../components/SummaryCard"
import RadialChart from "../components/RadialChart"
import ProgressBar from '../components/ProgressBar'
import TransactionInfo from '../components/TransactionInfo'
import { MONTHS } from './lib/utils'

export default function Dashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // May (0-indexed)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const filteredData = useMemo(() => {
    return transactions.filter(transaction => {
      const [year, month] = transaction.date.split('-').map(Number);
      return year === currentYear && month === currentMonth + 1;
    });
  }, [currentMonth, currentYear]);

  const { incomeAmount, expensesAmount } = useMemo(() => {
    return filteredData.reduce(
      (acc, current) => {
        if (current.type === 'expense') acc.expensesAmount += Number(current.amount);
        if (current.type === 'income') acc.incomeAmount += Number(current.amount);
        return acc;
      }, { incomeAmount: 0, expensesAmount: 0 })
  }, [filteredData]);

  const chartData = [
    { name: 'Income', value: incomeAmount },
    { name: 'Expenses', value: expensesAmount }
  ];

  const monthlyExpenses = useMemo(() => {
    return budgets.map(budget => {
      const totalExpense = transactions.filter(transaction => {
        const [year, month] = transaction.date.split('-').map(Number);
        return transaction.type === 'expense' && transaction.category === budget.category && year === currentYear && month === currentMonth + 1;
      }).reduce((sum, transaction) => sum + transaction.amount, 0);

      return {
        category: budget.category,
        budget: budget.value,
        expense: totalExpense,
        remaining: budget.value - totalExpense
      }
    });
  }, [currentMonth, currentYear]);

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <main className={`flex h-[calc(100vh-2rem)] flex-col gap-3`}>
      <article className={`flex-6 flex justify-center overflow-hidden`}>
        <SummaryCard title="Overview">
          <div className={`flex flex-col w-full h-full`}>
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-gray-200">
              <button onClick={handlePreviousMonth} className="px-2 py-1 rounded hover:bg-gray-200">←</button>
              <h2 className="text-lg font-semibold">{MONTHS[currentMonth]} {currentYear}</h2>
              <button onClick={handleNextMonth} className="px-2 py-1 rounded hover:bg-gray-200">→</button>
            </div>
            <div className={`flex flex-1 justify-center w-full overflow-y-auto scrollbar-custom pr-2`}>
              <div className="text-sm mb-4">
                <h1 className="text-xl text-blue-500">Income</h1>
                {filteredData.map(income => { return income.type === 'income' && <p key={income.id}>{income.title} - ${income.amount}</p> })}
              </div>
              <RadialChart data={chartData} />
              <div className="text-sm mb-4">
                <h1 className="text-xl text-red-500">Expenses</h1>
                {filteredData.map(expense => { return expense.type === 'expense' && <p key={expense.id}>{expense.title} - ${expense.amount}</p> })}
              </div>
            </div>
          </div>
        </SummaryCard>
      </article>
      <article className={`flex-4 flex gap-3 justify-around overflow-hidden`}>
        <SummaryCard title="Budgets">
          <div className="space-y-4 w-full overflow-y-auto max-h-full scrollbar-custom pr-2">
            {monthlyExpenses.map(budget =>
              <ProgressBar
                key={budget.category}
                budget={budget.budget}
                category={budget.category}
                expense={budget.expense}
                remaining={budget.remaining}
              />
            )}
          </div>
        </SummaryCard>
        <SummaryCard title="Transactions" >
          <div className="space-y-3 w-full max-h-full overflow-y-auto scrollbar-custom pr-2">
            {filteredData.length > 0 ? (
              [...filteredData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(transaction =>
                <TransactionInfo
                  key={transaction.id}
                  amount={transaction.amount}
                  date={transaction.date}
                  title={transaction.title}
                  type={transaction.type} />
              )
            ) : (
              <p className="text-gray-400 text-center text-sm">No transactions this month</p>
            )}
          </div>
        </SummaryCard>
        <SummaryCard title="Settings">
          <div className="flex flex-col justify-around space-y-3 w-full text-sm overflow-y-auto h-full scrollbar-custom pr-2">
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-600">Currency</span>
              <span className="font-medium">USD</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-600">Theme</span>
              <span className="font-medium">Light</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
              <span className="text-gray-600">Notifications</span>
              <span className="font-medium text-green-500">Enabled</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Export Data</span>
              <span className="text-blue-500 cursor-pointer hover:underline">Download</span>
            </div>
          </div>
        </SummaryCard>
      </article>
    </main>
  )
}
