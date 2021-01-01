import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import AdminNav from "../../../components/navs/AdminNav";
import { getCategories } from "../../../actions/category.action";
import SubList from "./SubList";
import {
  createSubCategory,
  getAllSubCategories,
} from "../../../actions/sub.action";

const SubCreate = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useSelector(state => state.auth);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await getAllSubCategories();
      setSubCategories(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await createSubCategory(categoryId, auth.token, name);
      toast.success(`${res.data.name} category created`);
      setLoading(false);
      setName("");
      fetchSubCategories();
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
        <div className="col-md-5 p-5">
          {loading ? (
            <h4 className="display-5 text-danger">Loading...</h4>
          ) : (
            <h4 className="display-3 text-center">Create Sub Category</h4>
          )}
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <select
                className="form-control"
                onChange={e => setCategoryId(e.target.value)}
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
                placeholder="Enter Sub Category"
                className="form-control"
                onChange={e => setName(e.target.value)}
                value={name}
              />
            </div>
            <button
              type="submit"
              className="btn btn-outline-primary btn-raised mt-2"
              disabled={!name || !categoryId}
            >
              Create Sub-Category
            </button>
          </form>
        </div>
        <div className="col-md-5">
          <SubList subs={subCategories} />
        </div>
      </div>
    </div>
  );
};

export default SubCreate;
