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
          <div className={`w-full`}>
            <div className="text-sm mb-4">Income: ${incomeAmount} | Expenses: ${expensesAmount}</div>
            <RadialChart data={chartData} />
          </div>
        </SummaryCard>
      </article>
      <article className={`flex flex-1 gap-3 justify-around`}>
        <SummaryCard title="Budgets"></SummaryCard>
        <SummaryCard title="Transactions" ></SummaryCard>
        <SummaryCard title="Settings"></SummaryCard>
      </article>
    </main>
  )

}
