import "../App.css";
import StarRatings from "react-star-ratings";
import LinesEllipsis from "react-lines-ellipsis";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import cow from "../assets/head.jpeg";

const Home = (props) => {
  //states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [dataReview, setDataReview] = useState();

  //props
  const {
    search,
    setSearch,
    username,
    userFavorites,
    setUserFavorites,
    userToken,
  } = props;

  //Scroll restaurants sur la home
  const refHomeRestaurants = useRef(null);
  const scroll = (scrollOffeset) => {
    refHomeRestaurants.current.scrollLeft += scrollOffeset;
  };

  //Scroll top10 sur la home
  const refHomeTop = useRef(null);
  const scrollTop = (scrollOffeset) => {
    refHomeTop.current.scrollLeft += scrollOffeset;
  };

  //Scroll review
  const refReviews = useRef(null);
  const scrollReviews = (scrollOffeset) => {
    refReviews.current.scrollLeft += scrollOffeset;
  };

  //setting nombre de review
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //requête au chargement de la page
  useEffect(() => {
    //requête pour les restaurants
    try {
      const getRestaurants = async () => {
        if (search) {
          const response = await axios.get(
            `https://happycow.herokuapp.com/?search=${search}`
          );
          console.log("response.data getRestaurants==>", response.data);
          setData(response.data);
          setIsLoading(false);
        } else {
          const response = await axios.get("https://happycow.herokuapp.com/");
          console.log("response data getRestaurant==>", response.data);
          setData(response.data);
          setIsLoading(false);
        }
      };
      getRestaurants();
    } catch (error) {
      console.log("error getRestaurant Homepage==>", error.response);
    }
    //requête pour les reviews
    try {
      const getReviews = async () => {
        const response = await axios.get(
          "https://happycow.herokuapp.com/reviews"
        );
        console.log("response.data getReviews==>", response.data);
        setDataReview(response.data);
      };

      getReviews();
    } catch (error) {
      console.log("error getReviews Homepage==>", error.response);
    }
    if (username) {
      try {
        const getUser = async () => {
          const response = await axios.get(
            `https://happycow.herokuapp.com/my-account?username=${username}`
          );
          console.log("response userAccount home ==>", response.data);
          setUserFavorites(response.data.userAccount.favorites);
        };
        getUser();
      } catch (error) {
        console.log("error getUser==>", error.response);
      }
    }
  }, [search, username, setUserFavorites]);

  const handleClickAddFavorite = async (restaurantId) => {
    try {
      const response = await axios.post(
        "https://happycow.herokuapp.com/favorites",
        {
          username,
          restaurantId,
        }
      );
      console.log("favorites==>", response.data);
      setUserFavorites(response.data.favorites);
    } catch (error) {
      console.log("error Favorite request Homepage==>", error.response);
    }
  };

  return isLoading ? (
    <div>En cours de chargement ...</div>
  ) : (
    <div className="homepage">
      <Hero setSearch={setSearch} />
      <div className="container">
        <section className="all-restaurants">
          <div className="caroussel-header">
            <h2> All Vegan Food Restaurants</h2>
            <Link to={"/restaurants/all"} className="link-all-restaurants">
              <div
                onClick={() => {
                  setSearch("");
                }}
              >
                View all
              </div>
              <span>
                <FontAwesomeIcon icon="fa-solid fa-angle-right" />
              </span>
            </Link>
          </div>
          <div className="scroll-bloc">
            <button className="left-btn" onClick={() => scroll(-400)}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
            <div ref={refHomeRestaurants} className="restaurants-caroussel">
              {data.restaurants.map((restaurant, index) => {
                const description = JSON.stringify(restaurant.description);

                return (
                  <div key={restaurant.placeId}>
                    <div className="restaurants-section">
                      <div className="restaurant-card">
                        <div
                          className="favorite-btn"
                          onClick={() => handleClickAddFavorite(restaurant._id)}
                        >
                          {/* --> si l'id du restaurant est présent dans le tableau des favoris, alors l'icon est en rouge */}
                          {userToken ? (
                            userFavorites && (
                              <>
                                {" "}
                                {userFavorites.indexOf(restaurant._id) !==
                                -1 ? (
                                  <FontAwesomeIcon
                                    icon="fa-solid fa-heart"
                                    className="favorite"
                                  />
                                ) : (
                                  <FontAwesomeIcon
                                    icon="fa-solid fa-heart"
                                    className="favorite-false"
                                  />
                                )}
                              </>
                            )
                          ) : (
                            <FontAwesomeIcon
                              icon="fa-solid fa-heart"
                              className="favorite-false"
                            />
                          )}
                        </div>

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
                          <div className="restaurant-name">
                            {restaurant.name}
                          </div>
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
                        <div className="card-description">
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
            <button className="right-btn" onClick={() => scroll(400)}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
        </section>

        <section className="top-10">
          <div className="caroussel-header">
            <h2> 10 Best Vegan Restaurants</h2>
          </div>
          <div className="scroll-bloc">
            <button className="left-btn" onClick={() => scrollTop(-400)}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
            <div ref={refHomeTop} className="restaurants-caroussel">
              {data.ratingRestaurants.map((restaurant, index) => {
                const description = JSON.stringify(restaurant.description);

                return (
                  <div key={restaurant.placeId}>
                    <div className="restaurants-section">
                      <div className="restaurant-card">
                        <div
                          className="favorite-btn"
                          onClick={() => handleClickAddFavorite(restaurant._id)}
                        >
                          {userToken && userFavorites ? (
                            <>
                              {" "}
                              {userFavorites.indexOf(restaurant._id) !== -1 ? (
                                <FontAwesomeIcon
                                  icon="fa-solid fa-heart"
                                  className="favorite"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon="fa-solid fa-heart"
                                  className="favorite-false"
                                />
                              )}
                            </>
                          ) : (
                            <FontAwesomeIcon
                              icon="fa-solid fa-heart"
                              className="favorite-false"
                            />
                          )}
                        </div>
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
                          <div className="restaurant-name">
                            {restaurant.name}
                          </div>
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
                        <div className="card-description">
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
            <button className="right-btn" onClick={() => scrollTop(400)}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
        </section>
        <section className="home-review-section">
          <div className="caroussel-header">
            <h2>Latest reviews</h2>
          </div>
          <div className="scroll-bloc">
            <button className="left-btn" onClick={() => scrollReviews(-400)}>
              {" "}
              <FontAwesomeIcon icon="fa-solid fa-chevron-left" />
            </button>
            <div ref={refReviews} className="reviews-caroussel">
              {dataReview &&
                dataReview.map((review, index) => {
                  return (
                    <div key={review._id}>
                      <div className="reviews-card">
                        <div className="review-avatar">
                          <img src={cow} alt="" />
                          <div>
                            <p className="username">{review.username}</p>
                            <p>Wrote a review</p>
                          </div>
                        </div>

                        <p className="review-title">{review.reviewTitle}</p>
                        <p className="review-description">{review.review}</p>
                        <div className="review-rating">
                          <p>{review.name}</p>
                          <StarRatings
                            rating={review.rating}
                            starRatedColor="#f7cc02"
                            starDimension="17px"
                            starSpacing="1px"
                            numberOfStars={5}
                            name="rating"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <button className="right-btn" onClick={() => scrollReviews(400)}>
              <FontAwesomeIcon icon="fa-solid fa-chevron-right" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
