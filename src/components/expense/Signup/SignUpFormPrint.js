import { Redirect } from "react-router-dom/cjs/react-router-dom";
import SignUpForm from "./SignUp";
import { useState } from "react";
import navcss from "./signupformprint.module.css"
const SignUpFormPrint = (props) => {
  const [redirect, setRedirect] = useState(false);
  const LoginPageRedirecter = () => {
    setRedirect(true);
  };
  if (redirect) {
    return <Redirect to="/auth"></Redirect>;
  }
  return (
   <button onClick={LoginPageRedirecter} className={navcss.button}>{props.children}</button>
  );
};
export default SignUpFormPrint;
