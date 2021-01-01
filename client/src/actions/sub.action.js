import axios from "axios";

export const createSubCategory = async (id, token, name) => {
  try {
    const res = await axios.post(
      `/api/subs/${id}`,
      { name },
      { headers: { authToken: token } }
    );
    return res;
  } catch (err) {
    console.error(err.message);
    throw new Error(err.response.data.error);
  }
};

export const getAllSubCategories = async () => {
  try {
    const res = await axios.get("/api/subs");
    return res;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};

export const deleteSubCategory = async (slug, token) => {
  try {
    const res = await axios.delete(`/api/subs/${slug}`, {
      headers: { authToken: token },
    });

    return res.data;
  } catch (err) {
    throw new Error(err.response.data.error);
  }
};
