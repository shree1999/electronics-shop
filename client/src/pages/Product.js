import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { fetchSingleProduct, reviewProduct } from '../actions/product.action';
import { SingleProduct } from '../components/Cards/SingleProduct';

const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);

  const authUser = useSelector(state => state.auth);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [match.params.slug]);

  useEffect(() => {
    if (product.ratings && authUser.token) {
      let existingRating = product.ratings.find(
        ele => ele.postedBy.toString() === authUser._id.toString()
      );

      existingRating && setStar(existingRating.star);
    }
  }, [product.ratings, authUser.token, authUser._id]);

  const loadProduct = async () => {
    try {
      const data = await fetchSingleProduct(match.params.slug);
      setProduct(data);
    } catch (err) {
      console.error(err);
    }
  };

  const onReviewClick = async (rating, id) => {
    setStar(rating);
    try {
      const data = await reviewProduct(rating, authUser.token, id);
      console.log(data);
      loadProduct();
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct
          product={product}
          star={star}
          onReviewClick={onReviewClick}
        />
      </div>
    </div>
  );
};

export default ProductPage;
