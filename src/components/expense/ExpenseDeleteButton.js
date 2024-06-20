import { useContext } from "react";
import ExpenseContext from "../../store/ExpenseContext";
// import { RiDeleteBin5Fill } from "./react-icons/ri"

import { RiDeleteBin5Fill } from "react-icons/ri";
import { toast } from "react-toastify";

const ExpenseDeleteButton = (props) => {
  const testing = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");
  const expenseCtx = useContext(ExpenseContext);

  const deleteItemHandler = async () => {
    try {
      const response = await fetch(
        `https://expensetrackerdemo-4954a-default-rtdb.firebaseio.com/${testing}/${props.token}.json`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("expense data did not deleted......try again");
      }

      const res = await response.json();
      expenseCtx.deleteExpense(props.token);

      toast.success("expense Deleted successfully", {
        autoClose: 1000,
      });
    } catch (err) {
      toast.error(err.message, {
        autoClose: 1000,
      });
    }
  };
  return (
    <button
      onClick={deleteItemHandler}
      style={{ marginRight: "10px", height: "40px" }}
    >
      <RiDeleteBin5Fill></RiDeleteBin5Fill>delete
    </button>
  );
};
export default ExpenseDeleteButton;
