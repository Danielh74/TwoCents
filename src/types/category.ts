export type CategoryType = 'income' | 'expense'

export type Category = {
    _id: string
    name: string
    type: CategoryType
}

export type CreateCategoryInput = {
    name: string
    type: CategoryType
}
