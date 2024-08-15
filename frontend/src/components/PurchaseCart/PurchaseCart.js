import React, { useState, useEffect } from 'react';
import { loadCartFromLocalStorage, removeFromCart, clearCart } from '../../services/cartUtils';

const PurchaseCart = ({ onClose }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = loadCartFromLocalStorage();
    setCart(savedCart);
  }, []);

  const handleRemoveItem = (beatId) => {
    removeFromCart(beatId);
    setCart(loadCartFromLocalStorage()); // Update state after removing item
  };

  const handleCheckout = () => {
    // Add your checkout logic here (e.g., redirect to a payment page)
    console.log('Proceeding to checkout...');
    clearCart(); // Clear the cart after checkout
    setCart([]); // Update state to reflect cleared cart
    onClose(); // Close the cart after checkout
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <ul>
            {cart.map(beat => (
              <li key={beat.id} className="mb-2">
                <p><strong>Beat:</strong> {beat.title}</p>
                <p><strong>Price:</strong> ${beat.price}</p>
                <button
                  onClick={() => handleRemoveItem(beat.id)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleCheckout}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          disabled={cart.length === 0}
        >
          Proceed to Checkout
        </button>
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PurchaseCart;
