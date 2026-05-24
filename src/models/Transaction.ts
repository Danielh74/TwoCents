import mongoose, { Schema, models, model } from "mongoose";

export interface Transactions extends mongoose.Document {
    id: number;
    title: string;
    amount: number;
    category: string;
    date: Date;
    notes: string;
    type: "income" | "expense";
}

const TransactionSchema = new Schema<Transactions>({
    title: {
        type: String,
        required: [true, "Please provide a title for the transaction"],
        trim: true
    },
    amount: {
        type: Number,
        required: [true, "Please provide a transaction amount"]
    },
    category: {
        type: String,
        required: [true, "Please provide a category for the transaction"]
    },
    date: {
        type: Date,
        required: [true, "Please provide the date of the transaction"]
    },
    notes: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: ["income", "expense"],
        required: [true, "Please provide the type of the transaction"]
    }
}, { timestamps: true });

const Transaction = models.Transaction || model<Transactions>("Transaction", TransactionSchema);

export default Transaction;