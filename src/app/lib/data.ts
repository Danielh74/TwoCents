import { Transaction } from "./definitions";

export const incomes: Transaction[] = [
    { id: 1, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2025-05-01", notes: "Full time job", type: 'income' },
    { id: 2, title: "Freelance Project", amount: 1500, category: "Freelance", date: "2025-05-05", notes: "Logo design for client", type: 'income' },
    { id: 3, title: "Stock Dividends", amount: 320, category: "Investment", date: "2025-05-10", notes: "Q1 dividends", type: 'income' },
    { id: 4, title: "Side Business", amount: 600, category: "Business", date: "2025-05-12", notes: "Online store sales", type: 'income' },
    { id: 5, title: "Rental Income", amount: 1200, category: "Rent", date: "2025-05-15", notes: "Apartment sublease", type: 'income' },
];

export const expenses: Transaction[] = [
    { id: 1, title: "Rent", amount: 2500, category: "Housing", date: "2025-05-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 2, title: "Groceries", amount: 320, category: "Food", date: "2025-05-03", notes: "Supermarket weekly shop", type: 'expense' },
    { id: 3, title: "Netflix", amount: 18, category: "Subscriptions", date: "2025-05-04", notes: "", type: 'expense' },
    { id: 4, title: "Electricity Bill", amount: 95, category: "Utilities", date: "2025-05-05", notes: "", type: 'expense' },
    { id: 5, title: "Gym Membership", amount: 50, category: "Health", date: "2025-05-06", notes: "", type: 'expense' },
    { id: 6, title: "Spotify", amount: 10, category: "Subscriptions", date: "2025-05-06", notes: "", type: 'expense' },
    { id: 7, title: "Dinner Out", amount: 85, category: "Food", date: "2025-05-08", notes: "Restaurant with friends", type: 'expense' },
    { id: 8, title: "Internet Bill", amount: 60, category: "Utilities", date: "2025-05-09", notes: "", type: 'expense' },
    { id: 9, title: "New Shoes", amount: 140, category: "Shopping", date: "2025-05-11", notes: "Running shoes", type: 'expense' },
    { id: 10, title: "Car Insurance", amount: 210, category: "Transport", date: "2025-05-13", notes: "Monthly premium", type: 'expense' },
];