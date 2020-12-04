import React from "react";

import UserNav from "../../components/navs/UserNav";

const Wishlist = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10">
          <h1 className="display-3 text-center">See your wishlist</h1>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
