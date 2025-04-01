import axios from 'axios'

const instance = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true
})

export const getCarts = async (userId) => {
  try {
    const response = await instance.get(`/carts/${userId}`, {
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
    throw error
  }
}

export const getCartItems = async (userId) => {
  try {
    const response = await instance.get(`/carts/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
    throw error
  }
}

export const addToCart = async ({ beat, user, licenseId, finalPrice }) => {
  try {
    console.log('Adding to cart with data:', { 
      beat, 
      user, 
      licenseId, 
      finalPrice,
      fullRequest: {
        beat,
        user,
        licenseId,
        finalPrice
      }
    })
    const response = await instance.post('/carts', {
      beat,
      user,
      licenseId,
      finalPrice
    })
    console.log('Cart response:', response.data)
    return response.data
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data || error)
    throw error
  }
}

export const deleteCarts = async (cartId) => {
  try {
    await instance.delete(`/carts/${cartId}`, { withCredentials: true })
  } catch (error) {
    console.error('Error removing cart item:', error)
    throw error
  }
}

export const removeFromCart = async (cartId) => {
  try {
    await instance.delete(`/carts/${cartId}`)
  } catch (error) {
    console.error('Error removing cart item:', error)
    throw error
  }
}
