import "../App.css";
import logo from "../assets/logo.gif";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  //props
  const { setShow, setUser, userToken, usernameCookies } = props;

  //hook settings
  const navigate = useNavigate();

  // console.log(location);

  const handleClick = () => {
    setShow(true);
  };

  const handleClickAccount = () => {
    navigate("/my-account");
  };

  const handleClickLogout = () => {
    setUser(null);
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      <div className="header-btn">
        {userToken ? (
          <div className="connected">
            <div className="welcome-back">Hi {usernameCookies} !</div>
            <button onClick={handleClickAccount}>My Account</button>
            <button onClick={handleClickLogout}>Logout</button>
          </div>
        ) : (
          <button onClick={handleClick}>Login | Join </button>
        )}
      </div>
    </div>
  );
};

export default Header;
