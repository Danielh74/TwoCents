import mongoose, { Schema, models, model } from 'mongoose'
import type { Category } from '@/types/category'

const CategorySchema = new Schema<Category>({
    name: {
        type: String,
        required: [true, 'Please provide a category name'],
        unique: true,
        trim: true,
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: [true, 'Please provide the category type'],
    },
}, { timestamps: true })

const Category = models.Category || model<Category>('Category', CategorySchema)

export default Category
