// src/services/api/users.js

import axios from 'axios';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/api/`, 
});

export const getUsers = async () => {
  try {
    const response = await instance.get('/users', { withCredentials: true }); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const createUser = async (userDetails) => {
  try {
    const response = await instance.post('/auth/register', userDetails, { withCredentials: true }); // Adjust the endpoint as needed
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`/users/${userId}`, {
      headers: {
        'Content-Type': 'multipart/form-data', 
      },
      withCredentials: true,
    });
    return { success: true };
  } catch (error) {
    console.error('Error deleting user:', error);
    return { success: false, error };
  }
};
