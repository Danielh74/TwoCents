'use server'

import { revalidatePath } from 'next/cache'
import { createBudgetInDb, updateBudgetInDb, deleteBudgetFromDb } from '@/lib/db/budgets'
import type { CreateBudgetInput } from '@/types/budget'

function revalidateAll() {
    ['/budgets', '/dashboard'].forEach(path => revalidatePath(path))
}

export async function createBudgetAction(data: CreateBudgetInput) {
    const budget = await createBudgetInDb(data)
    revalidateAll()
    return budget
}

export async function updateBudgetAction(id: string, data: Partial<CreateBudgetInput>) {
    const budget = await updateBudgetInDb(id, data)
    revalidateAll()
    return budget
}

export async function deleteBudgetAction(id: string) {
    await deleteBudgetFromDb(id)
    revalidateAll()
}
