import { useDispatch, useSelector } from "react-redux";
import { AuthActions, ThemeActions } from "../store/store";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [light, setLight] = useState(true);

  const dispatch = useDispatch();
  const displayName = useSelector((state) => state.auth.name);
  const token = useSelector((state) => state.auth.token);
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();

  const handleLogout = () => {
    if (!token) {
      navigate("/");
    } else dispatch(AuthActions.logout());
  };

  const handleProfile = () => {
    navigate("/profileForm");
  };

  const handleTheme = () => {
    dispatch(ThemeActions.changeTheme());
    setLight((pre) => !pre);
  };

  return (
    <>
      <div className="theme_container">
        <button onClick={handleTheme}>
          {light ? "Dark Theme" : "Light Theme"}
        </button>
      </div>
      <div className={theme ? "header_container" : "header_container_dark"}>
        <div>
          <p className={theme ? "logo" : "logo_dark"}>ExpenseTracker</p>
        </div>
        <div className={theme ? "header_name" : "header_name_dark"}>
          <div
            className={theme ? "user_name" : "user_name_dark"}
            onClick={handleProfile}
          >{`Hello ${displayName} !`}</div>
          <button
            className={theme ? "header_btn" : "header_btn_dark"}
            onClick={handleLogout}
          >
            {token ? "Logout" : "Login"}
          </button>
        </div>
      </div>
      <div className={theme ? "quote" : "quote_dark"}>
        Winners never quite, Quiteers never wins.
      </div>
    </>
  );
};

export default Header;
