import axios from 'axios';

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
