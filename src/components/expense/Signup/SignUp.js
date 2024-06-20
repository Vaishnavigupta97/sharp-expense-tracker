import { useRef } from "react";
import navcss from "./signup.module.css"
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import SignUpFormPrint from "./SignUpFormPrint";
import { toast } from "react-toastify"

const SignUpForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const emailValue=emailRef.current.value
    const passwordValue=passwordRef.current.value
    const confirmPasswordvalue=confirmPasswordRef.current.value
    if(confirmPasswordvalue!==passwordValue)
    {
      alert("confirm password and password doesn't match")
return;
    }
    const myobj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    };
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS47Ym6s-wDxJWygBn8N98Gf8q3_fi7_E",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken:true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("authentication failed check ur wmail and password structure");
        }
      })
      .then((res) => {
        toast("Account Successfully created....now ypu can Login with these details")
      })
      .catch((err) => {
        toast.error(err.message,{
          autoClose:3000
        })
      });
  };

  return (
    
    // <div>
    //   {" "}
    //   <form onSubmit={formSubmitHandler}>
    //     <div style={{ display: "block", marginBottom: "10px" }}>
    //       <label>Email</label>
    //       <input ref={emailRef}></input>
    //     </div>
    //     <div style={{ display: "block", marginBottom: "10px" }}>
    //       <label>Password</label>
    //       <input ref={passwordRef}></input>/
    //     </div>
    //     <div style={{ display: "block", marginBottom: "20px" }}>
    //       <label>Confirm Password</label>
    //       <input ref={confirmPasswordRef}></input>{" "}
    //     </div>
    //     <button style={{ borderRadius: "15%" }}>SIGN UP</button>
    //   </form>
    // </div>

    <div className={navcss.signuppage}>
    <div className={navcss.contentbox}>
      <p>Signup</p>
      <form className={navcss.form}>
        <input placeholder="Email" ref={emailRef} ></input>
        <input placeholder="password" ref={passwordRef} ></input>
        <input placeholder="confirm password"  ref={confirmPasswordRef}></input>
      </form>
      <button className={navcss.button} onClick={formSubmitHandler}>Signup</button>
      
    </div>
    <div className={navcss.signupbtn}>
      <SignUpFormPrint>Already have an Account ! Login</SignUpFormPrint>
    </div>
    </div>
  );
};
export default SignUpForm;
