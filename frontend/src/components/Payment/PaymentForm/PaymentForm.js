
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../Loading/Loading';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../../store/cartSlice';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { isAuthenticated } from '../../../services/api/auth';

const PaymentForm = ({ billingInfo, user }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const cartItems = useSelector((state) => state.cart.items);
    const loading = useSelector((state) => state.cart.loading);

    const totalPrice = Array.isArray(cartItems)
        ? cartItems.reduce((total, item) => total + item.beats.price, 0)
        : 0;

    if (loading) return <Loading />;
    const cartIsEmpty = !Array.isArray(cartItems) || cartItems.length === 0;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        try {
            const { data: { clientSecret } } = await axios.post(
                'http://localhost:3001/api/payment/create-payment-intent',
                {
                    price: totalPrice,
                    user: user.userId,
                    cart: cartItems,
                    billingInfo
                },
                { withCredentials: true }
            );

            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: billingInfo.name,
                        address: {
                            line1: billingInfo.address,
                            city: billingInfo.city,
                            country: billingInfo.country,
                            postal_code: billingInfo.postalCode,
                        }
                    }
                },
            });

            if (stripeError) {
                console.error('Error confirming card payment:', stripeError);
            } else {
                navigate('/success'); 
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">Payment Information</h2>

            {/* Payment Fields */}
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
                Pay ${totalPrice.toFixed(2)}
            </button>
        </form>
    );
};

export default PaymentForm;
