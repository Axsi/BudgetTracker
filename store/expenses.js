const db = require('../db');
const pool = db.pool;

module.exports = {
    addExpense(expense){
        console.log("addExpense store");
        console.log(expense.description);
        console.log(expense.expense);
        console.log(expense.userID);
        return pool.query('INSERT INTO expenses(owner, period, spending, description) VALUES($1, $2, $3, $4)',
            [expense.userID, expense.time, expense.expense, expense.description]);
    },
    getExpenses(userID){
        console.log("getExpenses store");
        console.log(userID);
        return pool.query('SELECT * FROM expenses WHERE owner=$1',[userID]);
    },
    updateExpense(info){
        console.log("updateExpense store");
        console.log(info);
        return pool.query('UPDATE expenses SET description=$1, spending=$2 WHERE owner=$3 AND expenseid=$4',
            [info.description, info.expense, info.userID, info.expenseID]);
    },
    deleteExpense(info){
        console.log("deleteExpense store");
        console.log(info);
        return pool.query('DELETE FROM expenses WHERE owner=$1 AND expenseid=$2',[info.userID, info.expenseID])
    },
    checkBudget(info){
        console.log("checkBudget store");
        console.log(info);
        return pool.query('SELECT * FROM budgets WHERE budgetowner=$1',[info.userID]);
    },
    setBudget(info, boolean){
        console.log("setBudget store");
        console.log(info);
        if(boolean){
            return pool.query('INSERT INTO budgets(budgetowner, budget, budgetperiod) VALUES($1,$2,$3)',
                [info.userID, info.newBudget, info.time]);
        }else{
            return pool.query('UPDATE budgets SET budget=$1 WHERE budgetowner=$2', [info.newBudget, info.userID]);
        }
    },
    getBudget(userID){
        console.log("getBudget store");
        console.log(userID);
        return pool.query('SELECT * FROM budgets WHERE budgetowner=$1',[userID]);
    }
};