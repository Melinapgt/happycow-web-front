import "../App.css";
import burger from "../assets/burger.jpg";
import muesli from "../assets/muesli.jpg";
const Hero = () => {
  return (
    <div className="hero">
      <img src={muesli} alt="" />
      <div className="hero-search">
        <h1>Find Vegan Restaurants Nearby</h1>
        <input type="text" placeholder="Search" />
      </div>
    </div>
  );
};

export default Hero;
