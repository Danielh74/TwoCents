import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import type { CreateTransactionInput } from "@/types/transaction";

export async function getTransactionsFromDb() {
    await dbConnect();

    const transactions = await Transaction.find({}).sort({ date: -1 });

    return JSON.parse(JSON.stringify(transactions));
}

export async function createTransactionInDb(data: CreateTransactionInput) {
    await dbConnect();

    const transaction = await Transaction.create(data);

    return JSON.parse(JSON.stringify(transaction));
}

export async function updateTransactionInDb(
    id: string,
    data: Partial<CreateTransactionInput>
) {
    await dbConnect();

    const transaction = await Transaction.findByIdAndUpdate(id, data, {
        returnDocument: "after",
        runValidators: true,
    });

    return JSON.parse(JSON.stringify(transaction));
}

export async function deleteTransactionFromDb(id: string) {
    await dbConnect();

    const transaction = await Transaction.findByIdAndDelete(id);

    return JSON.parse(JSON.stringify(transaction));
}