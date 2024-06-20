import { useEffect, useRef, useState } from "react";
import navcss from "./profile.module.css";
import { toast } from "react-toastify";
import { Link } from "react-router-dom/cjs/react-router-dom";

const Profile = () => {
  const fullNameRef = useRef();
  const urlRef = useRef();
  const [intialName, setIntialName] = useState("");
  const [intialUrl, setIntialUrl] = useState("");

  const updateFormDataHandler = (event) => {
    event.preventDefault();
    const nameRefValue = fullNameRef.current.value;
    const urlRefValue = urlRef.current.value;
    const localstr = localStorage.getItem("token");

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDS47Ym6s-wDxJWygBn8N98Gf8q3_fi7_E",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localstr,
          displayName: nameRefValue,
          photoUrl: urlRefValue,
          returnSecureToken: false,
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Authentication error");
        }
      })
      .then((res) => {
        console.log(res);
        setIntialName(res.displayName);
        toast("updation successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCKcB2kOdfnhOnnC789pc1BZXjZzebQnu0",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: localStorage.getItem("token"),
        }),
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Authentication error");
        }
      })
      .then((res) => {
        localStorage.setItem("username", res.users[0].displayName);
        setIntialName(res.users[0].displayName);
        setIntialUrl(res.users[0].photoUrl);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={navcss.container}>
      <div className={navcss.main}>
        <div>
          <h2>hii {intialName} !!</h2>
        </div>
        <form onSubmit={updateFormDataHandler} className={navcss.form}>
          <label>Full Name</label>
          <input type="text" ref={fullNameRef} defaultValue={intialName} />

          <label>Profile Photo URL</label>
          <input type="text" ref={urlRef} defaultValue={intialUrl} />

          <button>UPDATE</button>
        </form>
        <div className={navcss.Link}>
          <Link to="/welcome">Go back to Homepage</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
