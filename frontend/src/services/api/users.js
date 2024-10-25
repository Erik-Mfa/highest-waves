// src/services/api/users.js

import axios from 'axios'

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/`
})

export const getUsers = async () => {
  try {
    const response = await instance.get('/users', { withCredentials: true }) // Adjust the endpoint as needed
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export const createUser = async (userDetails) => {
  try {
    const response = await instance.post('/auth/register', userDetails, {
      withCredentials: true
    }) // Adjust the endpoint as needed
    return response.data
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export const deleteUser = async (userId) => {
  try {
    // eslint-disable-next-line no-unused-vars
    const response = await instance.delete(`/users/${userId}`, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true
    })
    return { success: true }
  } catch (error) {
    console.error('Error deleting user:', error)
    return { success: false, error }
  }
}

// Forgot Password API: Sends a reset password link to the user's email
export const forgotPassword = async (email) => {
  try {
    const response = await instance.post('/users/forgot-password', { email })
    alert('Reset password email sent!')
    return response.data
  } catch (error) {
    console.error('Error sending reset password email:', error)
    alert('Error sending email. Please try again.')
    throw error
  }
}

// Reset Password API: Handles the actual password reset using the token
export const resetPassword = async (password, token) => {
  try {
    const response = await instance.post(`/users/reset-password/${token}`, {
      password: password
    })
    alert('Password reset successful!')
    return response.data
  } catch (error) {
    console.error('Error resetting password:', error)
    alert('Error resetting password. Please try again.')
    throw error
  }
}
