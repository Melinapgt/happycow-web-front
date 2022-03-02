import "../App.css";
import picture from "../assets/vegan.jpg";

const LoginModal = () => {
  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-picture">
          {" "}
          <img src={picture} alt="" />
        </div>
        <div className="modal-content">
          <div className="modal-header">
            <p>Login</p>
            <p>Sign up</p>
          </div>
          <div className="modal-form">
            <p>Username or Email</p>
            <input type="text" placeholder="Username or Email" />
            <p>Password</p>
            <input type="text" placeholder="Password" />
          </div>
          <div className="modal-btn">
            <button>Login</button>
            <button>Close</button>
          </div>
        </div>
      </div>
      LoginModal Component
    </div>
  );
};

export default LoginModal;
