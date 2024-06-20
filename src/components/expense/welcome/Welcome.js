import { Link } from "react-router-dom/cjs/react-router-dom.min";
import LogOutButton from "../LogOut/LogOut";
import ExpenseForm from "../expense/ExpenseForm";
import ExpensePrint from "../expense/ExpensePrint";
import { themeActions } from "../../store/reducerStore";
import { useDispatch, useSelector } from "react-redux";
import navcss from "./welcome.module.css";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import ExpenseContext from "../../store/ExpenseContext";

const Welcome = () => {
  // const themeLight = useSelector((state) => state.theme.isLight);
  const [themelight, settheme] = useState(true);
  // const dispatch = useDispatch();

  const expenseCtx = useContext(ExpenseContext);
  const initialEmail = localStorage.getItem("email");
  const [testing, setTesting] = useState(
    initialEmail ? initialEmail.replace("@", "").replace(".", "") : false
  );

  console.log(testing);

  useEffect(() => {
    fetch(
      `https://expensetrackerdemo-4954a-default-rtdb.firebaseio.com/${testing}.json`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("data didnt save in server");
        }
      })

      .then((res) => {
        if (res) {
          console.log(res);
          const newItems = Object.values(res).map((item) => {
            const myobj = {
              id: item.id,
              name: item.name,
              amount: item.amount,
              category: item.category,
              token: item.token,
              date: item.date,
            };
            expenseCtx.addExpense(myobj);
          });
        }
      })
      .catch((err) => {
        toast.error("data did not load");
      });
  }, []);

  const ThemeHandler = () => {
    settheme(!themelight);
  };

  return (
    <div className={themelight ? navcss.container : navcss.containerblack}>
      <div className={navcss.welcome}>
        <div className={navcss.title}>
          <h2>Expense Tracker</h2>
        </div>
        {/* <div className={navcss.profilemsg}>
          <p>
            your profile is incomplete <Link to="/profile">complete now</Link>
          </p>
        </div> */}
      </div>
      <div className={navcss.border}></div>
      <div className={navcss.formcontrol}>
        <ExpenseForm></ExpenseForm>
        <div className={navcss.navigation}>

          <button onClick={ThemeHandler}>
            {themelight ? "Dark Theme" : "Light Theme"}
          </button>
          <LogOutButton></LogOutButton>
        </div>
      </div>
      {/* <div className={navcss.border}></div> */}

      <ExpensePrint></ExpensePrint>
    </div>
  );
};
export default Welcome;
