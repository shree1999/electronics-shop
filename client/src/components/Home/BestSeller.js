import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

import {
  getProductsForHomePage,
  getProductCount,
} from '../../actions/product.action';
import { HomeProductCard } from '../Cards/ProductCard';
import LoadingCard from '../Cards/LoadingCard';
import { showAverage } from '../AvgRating';

export const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getTotalProducts();
  }, []);

  const getTotalProducts = async () => {
    try {
      const data = await getProductCount();
      setProductsCount(data.total);
    } catch (err) {
      console.error(err);
    }
  };

  const loadAllProducts = async () => {
    try {
      setLoading(prevState => true);
      const data = await getProductsForHomePage('total_sold', 'desc', page);
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
                {showAverage(product)}
                <HomeProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="row">
        <nav className="col-md-4 offset-md-4 text-center pt-5 p-3">
          <Pagination
            current={page}
            total={(productsCount / 3) * 10}
            onChange={value => setPage(value)}
          />
        </nav>
      </div>
    </>
  );
};
