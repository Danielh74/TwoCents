import SummaryCard from "../components/SummaryCard"


export default function Home() {
  return (
    <main className={`flex h-full flex-col gap-3`}>
      <article className={`flex flex-1 justify-center`}>
        <SummaryCard title="Income & Expenses" />
      </article>
      <article className={`flex flex-1 gap-3 justify-around`}>
        <SummaryCard title="Budgets" />
        <SummaryCard title="Transactions" />
        <SummaryCard title="Settings" />
      </article>
    </main>
  )

}
