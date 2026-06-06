import dbConnect from "@/lib/mongodb";
import Transaction from "@/models/Transaction";
import { TransactionFormType } from "@/types/transaction";

export async function getTransactionsFromDb() {
    await dbConnect();

    const transactions = await Transaction.find({}).sort({ date: -1 });

    return JSON.parse(JSON.stringify(transactions));
}

export async function createTransactionInDb(transactionData: TransactionFormType) {
    await dbConnect();

    const transaction = await Transaction.create(transactionData);

    return JSON.parse(JSON.stringify(transaction));
}

export async function updateTransactionInDb(
    id: string,
    transactionData: TransactionFormType
) {
    await dbConnect();

    const transaction = await Transaction.findByIdAndUpdate(id, transactionData, {
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