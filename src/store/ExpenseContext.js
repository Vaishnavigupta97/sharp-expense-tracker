import { createContext } from "react";

const ExpenseContext=createContext({
    addExpense:()=>{},
    expenseItem: [],
    deleteExpense:()=>{},
    editExpense:()=>{}

})
export default ExpenseContext