import { createSlice } from '@reduxjs/toolkit'
import { getCarts, deleteCarts, addToCart } from '../services/api/carts'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    totalAmount: 0,
    error: null
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload
    },
    setCartItems(state, action) {
      // Handle both single item and array responses
      const items = Array.isArray(action.payload) ? action.payload : [action.payload]
      state.items = items
      // Calculate total amount whenever items change
      state.totalAmount = items.reduce(
        (total, item) => total + (item.finalPrice || 0),
        0
      )
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalAmount = state.items.reduce(
        (total, item) => total + (item.finalPrice || 0),
        0
      )
    },
    setError(state, action) {
      state.error = action.payload
    }
  }
})

export const { setLoading, setCartItems, removeItem, setError } = cartSlice.actions

export default cartSlice.reducer

export const fetchCartItems = (userId) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    const response = await getCarts(userId)
    dispatch(setCartItems(response))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
}

export const removeCartItem = (cartId) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    await deleteCarts(cartId)
    dispatch(removeItem(cartId))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
}

export const addToCartAndUpdate = ({ beat, user, license, finalPrice }) => async (dispatch) => {
  dispatch(setLoading(true))
  try {
    if (!user) {
      throw new Error('User is required')
    }
    if (!beat) {
      throw new Error('Beat is required')
    }
    if (!license) {
      throw new Error('License is required')
    }
    if (!finalPrice) {
      throw new Error('Final price is required')
    }

    console.log('Adding to cart with data:', { beat, user, license, finalPrice })
    const response = await addToCart({ 
      beat, 
      user, 
      licenseId: parseInt(license),
      finalPrice 
    })
    
    if (!response) {
      throw new Error('No response from server')
    }

    // After adding to cart, fetch all cart items to update the state
    const updatedCart = await getCarts(user)
    dispatch(setCartItems(updatedCart))
  } catch (error) {
    console.error('Error adding to cart:', error)
    dispatch(setError(error.message || 'Failed to add to cart'))
  } finally {
    dispatch(setLoading(false))
  }
}
