import React, { useState, useEffect } from 'react';
import AdminNav from '../../../components/navs/AdminNav';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import {
  fetchSingleProduct,
  updateProduct,
} from '../../../actions/product.action';
import { ProductUpdateForm } from '../../../components/Forms/ProductUpdateForm';
import {
  getCategories,
  getSubsOfCategory,
} from '../../../actions/category.action';
import { FileUpload } from '../../../components/Forms/FileUpload';
import { Spin } from 'antd';

const initialState = {
  title: '',
  description: '',
  price: '',
  categories: [],
  category: '',
  subs: [],
  shipping: '',
  quantity: '',
  images: [],
  colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
  brands: ['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS'],
  color: '',
  brand: '',
};

export const ProductUpdate = ({ match }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const authUser = useSelector(state => state.auth);
  // router
  const { slug } = match.params;

  const loadProduct = async () => {
    try {
      const data = await fetchSingleProduct(slug);
      setValues(prevState => ({ ...prevState, ...data }));

      const res = await getSubsOfCategory(data.category._id);
      setSubOptions(res.data);

      let arr = [];
      data.subs.map(s => {
        arr.push(s._id);
      });
      console.log('ARR', arr);
      setArrayOfSubs(prev => arr);
      setSelectedCategory(data.category._id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(async () => {
    await loadProduct();
    await loadCategories();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    //

    try {
      setLoading(true);
      values.subs = arrayOfSubs;
      values.category = selectedCategory;
      const data = await updateProduct(slug, values, authUser.token);
      toast.success('Product Updated');
      console.log(values);
      setLoading(false);
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleChange = e => {
    setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = async e => {
    try {
      e.preventDefault();
      console.log('CLICKED CATEGORY', e.target.value);
      setValues({ ...values, subs: [] });
      setSelectedCategory(e.target.value);
      const { data } = await getSubsOfCategory(e.target.value);
      setSubOptions(data);
      // if user clicks back to the original category
      // show its sub categories in default
      if (values.category._id === e.target.value) {
        loadProduct();
      }
      // clear old sub category ids
      setArrayOfSubs([]);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-10">
          {loading ? (
            <Spin size="large" />
          ) : (
            <h1 className="display-3">Product update</h1>
          )}
          <FileUpload
            values={values}
            setValues={setValues}
            setLoading={setLoading}
          />
          <div className="col-md-6">
            <ProductUpdateForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              setValues={setValues}
              values={values}
              handleCatagoryChange={handleCatagoryChange}
              categories={categories}
              subOptions={subOptions}
              arrayOfSubs={arrayOfSubs}
              setArrayOfSubs={setArrayOfSubs}
              selectedCategory={selectedCategory}
            />
          </div>
          <hr />
        </div>
      </div>
    </div>
  );
};
