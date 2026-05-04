import { Transaction } from "./definitions";

export const transactions: Transaction[] = [
    // January - Incomes
    { id: 1, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-01-01", notes: "Full time job", type: 'income' },
    { id: 2, title: "Freelance Project", amount: 1200, category: "Freelance", date: "2026-01-10", notes: "Web design", type: 'income' },
    { id: 3, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-01-15", notes: "Apartment sublease", type: 'income' },
    // January - Expenses
    { id: 101, title: "Rent", amount: 2500, category: "Housing", date: "2026-01-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 102, title: "Groceries", amount: 350, category: "Food", date: "2026-01-05", notes: "Supermarket shop", type: 'expense' },
    { id: 103, title: "Electricity Bill", amount: 105, category: "Utilities", date: "2026-01-08", notes: "Winter usage", type: 'expense' },
    { id: 104, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-01-10", notes: "", type: 'expense' },
    { id: 105, title: "Gym Membership", amount: 50, category: "Health", date: "2026-01-12", notes: "", type: 'expense' },
    { id: 106, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-01-15", notes: "Monthly premium", type: 'expense' },
    { id: 107, title: "Dinner Out", amount: 95, category: "Food", date: "2026-01-18", notes: "Restaurant", type: 'expense' },
    { id: 108, title: "Spotify", amount: 10, category: "Subscriptions", date: "2026-01-20", notes: "", type: 'expense' },

    // February - Incomes
    { id: 4, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-02-01", notes: "Full time job", type: 'income' },
    { id: 5, title: "Stock Dividends", amount: 450, category: "Investment", date: "2026-02-08", notes: "Quarterly dividends", type: 'income' },
    { id: 6, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-02-15", notes: "Apartment sublease", type: 'income' },
    // February - Expenses
    { id: 109, title: "Rent", amount: 2500, category: "Housing", date: "2026-02-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 110, title: "Groceries", amount: 320, category: "Food", date: "2026-02-03", notes: "Supermarket shop", type: 'expense' },
    { id: 111, title: "Internet Bill", amount: 60, category: "Utilities", date: "2026-02-05", notes: "", type: 'expense' },
    { id: 112, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-02-10", notes: "", type: 'expense' },
    { id: 113, title: "Gym Membership", amount: 50, category: "Health", date: "2026-02-12", notes: "", type: 'expense' },
    { id: 114, title: "New Shoes", amount: 120, category: "Shopping", date: "2026-02-14", notes: "Winter boots", type: 'expense' },
    { id: 115, title: "Movie Tickets", amount: 30, category: "Entertainment", date: "2026-02-16", notes: "", type: 'expense' },
    { id: 116, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-02-15", notes: "Monthly premium", type: 'expense' },

    // March - Incomes
    { id: 7, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-03-01", notes: "Full time job", type: 'income' },
    { id: 8, title: "Freelance Project", amount: 2000, category: "Freelance", date: "2026-03-05", notes: "Logo design for client", type: 'income' },
    { id: 9, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-03-15", notes: "Apartment sublease", type: 'income' },
    { id: 10, title: "Side Business", amount: 800, category: "Business", date: "2026-03-20", notes: "Online store sales", type: 'income' },
    // March - Expenses
    { id: 117, title: "Rent", amount: 2500, category: "Housing", date: "2026-03-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 118, title: "Groceries", amount: 380, category: "Food", date: "2026-03-02", notes: "Supermarket shop", type: 'expense' },
    { id: 119, title: "Electricity Bill", amount: 95, category: "Utilities", date: "2026-03-08", notes: "", type: 'expense' },
    { id: 120, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-03-10", notes: "", type: 'expense' },
    { id: 121, title: "Gym Membership", amount: 50, category: "Health", date: "2026-03-12", notes: "", type: 'expense' },
    { id: 122, title: "Spotify", amount: 10, category: "Subscriptions", date: "2026-03-15", notes: "", type: 'expense' },
    { id: 123, title: "Car Maintenance", amount: 200, category: "Transport", date: "2026-03-18", notes: "Oil change", type: 'expense' },
    { id: 124, title: "Dinner Out", amount: 110, category: "Food", date: "2026-03-22", notes: "Restaurant", type: 'expense' },
    { id: 125, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-03-15", notes: "Monthly premium", type: 'expense' },

    // April - Incomes
    { id: 11, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-04-01", notes: "Full time job", type: 'income' },
    { id: 12, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-04-15", notes: "Apartment sublease", type: 'income' },
    { id: 13, title: "Tax Refund", amount: 1500, category: "Investment", date: "2026-04-18", notes: "Federal tax return", type: 'income' },
    // April - Expenses
    { id: 126, title: "Rent", amount: 2500, category: "Housing", date: "2026-04-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 127, title: "Groceries", amount: 340, category: "Food", date: "2026-04-04", notes: "Supermarket shop", type: 'expense' },
    { id: 128, title: "Internet Bill", amount: 60, category: "Utilities", date: "2026-04-06", notes: "", type: 'expense' },
    { id: 129, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-04-10", notes: "", type: 'expense' },
    { id: 130, title: "Gym Membership", amount: 50, category: "Health", date: "2026-04-12", notes: "", type: 'expense' },
    { id: 131, title: "Spring Clothing", amount: 180, category: "Shopping", date: "2026-04-15", notes: "New clothes", type: 'expense' },
    { id: 132, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-04-15", notes: "Monthly premium", type: 'expense' },
    { id: 133, title: "Concert Tickets", amount: 75, category: "Entertainment", date: "2026-04-20", notes: "", type: 'expense' },

    // May - Incomes
    { id: 14, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-05-01", notes: "Full time job", type: 'income' },
    { id: 15, title: "Freelance Project", amount: 1500, category: "Freelance", date: "2026-05-05", notes: "Logo design for client", type: 'income' },
    { id: 16, title: "Stock Dividends", amount: 320, category: "Investment", date: "2026-05-10", notes: "Q1 dividends", type: 'income' },
    { id: 17, title: "Side Business", amount: 600, category: "Business", date: "2026-05-12", notes: "Online store sales", type: 'income' },
    { id: 18, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-05-15", notes: "Apartment sublease", type: 'income' },
    // May - Expenses
    { id: 134, title: "Rent", amount: 2500, category: "Housing", date: "2026-05-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 135, title: "Groceries", amount: 320, category: "Food", date: "2026-05-03", notes: "Supermarket weekly shop", type: 'expense' },
    { id: 136, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-05-04", notes: "", type: 'expense' },
    { id: 137, title: "Electricity Bill", amount: 95, category: "Utilities", date: "2026-05-05", notes: "", type: 'expense' },
    { id: 138, title: "Gym Membership", amount: 50, category: "Health", date: "2026-05-06", notes: "", type: 'expense' },
    { id: 139, title: "Spotify", amount: 10, category: "Subscriptions", date: "2026-05-06", notes: "", type: 'expense' },
    { id: 140, title: "Dinner Out", amount: 85, category: "Food", date: "2026-05-08", notes: "Restaurant with friends", type: 'expense' },
    { id: 141, title: "Internet Bill", amount: 60, category: "Utilities", date: "2026-05-09", notes: "", type: 'expense' },
    { id: 142, title: "New Shoes", amount: 140, category: "Shopping", date: "2026-05-11", notes: "Running shoes", type: 'expense' },
    { id: 143, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-05-13", notes: "Monthly premium", type: 'expense' },

    // June - Incomes
    { id: 19, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-06-01", notes: "Full time job", type: 'income' },
    { id: 20, title: "Freelance Project", amount: 1800, category: "Freelance", date: "2026-06-08", notes: "Mobile app design", type: 'income' },
    { id: 21, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-06-15", notes: "Apartment sublease", type: 'income' },
    { id: 22, title: "Bonus", amount: 2000, category: "Salary", date: "2026-06-25", notes: "Mid-year bonus", type: 'income' },
    // June - Expenses
    { id: 144, title: "Rent", amount: 2500, category: "Housing", date: "2026-06-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 145, title: "Groceries", amount: 360, category: "Food", date: "2026-06-02", notes: "Supermarket shop", type: 'expense' },
    { id: 146, title: "Electricity Bill", amount: 120, category: "Utilities", date: "2026-06-08", notes: "Summer AC usage", type: 'expense' },
    { id: 147, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-06-10", notes: "", type: 'expense' },
    { id: 148, title: "Gym Membership", amount: 50, category: "Health", date: "2026-06-12", notes: "", type: 'expense' },
    { id: 149, title: "Summer Vacation", amount: 1200, category: "Entertainment", date: "2026-06-15", notes: "Beach trip", type: 'expense' },
    { id: 150, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-06-15", notes: "Monthly premium", type: 'expense' },
    { id: 151, title: "Spotify", amount: 10, category: "Subscriptions", date: "2026-06-20", notes: "", type: 'expense' },

    // July - Incomes
    { id: 23, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-07-01", notes: "Full time job", type: 'income' },
    { id: 24, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-07-15", notes: "Apartment sublease", type: 'income' },
    { id: 25, title: "Side Business", amount: 900, category: "Business", date: "2026-07-18", notes: "Online store sales", type: 'income' },
    // July - Expenses
    { id: 152, title: "Rent", amount: 2500, category: "Housing", date: "2026-07-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 153, title: "Groceries", amount: 340, category: "Food", date: "2026-07-03", notes: "Supermarket shop", type: 'expense' },
    { id: 154, title: "Internet Bill", amount: 60, category: "Utilities", date: "2026-07-06", notes: "", type: 'expense' },
    { id: 155, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-07-10", notes: "", type: 'expense' },
    { id: 156, title: "Gym Membership", amount: 50, category: "Health", date: "2026-07-12", notes: "", type: 'expense' },
    { id: 157, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-07-15", notes: "Monthly premium", type: 'expense' },
    { id: 158, title: "Electronics", amount: 250, category: "Shopping", date: "2026-07-20", notes: "New headphones", type: 'expense' },

    // August - Incomes
    { id: 26, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-08-01", notes: "Full time job", type: 'income' },
    { id: 27, title: "Freelance Project", amount: 1600, category: "Freelance", date: "2026-08-12", notes: "Website redesign", type: 'income' },
    { id: 28, title: "Stock Dividends", amount: 380, category: "Investment", date: "2026-08-10", notes: "Q2 dividends", type: 'income' },
    { id: 29, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-08-15", notes: "Apartment sublease", type: 'income' },
    // August - Expenses
    { id: 159, title: "Rent", amount: 2500, category: "Housing", date: "2026-08-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 160, title: "Groceries", amount: 330, category: "Food", date: "2026-08-02", notes: "Supermarket shop", type: 'expense' },
    { id: 161, title: "Electricity Bill", amount: 125, category: "Utilities", date: "2026-08-08", notes: "Peak summer", type: 'expense' },
    { id: 162, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-08-10", notes: "", type: 'expense' },
    { id: 163, title: "Gym Membership", amount: 50, category: "Health", date: "2026-08-12", notes: "", type: 'expense' },
    { id: 164, title: "Spotify", amount: 10, category: "Subscriptions", date: "2026-08-15", notes: "", type: 'expense' },
    { id: 165, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-08-15", notes: "Monthly premium", type: 'expense' },
    { id: 166, title: "Back to School Shopping", amount: 400, category: "Shopping", date: "2026-08-22", notes: "", type: 'expense' },

    // September - Incomes
    { id: 30, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-09-01", notes: "Full time job", type: 'income' },
    { id: 31, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-09-15", notes: "Apartment sublease", type: 'income' },
    { id: 32, title: "Freelance Project", amount: 2200, category: "Freelance", date: "2026-09-20", notes: "Complex project", type: 'income' },
    // September - Expenses
    { id: 167, title: "Rent", amount: 2500, category: "Housing", date: "2026-09-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 168, title: "Groceries", amount: 350, category: "Food", date: "2026-09-03", notes: "Supermarket shop", type: 'expense' },
    { id: 169, title: "Internet Bill", amount: 60, category: "Utilities", date: "2026-09-06", notes: "", type: 'expense' },
    { id: 170, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-09-10", notes: "", type: 'expense' },
    { id: 171, title: "Gym Membership", amount: 50, category: "Health", date: "2026-09-12", notes: "", type: 'expense' },
    { id: 172, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-09-15", notes: "Monthly premium", type: 'expense' },
    { id: 173, title: "Dinner Out", amount: 120, category: "Food", date: "2026-09-20", notes: "Birthday celebration", type: 'expense' },

    // October - Incomes
    { id: 33, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-10-01", notes: "Full time job", type: 'income' },
    { id: 34, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-10-15", notes: "Apartment sublease", type: 'income' },
    { id: 35, title: "Side Business", amount: 1100, category: "Business", date: "2026-10-22", notes: "Online store sales", type: 'income' },
    // October - Expenses
    { id: 174, title: "Rent", amount: 2500, category: "Housing", date: "2026-10-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 175, title: "Groceries", amount: 340, category: "Food", date: "2026-10-02", notes: "Supermarket shop", type: 'expense' },
    { id: 176, title: "Electricity Bill", amount: 100, category: "Utilities", date: "2026-10-08", notes: "Fall season", type: 'expense' },
    { id: 177, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-10-10", notes: "", type: 'expense' },
    { id: 178, title: "Gym Membership", amount: 50, category: "Health", date: "2026-10-12", notes: "", type: 'expense' },
    { id: 179, title: "Spotify", amount: 10, category: "Subscriptions", date: "2026-10-15", notes: "", type: 'expense' },
    { id: 180, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-10-15", notes: "Monthly premium", type: 'expense' },
    { id: 181, title: "Halloween Costume", amount: 60, category: "Shopping", date: "2026-10-25", notes: "", type: 'expense' },

    // November - Incomes
    { id: 36, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-11-01", notes: "Full time job", type: 'income' },
    { id: 37, title: "Stock Dividends", amount: 420, category: "Investment", date: "2026-11-08", notes: "Q3 dividends", type: 'income' },
    { id: 38, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-11-15", notes: "Apartment sublease", type: 'income' },
    { id: 39, title: "Freelance Project", amount: 1700, category: "Freelance", date: "2026-11-18", notes: "Branding project", type: 'income' },
    // November - Expenses
    { id: 182, title: "Rent", amount: 2500, category: "Housing", date: "2026-11-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 183, title: "Groceries", amount: 370, category: "Food", date: "2026-11-02", notes: "Supermarket shop", type: 'expense' },
    { id: 184, title: "Internet Bill", amount: 60, category: "Utilities", date: "2026-11-06", notes: "", type: 'expense' },
    { id: 185, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-11-10", notes: "", type: 'expense' },
    { id: 186, title: "Gym Membership", amount: 50, category: "Health", date: "2026-11-12", notes: "", type: 'expense' },
    { id: 187, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-11-15", notes: "Monthly premium", type: 'expense' },
    { id: 188, title: "Thanksgiving Dinner", amount: 150, category: "Food", date: "2026-11-27", notes: "Turkey and sides", type: 'expense' },
    { id: 189, title: "Black Friday Shopping", amount: 300, category: "Shopping", date: "2026-11-28", notes: "Sales items", type: 'expense' },

    // December - Incomes
    { id: 40, title: "Monthly Salary", amount: 8000, category: "Salary", date: "2026-12-01", notes: "Full time job", type: 'income' },
    { id: 41, title: "Year-end Bonus", amount: 3500, category: "Salary", date: "2026-12-10", notes: "Annual bonus", type: 'income' },
    { id: 42, title: "Rental Income", amount: 1200, category: "Rent", date: "2026-12-15", notes: "Apartment sublease", type: 'income' },
    { id: 43, title: "Freelance Project", amount: 1300, category: "Freelance", date: "2026-12-22", notes: "Holiday project", type: 'income' },
    // December - Expenses
    { id: 190, title: "Rent", amount: 2500, category: "Housing", date: "2026-12-01", notes: "Monthly apartment rent", type: 'expense' },
    { id: 191, title: "Groceries", amount: 360, category: "Food", date: "2026-12-02", notes: "Supermarket shop", type: 'expense' },
    { id: 192, title: "Electricity Bill", amount: 115, category: "Utilities", date: "2026-12-08", notes: "Heating", type: 'expense' },
    { id: 193, title: "Netflix", amount: 18, category: "Subscriptions", date: "2026-12-10", notes: "", type: 'expense' },
    { id: 194, title: "Gym Membership", amount: 50, category: "Health", date: "2026-12-12", notes: "", type: 'expense' },
    { id: 195, title: "Spotify", amount: 10, category: "Subscriptions", date: "2026-12-15", notes: "", type: 'expense' },
    { id: 196, title: "Car Insurance", amount: 210, category: "Transport", date: "2026-12-15", notes: "Monthly premium", type: 'expense' },
    { id: 197, title: "Christmas Gifts", amount: 800, category: "Shopping", date: "2026-12-20", notes: "Family gifts", type: 'expense' },
    { id: 198, title: "Holiday Party", amount: 200, category: "Entertainment", date: "2026-12-23", notes: "New Year's celebration", type: 'expense' },
];


export const budgets = [
    { id: 1, category: "Housing", value: 3000 },
    { id: 2, category: "Food", value: 500 },
    { id: 3, category: "Utilities", value: 200 },
    { id: 4, category: "Subscriptions", value: 50 },
    { id: 5, category: "Health", value: 100 },
    { id: 6, category: "Transport", value: 300 },
    { id: 7, category: "Shopping", value: 200 },
    { id: 8, category: "Entertainment", value: 150 },
];

