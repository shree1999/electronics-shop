import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import RegisterComplete from "./pages/auth/RegisterComplete";

import Home from "./pages/Home";

import History from "./pages/users/History";
import Wishlist from "./pages/users/Wishlist";
import Password from "./pages/users/Password";

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/Category/CreateCategory";
import UpdateCategory from "./pages/admin/Category/UpdateCategory";

import Header from "./components/Header";
import PrivateUserRoute from "./components/routes/PrivateUserRoutes";
import PrivateAdminRoute from "./components/routes/PrivateAdminRoute";

import { auth } from "./firebase";
import { getCurrentUser } from "./actions/userAction";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // to check firebase auth state
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userTokenId = await user.getIdTokenResult();

        dispatch(getCurrentUser(userTokenId.token));
      }
    });

    // cleanup for any memory leak
    return () => unsubscribe();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} exact />
        <Route path="/register/complete" component={RegisterComplete} />
        <Route path="/forgot/password" component={ForgotPassword} />
        <PrivateUserRoute path="/user/history" component={History} />
        <PrivateUserRoute path="/user/password" component={Password} />
        <PrivateUserRoute path="/user/wishlist" component={Wishlist} />
        <PrivateAdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <PrivateAdminRoute
          exact
          path="/admin/category"
          component={CreateCategory}
        />
        <PrivateAdminRoute
          path="/admin/category/edit/:slug"
          component={UpdateCategory}
        />
      </Switch>
    </React.Fragment>
  );
};

export default App;
