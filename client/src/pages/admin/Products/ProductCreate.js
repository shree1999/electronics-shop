import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import AdminNav from '../../../components/navs/AdminNav';
import { createProduct } from '../../../actions/product.action';
import { ProductInput } from '../../../components/Admin/ProductInput';

export const ProductCreate = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    categories: [],
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    color: '',
    brand: '',
  });
  const [loading, setLoading] = useState(false);
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const brand = ['Apple', 'Lenovo', 'Sony', 'Samsung'];

  const authUser = useSelector(state => state.auth);

  const onChangeHandler = e => {
    e.preventDefault();
    setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(() => true);
      const data = await createProduct(authUser.token, values);
      setLoading(() => false);
      toast.success('Product Created Successfully');
    } catch (err) {
      setLoading(() => false);
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h1 className="display-2 mb-3">Product Create</h1>
          <div className="col-md-6">
            <form onSubmit={onSubmitHandler}>
              <ProductInput
                type="text"
                value={values.title}
                name="title"
                change={onChangeHandler}
              />
              <ProductInput
                type="text"
                name="description"
                value={values.description}
                change={onChangeHandler}
              />
              <ProductInput
                type="number"
                name="price"
                value={values.price}
                change={onChangeHandler}
              />
              <div className="form-group">
                <select
                  name="shipping"
                  id=""
                  className="form-control"
                  onChange={onChangeHandler}
                >
                  <option>Select Shipping</option>
                  <option value="No">No</option>
                  <option value="Yes">Yes</option>
                </select>
              </div>
              <ProductInput
                type="number"
                name="quantity"
                value={values.quantity}
                change={onChangeHandler}
              />
              <div className="form-group">
                <select
                  name="color"
                  id=""
                  className="form-control"
                  onChange={onChangeHandler}
                >
                  <option>Select Color</option>
                  {colors.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select name="brand" id="" className="form-control">
                  <option>Select Brand</option>
                  {brand.map(b => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-outline-info">Create</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
