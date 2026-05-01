export type Transaction = {
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
    notes: string;
    type: "income" | "expense";
}