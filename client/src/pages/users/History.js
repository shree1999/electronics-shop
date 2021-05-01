import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserOrders } from '../../actions/userAction';

import UserNav from '../../components/navs/UserNav';

const History = () => {
  const [products, setProducts] = useState([]);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getUserOrders(auth.token);
      console.log(res.data);

      setProducts(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const showOrderInTable = order => <p>each order and it's products</p>;

  const showEachOrders = () =>
    products.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <p>show payment info</p>
        {showOrderInTable(order)}
        <div className="row">
          <div className="col">
            <p>PDF download</p>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div col-md-10>
          <h3 className="display-4">
            {products.length > 0
              ? 'User purchase orders'
              : 'No purchase orders'}
          </h3>
          {showEachOrders()}
        </div>
      </div>
    </div>
  );
};

export default History;
