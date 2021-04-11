import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '../components/Forms/StripeCheckoutForm';

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(
  'pk_test_51IexMASJmBUIhFHmJEnKsZZlJNPDd9IWYTPXRtxKnWCtv6qJIbCm0c60nRIIl7amNUwuHHtkD0mLTzDK2IEBBZNo00EQuutNFr'
);

const Payment = () => {
  return (
    <div className="container p-5 text-center">
      <h4 className="display-4">Complete your purchase</h4>
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
