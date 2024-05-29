import { useState, useRef } from "react";

const SignUp = () => {
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
                     required ref={passwordInputRef}/>
                </div>
                <div>
                    <input type="password" placeholder="check password" 
                    // value={checkPass} onChange={(event) => setCheckPass(event.target.value)}
                     required ref={checkpassword} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

export default SignUp;