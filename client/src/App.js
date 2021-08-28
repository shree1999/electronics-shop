import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { Spin } from 'antd';

import { auth } from './firebase';
import { getCurrentUser } from './actions/userAction';

const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'));

const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const CartPage = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const Payment = lazy(() => import('./pages/Payment'));

const History = lazy(() => import('./pages/users/History'));
const Wishlist = lazy(() => import('./pages/users/Wishlist'));
const Password = lazy(() => import('./pages/users/Password'));
const ProductPage = lazy(() => import('./pages/Product'));
const CategoryPage = lazy(() => import('./pages/users/Category'));

const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const CreateCategory = lazy(() =>
  import('./pages/admin/Category/CreateCategory')
);
const UpdateCategory = lazy(() =>
  import('./pages/admin/Category/UpdateCategory')
);
const SubCreate = lazy(() => import('./pages/admin/Sub-Categories/SubCreate'));
const SubUpdate = lazy(() => import('./pages/admin/Sub-Categories/SubUpdate'));
const ProductCreate = lazy(() =>
  import('./pages/admin/Products/ProductCreate')
);
const ProductList = lazy(() => import('./pages/admin/Products/ProductList'));
const ProductUpdate = lazy(() =>
  import('./pages/admin/Products/ProductUpdate')
);
const CreateCouponPage = lazy(() =>
  import('./pages/admin/Coupon/CreateCoupon')
);

const Header = lazy(() => import('./components/Header'));
const PrivateUserRoute = lazy(() =>
  import('./components/routes/PrivateUserRoutes')
);
const PrivateAdminRoute = lazy(() =>
  import('./components/routes/PrivateAdminRoute')
);

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
  }, [dispatch]);

  return (
    <Suspense
      fallback={
        <div className="col text-center p-5">
          <Spin size="large" />
        </div>
      }
    >
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} exact />
        <Route path="/register/complete" component={RegisterComplete} />
        <Route path="/forgot/password" component={ForgotPassword} />
        <Route path="/product/:slug" component={ProductPage} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/cart" component={CartPage} />
        <PrivateUserRoute path="/user/history" component={History} />
        <PrivateUserRoute path="/user/password" component={Password} />
        <PrivateUserRoute path="/user/wishlist" component={Wishlist} />
        <PrivateUserRoute path="/user/checkout" component={Checkout} />
        <PrivateUserRoute path="/user/payment" component={Payment} />
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
        <PrivateAdminRoute path="/admin/sub" component={SubCreate} exact />
        <PrivateAdminRoute path="/admin/sub/edit/:slug" component={SubUpdate} />
        <PrivateAdminRoute
          path="/admin/product"
          component={ProductCreate}
          exact
        />
        <PrivateAdminRoute path="/admin/products" component={ProductList} />
        <PrivateAdminRoute
          path="/admin/product/edit/:slug"
          component={ProductUpdate}
        />
        <PrivateAdminRoute path="/admin/coupons" component={CreateCouponPage} />
      </Switch>
    </Suspense>
  );
};

export default App;
