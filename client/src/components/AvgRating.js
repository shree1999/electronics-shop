import React from 'react';
import StarRating from 'react-star-ratings';
// [1, 4, 6, 7]
// 1 + 4 = 5
// 5 + 6 = 11
// 11 + 7 = 18
export const showAverage = p => {
  if (p && p.ratings && p.ratings.length > 0) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map(r => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);

    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating
            starDimension="20px"
            starSpacing="2px"
            rating={result}
            starRatedColor="red"
            editing={false}
          />{' '}
          ({p.ratings.length})
        </span>
      </div>
    );
  } else {
    return '';
  }
};
