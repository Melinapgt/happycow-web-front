import "../App.css";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import GoogleMapReact from "google-map-react";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import GoogleMapReact from "google-map-react";
import cow from "../assets/head.jpeg";
import StarRatings from "react-star-ratings";
import veganIcon from "../assets/Vegan.png";

const Restaurant = (props) => {
  //props
  const {
    setShowReviewForm,
    setPlaceIdReview,
    userToken,
    setShow,
    setNameReview,
  } = props;

  //States
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [dataReview, setDataReview] = useState();
  const [message, setMessage] = useState("");

  //hook settings
  const location = useLocation();
  const { placeId } = location.state;

  //map setting
  const RestaurantMarker = ({ text }) => (
    <div>
      <img src={veganIcon} alt="" className="marker" />
    </div>
  );

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  //   console.log("placeId==>", placeId);
  //   const restaurant = dataRestaurant.restaurant;
  //   console.log(restaurant);

  //Scroll photos restaurants
  const refPicturesRestraurant = useRef(null);
  const scrollPictures = (scrollOffeset) => {
    refPicturesRestraurant.current.scrollLeft += scrollOffeset;
  };

  //requête au chargement de la page
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

    const getReviews = async () => {
      const response = await axios.get(
        `http://localhost:3000/reviews/restaurant?placeId=${placeId}`
      );
      console.log("response getReview restaurant==>", response.data);
      // console.log(response.status);
      if (response.status === 200) {
        setDataReview(response.data);
      } else if (response.status === 204) {
        setMessage("No review for now, write a review");
      }
    };

    getReviews();
  }, [placeId]);

  const handleClickAddReview = () => {
    if (userToken) {
      setShowReviewForm(true);
      setPlaceIdReview(placeId);
      setNameReview(data.restaurant.name);
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
        <div className="section-content">
          <section className="section-restaurant">
            <div className="restaurant-infos">
              <div className="item-restaurant-infos">
                <span>
                  <FontAwesomeIcon
                    icon="clock"
                    className="restaurant-infos--icon"
                  />
                </span>
                <span>OPENING HOURS</span>
              </div>
              <div className="item-restaurant-infos">
                <div>
                  <FontAwesomeIcon
                    icon="phone"
                    className="restaurant-infos--icon"
                  />
                </div>
                <div>
                  <div> CONTACT</div>
                  <p>{data.restaurant.phone}</p>
                </div>
              </div>
              <div className="item-restaurant-infos">
                <div>
                  <FontAwesomeIcon
                    icon="location-dot"
                    className="restaurant-infos--icon"
                  />
                </div>
                <div>
                  <span> FIND</span>
                  <p>{data.restaurant.address}</p>
                </div>
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
            <div className="scroll-bloc">
              <button className="left-btn" onClick={() => scrollPictures(-400)}>
                {" "}
                <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
              </button>
              <div
                ref={refPicturesRestraurant}
                className="caroussel-restaurant-pictures"
              >
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
              <button className="right-btn" onClick={() => scrollPictures(400)}>
                <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
              </button>
            </div>
          </section>
          <section className="section-reviews">
            <h2>Reviews</h2>
            {dataReview ? (
              <>
                {dataReview.map((review, index) => {
                  return (
                    <div key={review._id}>
                      <div className="review-bloc">
                        <div className="review-bloc--header">
                          <img src={cow} alt="" />
                          <div>
                            <p>{review.username}</p>
                            <div className="username-category">Vegan</div>
                          </div>
                        </div>
                        <div className="review-bloc--content">
                          <StarRatings
                            rating={review.rating}
                            starRatedColor="#f7cc02"
                            starDimension="22px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name="rating"
                          />
                          <p className="review-bloc-content--title">
                            {review.reviewTitle}
                          </p>
                          <p>{review.review}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="noreview-bloc">
                <p>{message}</p>
              </div>
            )}

            <div></div>
          </section>
        </div>

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
                    <FontAwesomeIcon icon="link" className="link-icon" />
                  </span>
                  {/* <a href={data.restaurant.website}>website</a> */}
                  <a href={data.restaurant.website}>
                    {data.restaurant.website}
                  </a>
                </div>
                <div>
                  <span className="fb-icon">
                    <i class="devicon-facebook-plain"></i>
                  </span>
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
                      {/* <Link
                        className="link-restaurant"
                        to={`/restaurant/${nearbyRestaurant.name}`}
                        state={{
                          placeId: nearbyRestaurant.placeId,
                        }}
                        // onClick={refreshPage}
                      > */}
                      <p>{nearbyRestaurant.name}</p>
                      {/* </Link> */}
                      <div>
                        <StarRatings
                          rating={nearbyRestaurant.rating}
                          starRatedColor="#f7cc02"
                          starDimension="15px"
                          starSpacing="1px"
                          numberOfStars={5}
                          name="rating"
                        />
                      </div>
                      <p>{nearbyRestaurant.address}</p>
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
