const accountTable = `CREATE TABLE IF NOT EXISTS
            accounts(
                accountid SERIAL PRIMARY KEY,
                username TEXT NOT NULL,
                passwordhash TEXT NOT NULL,
                salt TEXT NOT NULL
                    )`;

const expenseTable = `CREATE TABLE IF NOT EXISTS
            expenses(
                expenseid SERIAL PRIMARY KEY,
                owner INTEGER REFERENCES accounts(accountid),
                period DATE NOT NULL,
                spending NUMERIC (8, 2) NOT NULL,
                description TEXT NOT NULL
                    )`;

const budgetTable = `CREATE TABLE IF NOT EXISTS
            budgets(
                budgetowner INTEGER REFERENCES accounts(accountid),
                budget NUMERIC (10, 2) NOT NULL,
                budgetperiod DATE NOT NULL
                    )`;



module.exports = {
    accountTable,
    expenseTable,
    budgetTable
};