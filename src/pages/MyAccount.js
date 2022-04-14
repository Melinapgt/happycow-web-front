import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import "../App.css";

const MyAccount = (props) => {
  //props
  const { username } = props;

  //states
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  //paramétrage du nombre de reviews aléatoire
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  //requête au chargement de la page pour récupérer les restaurants favoris de l'utilisateur
  useEffect(() => {
    try {
      const getUserAccount = async () => {
        const response = await axios.get(
          `http://localhost:3000/my-account?username=${username}`
        );
        console.log("reponse getUserAccount ==>", response.data);
        setData(response.data);
        setIsLoading(false);
      };
      getUserAccount();
    } catch (error) {
      console.log("error getUserAccount ==>", error.response);
    }
  }, [username]);

  return isLoading ? (
    <div>En cours de chargement...</div>
  ) : (
    <div className="account-page">
      <div className="container">
        <h2>My Favorites Vegan Restaurants ❤️</h2>
        <section className="favorites-section">
          {data.favoritesRestaurants.map((restaurant, index) => {
            return (
              <div key={restaurant._id}>
                <div className="favorite-card">
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
            );
          })}
        </section>
      </div>
    </div>
  );
};

export default MyAccount;
