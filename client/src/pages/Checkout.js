import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
} from '../actions/userAction';

export const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);

  const { auth } = useSelector(state => ({ ...state }));
  const dispatch = useDispatch();

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

  const saveAddressToDb = async () => {
    try {
      const data = await saveUserAddress(address, auth.token);
      if (data.ok) {
        setAddressSaved(true);
        toast.success('Address saved Successfully');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onClickEmptyCartHandler = () => {
    dispatch(emptyUserCart(auth.token));
    setProducts([]);
    setTotal(0);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className="display-4">Delivery Address</h4>
          <br />
          <br />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <button className="btn btn-primary mt-2" onClick={saveAddressToDb}>
            Save
          </button>
          <hr />
          <h4 className="display-4">Got Coupon?</h4>
          <br />
          coupon input and apply button
        </div>

        <div className="col-md-6">
          <h4 className="display-4">Order Summary</h4>
          <hr />
          <p>Products {products.length}</p>
          <hr />
          {products.map((p, i) => (
            <div key={i}>
              <p>
                {p.product.title} ({p.color}) x {p.count} ={' '}
                {p.product.price * p.count}
              </p>
            </div>
          ))}
          <hr />
          <p>Cart Total: {total}</p>

          <div className="row">
            <div className="col-md-6">
              <button className="btn btn-primary" disabled={!addressSaved}>
                Place Order
              </button>
            </div>

            <div className="col-md-6">
              <button
                className="btn btn-primary"
                onClick={onClickEmptyCartHandler}
              >
                Empty Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
