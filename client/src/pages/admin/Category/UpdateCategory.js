import React, { useEffect, useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import AdminNav from "../../../components/navs/AdminNav";
import { getCategory, updateCategory } from "../../../actions/category.action";

const UpdateCategory = ({ match, history }) => {
  // match.params.slug will give us the required slug from the path url
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchOldName() {
      try {
        const res = await getCategory(match.params.slug);
        setName(res.data.name);
      } catch (err) {
        console.error(err.message);
      }
    }
    fetchOldName();
  }, []);

  const authUser = useSelector(state => state.auth);

  const onSubmitHandler = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const res = await updateCategory(match.params.slug, authUser.token, name);
      setLoading(false);
      setName("");
      toast.success(`The old name updated to ${res.data.name} successfully`);
      history.push("/admin/category");
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
              <EditOutlined /> Update Category
            </h4>
          )}
          <form className="p-5" onSubmit={onSubmitHandler}>
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

export default UpdateCategory;
