export type TransactionType = "income" | "expense";

export type Transaction = {
    _id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    notes?: string;
    type: TransactionType;
};

export type TransactionFormType = {
    title: string;
    amount: number;
    category: string;
    date: string;
    notes?: string;
    type: TransactionType;
};