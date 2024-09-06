import React, { useEffect, useState } from 'react';
import { getCarts, deleteCarts } from '../../services/api/carts';
import { saveOrder } from '../../services/api/orders';
import { FaTrash } from 'react-icons/fa';
import Loading from '../Loading/Loading';

function PurchaseCart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {

      setLoading(true);
      try {
        if (user && user.userId) {
          const cartData = await getCarts(user.userId);
          
          // Ensure cartData is an array
          if (Array.isArray(cartData)) {
            setCartItems(cartData);
          } else {
            console.error('Invalid cart data format:', cartData);
            setCartItems([]);
          }
        } else {
          console.error('User is not authenticated.');
          setCartItems([]);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemoveFromCart = async (cartId) => {
    try {
      if (user && user.userId) {
        await deleteCarts(cartId);
        setCartItems(cartItems.filter(item => item.id !== cartId));
      }
    } catch (error) {
      console.error('Error removing beat from cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        alert('You must be logged in to proceed with checkout.');
        return;
      }

      const cartBeatIds = cartItems.map(item => item.beats.id);
      await saveOrder(user.userId, cartBeatIds);

      setCartItems([]);
      alert('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to complete checkout.');
    }
  };

  if (loading) return <Loading />; // Replace with the Loading component


  return (

    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-full">

      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      
      {cartItems.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div 
              key={item.id}  // Use cart item ID
              className="flex items-center justify-between p-3 mb-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={`http://localhost:3001/${item.beats.image}`}
                alt={item.beats.title}
                className="h-16 w-16 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-bold">{item.beats.title}</h3>
                <p className="text-md">${item.beats.price}</p>
              </div>
              <button
              onClick={() => handleRemoveFromCart(item.id)}
              className="bg-red-600 text-white hover:bg-red-700 transition-all duration-300 ease-in-out p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center justify-center"
            >
              <FaTrash className="text-lg" />
            </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
            Checkout
          </button>
        </div>
      )}
    </div>
  );

  
}

export default PurchaseCart;
