import "../App.css";
import logo from "../assets/logo.gif";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>

      <div className="header-btn">
        <button>Login | Join </button>
      </div>
    </div>
  );
};

export default Header;
