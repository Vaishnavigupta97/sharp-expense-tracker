import { useContext } from "react";
import navcss from "./ActiveExpense.module.css";
import ExpenseContext from "../../store/ExpenseContext";
import { useState } from "react";
import { useEffect } from "react";
import { ImSad } from "react-icons/im";

const ActivateExpense = (props) => {
  const expensectx = useContext(ExpenseContext);
  const [currentAmount, setCurrentAmount] = useState(0);
  //   let total=0;
  useEffect(() => {
    let total = expensectx.expenseItem.reduce((acc, item) => {
      return acc + item.amount;
    }, 0);
    setCurrentAmount(total);
  }, [expensectx.expenseItem]);

  console.log(expensectx.expenseItem);
const closethiswindow=()=>{
    props.close();
}
  return (
    <div className={navcss.container}>
      <div className={navcss.main}>
        {currentAmount < 10000 ? (
          <div className={navcss.paragraph}>
            <h1>
              Sorry <ImSad></ImSad>
            </h1>
            <p>
              sorry Premium Plan can not be activated because you have to do Total
              expenses of 10000 Rs{" "}
            </p>
            <p> you have just completed {currentAmount} rs. expenses </p>
            <p>
              try to do {10000 - currentAmount} rs more expenses to activate
              premium plan
            </p>
          </div>
        ) : (
          <div>
            <h1>Congratulations !!</h1>
            <p>you have completed total expenses of {currentAmount} rs.</p>
          </div>
        )}
        <div className={navcss.button}>
          <button onClick={closethiswindow}>okay</button>
        </div>
      </div>
    </div>
  );
};
export default ActivateExpense;
