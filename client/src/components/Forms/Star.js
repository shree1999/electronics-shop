import React from 'react';
import StarRating from 'react-star-ratings';

export const Star = ({ numberOfStars, handleSearch }) => (
  <>
    <StarRating
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor="red"
      changeRating={() => handleSearch(numberOfStars)}
    />
    <br />
  </>
);
