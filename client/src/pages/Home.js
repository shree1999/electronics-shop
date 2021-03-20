import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Skeleton, Spin } from 'antd';

import { fetchProductsByLimit } from '../actions/product.action';
import { HomeProductCard } from '../components/Cards/ProductCard';
import { Jumbotron } from '../components/Cards/Jumbotron';
import LoadingCard from '../components/Cards/LoadingCard';

const Home = () => {
  const dispatch = useDispatch();

  const product = useSelector(state => state.product);
  const { isLoading, error, data } = product;

  useEffect(() => {
    dispatch(fetchProductsByLimit(10));
  }, [dispatch]);

  return (
    <>
      <div className="jumbotron">
        <h1 className="display-3 text-center">
          <Jumbotron text={['Latest Products', 'New Arrivals']} />
        </h1>
      </div>
      <div className="container">
        {isLoading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {data && data.map(p => <HomeProductCard key={p._id} product={p} />)}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
