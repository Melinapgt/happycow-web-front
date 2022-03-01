import "../App.css";
import { useLocation } from "react-router-dom";
import restaurants from "../assets/restaurants.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import GoogleMapReact from "google-map-react";

const Restaurant = () => {
  const location = useLocation();
  const { placeId } = location.state;
  return (
    <div className="restaurant-page">
      <div className="container">
        <section>
          {restaurants.map((restaurant, index) => {
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
