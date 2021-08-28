import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { LoadingOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';

import AdminNav from '../../../components/navs/AdminNav';
import { createProduct } from '../../../actions/product.action';
import {
  getCategories,
  getSubsOfCategory,
} from '../../../actions/category.action';
import { ProductCreateForm } from '../../../components/Forms/ProductCreateForm';
import { FileUpload } from '../../../components/Forms/FileUpload';
import { modules, formats } from '../../../reactQuillConstants';

const ProductCreate = () => {
  const [values, setValues] = useState({
    title: '',
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
  const [subOptions, setSubOptions] = useState([]);
  const [description, setDescription] = useState('');

  const authUser = useSelector(state => state.auth);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    const res = await getCategories();
    setValues(prevState => ({ ...prevState, categories: res.data }));
  };

  const onChangeHandler = e => {
    e.preventDefault();
    setValues(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const onChangeOfCategory = async e => {
    e.preventDefault();
    // getting all subs now
    try {
      const res = await getSubsOfCategory(e.target.value);
      setValues(prevState => ({
        ...prevState,
        category: e.target.value,
        subs: [],
      }));
      setSubOptions(prevState => res.data);
    } catch (err) {
      toast.error(err.message);
      setSubOptions([]);
    }
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(() => true);
      const data = await createProduct(authUser.token, {
        ...values,
        description,
      });
      setLoading(() => false);
      window.alert(`${data.title} Product created successfully`);
      window.location.reload();
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
          <h1 className="display-2 mb-3">
            {loading ? (
              <LoadingOutlined className="text-primary" />
            ) : (
              'Create Product'
            )}
          </h1>
          <div className="row">
            <div className="col-md-6">
              <FileUpload
                values={values}
                setValues={setValues}
                setLoading={setLoading}
              />
              <ProductCreateForm
                onSubmitForm={onSubmitHandler}
                handleChange={onChangeHandler}
                categoryChange={onChangeOfCategory}
                values={values}
                subs={subOptions}
                setValues={setValues}
              />
            </div>
            <div className="col-md-4">
              <ReactQuill
                theme="snow"
                value={description}
                onChange={setDescription}
                className="ql-editor"
                modules={modules}
                formats={formats}
                placeholder="Enter Description"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
