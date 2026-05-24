import mongoose, { Schema, models, model } from 'mongoose'
import type { Budget } from '@/types/budget'

const BudgetSchema = new Schema<Budget>({
    category: {
        type: String,
        required: [true, 'Please provide a category for the budget'],
        unique: true,
    },
    value: {
        type: Number,
        required: [true, 'Please provide a budget amount'],
        min: [0, "Budget value can't be lower than 0"],
    },
}, { timestamps: true })

const Budget = models.Budget || model<Budget>('Budget', BudgetSchema)

export default Budget
