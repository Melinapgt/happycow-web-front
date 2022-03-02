import "../App.css";
import StarRatings from "react-star-ratings";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataRestaurant, setDataRestaurant] = useState();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  useEffect(() => {
    const getRestaurants = async () => {
      const response = await axios.get("http://localhost:3000/");
      console.log(response.data);
      setDataRestaurant(response.data);
      setIsLoading(false);
    };
    getRestaurants();
  }, []);

  return isLoading ? (
    <div>En cours de chargement ...</div>
  ) : (
    <div className="homepage">
      <Hero />
      <div className="container">
        {dataRestaurant.map((restaurant, index) => {
          const description = JSON.stringify(restaurant.description);

          return (
            <div key={restaurant.placeId}>
              <div className="restaurants-section">
                <div className="home-restaurant-card">
                  <Link
                    className="link-restaurant"
                    to={`/restaurant/${restaurant.name}`}
                    state={{
                      placeId: restaurant.placeId,
                    }}
                  >
                    <img
                      src={restaurant.thumbnail}
                      alt="restaurant"
                      className="restaurant-picture"
                    />
                  </Link>
                  <Link
                    className="link-restaurant"
                    to={`/restaurant/${restaurant.name}`}
                    state={{
                      placeId: restaurant.placeId,
                    }}
                  >
                    <div className="restaurant-name">{restaurant.name}</div>
                  </Link>

                  <div className="review-section">
                    <StarRatings
                      rating={restaurant.rating}
                      starRatedColor="#f7cc02"
                      starDimension="17px"
                      starSpacing="1px"
                      numberOfStars={5}
                      name="rating"
                    />
                    <span> {getRandomInt(500)} reviews</span>
                  </div>
                  {/* <p className="restaurant-des">{restaurant.description}</p> */}
                  <div className="homepage-description">
                    <LinesEllipsis
                      text={description}
                      maxLine="3"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
