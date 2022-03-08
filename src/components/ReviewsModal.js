import "../App.css";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import cow from "../assets/head.jpeg";

const ReviewsModal = (props) => {
  const { showReviewForm, setShowReviewForm, username, placeIdReview } = props;
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState("");
  const [review, setReview] = useState("");
  const [submit, setSubmit] = useState(false);
  const [data, setData] = useState();

  const handleClickClose = () => {
    setShowReviewForm(false);
  };

  const changeRating = (newRating) => {
    setRating(newRating);
  };

  const handleChangeReviewTitle = (event) => {
    setReviewTitle(event.target.value);
  };

  const handleChangeReview = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await axios.post("http://localhost:3000/review", {
      rating,
      review,
      reviewTitle,
      username,
      placeIdReview,
    });
    console.log("response review==>", response.data);
    setData(response.data);
    setSubmit(true);
  };

  return (
    showReviewForm && (
      <div className="modal-review">
        <div className="modal-container">
          {submit ? (
            <div className="modal-content">
              <div className="thankyou">
                <FontAwesomeIcon
                  className="cross"
                  icon="fa-solid fa-x"
                  onClick={handleClickClose}
                />
                <img src={cow} alt="" />
                <div>
                  Thank you <span>{username} </span> !
                </div>
                <p>{data.message}</p>
              </div>
            </div>
          ) : (
            <div className="modal-content">
              <FontAwesomeIcon
                className="cross"
                icon="fa-solid fa-x"
                onClick={handleClickClose}
              />
              <h2>Write a review</h2>
              <form onSubmit={handleSubmit}>
                <div className="rating-section">
                  <p>Overall rating</p>
                  <StarRatings
                    rating={rating}
                    changeRating={changeRating}
                    starHoverColor="#f7cc02"
                    starRatedColor="#f7cc02"
                    starDimension="30px"
                    starSpacing="1px"
                    numberOfStars={5}
                    name="rating"
                  />
                </div>
                <p>Review Title</p>
                <input
                  type="text"
                  placeholder="How would you sum it up?"
                  onChange={handleChangeReviewTitle}
                />
                <p>My review</p>
                <textarea
                  name="review"
                  id=""
                  cols="30"
                  rows="10"
                  placeholder="What did you think about the venue, service, food, price ? Give us all the details !"
                  onChange={handleChangeReview}
                ></textarea>
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default ReviewsModal;
