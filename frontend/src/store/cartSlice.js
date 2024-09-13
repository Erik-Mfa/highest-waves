import { createSlice } from '@reduxjs/toolkit';
import { getCarts, deleteCarts, addToCart } from '../services/api/carts'; // Ensure correct path

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setCartItems(state, action) {
      state.items = action.payload;
    },
    addItem(state, action) {
      state.items = action.payload;
    },
    removeItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setCartItems,
  addItem,
  removeItem,
  setError,
} = cartSlice.actions;

export default cartSlice.reducer;

// Define a simple thunk to fetch cart items
export const fetchCartItems = (userId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await getCarts(userId);
    dispatch(setCartItems(response));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Define a simple thunk to remove a cart item
export const removeCartItem = (cartId) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await deleteCarts(cartId);
    dispatch(removeItem(cartId));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

// Define a simple thunk to add a cart item
export const addToCartAndUpdate = ({ beatId, userId }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await addToCart(beatId, userId);
    const updatedCart = await getCarts(userId);
    dispatch(addItem(updatedCart));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};
