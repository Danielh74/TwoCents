'use server'

import { revalidatePath } from "next/cache";
import { createTransactionInDb, deleteTransactionFromDb, updateTransactionInDb } from "@/lib/db/transactions";
import type { Transaction, TransactionFormType } from "@/types/transaction";

function revalidateAll() {
    ['/transactions', '/income', '/expenses', '/dashboard'].forEach(path => revalidatePath(path))
}

export async function createTransactionData(transactionData: TransactionFormType) {
    const transaction = await createTransactionInDb(transactionData);
    revalidateAll();
    return transaction as Transaction;
}

export async function deleteTransactionAction(id: string) {
    await deleteTransactionFromDb(id);
    revalidateAll();
}

export async function updateTransactionAction(
    id: string,
    transactionData: TransactionFormType
) {
    const transaction = await updateTransactionInDb(id, transactionData);
    revalidateAll();
    return transaction as Transaction;
}
