import "../App.css";
import logo from "../assets/logo.gif";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = (props) => {
  const location = useLocation();
  const { setShow, setUser, userToken, usernameCookies } = props;
  // console.log(location);

  const handleClick = () => {
    setShow(true);
  };

  const handleClickLogout = () => {
    setUser(null);
  };

  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      {location.pathname === "/" && (
        <div>
          <span>
            <FontAwesomeIcon icon="magnifying-glass" />
          </span>
          <input type="text" placeholder="Recherche" />
        </div>
      )}

      <div className="header-btn">
        {userToken ? (
          <div className="connected">
            <div className="welcome-back">Hi {usernameCookies} !</div>
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
