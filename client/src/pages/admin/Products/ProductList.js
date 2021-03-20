import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';

import AdminNav from '../../../components/navs/AdminNav';
import { fetchProductsByLimit } from '../../../actions/product.action';
import { ProductCard } from '../../../components/Cards/AdminProductCard';

export const ProductList = () => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.product);

  const { isLoading, error, data } = product;

  useEffect(() => {
    dispatch(fetchProductsByLimit(5));
  }, [dispatch]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h1 className="display-3">Admin Dashboard</h1>
          {isLoading && <Spin size="large" />}
          {data && data.length > 0 && (
            <div className="row">
              {data.map(ele => (
                <div className="col-md-4" key={ele._id}>
                  <ProductCard product={ele} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
