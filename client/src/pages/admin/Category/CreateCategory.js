import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import AdminNav from "../../../components/navs/AdminNav";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../actions/category.action";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const authUser = useSelector(state => state.auth);

  const onSubmitHandler = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await createCategory(name, authUser.token);
      toast.success(`${res.data.name} category created`);
      setLoading(false);
      setName("");
      fetchData();
    } catch (err) {
      setLoading(false);

      toast.error(err.message);
    }
  };

  const onDeleteHandler = async slug => {
    try {
      if (window.confirm("Are you sure?")) {
        setLoading(true);
        const res = await removeCategory(slug, authUser.token);
        setLoading(false);
        toast.success(`${res.data.name} deleted successfully`);
        fetchData();
      } else {
        toast.warning("Delete cancelled");
      }
    } catch (err) {
      console.log(err.response);
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
            <h4 className="display-3 text-center">Create Category</h4>
          )}
          <form onSubmit={onSubmitHandler}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="Name of the category"
                placeholder="Category Name"
                value={name}
                onChange={e => setName(e.target.value)}
                autoFocus
                required
              />
              <p className="form-text text-muted">
                Name must be more then 2 characters long
              </p>
            </div>

            <button
              className="btn btn-outline-primary btn-raised mt-2"
              disabled={!name || name.length < 2}
            >
              Save
            </button>
          </form>
        </div>

        <div className="col-md-5">
          <div className="card mt-2">
            <h3 className="text-center pt-3">
              Total existing categories {categories.length}
            </h3>
            <hr />
            <div className="card-body">
              {categories.map(c => (
                <div key={`${c._id}`} className="alert alert-secondary">
                  {c.name}
                  <span
                    className="btn btn-sm text-danger float-right"
                    onClick={() => onDeleteHandler(c.slug)}
                  >
                    <DeleteOutlined />
                  </span>
                  <Link
                    to={`/admin/category/edit/${c.slug}`}
                    className="btn btn-sm text-warning float-right"
                  >
                    <EditOutlined />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
