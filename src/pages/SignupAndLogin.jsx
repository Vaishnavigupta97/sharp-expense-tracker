import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/store";

const SignupAndLogin = () => {
  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const theme = useSelector((state) => state.theme.theme);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== "" && mail !== "") {
      // Login --------------------------------------------

      if (login) {
        try {
          let response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA0Q7-BgkEdY2M1RXH0W3uyrlRRqkrm5Gs",
            {
              method: "POST",
              body: JSON.stringify({
                email: mail,
                password,
                returnSecureToken: true,
              }),
            }
          );

          let data = await response.json();

          if (data.error) return alert(data.error.message);
          else {
            console.log(data);
            if (!data.displayName) data.displayName = "";
            dispatch(
              AuthActions.login({
                token: data.idToken,
                userId: data.localId,
                email: data.email,
                name: data.displayName,
                url: data.profilePicture,
              })
            );
            navigate("/");
          }
        } catch (err) {
          //console.log(err);
        }
        //console.log("Login");
      }

      // Signup -----------------------------------------------
      //
      else {
        if (password === cnfPassword) {
          //console.log("Signup");
          try {
            let response = await fetch(
              "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAam6zlCEcVQjbsT6Ih54ib0JoONOko2j8",
              {
                method: "POST",
                body: JSON.stringify({
                  email: mail,
                  password,
                  returnSecureToken: true,
                }),
              }
            );
            let data = await response.json();
            if (data.error) return alert(data.error.message);
            else {
              dispatch(
                AuthActions.signup({
                  token: data.idToken,
                  userId: data.localId,
                  email: data.email,
                })
              );
              navigate("/");
            }
          } catch (err) {
            //console.log(err, "Hello");
          }
        } else {
          return alert("Password does not matches");
        }
        console.log("Signup");
      }
    } else {
      alert("Please Enter Email and Password");
    }
    setMail("");
    setPassword("");
    setCnfPassword("");

    //console.log(token);
  };

  const handleLogin = () => {
    setLogin((pre) => !pre);
  };

  const handleForget = () => {
    navigate("/forget");
  };

  return (
    <>
      <div className={theme ? "signup_container" : "signup_container_dark"}>
        <div className={theme ? "su_heading" : "su_heading_dark"}>
          {login ? "LOGIN" : "SIGNUP"}
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              Email
              <div>
                <div></div>
                <input
                  type="text"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
              </div>
            </div>
            <div>
              Password
              <div>
                <div></div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {!login && (
              <div>
                Confirm Password
                <div>
                  <div></div>
                  <input
                    type="password"
                    value={cnfPassword}
                    onChange={(e) => setCnfPassword(e.target.value)}
                  />
                </div>
              </div>
            )}
            <br />
            <input
              className={theme ? "log_btn" : "log_btn_dark"}
              type="submit"
              value={login ? "Login" : "SignUp"}
            />
            {login && (
              <div>
                <button
                  className={theme ? "forget_btn" : "forget_btn_dark"}
                  onClick={handleForget}
                >
                  Forget Password?
                </button>
              </div>
            )}
          </form>
        </div>
        <button
          onClick={handleLogin}
          className={theme ? "forget_btn" : "forget_btn_dark"}
        >
          {login
            ? "Dont have account, SignUp here."
            : "Already have an account, login here."}
        </button>
      </div>
      <div className={theme ? "body ex" : "body_dark ex"}></div>
    </>
  );
};

export default SignupAndLogin;
