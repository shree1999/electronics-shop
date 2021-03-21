import React, { useState, useEffect } from 'react';

import { fetchSingleProduct } from '../actions/product.action';
import { SingleProduct } from '../components/Cards/SingleProduct';

export const ProductPage = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    loadProduct();
  }, [match.params.slug]);

  const loadProduct = async () => {
    try {
      const data = await fetchSingleProduct(match.params.slug);

      setProduct(data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        <SingleProduct product={product} />
      </div>
    </div>
  );
};
