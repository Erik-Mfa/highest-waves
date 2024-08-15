// src/utils/cartUtils.js

export const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  };
  
  export const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  export const addToCart = (beat) => {
    const cart = loadCartFromLocalStorage();
    const updatedCart = [...cart, beat];
    saveCartToLocalStorage(updatedCart);
  };
  
  export const removeFromCart = (beatId) => {
    const cart = loadCartFromLocalStorage();
    const updatedCart = cart.filter((beat) => beat.id !== beatId);
    saveCartToLocalStorage(updatedCart);
  };
  
  export const clearCart = () => {
    localStorage.removeItem('cart');
  };