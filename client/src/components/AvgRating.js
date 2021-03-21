import React from 'react';
import StarRating from 'react-star-ratings';
// [1, 4, 6, 7]
// 1 + 4 = 5
// 5 + 6 = 11
// 11 + 7 = 18
export const showAverage = p => {
  if (p && p.ratings) {
    let ratingsArray = p.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map(r => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);

    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    return (
      <div className="text-center pt-1 pb-3">
        <span>
          <StarRating rating={result} starRatedColor="red" />
        </span>
      </div>
    );
  }
};
