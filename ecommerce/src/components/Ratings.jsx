import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const Ratings = ({ rating, numReviews }) => {
  return (
    <div className="flex justify-between">
      <div className="flex pt-1">
        <span>
          <i>
            {rating >= 1 ? <FaStar /> : rating >= 0.5 ? <FaStarHalf /> : null}
          </i>
        </span>
        <span>
          <i>
            {rating >= 2 ? <FaStar /> : rating >= 1.5 ? <FaStarHalf /> : null}
          </i>
        </span>
        <span>
          <i>
            {rating >= 3 ? <FaStar /> : rating >= 2.5 ? <FaStarHalf /> : null}
          </i>
        </span>
        <span>
          <i>
            {rating >= 4 ? <FaStar /> : rating >= 3.5 ? <FaStarHalf /> : null}
          </i>
        </span>
        <span>
          <i>
            {rating >= 5 ? <FaStar /> : rating >= 4.5 ? <FaStarHalf /> : null}
          </i>
        </span>
      </div>
      <p className="font-bold pl-1">{numReviews} Reviews</p>
    </div>
  );
};

export default Ratings;
