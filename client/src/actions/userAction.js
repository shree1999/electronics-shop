import axios from 'axios';

import { ADD_CART, COUPON_APPLIED, USER_LOGGED_IN } from '../constants';

export const createOrUpdateUser = token => async dispatch => {
  try {
    const res = await axios.post(
      '/api/auth',
      {},
      {
        headers: {
          authToken: token,
        },
      }
    );
    dispatch({
      type: USER_LOGGED_IN,
      payload: {
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        token,
        _id: res.data._id,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const getCurrentUser = token => async dispatch => {
  try {
    const res = await axios.post(
      '/api/auth/me',
      {},
      {
        headers: {
          authToken: token,
        },
      }
    );
    dispatch({
      type: USER_LOGGED_IN,
      payload: {
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        token,
        _id: res.data._id,
      },
    });
  } catch (err) {
    console.error(err.message);
  }
};

export const getAdminUser = async token => {
  return await axios.post(
    '/api/auth/me/admin',
    {},
    {
      headers: {
        authToken: token,
      },
    }
  );
};

export const userCart = async (cart, authtoken) => {
  try {
    const res = await axios.post(
      `/api/users/user/cart`,
      { cart },
      {
        headers: {
          authtoken,
        },
      }
    );

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getUserCart = async authtoken => {
  try {
    const res = await axios.get(`/api/users/user/cart`, {
      headers: {
        authtoken,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const emptyUserCart = authtoken => async dispatch => {
  try {
    const res = await axios.delete(`/api/users/user/cart`, {
      headers: {
        authtoken,
      },
    });

    localStorage.removeItem('cart');
    dispatch({ type: ADD_CART, payload: [] });
    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const saveUserAddress = async (address, authtoken) => {
  try {
    const res = await axios.post(
      `/api/users/address`,
      { address },
      {
        headers: {
          authtoken,
        },
      }
    );

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `/api/users/apply/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = (stripeResponse, token) => async dispatch => {
  try {
    const res = await axios.post(
      '/api/users/user/order',
      { stripeResponse },
      { headers: { authtoken: token } }
    );

    if (res.data.ok) {
      dispatch({ type: COUPON_APPLIED, payload: false });

      dispatch(emptyUserCart(token));
    } else {
      throw new Error('Could Not place order');
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
