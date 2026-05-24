import type { CreateTransactionInput } from '@/types/transaction'
import type { CreateCategoryInput } from '@/types/category'
import type { CreateBudgetInput } from '@/types/budget'

export const seedCategories: CreateCategoryInput[] = [
    { name: 'Salary', type: 'income' },
    { name: 'Freelance', type: 'income' },
    { name: 'Rent', type: 'income' },
    { name: 'Investment', type: 'income' },
    { name: 'Business', type: 'income' },
    { name: 'Other', type: 'income' },
    { name: 'Housing', type: 'expense' },
    { name: 'Food', type: 'expense' },
    { name: 'Utilities', type: 'expense' },
    { name: 'Transport', type: 'expense' },
    { name: 'Health', type: 'expense' },
    { name: 'Shopping', type: 'expense' },
    { name: 'Entertainment', type: 'expense' },
    { name: 'Subscriptions', type: 'expense' },
]

export const seedBudgets: CreateBudgetInput[] = [
    { category: 'Housing', value: 2000 },
    { category: 'Food', value: 500 },
    { category: 'Utilities', value: 200 },
    { category: 'Transport', value: 300 },
    { category: 'Health', value: 100 },
    { category: 'Shopping', value: 200 },
    { category: 'Entertainment', value: 150 },
    { category: 'Subscriptions', value: 50 },
]

export const seedTransactions: CreateTransactionInput[] = [
    // ── January ──────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-01-01', notes: 'January paycheck' },
    { title: 'Freelance Project', type: 'income', amount: 850, category: 'Freelance', date: '2026-01-14' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-01-02', notes: 'January rent' },
    { title: 'Electricity & Gas', type: 'expense', amount: 145, category: 'Utilities', date: '2026-01-05' },
    { title: 'Groceries', type: 'expense', amount: 390, category: 'Food', date: '2026-01-10' },
    { title: 'Bus Pass', type: 'expense', amount: 95, category: 'Transport', date: '2026-01-03' },
    { title: 'Netflix & Spotify', type: 'expense', amount: 28, category: 'Subscriptions', date: '2026-01-08' },
    { title: 'Gym Membership', type: 'expense', amount: 45, category: 'Health', date: '2026-01-06' },

    // ── February ─────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-02-01', notes: 'February paycheck' },
    { title: 'Stock Dividend', type: 'income', amount: 210, category: 'Investment', date: '2026-02-18' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-02-02', notes: 'February rent' },
    { title: 'Internet Bill', type: 'expense', amount: 60, category: 'Utilities', date: '2026-02-07' },
    { title: 'Groceries', type: 'expense', amount: 420, category: 'Food', date: '2026-02-12' },
    { title: 'Uber Rides', type: 'expense', amount: 78, category: 'Transport', date: '2026-02-20' },
    { title: 'Valentine\'s Dinner', type: 'expense', amount: 120, category: 'Entertainment', date: '2026-02-14' },
    { title: 'Pharmacy', type: 'expense', amount: 35, category: 'Health', date: '2026-02-09' },

    // ── March ────────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-03-01', notes: 'March paycheck' },
    { title: 'Freelance Project', type: 'income', amount: 1200, category: 'Freelance', date: '2026-03-22', notes: 'Website redesign' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-03-02', notes: 'March rent' },
    { title: 'Electricity & Gas', type: 'expense', amount: 130, category: 'Utilities', date: '2026-03-06' },
    { title: 'Groceries', type: 'expense', amount: 460, category: 'Food', date: '2026-03-11' },
    { title: 'Gas Station', type: 'expense', amount: 65, category: 'Transport', date: '2026-03-15' },
    { title: 'Spring Clothing', type: 'expense', amount: 185, category: 'Shopping', date: '2026-03-19' },
    { title: 'Dentist Visit', type: 'expense', amount: 90, category: 'Health', date: '2026-03-25' },

    // ── April ─────────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-04-01', notes: 'April paycheck' },
    { title: 'Rental Income', type: 'income', amount: 600, category: 'Rent', date: '2026-04-05', notes: 'Parking spot sublease' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-04-02', notes: 'April rent' },
    { title: 'Water Bill', type: 'expense', amount: 48, category: 'Utilities', date: '2026-04-08' },
    { title: 'Groceries', type: 'expense', amount: 405, category: 'Food', date: '2026-04-13' },
    { title: 'Bus Pass', type: 'expense', amount: 95, category: 'Transport', date: '2026-04-03' },
    { title: 'Concert Tickets', type: 'expense', amount: 150, category: 'Entertainment', date: '2026-04-17' },
    { title: 'Netflix & Spotify', type: 'expense', amount: 28, category: 'Subscriptions', date: '2026-04-08' },

    // ── May ───────────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-05-01', notes: 'May paycheck' },
    { title: 'Freelance Project', type: 'income', amount: 950, category: 'Freelance', date: '2026-05-10', notes: 'Dashboard UI contract' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-05-02', notes: 'May rent' },
    { title: 'Electricity & Gas', type: 'expense', amount: 118, category: 'Utilities', date: '2026-05-07' },
    { title: 'Groceries', type: 'expense', amount: 435, category: 'Food', date: '2026-05-09' },
    { title: 'Gas Station', type: 'expense', amount: 72, category: 'Transport', date: '2026-05-14' },
    { title: 'Shoes', type: 'expense', amount: 110, category: 'Shopping', date: '2026-05-18' },
    { title: 'Gym Membership', type: 'expense', amount: 45, category: 'Health', date: '2026-05-06' },

    // ── June ──────────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-06-01', notes: 'June paycheck' },
    { title: 'Stock Dividend', type: 'income', amount: 315, category: 'Investment', date: '2026-06-16' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-06-02', notes: 'June rent' },
    { title: 'Internet Bill', type: 'expense', amount: 60, category: 'Utilities', date: '2026-06-07' },
    { title: 'Groceries', type: 'expense', amount: 450, category: 'Food', date: '2026-06-11' },
    { title: 'Uber Rides', type: 'expense', amount: 88, category: 'Transport', date: '2026-06-19' },
    { title: 'Summer Festival', type: 'expense', amount: 200, category: 'Entertainment', date: '2026-06-21' },
    { title: 'Netflix & Spotify', type: 'expense', amount: 28, category: 'Subscriptions', date: '2026-06-08' },

    // ── July ──────────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-07-01', notes: 'July paycheck' },
    { title: 'Freelance Project', type: 'income', amount: 700, category: 'Freelance', date: '2026-07-20' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-07-02', notes: 'July rent' },
    { title: 'Electricity & Gas', type: 'expense', amount: 165, category: 'Utilities', date: '2026-07-05', notes: 'AC running all month' },
    { title: 'Groceries', type: 'expense', amount: 470, category: 'Food', date: '2026-07-10' },
    { title: 'Bus Pass', type: 'expense', amount: 95, category: 'Transport', date: '2026-07-03' },
    { title: 'Summer Clothing', type: 'expense', amount: 230, category: 'Shopping', date: '2026-07-12' },
    { title: 'Gym Membership', type: 'expense', amount: 45, category: 'Health', date: '2026-07-06' },

    // ── August ────────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-08-01', notes: 'August paycheck' },
    { title: 'Rental Income', type: 'income', amount: 600, category: 'Rent', date: '2026-08-05' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-08-02', notes: 'August rent' },
    { title: 'Water Bill', type: 'expense', amount: 52, category: 'Utilities', date: '2026-08-08' },
    { title: 'Groceries', type: 'expense', amount: 490, category: 'Food', date: '2026-08-14' },
    { title: 'Gas Station', type: 'expense', amount: 80, category: 'Transport', date: '2026-08-17' },
    { title: 'Movie Night', type: 'expense', amount: 55, category: 'Entertainment', date: '2026-08-22' },
    { title: 'Netflix & Spotify', type: 'expense', amount: 28, category: 'Subscriptions', date: '2026-08-08' },

    // ── September ─────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-09-01', notes: 'September paycheck' },
    { title: 'Stock Dividend', type: 'income', amount: 280, category: 'Investment', date: '2026-09-15' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-09-02', notes: 'September rent' },
    { title: 'Electricity & Gas', type: 'expense', amount: 140, category: 'Utilities', date: '2026-09-06' },
    { title: 'Groceries', type: 'expense', amount: 415, category: 'Food', date: '2026-09-11' },
    { title: 'Bus Pass', type: 'expense', amount: 95, category: 'Transport', date: '2026-09-03' },
    { title: 'Back to School Gear', type: 'expense', amount: 160, category: 'Shopping', date: '2026-09-07' },
    { title: 'Gym Membership', type: 'expense', amount: 45, category: 'Health', date: '2026-09-06' },

    // ── October ───────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-10-01', notes: 'October paycheck' },
    { title: 'Freelance Project', type: 'income', amount: 1500, category: 'Freelance', date: '2026-10-18', notes: 'Mobile app contract' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-10-02', notes: 'October rent' },
    { title: 'Internet Bill', type: 'expense', amount: 60, category: 'Utilities', date: '2026-10-07' },
    { title: 'Groceries', type: 'expense', amount: 430, category: 'Food', date: '2026-10-13' },
    { title: 'Gas Station', type: 'expense', amount: 70, category: 'Transport', date: '2026-10-16' },
    { title: 'Halloween Costumes', type: 'expense', amount: 95, category: 'Shopping', date: '2026-10-25' },
    { title: 'Netflix & Spotify', type: 'expense', amount: 28, category: 'Subscriptions', date: '2026-10-08' },

    // ── November ──────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-11-01', notes: 'November paycheck' },
    { title: 'Rental Income', type: 'income', amount: 600, category: 'Rent', date: '2026-11-05' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-11-02', notes: 'November rent' },
    { title: 'Electricity & Gas', type: 'expense', amount: 155, category: 'Utilities', date: '2026-11-06', notes: 'Heating season starts' },
    { title: 'Groceries', type: 'expense', amount: 480, category: 'Food', date: '2026-11-12', notes: 'Thanksgiving groceries' },
    { title: 'Bus Pass', type: 'expense', amount: 95, category: 'Transport', date: '2026-11-03' },
    { title: 'Black Friday Shopping', type: 'expense', amount: 340, category: 'Shopping', date: '2026-11-27' },
    { title: 'Gym Membership', type: 'expense', amount: 45, category: 'Health', date: '2026-11-06' },

    // ── December ──────────────────────────────────────────────────────────────
    { title: 'Monthly Salary', type: 'income', amount: 5200, category: 'Salary', date: '2026-12-01', notes: 'December paycheck' },
    { title: 'Year-End Bonus', type: 'income', amount: 2500, category: 'Salary', date: '2026-12-20', notes: 'Annual performance bonus' },
    { title: 'Rent', type: 'expense', amount: 1800, category: 'Housing', date: '2026-12-02', notes: 'December rent' },
    { title: 'Electricity & Gas', type: 'expense', amount: 175, category: 'Utilities', date: '2026-12-05', notes: 'Holiday lights + heating' },
    { title: 'Groceries', type: 'expense', amount: 510, category: 'Food', date: '2026-12-10', notes: 'Holiday food shopping' },
    { title: 'Gas Station', type: 'expense', amount: 75, category: 'Transport', date: '2026-12-14' },
    { title: 'Christmas Gifts', type: 'expense', amount: 480, category: 'Shopping', date: '2026-12-18' },
    { title: 'Netflix & Spotify', type: 'expense', amount: 28, category: 'Subscriptions', date: '2026-12-08' },
];