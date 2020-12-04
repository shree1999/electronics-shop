import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import "./CategoryList.css";

const CategoryList = props => {
  const [search, setSearch] = useState("");

  const filteredCategories = props.categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card mt-3">
      <h3 className="text-center pt-3">
        Total existing categories {props.categories.length}
      </h3>
      <input
        type="text"
        className="search-box"
        placeholder="Search Category"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <hr />
      <div className="card-body">
        {filteredCategories.map(c => (
          <div key={`${c._id}`} className="alert alert-secondary">
            {c.name}
            <span
              className="btn btn-sm text-danger float-right"
              onClick={() => props.deleteItem(c.slug)}
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
  );
};

export default CategoryList;
