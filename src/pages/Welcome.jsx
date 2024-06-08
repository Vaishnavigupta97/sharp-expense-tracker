import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleComplete = () => {
    navigate("/profileForm");
  };

  const handleVerifyMail = async () => {
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDS47Ym6s-wDxJWygBn8N98Gf8q3_fi7_E",
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
      if (data.error) return alert(data.error.message);
      else {
        //alert("You have successfully registred!");
        console.log(data);
      }
    } catch (err) {
      //console.log(err, "Hello");
    }
  };
  return (   

    <div>

      Welcome to Expense Tracker App!

      <p>
        Your profile is incomplete!{" "}
        <button onClick={handleComplete}>complete now!</button>
      </p>

      <button onClick={handleVerifyMail}>Verify your email</button>

    </div>

  );
  
};


export default Welcome;
