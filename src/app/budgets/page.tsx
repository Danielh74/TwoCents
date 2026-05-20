import Card from '@/components/Card'
import { budgets } from '@/lib/data'

function Budgets() {
    return (
        <main className='flex flex-col w-full gap-6'>
            <section className='flex items-center justify-between'>
                <div>
                    <h1 className='text-3xl font-bold'>Budgets</h1>
                    <p className='text-sm text-gray-400 mt-1'>Manage and track your budget allocations</p>
                </div>
                <button className='cursor-pointer flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2 px-4 font-medium transition-colors duration-200'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Add Budget</span>
                </button>
            </section>
            <section className='grid grid-cols-4 gap-4 w-full'>
                {budgets.map(budget =>
                    <div key={budget.id}>
                        <Card title={budget.category}>
                            <div className='w-full text-center mt-2'>
                                <p className='text-2xl font-bold text-blue-400'>${budget.value}</p>
                                <p className='text-xs text-gray-400 mt-1'>Budget allocation</p>
                            </div>
                            <button className='text-sm mt-4 text-gray-300 cursor-pointer px-3 py-1 rounded-md hover:text-white hover:bg-white/10 transition-colors duration-200 w-full'>Edit</button>
                        </Card>
                    </div>
                )}
            </section>
        </main>
    )
}

export default Budgets