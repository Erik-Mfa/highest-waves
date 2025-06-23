/* eslint-disable no-undef */
// src/services/api/users.js

import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true
})

export const handleRefund = async (orderId) => {
  try {
    const response = await instance.post('/payment/refund', { orderId })
    return response.data
  } catch (error) {
    console.error('Error processing refund:', error)
    alert('Failed to process refund.')
  }
}

export const save = async (paymentInfo) => {
  try {
    const response = await instance.post('/payment/create-payment-intent', paymentInfo)
    return response.data
  } catch (error) {
    console.error('Error creating payment intent:', error)
    throw error
  }
}
