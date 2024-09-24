import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCarts, deleteCarts } from '../../../services/api/carts';
import { isAuthenticated } from '../../../services/api/auth';

const PaymentForm = () => {
    const navigate = useNavigate();
    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState(null);
    const totalAmount = useSelector((state) => state.cart.totalAmount); // Get totalAmount from Redux

    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        city: '',
        country: '',
        postalCode: ''
    });

    // List of countries with 2-letter codes
    const countryList = [
        { code: 'US', name: 'United States' },
        { code: 'GB', name: 'United Kingdom' },
        { code: 'CA', name: 'Canada' },
        { code: 'AU', name: 'Australia' },
        { code: 'DE', name: 'Germany' },
        { code: 'FR', name: 'France' },
        { code: 'JP', name: 'Japan' },
        // Add more countries as needed...
    ];

    useEffect(() => {
      const fetchData = async () => {
        try {
          const authenticatedUser = await isAuthenticated();
          const cart = await getCarts(authenticatedUser.userId);
    
          setUser(authenticatedUser);
          if (Array.isArray(cart)) {
            setCartItems(cart.map(item => item.id)); // Update this to match your cart structure
          } else {
            throw new Error("Cart is not an array");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setUser(null);
          setCartItems([]); // Clear cart items on error
        }
      };
    
      fetchData();
    }, [location.state]);

    const handleBillingChange = (e) => {
        setBillingInfo({ ...billingInfo, [e.target.name]: e.target.value });
    };

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
              cartItems.map(cartId => deleteCarts(cartId))
                
                navigate('/success'); // Redirect to a success page
            }
        } catch (error) {
            console.error('Error creating payment intent:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-white mb-4">Payment Information</h2>

            {/* Billing Information Fields */}
            <div>
                <h3 className="text-xl font-bold text-white mb-2">Billing Information</h3>
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    value={billingInfo.name}
                    onChange={handleBillingChange}
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="w-full p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                    value={billingInfo.address}
                    onChange={handleBillingChange}
                />
                <div className="flex space-x-4">
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        className="w-1/2 p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                        value={billingInfo.city}
                        onChange={handleBillingChange}
                    />
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Postal Code"
                        className="w-1/2 p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                        value={billingInfo.postalCode}
                        onChange={handleBillingChange}
                    />
                </div>
                <select
                    name="country"
                    value={billingInfo.country}
                    onChange={handleBillingChange}
                    className="w-full p-3 mb-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                >
                    <option value="">Select Country</option>
                    {countryList.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

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
                Pay ${totalAmount.toFixed(2)}
            </button>
        </form>
    );
};

export default PaymentForm;
