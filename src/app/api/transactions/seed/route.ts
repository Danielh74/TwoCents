import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import CategoryModel from "@/models/Category";
import BudgetModel from "@/models/Budget";
import { seedTransactions, seedCategories, seedBudgets } from "@/lib/seed-data";

export async function POST() {
    try {
        await dbConnect();

        await Promise.all([
            Transaction.deleteMany({}),
            CategoryModel.deleteMany({}),
            BudgetModel.deleteMany({}),
        ]);

        const [transactions, categories, budgets] = await Promise.all([
            Transaction.insertMany(seedTransactions),
            CategoryModel.insertMany(seedCategories),
            BudgetModel.insertMany(seedBudgets),
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Database seeded successfully",
                count: {
                    transactions: transactions.length,
                    categories: categories.length,
                    budgets: budgets.length,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Failed to seed database",
            },
            { status: 500 }
        );
    }
}
