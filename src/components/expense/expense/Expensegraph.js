import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Expensegraph = (props) => {
  const filterExpenses = props.items;
  let petrolprice = 0;
  let foodprice = 0;
  let coffeeprice = 0;


  const newarray = filterExpenses.map((item) => {
    if (item.category === "food") {
      foodprice = foodprice + item.amount;
    } else if (item.category === "petrol") {
      petrolprice = petrolprice + item.amount;
    } else if (item.category === "coffee") {
      coffeeprice = coffeeprice + item.amount;
    }
  });
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: [`petrol`, "food", "coffee"],
    datasets: [
      {
        label: "Total Amount spend on this category In Rs",
        data: [petrolprice, foodprice, coffeeprice],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return <Pie data={data} />;
};
export default Expensegraph;
