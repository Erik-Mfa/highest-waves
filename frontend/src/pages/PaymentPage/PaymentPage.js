// PaymentPage.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../../components/Payment/PaymentForm/PaymentForm';
import { stripePromise } from '../../services/stripe';

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Payment</h1>
        <PaymentForm />
      </div>
    </Elements>
  );
};

export default PaymentPage;