import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Restaurant from "./pages/Restaurant";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faStar,
  faPhone,
  faLocationDot,
  faClock,
  faLink,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import LoginModal from "./components/LoginModal";
library.add(faStar, faPhone, faLocationDot, faClock, faLink, faMagnifyingGlass);

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <LoginModal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:name" element={<Restaurant />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
