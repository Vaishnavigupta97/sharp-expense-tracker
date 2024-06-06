import { useState, useRef, useContext } from "react";
import Context from "../Store/Context";

const SignUp = () => {
    const { 
        setSuccesLogin
      } = useContext(Context);
    const [isLogin, setIsLogin] = useState(true);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const checkpassword = useRef();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [checkPass, setCheckPass] = useState("");

    const submitHandler = (event) => {
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredpassword = passwordInputRef.current.value;
        const enteredCheckPassword = checkpassword.current.value;

        if (isLogin) {

        } else {
            fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDS47Ym6s-wDxJWygBn8N98Gf8q3_fi7_E',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        email: enteredEmail,
                        password: enteredpassword,
                        checkpassword: enteredCheckPassword,
                        returnSecureToken: true
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then((res) => {
                if (res.ok) {
                    console.log(res);
                } else {
                    return res.json().then(data => {
                        // show an error modal
                        console.log(data);
                    });
                }
            })
        }
        setSuccesLogin(true);
        console.log("abcd");
    }


    return (
        <>
            <p>SignUp</p>
            <form onSubmit={submitHandler}>
                <div>
                    <input type="email" placeholder="email"
                        // value={email} 
                        // onChange={(event) => setEmail(event.target.value)} 
                        required ref={emailInputRef} />
                </div>
                <div>
                    <input type="password" placeholder="password"
                        //  value={password} onChange={(event) => setPassword(event.target.value)} 
                        required ref={passwordInputRef} />
                </div>
                <div>
                    <input type="password" placeholder="check password"
                        // value={checkPass} onChange={(event) => setCheckPass(event.target.value)}
                        required ref={checkpassword} />
                </div>
                <button type="submit">Login</button>
                <div>
                    <button>Forgot Password</button>
                </div>
                {/* <a>Forgot Password</a> */}
            </form>
            <div>
                <button>Don't have an account? signup</button>
            </div>
        </>
    )
}

export default SignUp;