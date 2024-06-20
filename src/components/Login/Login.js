import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { authAction } from "../../store/reducerStore";
import { useEffect } from "react";
import navcss from "./login.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(authAction.login());
    }
  }, []);
  const dispatch = useDispatch();
  const redirect = useSelector((state) => state.auth.isAuthenticated);
  console.log(redirect);
  const emailRef = useRef();
  const passwordRef = useRef();
  const inputDataHAndler = (event) => {
    event.preventDefault();

    const myobj = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDS47Ym6s-wDxJWygBn8N98Gf8q3_fi7_E",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailRef.current.value,
          password: passwordRef.current.value,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        else{
          throw new Error("authentication failed")
        }
      })
      .then((res) => {
        localStorage.setItem("token", res.idToken);
        dispatch(authAction.login());
        localStorage.setItem("email",emailRef.current.value)
        toast.success("login successful",{
          autoClose:2000
        })
      })
      .catch((err) => {
        toast.error(err.message,{
          autoClose:2000
        })
      });
  };
  if (redirect) {
    return <Redirect to="/welcome"></Redirect>;
  }
  return (
    <div className={navcss.loginpage}>
      <div className={navcss.contentbox}>
        <p>Login</p>
        <form className={navcss.form} >
          <input placeholder="Email" ref={emailRef}></input>
          <input placeholder="password"  ref={passwordRef}></input>
        </form>
        <button className={navcss.button} onClick={inputDataHAndler}>LOGIN</button>
        <div>
          <NavLink to="/forgotPassword">Forgot Password</NavLink>
        </div>
      </div>
      <div className={navcss.signupbtn}>
        <button>
          <Link to="/">Don`t have an account ! signup</Link>
        </button>
      </div>
    </div>
  );
};
export default Login;
