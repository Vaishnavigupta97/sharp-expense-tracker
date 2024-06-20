import { useContext, useRef } from "react";
import ExpenseContext from "../../store/ExpenseContext";
import navcss from "./expenseform.module.css";
import { toast } from "react-toastify";

const ExpenseForm = () => {
  const expenseCtx = useContext(ExpenseContext);
  const nameRef = useRef();
  const AmountRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();

  const formDataHandler = async (event) => {
    event.preventDefault();

    const testing = localStorage
      .getItem("email")
      .replace("@", "")
      .replace(".", "");
    const myobj = {
      id: Math.random(),
      name: nameRef.current.value,
      amount: +AmountRef.current.value,
      category: categoryRef.current.value,
      date: dateRef.current.value,
    };
    try {
      const response = await fetch(
        `https://expensetrackerdemo-4954a-default-rtdb.firebaseio.com/${testing}.json`,
        {
          method: "POST",
          body: JSON.stringify(myobj),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error("data didnt saved in server");
      }
      const res = await response.json();
      const putresponse =await fetch(
        ` https://expensetrackerdemo-4954a-default-rtdb.firebaseio.com/${testing}/${res.name}.json`,
        {
          method: "PUT",
          body: JSON.stringify({ ...myobj, token: res.name }),
          headers: { "Content-Type": "application/json" },
        }
      );
      if (!putresponse.ok) {
        throw new Error("Expense didn`t saved in server");
      }
      const putres = await putresponse.json();
      expenseCtx.addExpense({ ...myobj, token: putres.token });
      // toast("Expense added in Expense list Successfully", {
      //   autoClose:1000,
      // });
    }
     catch (err) {
      toast.error(err.message, {
        autoClose: 1000,
      });
    }
  };
  return (
    <div className={navcss.container}>
      <form className={navcss.form}>
        <input placeholder="Item Name" type="text" ref={nameRef}></input>
        <input placeholder="Amount" type="number" ref={AmountRef}></input>
        <select ref={categoryRef}>
          <option>food</option>
          <option>petrol</option>
          <option>coffee</option>
        </select>
        <input type="date" ref={dateRef}></input>
      </form>
      <button onClick={formDataHandler}>Save Expense</button>
    </div>
  );
};
export default ExpenseForm;
