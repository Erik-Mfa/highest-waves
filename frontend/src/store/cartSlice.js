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
      state.items = action.payload
      // Calculate total amount whenever items change
      state.totalAmount = action.payload.reduce(
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
    const response = await addToCart({ beat, user, licenseId: license, finalPrice })
    dispatch(setCartItems(response))
  } catch (error) {
    dispatch(setError(error.message))
  } finally {
    dispatch(setLoading(false))
  }
}
