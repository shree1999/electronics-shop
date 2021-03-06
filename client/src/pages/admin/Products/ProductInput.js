import React from 'react';

export const ProductInput = ({ type, value, name, change }) => {
  return (
    <div className="form-group">
      <input
        type={type}
        placeholder={name}
        value={value}
        name={name}
        className="form-control"
        onChange={change}
      />
    </div>
  );
};
