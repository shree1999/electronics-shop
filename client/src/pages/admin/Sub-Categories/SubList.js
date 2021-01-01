import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

const SubList = props => {
  const [search, setSearch] = useState("");

  const filteredSubs = props.subs.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="card mt-4">
      <h5 className="card-title text-center">
        Total exisiting sub-categories {props.subs.length}
      </h5>
      <input
        type="text"
        className="search-box"
        placeholder="Search Sub Category"
        onChange={e => setSearch(e.target.value)}
        value={search}
      />
      <div className="card-body">
        {filteredSubs.map(s => (
          <div key={`${s._id}`} className="alert alert-secondary">
            {s.name}
            <span
              className="btn btn-sm text-danger float-right"
              onClick={() => props.delete(s.slug)}
            >
              <DeleteOutlined />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubList;
