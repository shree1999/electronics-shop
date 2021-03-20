import React, { useEffect, useState } from 'react';
import { getProductsForHomePage } from '../../actions/product.action';
import { HomeProductCard } from '../Cards/ProductCard';
import LoadingCard from '../Cards/LoadingCard';

export const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = async () => {
    try {
      setLoading(prevState => true);
      const data = await getProductsForHomePage('total_sold', 'desc', 10);
      setLoading(prevState => false);
      setProducts(data);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <div className="container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map(product => (
              <div key={product._id} className="col-md-4">
                <HomeProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
