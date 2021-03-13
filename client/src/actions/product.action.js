import axios from 'axios';
import {
  FETCH_PRODUCTS_FAIL,
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
} from '../constants';

export const createProduct = async (token, product) => {
  try {
    const res = await axios.post('/api/products', product, {
      headers: {
        authToken: token,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const fetchProductsByLimit = limit => async dispatch => {
  try {
    dispatch({ type: FETCH_PRODUCTS_REQUEST });

    const res = await axios.get(`/api/products/${limit}`);

    dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: FETCH_PRODUCTS_FAIL, payload: err.response.data.error });
  }
};

export const deleteProduct = async (slug, token) => {
  try {
    const res = await axios.delete(`/api/products/${slug}`, {
      headers: {
        authToken: token,
      },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
