import React from 'react';

import { ProductInput } from './ProductInput';
import { Select } from 'antd';

export const ProductCreateForm = ({
  onSubmitForm,
  handleChange,
  values,
  categoryChange,
  subs,
  setValues,
}) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue'];
  const brand = ['Apple', 'Lenovo', 'Sony', 'Samsung', 'Hp'];

  return (
    <form onSubmit={onSubmitForm}>
      <ProductInput
        type="text"
        value={values.title}
        name="title"
        change={handleChange}
      />
      <ProductInput
        type="text"
        name="description"
        value={values.description}
        change={handleChange}
      />
      <ProductInput
        type="number"
        name="price"
        value={values.price}
        change={handleChange}
      />
      <div className="form-group">
        <select
          name="shipping"
          id=""
          className="form-control"
          onChange={handleChange}
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
        change={handleChange}
      />
      <div className="form-group">
        <select
          name="color"
          id=""
          className="form-control"
          onChange={handleChange}
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
        <select
          name="brand"
          id=""
          className="form-control"
          onChange={handleChange}
        >
          <option>Select Brand</option>
          {brand.map(b => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <select
          className="form-control"
          onChange={categoryChange}
          name="category"
        >
          <option key="1">Select Category</option>
          {values.categories.length > 0 &&
            values.categories.map(c => (
              <option key={c._id.toString()} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>
      {subs.length === 0 ? (
        <></>
      ) : (
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          value={values.subs}
          placeholder="Please select sub Categories"
          allowClear
          onChange={value =>
            setValues(prevState => ({ ...prevState, subs: value }))
          }
        >
          {subs.map(s => (
            <Select.Option value={s._id} key={s._id.toString()}>
              {s.name}
            </Select.Option>
          ))}
        </Select>
      )}
      <button className="btn btn-outline-info">Create</button>
    </form>
  );
};
