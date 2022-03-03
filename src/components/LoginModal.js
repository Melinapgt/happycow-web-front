import { useState } from "react";
import "../App.css";
import picture from "../assets/vegan.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginModal = (props) => {
  const { show, setShow } = props;
  const [loginWindow, setLoginWindow] = useState(true);

  const handleClickLoginBtn = () => {};

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
                <input type="text" placeholder="Username or Email" />
                <p>Password</p>
                <input type="text" placeholder="Password" />
                <div className="modal-btn">
                  <button onClick={handleClickLoginBtn}>Login</button>
                </div>
              </form>
            ) : (
              <form className="modal-form">
                <p>Email</p>
                <input type="text" placeholder="Email" />
                <p>Username</p>
                <input type="text" placeholder="Username" />
                <p>Password</p>
                <input type="text" placeholder="Password" />
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
