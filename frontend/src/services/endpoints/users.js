import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/', 
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