import axios from 'axios';

export const createProduct = async (token, product) => {
  try {
    const product = await axios.post('/api/products', product, {
      headers: {
        authToken: token,
      },
    });

    return product;
  } catch (err) {
    console.error(err.message);
  }
};
