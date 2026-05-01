import { expenses, incomes } from "./lib/data"
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

  return (
    <main className={`flex h-full flex-col gap-3`}>
      <article className={`flex flex-1 justify-center`}>
        <SummaryCard title="Income & Expenses">
          <div className={`flex flex-1 justify-center w-full`}>
            <div className="text-sm mb-4">
              <h1 className="text-xl text-blue-500">Income</h1>
              {data.map(income => { return income.type === 'income' && <p>{income.title} - {income.amount}</p> })}
            </div>
            <RadialChart data={chartData} />
            <div className="text-sm mb-4">
              <h1 className="text-xl text-red-500">Expenses</h1>
              {data.map(expense => { return expense.type === 'expense' && <p>{expense.title} - {expense.amount}</p> })}
            </div>
          </div>
        </SummaryCard>
      </article>
      <article className={`flex flex-1 gap-3 justify-around`}>
        <SummaryCard title="Budgets">
          <div></div>
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
