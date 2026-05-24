import dbConnect from '@/lib/mongodb'
import CategoryModel from '@/models/Category'
import type { CreateCategoryInput, CategoryType } from '@/types/category'

export async function getCategoriesFromDb() {
    await dbConnect()
    const categories = await CategoryModel.find({}).sort({ name: 1 })
    return JSON.parse(JSON.stringify(categories))
}

export async function getCategoriesByTypeFromDb(type: CategoryType) {
    await dbConnect()
    const categories = await CategoryModel.find({ type }).sort({ name: 1 })
    return JSON.parse(JSON.stringify(categories))
}

export async function createCategoryInDb(data: CreateCategoryInput) {
    await dbConnect()
    const category = await CategoryModel.create(data)
    return JSON.parse(JSON.stringify(category))
}
