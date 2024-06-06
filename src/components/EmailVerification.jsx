import { useSelector } from "react-redux";
import "../App.css";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const token = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  const handleVerifyMail = async () => {
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAam6zlCEcVQjbsT6Ih54ib0JoONOko2j8",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken: token,
            returnSecureToken: true,
          }),
        }
      );
      let data = await response.json();
      console.log(data);
      if (data.error) return alert(data.error.message);
      else {
        alert(
          "We have send you the verification link on your registered email. Please click on that link to verify your email. after verification Please login again."
        );
        navigate("/");
        console.log(data);
      }
    } catch (err) {
      //console.log(err, "Hello");
    }
  };

  return (
    <div className={theme ? "inProfile_container" : "inProfile_container_dark"}>
      <p className={theme ? "verify" : "verify_dark"}>
        VERIFY YOUR EMAIL ADDRESS
      </p>
      <p>Welcome to Expense Tracker App!</p>
      <p>
        Please click the button belowto confirm the email address and activate
        your account.
      </p>
      <br />
      <button
        className={theme ? "header_btn" : "header_btn_dark"}
        onClick={handleVerifyMail}
      >
        CONFIRM EMAIL
      </button>
    </div>
  );
};

export default EmailVerification;
