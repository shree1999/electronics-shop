import axios from 'axios';

import { USER_LOGGED_IN } from '../constants';

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
    throw new Error(err.response.data.error);
  }
};
