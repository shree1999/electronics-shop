import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateUserRoute = ({ children, ...rest }) => {
  const authUser = useSelector(state => state.auth);

  return authUser && authUser.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <h1 className="display-4 text-danger">Loading...</h1>
  );
};

export default PrivateUserRoute;
