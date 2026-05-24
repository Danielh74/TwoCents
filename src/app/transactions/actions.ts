'use server'

import { revalidatePath } from "next/cache";
import { createTransactionInDb, deleteTransactionFromDb, updateTransactionInDb } from "@/lib/db/transactions";
import type { CreateTransactionInput, Transaction } from "@/types/transaction";

function revalidateAll() {
    ['/transactions', '/income', '/expenses', '/dashboard'].forEach(path => revalidatePath(path))
}

export async function createTransactionData(data: CreateTransactionInput) {
    const transaction = await createTransactionInDb(data);
    revalidateAll();
    return transaction as Transaction;
}

export async function deleteTransactionAction(id: string) {
    await deleteTransactionFromDb(id);
    revalidateAll();
}

export async function updateTransactionAction(
    id: string,
    data: Partial<CreateTransactionInput>
) {
    const transaction = await updateTransactionInDb(id, data);
    revalidateAll();
    return transaction as Transaction;
}
