// src/services/api/users.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001/api/', 
});

export const handleRefund = async (orderId) => {
    try {
        const response = await fetch('http://localhost:3001/api/payment/refund', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }),
            credentials: 'include', // Ensure cookies are sent
        });

        const data = await response.json();
        alert(data.message); // Show a success or error message
        // Optionally refresh the orders or update the state
    } catch (error) {
        console.error('Error processing refund:', error);
        alert('Failed to process refund.');
    }
};

export const save = async (paymentInfo) => {
    try {
        const response = await instance.post(
            'http://localhost:3001/api/payment/create-payment-intent',
                paymentInfo,  // Send paymentInfo directly
            { withCredentials: true }
        );
        return response.data; // Return the response data to use in PaymentForm
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error; // Rethrow error for handling in PaymentForm
    }
}
