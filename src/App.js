import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import AllRestaurants from "./pages/AllRestaurants";
import { useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import Cookies from "js-cookie";
import {
  faStar,
  faPhone,
  faLocationDot,
  faClock,
  faLink,
  faMagnifyingGlass,
  faX,
  faCamera,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./components/LoginModal";
library.add(
  faStar,
  faPhone,
  faLocationDot,
  faClock,
  faLink,
  faMagnifyingGlass,
  faX,
  faCamera,
  faAngleRight
);

function App() {
  const [show, setShow] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [data, setData] = useState();
  const [usernameCookies, setUsernameCookies] = useState(
    Cookies.get("username") || null
  );
  const [search, setSearch] = useState("");

  const setUser = (userToken) => {
    if (userToken) {
      Cookies.set("userToken", userToken, { expires: 30 });
    } else {
      Cookies.remove("userToken");
    }
    setUserToken(userToken);
  };
  const usernameStorage = (username) => {
    if (username) {
      Cookies.set("username", username, { expires: 30 });
    } else {
      Cookies.remove("username");
    }
    setUsernameCookies(username);
  };

  return (
    <div className="app">
      <Router>
        <Header
          setShow={setShow}
          userToken={userToken}
          setUser={setUser}
          usernameCookies={usernameCookies}
        />
        <LoginModal
          show={show}
          setShow={setShow}
          setUser={setUser}
          data={data}
          setData={setData}
          usernameStorage={usernameStorage}
        />
        <Routes>
          <Route
            path="/"
            element={<Home search={search} setSearch={setSearch} />}
          />
          <Route path="/restaurant/:name" element={<Restaurant />} />
          <Route
            path="/restaurants/all"
            element={<AllRestaurants search={search} setSearch={setSearch} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
