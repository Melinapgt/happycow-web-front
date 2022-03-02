import "../App.css";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import GoogleMapReact from "google-map-react";
import axios from "axios";
import { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";

const Restaurant = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataRestaurant, setDataRestaurant] = useState();
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
      setDataRestaurant(response.data);
      setIsLoading(false);
    };
    getRestaurant();
  }, [placeId]);

  return isLoading ? (
    <div>En cours de chargement ...</div>
  ) : (
    <div className="restaurant-page">
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
              <p>{dataRestaurant.phone}</p>
            </div>
            <div className="item-restaurant-infos">
              <span>
                <FontAwesomeIcon icon="location-dot" />
              </span>
              <span> FIND</span>
              <p>{dataRestaurant.address}</p>
            </div>
          </div>
          <div className="bloc-text">
            <p className="description">{dataRestaurant.description}</p>
          </div>

          <div className="carrousel-restaurant-pictures">
            {dataRestaurant.pictures.map((picture, index) => {
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
          <div>
            {/* map */}
            <div className="restaurant-map">
              <GoogleMapReact
                bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
                defaultCenter={dataRestaurant.location}
                defaultZoom={11}
              >
                <RestaurantMarker
                  lat={dataRestaurant.location.lat}
                  lng={dataRestaurant.location.lng}
                  text=""
                />
              </GoogleMapReact>
            </div>
            <div className="bloc-text">
              {/* price  */}
              {dataRestaurant.price !== null && <div></div>}

              <div className="websites">
                <div>
                  <span>
                    <FontAwesomeIcon icon="link" />
                  </span>
                  <a href={dataRestaurant.website}>website</a>
                </div>
                <div>
                  lien fb
                  <a href={dataRestaurant.facebook}>facebook</a>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div>liste resto proches</div>
      </div>
    </div>
  );
};

export default Restaurant;
