import React, { Fragment } from "react";

// import SignUpFormPrint from "./components/Signup/SignUpFormPrint";
import Login from "./components/Login/Login";
import EditForm from "./components/expense/editExpense/editForm";

import { Switch, Route } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import Profile from "./components/profile/Profile";
import ForgotPassword from "./components/forgetPassword/ForgotPassword";
import SignUpForm from "./components/Signup/SignUp";
// import { useEffect } from "react";
// import { toast } from "react-toastify";
// import { useContext } from "react";
// import ExpenseContext from "./store/ExpenseContext";
// import { useState } from "react";

function App() {
  return (
    <>
      <Switch>
        <Route path="/edit">
          <EditForm></EditForm>
        </Route>
        <Route path="/auth">
          <Login></Login>
        </Route>
        <Route path="/welcome">
          <Welcome></Welcome>
        </Route>
        <Route path="/profile">
          <Profile></Profile>
        </Route>
        <Route path="/forgotPassword">
          <ForgotPassword></ForgotPassword>
        </Route>
        <Route path="/">
          <SignUpForm></SignUpForm>
        </Route>
      </Switch>
    </>
  );
}

export default App
