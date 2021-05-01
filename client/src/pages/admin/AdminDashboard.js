import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import { getOrders, changeStatus } from '../../actions/admin.actions';

import AdminNav from '../../components/navs/AdminNav';
import Orders from '../../components/Orders';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const auth = useSelector(state => state.auth);

  const loadOrders = async () => {
    try {
      const res = await getOrders(auth.token);
      console.log(res.data);
      setOrders(res.data);
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, auth.token).then(res => {
      toast.success('Status updated');
      loadOrders();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h1 className="display-3">Admin Dashboard</h1>
          {orders.length > 0 ? (
            <Orders orders={orders} handleStatusChange={handleStatusChange} />
          ) : (
            <p className="lead">No orders placed</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
