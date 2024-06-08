import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const theme = useSelector((state) => state.theme.theme);

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleResetEmail = async () => {
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS47Ym6s-wDxJWygBn8N98Gf8q3_fi7_E",
        {
          method: "POST",
          body: JSON.stringify({
            email: name,
            requestType: "PASSWORD_RESET",
          }),
        }
      );
      let data = await response.json();
      if (data.error) return alert(data.error.message);
      else {
        alert("Password reset link has sent to the registered email!");
      }
    } catch (err) {
      //console.log(err, "Hello");
    }

    navigate("/");
  };

  return (
    <div className={theme ? "forget_div" : "forget_div_dark"}>
      <div>
        <p>Enter email to set the new password.</p>
        <input
          type="text"
          value={name}
          placeholder="Email"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <br />
      <button onClick={handleResetEmail}>Submit</button>
    </div>
  );
};

export default ForgetPassword;
