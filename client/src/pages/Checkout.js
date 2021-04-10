import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { getUserCart } from '../actions/userAction';

export const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const { auth } = useSelector(state => ({ ...state }));

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getUserCart(auth.token);
        console.log(data);
        setProducts(data.products);
        setTotal(data.cartTotal);
      } catch (err) {
        toast.error(err.message);
      }
    }

    loadData();
  }, []);

  const saveAddressToDb = () => {
    //
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        textarea
        <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
          Save
        </button>
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        coupon input and apply button
      </div>

      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products x</p>
        <hr />
        <p>List of products</p>
        <hr />
        <p>Cart Total: $x</p>

        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary">Place Order</button>
          </div>

          <div className="col-md-6">
            <button className="btn btn-primary">Empty Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
