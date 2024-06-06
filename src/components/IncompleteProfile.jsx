import { useNavigate } from "react-router-dom";
import "../App.css";
import { useSelector } from "react-redux";

const IncompleteProfile = () => {
  const theme = useSelector((state) => state.theme.theme);

  const navigate = useNavigate();
  const handleComplete = () => {
    navigate("/profileForm");
  };

  return (
    <div className={theme ? "inProfile_container" : "inProfile_container_dark"}>
      <p>Welcome to Expense Tracker App!</p>
      <p>
        Your profile is 64% complete. A complete profile have chances to get
        free subscription and offers.
      </p>
      <button
        className={theme ? "header_btn" : "header_btn_dark"}
        onClick={handleComplete}
      >
        Complete Now !
      </button>
    </div>
  );
};

export default IncompleteProfile;
