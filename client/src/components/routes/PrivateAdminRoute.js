import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";

import Loading from "../LoadingToRedirect";
import { getAdminUser } from "../../actions/userAction";

const PrivateUserRoute = ({ children, ...rest }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const authUser = useSelector(state => state.auth);

  useEffect(() => {
    async function fetchAdmin() {
      if (authUser && authUser.token) {
        try {
          await getAdminUser(authUser.token);
          setIsAdmin(true);
        } catch (err) {
          console.error(err.message);
          setIsAdmin(false);
        }
      }
    }
    fetchAdmin();
  }, [authUser]);

  return isAdmin ? <Route {...rest} /> : <Loading />;
};

export default PrivateUserRoute;
