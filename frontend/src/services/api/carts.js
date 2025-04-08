import axios from 'axios'
import Cookies from 'universal-cookie'

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
  withCredentials: true
})

const cookies = new Cookies()

export const addToCart = async ({ beat, user, licenseId, finalPrice }) => {
  try {
    const token = cookies.get('jwt_token')
    if (!token) {
      throw new Error('No token found')
    }
    
    if (!user) {
      throw new Error('User not found')
    }

    console.log('Adding to cart with data:', { beat, user, licenseId, finalPrice })
    const response = await instance.post('/carts', {
      user,
      beat,
      licenseId,
      finalPrice
    })
    
    if (!response.data) {
      throw new Error('No data received from server')
    }
    
    return response.data
  } catch (error) {
    console.error('Add to cart error:', error.response?.data || error.message)
    throw error.response?.data || error
  }
}

export const getCarts = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }
    const response = await instance.get(`/carts/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching carts:', error)
    throw error
  }
}

export const getCartItems = async (userId) => {
  try {
    if (!userId) {
      throw new Error('User ID is required')
    }
    const response = await instance.get(`/carts/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching cart:', error)
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

export const deleteCarts = async (cartId) => {
  try {
    const response = await instance.delete(`/carts/${cartId}`)
    return response.data
  } catch (error) {
    console.error('Error deleting cart:', error)
    throw error
  }
}
