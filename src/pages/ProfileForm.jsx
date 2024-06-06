import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../App.css";
import { AuthActions } from "../store/store";

const ProfileForm = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const dName = useSelector((state) => state.auth.name);
  const theme = useSelector((state) => state.theme.theme);

  let image = useSelector((state) => state.auth.image);
  if (!image) image = "https://rb.gy/gjs9fn";

  const [name, setName] = useState(dName);
  const [profileURL, setProfileURL] = useState(image);

  const handleCancel = () => {
    navigate("/");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAam6zlCEcVQjbsT6Ih54ib0JoONOko2j8",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: token,
            displayName: name,
            photoUrl: profileURL,
            returnSecureToken: true,
          }),
        }
      );
      let data = await response.json();
      if (data.error) return alert(data.error.message);
      else {
        //console.log(data);
        dispatch(
          AuthActions.update({ name: data.displayName, url: data.photoUrl })
        );
        setName("");
        setProfileURL("");
        navigate("/");
      }
    } catch (err) {
      //console.log(err, "Hello");
    }
  };

  return (
    <div className={theme ? "pu_container" : "pu_container_dark"}>
      <form action="" onSubmit={(e) => submitHandler(e)}>
        <div className={theme ? "pu_input" : "pu_input_dark"}>
          <div className="a_l">
            <h2>Contact Details</h2>
            <p className="a_l">Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <br />
            <p className="a_l">Profile Photo URL</p>
            <input
              type="text"
              value={profileURL}
              onChange={(e) => setProfileURL(e.target.value)}
            />
            <br />
            <br />
            <div
              className={theme ? "pu_btn_container" : "pu_btn_container_dark"}
            >
              <button
                onClick={handleCancel}
                className={
                  theme ? "header_btn pu_btn" : "header_btn pu_btn_dark"
                }
              >
                Cancel
              </button>
              <button
                type="submit"
                className={
                  theme ? "header_btn pu_btn" : "header_btn pu_btn_dark"
                }
              >
                Update
              </button>
            </div>
          </div>
          <div
            className={theme ? "pu_image_container" : "pu_image_container_dark"}
          >
            <img src={image} alt="Hello" />
          </div>
        </div>
        <br />
      </form>
    </div>
  );
};

export default ProfileForm;
