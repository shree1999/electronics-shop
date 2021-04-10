import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import { Spin } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import 'react-datepicker/dist/react-datepicker.css';

import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from '../../../actions/coupen.action';
import AdminNav from '../../../components/navs/AdminNav';

export const CreateCouponPage = () => {
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [discount, setDiscount] = useState('');
  const [loading, setLoading] = useState('');
  const [coupons, setCoupons] = useState([]);

  const { auth } = useSelector(state => ({ ...state }));

  async function loadCoupons() {
    try {
      const res = await getCoupons(auth.token);
      setCoupons(res.data);
    } catch (err) {
      console.error(err.message);
    }
  }
  useEffect(() => {
    loadCoupons();
  }, []);

  const onSubmitHandler = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await createCoupon({ name, expiry, discount }, auth.token);
      setLoading(false);
      setName('');
      setDiscount('');
      setExpiry('');
      loadCoupons();
      toast.success(`"${res.data.name}" is created`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const onRemoveHandler = async id => {
    try {
      const res = await removeCoupon(id, auth.token);
      toast.success(`${res.data.name} is successfully deleted`);

      loadCoupons();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-4">
          <h1 className="display-3">Coupon</h1>
          {loading && <Spin size="large" />}
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={e => setName(e.target.value)}
                value={name}
                autoFocus
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={e => setDiscount(e.target.value)}
                value={discount}
                required
              />
            </div>

            <div className="form-group">
              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                selected={expiry}
                onChange={date => setExpiry(date)}
                value={new Date()}
                className="form-control"
                required
                placeholderText="Pick expiry date"
              />
            </div>

            <button className="btn btn-outline-primary">Save</button>
          </form>
        </div>
        <div className="col-md-6 mt-3">
          <h4 className="display-4">{coupons.length} Coupons</h4>

          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map(c => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{new Date(c.expiry).toLocaleDateString()}</td>
                  <td>{c.discount}%</td>
                  <td>
                    <DeleteOutlined
                      className="text-danger pointer"
                      onClick={() => onRemoveHandler(c._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
