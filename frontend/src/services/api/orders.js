import axios from 'axios'

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`
})

export const saveOrder = async (userId, cartBeatIds) => {
  try {
    const response = await instance.post(
      '/orders',
      {
        cart: cartBeatIds,
        user: userId
      },
      { withCredentials: true }
    )
    return response.data
  } catch (error) {
    console.error('Error during checkout:', error)
    throw error
  }
}

// Function to fetch orders
export const getOrders = async () => {
  try {
    const response = await instance.get('/orders', { withCredentials: true })
    return response.data
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

export const deleteOrders = async (orderId) => {
  try {
    await instance.delete(`/orders/${orderId}`, { withCredentials: true })
    return { success: true }
  } catch (error) {
    console.error('Error deleting order:', error)
    throw error
  }
}
