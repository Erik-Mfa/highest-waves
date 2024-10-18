import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api/`, 
  });

export const getCarts = async (userId) => {
  try {
    const response = await instance.get(`/carts/${userId}`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (beatId, userId) => {
  try {
    await instance.post('/carts', {
      beat: beatId,
      user: userId
    }, { withCredentials: true });
    return { success: true };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error; 
  }
};

export const deleteCarts = async (cartId) => {
  try {
    await instance.delete(`/carts/${cartId}`, { withCredentials: true });
  } catch (error) {
    console.error('Error removing cart item:', error);
    throw error;
  }
};
