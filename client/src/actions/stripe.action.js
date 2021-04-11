import axios from 'axios';

export const createPaymentIntent = (authtoken, coupon) =>
  axios.post(
    '/api/payment/make-payment',
    { couponApplied: coupon },
    {
      headers: {
        authtoken,
      },
    }
  );
