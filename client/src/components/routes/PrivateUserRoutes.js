import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../LoadingToRedirect";

const PrivateUserRoute = ({ children, ...rest }) => {
  const authUser = useSelector(state => state.auth);

  return authUser && authUser.token ? <Route {...rest} /> : <Loading />;
};

export default PrivateUserRoute;
