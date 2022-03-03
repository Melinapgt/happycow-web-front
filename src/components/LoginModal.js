import { useState } from "react";
import "../App.css";
import picture from "../assets/vegan.jpg";
import cow from "../assets/head.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const LoginModal = (props) => {
  const { show, setShow, setUser, data, setData, usernameStorage } = props;
  const [loginWindow, setLoginWindow] = useState(true);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [created, setCreated] = useState(false);

  const handleClickClose = () => {
    setShow(false);
  };

  const handleClickSignUpText = () => {
    if (loginWindow === true) {
      setLoginWindow(false);
    }
  };

  const handleClickLoginText = () => {
    if (loginWindow === false) {
      setLoginWindow(true);
    }
  };

  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email,
        username,
        password,
      });
      console.log(response.data);
      console.log(response.status);
      setData(response.data);
      setUser(response.data.token);
      usernameStorage(response.data.username);
      if (response.status === 201) {
        setCreated(true);
      }
    } catch (error) {
      console.log("error.response signup==>", error.response);
    }
  };

  const handleClickLoginBtn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      console.log("response login==>", response.data);
      setUser(response.data.token);
      usernameStorage(response.data.username);
      setData(response.data);
      setShow(false);
    } catch (error) {
      console.log("error.response login==>", error.response);
    }
  };

  return (
    show && (
      <div className="modal">
        <div className="modal-container">
          <div className="modal-picture">
            <img src={picture} alt="" />
            <div className="picture-text">
              <div className="picture-text-title">HappyCow</div>
              <div className="picture-text-text">
                Join the largest vegan ans vegetarian community in the world
              </div>
            </div>
          </div>
          <div className="modal-content">
            <FontAwesomeIcon
              className="cross"
              icon="fa-solid fa-x"
              onClick={handleClickClose}
            />
            <div className="modal-header">
              {loginWindow ? (
                <>
                  <div className="focus-text" onClick={handleClickLoginText}>
                    Login
                  </div>
                  <div onClick={handleClickSignUpText}>Sign up</div>
                </>
              ) : (
                <>
                  <div onClick={handleClickLoginText}>Login</div>
                  <div className="focus-text" onClick={handleClickSignUpText}>
                    Sign up
                  </div>
                </>
              )}
            </div>
            {loginWindow ? (
              <form className="modal-form">
                <p>Username or Email</p>
                <input
                  type="text"
                  placeholder="Username or Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <p>Password</p>
                <input
                  type="text"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <div className="modal-btn">
                  <button onClick={handleClickLoginBtn}>Login</button>
                </div>
              </form>
            ) : created ? (
              <div className="welcome">
                <img src={cow} alt="" />
                <div>Welcome {data.username} !</div>
                <p>{data.message}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitSignup} className="modal-form">
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                <p>Username</p>
                <input
                  type="text"
                  placeholder="Username"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                />
                <p>Password</p>
                <input
                  type="text"
                  placeholder="Password"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                />
                <div className="modal-btn">
                  <button type="submit">Sign Up</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default LoginModal;
