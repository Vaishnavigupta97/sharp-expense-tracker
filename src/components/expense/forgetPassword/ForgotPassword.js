import { useRef } from "react";
import { Link } from "react-router-dom";
import navcss from "./forgotpassword.module.css"
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
const ForgotPassword = () => {
  const emailRef = useRef();

  const forgotPasswordHandler = () => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS47Ym6s-wDxJWygBn8N98Gf8q3_fi7_E",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: emailRef.current.value,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("retry.....an error occured while changing password");
        }
      })
      .then((res) => {
        console.log(res);
        toast.success("An email with recovering details for password sent to registered email");
        <Redirect to="/auth"></Redirect>

      })
      .catch((err) => {
        // Handle specific error type
        toast.error(err.message);
      });
  };
  return (
    <div className={navcss.container}>
      <div className={navcss.main}>
        <h4>Enter the registered email</h4>
        <input placeholder="Email" ref={emailRef}></input>
        <button
          style={{ backgroundColor: "brown" }}
          onClick={forgotPasswordHandler}
        >
          Send Link
        </button>
        <p>
          Already a user?
          <Link to="/auth">
            <b>LOGIN</b>
          </Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPassword;
