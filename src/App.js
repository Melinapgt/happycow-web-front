import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";
import AllRestaurants from "./pages/AllRestaurants";
import ReviewsModal from "./components/ReviewsModal";
import MyAccount from "./pages/MyAccount";
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
  faPen,
  faChevronRight,
  faChevronLeft,
  faHeart,
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
  faAngleRight,
  faPen,
  faChevronLeft,
  faChevronRight,
  faHeart
);

function App() {
  //states
  const [show, setShow] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [usernameCookies, setUsernameCookies] = useState(
    Cookies.get("username") || null
  );
  const [search, setSearch] = useState("");
  const [userFavorites, setUserFavorites] = useState();

  //  envoi placeId en props pour le modal Review :
  const [placeIdReview, setPlaceIdReview] = useState();
  const [nameReview, setNameReview] = useState();

  //Cookies settings
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
          usernameStorage={usernameStorage}
        />
        <ReviewsModal
          showReviewForm={showReviewForm}
          setShowReviewForm={setShowReviewForm}
          username={usernameCookies}
          placeIdReview={placeIdReview}
          nameReview={nameReview}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                search={search}
                setSearch={setSearch}
                username={usernameCookies}
                userFavorites={userFavorites}
                setUserFavorites={setUserFavorites}
              />
            }
          />
          <Route
            path="/restaurant/:name"
            element={
              <Restaurant
                setShowReviewForm={setShowReviewForm}
                setPlaceIdReview={setPlaceIdReview}
                userToken={userToken}
                setShow={setShow}
                setNameReview={setNameReview}
              />
            }
          />
          <Route
            path="/restaurants/all"
            element={
              <AllRestaurants
                search={search}
                setSearch={setSearch}
                userFavorites={userFavorites}
                setUserFavorites={setUserFavorites}
                username={usernameCookies}
              />
            }
          />
          <Route
            path="/my-account"
            element={<MyAccount username={usernameCookies} />}
          />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
