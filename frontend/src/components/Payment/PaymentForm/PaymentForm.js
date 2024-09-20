import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import {getCarts} from '../../../services/api/carts'
import { isAuthenticated } from '../../../services/api/auth';

const PaymentForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] =useState(null)
    const totalAmount = useSelector((state) => state.cart.totalAmount); // Get totalAmount from Redux


  useEffect(() => {
    const fetchData = async () => {
      try {
        const authenticatedUser = await isAuthenticated();
        const cart = await getCarts(authenticatedUser.userId)

        setUser(authenticatedUser);
        setCartItems(cart.map(cart => cart.id))
      } catch (error) {
        console.error("Error fetching data:", error);
        setUser(null);
      }
    };

    fetchData();
  }, [location.state]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    try {
      const { data: { clientSecret } } = await axios.post(
        'http://localhost:3001/api/payment/create-payment-intent',
        {
          price: totalAmount,
          user: user?.userId,
          cart: cartItems, 
        }, { withCredentials: true }
      );

      const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (stripeError) {
        console.error('Error confirming card payment:', stripeError);
      } else {
        navigate('/success'); // Redirect to a success page
      }
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white mb-4">Payment Information</h2>

      <div>
        <label className="block text-white mb-1">Card Number</label>
        <CardNumberElement className="p-3 border border-gray-600 rounded-md bg-gray-700 text-white" />
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label className="block text-white mb-1">Expiration Date (MM/YY)</label>
          <CardExpiryElement className="p-3 border border-gray-600 rounded-md bg-gray-700 text-white" />
        </div>
        <div className="flex-1">
          <label className="block text-white mb-1">CVC</label>
          <CardCvcElement className="p-3 border border-gray-600 rounded-md bg-gray-700 text-white" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-4 px-6 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out"
        disabled={!stripe}
      >
        Pay ${totalAmount.toFixed(2)}
        </button>
    </form>
  );
};

export default PaymentForm;
