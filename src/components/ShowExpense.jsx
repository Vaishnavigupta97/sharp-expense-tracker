import { useEffect , useState} from "react";
import { getAllExpense } from "./crud";
import Expense from "./Expense";
import { useDispatch, useSelector } from "react-redux";
import { ExpenseActions } from "../store/store";
import "../App.css";

const ShowExpense = () => {
  const exp = useSelector((state) => state.exp.expense);
  const userId = useSelector((state) => state.auth.userId);
  const theme = useSelector((state) => state.theme.theme);

  const [formData, setFormData] = useState([]);


  const dispatch = useDispatch();

  // const total = exp.reduce((t, e) => {
  //   // return t + +e.amount;
  //   return t+e
  // }, 0);

  const total = Array.isArray(exp) ? exp.reduce((t, e) => t + e.amount, 0) : 0;


  // CSV Generation --------------------------------

  const generateCsvContent = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      return "";
    }

    const headers = Object.keys(data[0]);
    const csvRows = [];

    // Push headers as the first row
    csvRows.push(headers.join(","));

    // Push data rows
    data.forEach((item) => {
      const values = headers.map((header) => {
        const value = item[header];
        // Handle values containing commas by enclosing in double quotes
        return typeof value === "string" && value.includes(",")
          ? `"${value}"`
          : value;
      });
      csvRows.push(values.join(","));
    });

    // Join rows with newlines
    return csvRows.join("\n");
  };

  const handleDownload = (exp) => {
    const csvContent = generateCsvContent(exp);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.csv";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // useEffect(() => {
  //   const fetchData = async (userId) => {
  //     console.log(userId);
  //     let data = await getAllExpense(userId);
  //     dispatch(ExpenseActions.addExpense(data));
  //   };
  //   console.log("ShowExp_effect");
  //   fetchData(userId);
  // }, []);

  useEffect(() => {
    const fetchData = async (userId) => {
      if (!userId) return;
      try {
        console.log(userId);
        const data = await getAllExpense(userId);
        if (Array.isArray(data)) {
          dispatch(ExpenseActions.addExpense(data));
          setFormData(data);
        } else {
          console.error("Fetched data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchData(userId);
  }, [userId, dispatch]);
  return (
    <div>
      <div className={theme ? "quote premium" : "quote premium_dark"}>
        {`Rs ${total}/- is your total expense`}
        {total >= 10000 && (
          <button
            className={theme ? "header_btn pr_btn" : "header_btn pr_btn_dark"}
          >
            Go For Premium
          </button>
        )}
        {total >= 10000 && "to unlock useful features."}
      </div>
      <div className={theme ? "shexp_container" : "shexp_container_dark"}>
        <table>
          <tbody>
            <tr key={1}>
              <th>Amount</th>
              <th>Description</th>
              <th>Category</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
            {/* {exp.map((e) => (
              <Expense e={e} key={e.id} />
            ))} */}
             {Array.isArray(exp) && exp.map((e) => (
              <Expense e={e} key={e.id} />
            ))}
          </tbody>
        </table>
      </div>
      <div className={theme ? "quote premium" : "quote premium_dark"}>
        Download your expenses.{" "}
        <button
          id="download"
          className={theme ? "header_btn" : "header_btn_dark"}
          download={"Expense.csv"}
          onClick={() => handleDownload(exp)}
        >
          Download Now !
        </button>
      </div>
    </div>
  );
};
export default ShowExpense;
