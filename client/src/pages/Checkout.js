import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Alert } from 'antd';

import {
  emptyUserCart,
  getUserCart,
  saveUserAddress,
  applyCoupon,
} from '../actions/userAction';
import { COUPON_APPLIED } from '../constants';

export const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState('');
  const [addressSaved, setAddressSaved] = useState(false);
  const [userCoupon, setUserCoupon] = useState('');
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

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
        history.push('/cart');
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
    setProducts([]);
    setTotal(0);
    setUserCoupon('');
    setTotalAfterDiscount(0);
    dispatch(emptyUserCart(auth.token));
  };

  const applyCouponHandler = () => {
    applyCoupon(auth.token, userCoupon)
      .then(res => {
        if (res.data.totalAfterDiscount) {
          setTotalAfterDiscount(res.data.totalAfterDiscount);
          // update redux coupon applied true/false
          dispatch({
            type: COUPON_APPLIED,
            payload: { couponApplied: true },
          });
        }
      })
      .catch(err => {
        toast.error(err.response.data.error);
        dispatch({ type: COUPON_APPLIED, payload: { couponApplied: false } });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className="display-4 mb-3">Delivery Address</h4>
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <button
            className="btn btn-primary mt-2"
            onClick={saveAddressToDb}
            disabled={address.length === 0}
          >
            Save
          </button>
          <hr />
          <h4 className="display-4 my-3">Got Coupon?</h4>

          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Apply Coupon"
              value={userCoupon}
              onChange={e => setUserCoupon(e.target.value)}
            />
            <button
              className="btn btn-primary mt-2"
              onClick={applyCouponHandler}
            >
              Apply
            </button>
          </div>
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
          <p>Cart Total: ${total}</p>
          {totalAfterDiscount > 0 && (
            <Alert
              message="Coupon Applied"
              description={`The total payable price is $${totalAfterDiscount}`}
              type="success"
              showIcon
            />
          )}

          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-primary"
                disabled={!addressSaved || !products.length}
              >
                Place Order
              </button>
            </div>

            <div className="col-md-6">
              <button
                className="btn btn-primary"
                onClick={onClickEmptyCartHandler}
                disabled={!products.length}
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
