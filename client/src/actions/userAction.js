import axios from "axios";

export const createOrUpdateUser = async token => {
  return await axios.post(
    "/api/auth",
    {},
    {
      headers: {
        authToken: token,
      },
    }
  );
};
