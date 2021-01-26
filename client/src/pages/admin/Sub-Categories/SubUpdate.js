import React, { useEffect, useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

import AdminNav from '../../../components/navs/AdminNav';
import {
  getSingleCategory,
  updateSubCategory,
} from '../../../actions/sub.action';
import { getCategories } from '../../../actions/category.action';

const UpdateSubCategory = ({ match, history }) => {
  // match.params.slug will give us the required slug from the path url
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [parentId, setParentId] = useState('');
  const [categories, setCategories] = useState([]);

  const authUser = useSelector(state => state.auth);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  async function fetchOldName() {
    try {
      const data = await getSingleCategory(match.params.slug);
      setName(data.name);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchOldName();
  }, []);

  const onSubmitHandler = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await updateSubCategory(
        match.params.slug,
        name,
        parentId,
        authUser.token
      );
      // console.log(res.data);
      toast.success(`${res.data.name} updated`);
      setLoading(false);
      setName('');
      history.push('/admin/sub');
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-8 mt-3">
          {loading ? (
            <h4 className="display-5 text-danger">Loading...</h4>
          ) : (
            <h4 className="display-3 text-center">
              <EditOutlined /> Update Sub Category
            </h4>
          )}
          <form className="p-5" onSubmit={onSubmitHandler}>
            <div className="form-group">
              <select
                className="form-control"
                onChange={e => setParentId(e.target.value)}
              >
                <option key="1">Select Category</option>
                {categories.length > 0 &&
                  categories.map(c => (
                    <option key={c._id.toString()} value={c._id}>
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <input
                type="text"
                value={name}
                placeholder="Enter new name"
                onChange={e => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <button
              className="btn btn-outline-primary btn-raised mt-3"
              disabled={!name}
            >
              Edit Name
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
