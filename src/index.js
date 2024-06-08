import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import ExpenseContextProvider from "./store/ExpenseContextProvider";
import { Provider } from "react-redux";
import authStore from "./store/reducerStore";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./index.css"
// import "./font.css"
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={authStore}>
      <ExpenseContextProvider>
        <BrowserRouter>
          <App />
          <ToastContainer></ToastContainer>
        </BrowserRouter>
      </ExpenseContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

