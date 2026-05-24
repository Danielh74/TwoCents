export type Budget = {
    _id: string
    category: string
    value: number
}

export type CreateBudgetInput = {
    category: string
    value: number
}
