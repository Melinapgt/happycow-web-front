import { useState } from "react";
import "../App.css";
import picture from "../assets/vegan.jpg";
import cow from "../assets/head.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const LoginModal = (props) => {
  //props
  const { show, setShow, setUser, usernameStorage } = props;

  //states
  const [data, setData] = useState();
  const [loginWindow, setLoginWindow] = useState(true);
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [message, setMessage] = useState();
  const [created, setCreated] = useState(false);

  const handleClickClose = () => {
    setShow(false);
    setMessage("");
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

  //Requête à la soumission du formulaire d'inscription
  const handleSubmitSignup = async (event) => {
    event.preventDefault();
    try {
      if (email && username && password) {
        const response = await axios.post("http://localhost:3000/signup", {
          email,
          username,
          password,
        });
        console.log(response.data);

        setUser(response.data.token);
        usernameStorage(response.data.username);
        setData(response.data);
        setCreated(true);
      } else {
        setMessage("Please fill in all fields ");
      }
    } catch (error) {
      console.log("error.response signup==>", error.response);
      if (error.response) {
        if (error.response.status === 409) {
          setMessage(error.response.data.message);
        } else {
          setMessage(
            "error - please contact our customer service or try again later"
          );
        }
      }
    }
  };

  //Requête à la soumission du formulaire de connexion
  const handleClickLoginBtn = async (event) => {
    event.preventDefault();
    try {
      if (email && password) {
        const response = await axios.post("http://localhost:3000/login", {
          email,
          password,
        });
        console.log("response login==>", response.data);
        setUser(response.data.token);
        usernameStorage(response.data.username);
        setData(response.data);
        setShow(false);
      } else {
        setMessage("Please fill in all fields ");
      }
    } catch (error) {
      console.log("error.response login==>", error.response);
      if (error.response) {
        if (error.response.status === 401) {
          setMessage(error.response.data.message);
        }
      }
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
            {/* formulaire de connexion ---------*/}
            {loginWindow ? (
              <form className="modal-form">
                <p>Email</p>
                <input
                  type="text"
                  placeholder="Email"
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
                {message && <p className="error-message">{message}</p>}
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
              {
                /* formulaire de d'inscription ---------*/
              }(
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
                  {message && <p className="error-message">{message}</p>}
                  <div className="modal-btn">
                    <button type="submit">Sign Up</button>
                  </div>
                </form>
              )
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default LoginModal;
