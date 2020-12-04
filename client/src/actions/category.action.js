import axios from "axios";

const getCategories = async () => {
  try {
    const res = await axios.get("/api/category");
    return res;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const getCategory = async slug => {
  try {
    const res = await axios.get(`/api/category/${slug}`);

    return res;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const createCategory = async (name, token) => {
  try {
    const res = await axios.post(
      `/api/category/`,
      { name },
      {
        headers: {
          authToken: token,
        },
      }
    );

    return res;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const removeCategory = async (slug, token) => {
  try {
    const res = await axios.delete(`/api/category/${slug}`, {
      headers: {
        authToken: token,
      },
    });
    return res;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

const updateCategory = async (slug, token, newName) => {
  try {
    const res = await axios.put(
      `/api/category/${slug}`,
      { name: newName },
      {
        headers: {
          authToken: token,
        },
      }
    );
    return res;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export {
  getCategories,
  getCategory,
  removeCategory,
  updateCategory,
  createCategory,
};
