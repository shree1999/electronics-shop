import React, { Fragment } from 'react';

import AdminNav from '../../../components/navs/AdminNav';
import { createProduct } from '../../../actions/product.action';

export const ProductCreate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h1 className="display-2">Product Create</h1>
        </div>
      </div>
    </div>
  );
};
