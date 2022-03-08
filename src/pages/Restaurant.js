import "../App.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import GoogleMapReact from "google-map-react";
import axios from "axios";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import cow from "../assets/head.jpeg";

const Restaurant = (props) => {
  const { setShowReviewForm, setPlaceIdReview, userToken, setShow } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const location = useLocation();
  const { placeId } = location.state;
  const RestaurantMarker = ({ text }) => <div className="marker">{text}</div>;

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  //   console.log("placeId==>", placeId);
  //   const restaurant = dataRestaurant.restaurant;
  //   console.log(restaurant);

  useEffect(() => {
    const getRestaurant = async () => {
      const response = await axios.get(
        `http://localhost:3000/restaurant?placeId=${placeId}`
      );
      console.log("response restaurant==>", response.data);
      setData(response.data);
      setIsLoading(false);
    };
    getRestaurant();
  }, [placeId]);

  const handleClickAddReview = () => {
    if (userToken) {
      setShowReviewForm(true);
      setPlaceIdReview(placeId);
    } else {
      setShow(true);
    }
  };

  return isLoading ? (
    <div>En cours de chargement ...</div>
  ) : (
    <div className="restaurant-page">
      <div className="banner">
        <div className="banner-container">
          <h1>{data.restaurant.name}</h1>
        </div>
      </div>
      <div className="container">
        <section>
          <div className="restaurant-infos">
            <div className="item-restaurant-infos">
              <span>
                <FontAwesomeIcon icon="clock" />
              </span>
              <span>OPENING HOURS</span>
            </div>
            <div className="item-restaurant-infos">
              <span>
                <FontAwesomeIcon icon="phone" />
              </span>
              <span> CONTACT</span>
              <p>{data.restaurant.phone}</p>
            </div>
            <div className="item-restaurant-infos">
              <span>
                <FontAwesomeIcon icon="location-dot" />
              </span>
              <span> FIND</span>
              <p>{data.restaurant.address}</p>
            </div>
          </div>
          <div className="bloc-text">
            <p className="description">{data.restaurant.description}</p>
          </div>
          <div className="restaurant-caroussel-header">
            <button onClick={handleClickAddReview}>
              {" "}
              <span>
                <FontAwesomeIcon icon="fa-solid fa-pen" />
              </span>{" "}
              Add Review
            </button>
            <div className="photos-number">
              <span>{data.restaurant.pictures.length} pictures</span>
              <span>
                <FontAwesomeIcon icon="fa-solid fa-camera" />
              </span>
            </div>
          </div>

          <div className="carrousel-restaurant-pictures">
            {data.restaurant.pictures.map((picture, index) => {
              return (
                <div key={index}>
                  <div>
                    <img src={picture} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <aside>
          <div className="aside-bloc1">
            {/* map */}
            <div className="restaurant-map">
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                defaultCenter={data.restaurant.location}
                defaultZoom={11}
              >
                <RestaurantMarker
                  lat={data.restaurant.location.lat}
                  lng={data.restaurant.location.lng}
                  text=""
                />
              </GoogleMapReact>
            </div>
            <div className="bloc-text">
              {/* price  */}
              {data.restaurant.price !== null && <div></div>}

              <div className="websites">
                <div>
                  <span>
                    <FontAwesomeIcon icon="link" />
                  </span>
                  <a href={data.restaurant.website}>website</a>
                </div>
                <div>
                  lien fb
                  <a href={data.restaurant.facebook}>facebook</a>
                </div>
              </div>
            </div>
          </div>
          <div className="aside-bloc2">
            <h3>Nearby Listings</h3>
            {data.nearbyRestaurants.map((nearbyRestaurant, index) => {
              return (
                <div key={nearbyRestaurant.placeId}>
                  <div className="nearby-restaurant-card">
                    {nearbyRestaurant.thumbnail ? (
                      <img src={nearbyRestaurant.thumbnail} alt="" />
                    ) : (
                      <img src={cow} alt="" />
                    )}

                    <div>
                      <p>{nearbyRestaurant.name}</p>
                      <div>reviews</div>
                      <div>{nearbyRestaurant.address}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Restaurant;
