import "../App.css";
import restaurants from "../assets/restaurants.json";
import StarRatings from "react-star-ratings";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";

const Home = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  return (
    <div className="homepage">
      <div className="container">
        {restaurants.map((restaurant, index) => {
          return (
            <div key={restaurant.placeId}>
              <div className="restaurants-section">
                <div className="home-restaurant-card">
                  <Link
                    className="link-restaurant"
                    to={`/restaurant/${restaurant.name}`}
                    state={{
                      name: restaurant.name,
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
                      name: restaurant.name,
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
                  <p className="restaurant-des">{restaurant.description}</p>
                  {/* <div>
                    <LinesEllipsis
                      text={restaurant.description}
                      maxLine="3"
                      ellipsis="..."
                      trimRight
                      basedOn="letters"
                    />
                  </div> */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      Home Component
    </div>
  );
};

export default Home;
