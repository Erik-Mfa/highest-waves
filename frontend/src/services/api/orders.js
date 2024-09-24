import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/api/', 
  });

export const saveOrder = async (userId, cartBeatIds) => {
  try {
    const response = await instance.post(
      '/orders',
      {
        cart: cartBeatIds,
        user: userId,
      },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error('Error during checkout:', error);
    throw error;
  }
};

// Function to fetch orders
export const getOrders = async () => {
  try {
    const response = await instance.get('/orders', { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
