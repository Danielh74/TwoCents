import { budgets, expenses, incomes } from "./lib/data"
import SummaryCard from "../components/SummaryCard"
import RadialChart from "../components/RadialChart"
import { Transaction } from "./lib/definitions";

export default function Dashboard() {
  const data: Transaction[] = [...incomes, ...expenses];

  const { incomeAmount, expensesAmount } = data.reduce(
    (acc, current) => {
      if (current.type === 'expense') acc.expensesAmount += Number(current.amount);
      if (current.type === 'income') acc.incomeAmount += Number(current.amount);
      return acc;
    }, { incomeAmount: 0, expensesAmount: 0 })

  const chartData = [
    { name: 'Income', value: incomeAmount },
    { name: 'Expenses', value: expensesAmount }
  ];

  const expensesSumByCategory = budgets.map(budget => {
    const totalExpense = expenses.filter(expense =>
      expense.category === budget.category
    ).reduce((sum, expense) => sum + expense.amount
      , 0);

    return {
      category: budget.category,
      budget: budget.value,
      expense: totalExpense,
      remaining: budget.value - totalExpense
    }
  });

  return (
    <main className={`flex h-full flex-col gap-3`}>
      <article className={`flex flex-1 justify-center`}>
        <SummaryCard title="Income & Expenses">
          <div className={`flex flex-1 justify-center w-full`}>
            <div className="text-sm mb-4">
              <h1 className="text-xl text-blue-500">Income</h1>
              {data.map(income => { return income.type === 'income' && <p key={income.id}>{income.title} - {income.amount}</p> })}
            </div>
            <RadialChart data={chartData} />
            <div className="text-sm mb-4">
              <h1 className="text-xl text-red-500">Expenses</h1>
              {data.map(expense => { return expense.type === 'expense' && <p key={expense.id}>{expense.title} - {expense.amount}</p> })}
            </div>
          </div>
        </SummaryCard>
      </article>
      <article className={`flex flex-1 gap-3 justify-around`}>
        <SummaryCard title="Budgets">
          <div className="space-y-4 w-full">
            {expensesSumByCategory.map(budget =>
              <div key={budget.category} className="space-y-1">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">{budget.category}</span>
                  <span className="text-xs text-gray-400">${budget.expense} / ${budget.budget}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min((budget.expense / budget.budget) * 100, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400">Remaining: ${budget.remaining}</div>
              </div>
            )}
          </div>
        </SummaryCard>
        <SummaryCard title="Transactions" >
          <div></div>
        </SummaryCard>
        <SummaryCard title="Settings">
          <div></div>
        </SummaryCard>
      </article>
    </main>
  )

}
