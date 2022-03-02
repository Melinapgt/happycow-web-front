import "../App.css";
import { useLocation } from "react-router-dom";
import restaurants from "../assets/restaurants.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import GoogleMapReact from "google-map-react";
import axios from "axios";
import { useEffect, useState } from "react";

const Restaurant = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataRestaurant, setDataRestaurant] = useState();
  const location = useLocation();
  const { placeId } = location.state;

  useEffect(() => {
    const getRestaurant = async () => {
      const response = await axios.get("http://localhost:3000/", {
        placeId,
      });
      console.log(response.data);
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
          {dataRestaurant.map((restaurant, index) => {
            return (
              <div key={restaurant.placeId}>
                {placeId === restaurant.placeId && (
                  <div>
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
                        <p>{restaurant.phone}</p>
                      </div>
                      <div className="item-restaurant-infos">
                        <span>
                          <FontAwesomeIcon icon="location-dot" />
                        </span>
                        <span> FIND</span>
                        <p>{restaurant.address}</p>
                      </div>
                    </div>
                    <div className="bloc-text">
                      <p className="description">{restaurant.description}</p>
                    </div>

                    <div className="carrousel-restaurant-pictures">
                      {restaurant.pictures.map((picture, index) => {
                        return (
                          <div key={index}>
                            <div>
                              <img src={picture} alt="" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </section>
        <aside>
          {restaurants.map((restaurant, index) => {
            return (
              <div key={restaurant.placeId}>
                {placeId === restaurant.placeId && (
                  <div>
                    <div>map</div>
                    {/* price  */}
                    {restaurant.price !== null && <div></div>}

                    <div className="websites">
                      <div>
                        <span>
                          <FontAwesomeIcon icon="link" />
                        </span>
                        <a href={restaurant.website}>website</a>
                      </div>
                      <div>
                        lien fb
                        <a href={restaurant.facebook}>facebook</a>
                      </div>
                    </div>

                    <div>liste resto proches</div>
                  </div>
                )}
              </div>
            );
          })}
        </aside>
      </div>
    </div>
  );
};

export default Restaurant;
