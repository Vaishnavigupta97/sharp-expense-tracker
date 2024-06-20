import { useContext, useRef } from "react";
import ExpenseContext from "../../../store/ExpenseContext";
import navcss from "./editform.module.css";

const EditForm = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const nameRef = useRef();
  const AmountRef = useRef();
  const categoryRef = useRef();
  const dateRef = useRef();
  const propsItem = props.items;
  let testing = "";
  if (localStorage.getItem("email")) {
    testing = localStorage.getItem("email").replace("@", "").replace(".", "");
  }

  const editDataHandler = (event) => {
    event.preventDefault();
    const myobj = {
      token: propsItem.token,
      name: nameRef.current.value,
      category: categoryRef.current.value,
      amount: +AmountRef.current.value,
      date: dateRef.current.value,
    };
    fetch(
      `https://expensetrackerdemo-4954a-default-rtdb.firebaseio.com/${testing}/${propsItem.token}.json`,
      {
        method: "PUT",
        body: JSON.stringify(myobj),
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(
            "expense data didnt edited......check network or try again"
          );
        }
      })
      .then((res) => {
        expenseCtx.editExpense(res);

        props.onSubmitClick();
      })
      .catch((err) => {
        alert(err);
      });
  };
  const closeForm=()=>{
    props.onSubmitClick();
  }
  return (
    <div className={navcss.editfrompopup}>
      <div className={navcss.closebtn}>
        <button onClick={closeForm}>close x</button>
      </div>
      <form  className={navcss.form}>
        <input
          placeholder="description"
          type="text"
          defaultValue={propsItem.name}
          ref={nameRef}
          required
        ></input>
        <input
          placeholder="Amount"
          type="number"
          defaultValue={propsItem.amount}
          ref={AmountRef}
          required
        ></input>
        <select ref={categoryRef} defaultValue={propsItem.category}>
          <option>food</option>
          <option>petrol</option>
          <option>coffee</option>
        </select>
        <input type="date" ref={dateRef} defaultValue={propsItem.date}></input>
      </form>{" "}
      <div className={navcss.button}>
        <button onClick={editDataHandler}>Edit Expense</button>
      </div>
    </div>
  );
};
export default EditForm;
