import React from "react";

import AdminNav from "../../components/navs/AdminNav";

const AdminDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h1 className="display-3">Admin Dashboard</h1>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
