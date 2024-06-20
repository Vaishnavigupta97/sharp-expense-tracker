import { useReducer } from "react";
import ExpenseContext from "./ExpenseContext";
import { toast } from "react-toastify";

const expenses=[];

const Reducerfn=(state,action)=>{
if(action.type ==="ADD"){

  if (!state) {
    return [action.expenseData];
  }
  const existitem = state.find((item) => {
    console.log(item.token,action.expenseData.token,item.token === action.expenseData.token)
    return item.token === action.expenseData.token;
  });
  console.log(existitem);
  if (!existitem) {
   
    console.log("executed");
   
      console.log(state)
      return [...state, action.expenseData];
    
  }
}

if(action.type ==="DEL"){

  const itemAfterDeletion = state.filter((item) => {
    return item.token !== action.token;
  });
  return itemAfterDeletion
}

if(action.type ==="Edit"){
    const existingIndex =state.findIndex((item) => {
      return item.token === action.editData.token
    });

    const updatedItem = { ...action.editData };

    const updatedItems = [...state];

    updatedItems[existingIndex] = updatedItem;
    toast("expense successfully edited", {
      autoClose: 2000,
    });
    return updatedItems
}
return state
}

const ExpenseContextProvider = (props) => {

const [state,dispatchFn]=useReducer(Reducerfn,expenses)

  const expenseHandler = (expenseData) => {
    dispatchFn({type:"ADD",expenseData:expenseData})
  };
  const deleteExpenseHandler = (token) => {

    dispatchFn({type:"DEL",token:token})
  };
  const editExpenseHandler = (editedExpenseData) => {

    dispatchFn({type:"Edit",editData:editedExpenseData})
  };

  console.log(state)
  const ExpenseContextHelper = {
    addExpense: expenseHandler,
    expenseItem: state,
    deleteExpense: deleteExpenseHandler,
    editExpense: editExpenseHandler,
  };
  return (
    <ExpenseContext.Provider value={ExpenseContextHelper}>
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
