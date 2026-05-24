import dbConnect from '@/lib/mongodb'
import BudgetModel from '@/models/Budget'
import type { CreateBudgetInput } from '@/types/budget'

export async function getBudgetsFromDb() {
    await dbConnect()
    const budgets = await BudgetModel.find({}).sort({ category: 1 })
    return JSON.parse(JSON.stringify(budgets))
}

export async function createBudgetInDb(data: CreateBudgetInput) {
    await dbConnect()
    const budget = await BudgetModel.create(data)
    return JSON.parse(JSON.stringify(budget))
}

export async function updateBudgetInDb(id: string, data: Partial<CreateBudgetInput>) {
    await dbConnect()
    const budget = await BudgetModel.findByIdAndUpdate(id, data, { new: true, runValidators: true })
    return JSON.parse(JSON.stringify(budget))
}

export async function deleteBudgetFromDb(id: string) {
    await dbConnect()
    const budget = await BudgetModel.findByIdAndDelete(id)
    return JSON.parse(JSON.stringify(budget))
}
