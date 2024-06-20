import { useContext } from "react";
import ExpenseContext from "../../../store/ExpenseContext";
import { Route, Redirect } from "react-router-dom";
import editForm from "./editForm";
import { useState } from "react";
import EditForm from "./editForm";
import { FaEdit } from "react-icons/fa";
const EditButton = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const [editForm, setEditForm] = useState(false);

  const editItemHandler = () => {
    setEditForm(true);
  };
  const editFormCloser = () => {
    setEditForm(false);
  };
  if (editForm) {
    return (
      <EditForm onSubmitClick={editFormCloser} items={props.items}></EditForm>
    );
  }
  return (
    <div>
      {editForm ? (
        <EditForm onSubmitClick={editFormCloser} items={props.items}></EditForm>
      ) : (
        ""
      )}
      <button onClick={editItemHandler} style={{ height: "40px" }}>
        <FaEdit></FaEdit>Edit
      </button>
    </div>
  );
};
export default EditButton;
