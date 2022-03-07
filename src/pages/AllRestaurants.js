import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import StarRatings from "react-star-ratings";
// import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const AllRestaurants = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3000/restaurants/all");
      console.log("response all restaurants==>", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="all-restaurants-page">
      <Hero />
      <div className="container">
        <section className="all-restaurants-section">
          {data.map((restaurant, index) => {
            // const description = JSON.stringify(restaurant.description);
            return (
              <div key={restaurant.placeId}>
                <div className="restaurants-section">
                  <div className="restaurant-card">
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

                    {/* <div className="card-description">
                      <LinesEllipsis
                        text={description}
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
        </section>
        <section className="all-restaurants-map">map</section>
      </div>
    </div>
  );
};

export default AllRestaurants;
