import { useState } from "react";
import { editExpense } from "./crud";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "../store/store";

const EditExpense = ({ e, setEdit }) => {
  const [amount, setAmount] = useState(e.amount);
  const [description, setDes] = useState(e.description);
  const [category, setCategory] = useState(e.category);

  const userId = useSelector((state) => state.auth.userId);
  const dispatch = useDispatch();

  const handleEditExpense = async (e) => {
    let data = await editExpense({
      amount,
      description,
      category,
      id: e.id,
      userId,
    });
    dispatch(ExpenseActions.addExpense(data));
    setEdit(false);
  };

  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </td>
      <td>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDes(e.target.value)}
        />
      </td>
      <td>
        <select
          name="category"
          onChange={(e) => {
            console.log("Selected value", e.target.value);
            setCategory(e.target.value);
          }}
          value={category}
        >
          <option value="Food">Food</option>
          <option value="Fuel">Fuel</option>
          <option value="Education">Education</option>
          <option value="Fair">Fair</option>
          <option value="Rent">Rent</option>
        </select>
      </td>
      <button onClick={() => handleEditExpense(e)}>Save</button>
    </tr>
  );
};

export default EditExpense;
