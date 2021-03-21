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

export const fetchSingleProduct = async slug => {
  try {
    const res = await axios.get(`/api/products/${slug}`);

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const updateProduct = async (slug, values, token) => {
  try {
    const res = await axios.put(`/api/products/${slug}`, values, {
      headers: { authToken: token },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const getProductsForHomePage = async (sort, order, page) => {
  try {
    const { data } = await axios.post('/api/products/all', {
      sort,
      order,
      page,
    });

    return data;
  } catch (err) {
    throw new Error(err);
  }
};

export const getProductCount = async () => {
  try {
    const { data } = await axios.get('/api/products');
    return data;
  } catch (err) {
    throw new Error(err);
  }
};
