import "../App.css";
import restaurants from "../assets/restaurants.json";
import StarRatingComponent from "react-star-rating-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                  <img
                    src={restaurant.thumbnail}
                    alt="restaurant"
                    className="restaurant-picture"
                  />
                  <div className="restaurant-name">{restaurant.name}</div>

                  <div className="review-section">
                    <StarRatingComponent
                      name="rate2"
                      editing={false}
                      renderStarIcon={() => (
                        <span>
                          <FontAwesomeIcon icon="star" />
                        </span>
                      )}
                      starCount={5}
                      value={restaurant.rating}
                    />
                    <span> {getRandomInt(500)} reviews</span>
                  </div>
                  <p className="restaurant-des">{restaurant.description}</p>
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
