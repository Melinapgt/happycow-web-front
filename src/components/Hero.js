import "../App.css";
import muesli from "../assets/muesli.jpg";
const Hero = (props) => {
  //props
  const { setSearch } = props;

  //barre de recherche
  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="hero">
      <img src={muesli} alt="" />
      <div className="hero-search">
        <h1>Find Vegan Restaurants Nearby</h1>
        <input type="text" placeholder="Search" onChange={handleChange} />
      </div>
    </div>
  );
};

export default Hero;
