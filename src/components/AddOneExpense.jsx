import { useState } from "react";
import { addExpense } from "./crud";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "../store/store";

const AddOneExpense = () => {
  const [amount, setAmount] = useState("");
  const [description, setDes] = useState("");
  const [category, setCategory] = useState("");

  const theme = useSelector((state) => state.theme.theme);
  const userId = useSelector((state) => state.auth.userId);
  let image = useSelector((state) => state.auth.image);
  if (!image) image = "https://rb.gy/gjs9fn";

  const dispatch = useDispatch();

  const handleAddExpense = async () => {
    let cat = "";
    if (!category) cat = "Other";
    else cat = category;
    let data = await addExpense({ amount, description, category: cat, userId });
    setAmount("");
    setDes("");
    setCategory("");
    //console.log(data);
    dispatch(ExpenseActions.addExpense(data));
  };

  return (
    <div className={theme ? "pu_input add_one" : "pu_input add_one_dark"}>
      <div>
        <h2>Add New Expense</h2>
        <div>
          <div className={theme ? "add_one_data" : "add_one_data_dark"}>
            <span>Amount</span>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={theme ? "add_one_data" : "add_one_data_dark"}>
            <span>Description</span>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDes(e.target.value)}
            />
          </div>
          <div className={theme ? "add_one_data" : "add_one_data_dark"}>
            <span>Category</span>
            <select
              name="category"
              onChange={(e) => {
                console.log("Selected value", e.target.value);
                setCategory(e.target.value);
              }}
              value={category}
            >
              <option value="Other" selected>
                --Select--
              </option>
              <option value="Food">Food</option>
              <option value="Fuel">Fuel</option>
              <option value="Education">Education</option>
              <option value="Fair">Fair</option>
              <option value="Rent">Rent</option>
            </select>
          </div>
          <br />
          <button
            onClick={handleAddExpense}
            className={theme ? "add_one_btn" : "add_one_btn_dark"}
          >
            ADD
          </button>
        </div>
      </div>
      <div className={theme ? "pu_image_container" : "pu_image_container_dark"}>
        <img src={image} alt="Hello" />
      </div>
    </div>
  );
};

export default AddOneExpense;
