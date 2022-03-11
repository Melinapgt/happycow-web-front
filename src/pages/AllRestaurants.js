import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import GoogleMapReact from "google-map-react";
import veganIcon from "../assets/Vegan.png";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const AllRestaurants = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const { search, setSearch } = props;

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;
  const RestaurantMarker = ({ text }) => (
    <div>
      <img src={veganIcon} alt="" className="marker-all" />
    </div>
  );
  const center = { lat: 48.856614, lng: 2.3522219 };
  // Pour la page max : nombres de collections par le nombre de restaurants par page
  const pageMax = 924 / 20;

  useEffect(() => {
    const fetchData = async () => {
      if (search) {
        const response = await axios.get(
          `http://localhost:3000/restaurants/all?page=${page}&search=${search}`
        );
        console.log("response getSearchRestaurant==>", response.data);
        setData(response.data);
      } else {
        const response = await axios.get(
          `http://localhost:3000/restaurants/all?page=${page}`
        );
        console.log("response all restaurants==>", response.data);
        setData(response.data);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, search]);

  return isLoading ? (
    <div>En cours de chargement</div>
  ) : (
    <div className="all-restaurants-page">
      <Hero setSearch={setSearch} />
      <div className="container">
        <section className="all-restaurants-section">
          <div className="pages">
            {page > 1 && (
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
              </button>
            )}
            <div>
              {page - 1 > 0 && (
                <span
                  className="prev"
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  {page - 1}
                </span>
              )}
              <span className="current-page">{page}</span>
              {page < Math.ceil(pageMax) && (
                <span
                  className="next"
                  onClick={() => {
                    setPage(page + 1);
                  }}
                >
                  {page + 1}
                </span>
              )}
            </div>
            {page < Math.ceil(pageMax) && (
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </button>
            )}
          </div>
          <div className="all-restaurants-list">
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
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="restaurants-map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
            defaultCenter={center}
            defaultZoom={13}
          >
            {data.map((restaurant, index) => {
              return (
                <RestaurantMarker
                  key={index}
                  lat={restaurant.location.lat}
                  lng={restaurant.location.lng}
                  text=""
                />
              );
            })}
          </GoogleMapReact>
          map
        </section>
      </div>
    </div>
  );
};

export default AllRestaurants;
