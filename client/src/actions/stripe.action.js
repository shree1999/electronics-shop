import axios from 'axios';

export const createPaymentIntent = authtoken =>
  axios.post(
    '/api/payment/make-payment',
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
