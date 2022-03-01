import "../App.css";
import logo from "../assets/logo.gif";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const location = useLocation();
  console.log(location);
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
        <button>Login | Join </button>
      </div>
    </div>
  );
};

export default Header;
