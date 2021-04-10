import axios from 'axios';

export const getCoupons = async authtoken =>
  await axios.get(`/api/coupens`, {
    headers: {
      authtoken,
    },
  });

export const removeCoupon = async (couponId, authtoken) => {
  const res = await axios.delete(`/api/coupens/${couponId}`, {
    headers: { authtoken },
  });

  return res;
};

export const createCoupon = async (coupon, authtoken) =>
  await axios.post(
    `/api/coupens`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
