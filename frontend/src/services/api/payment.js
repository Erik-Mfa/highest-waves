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
            credentials: 'include', 
        });

        return response.data
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
        return response.data; 
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error; 
    }
}
