import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios'; 

function PurchaseCart({ user }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user && user.userId) {
          const response = await axios.get(`/carts/${user.userId}`, { withCredentials: true });
          console.log(response.data);

          setCartItems(response.data);
        } else {
          console.error('User is not authenticated.');
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  const handleRemoveFromCart = async (cartId) => {
    try {
      if (user && user.userId) {
        await axios.delete(`/carts/${cartId}`, { withCredentials: true });
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

      await axios.post('/orders', {
        cart: cartBeatIds,
        user: user.userId,
      }, { withCredentials: true });

      setCartItems([]);
      alert('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to complete checkout.');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg max-w-[24rem] w-full overflow-y-auto">
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
                onClick={() => handleRemoveFromCart(item.id)}  // Pass cart item ID
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded mt-4 w-full transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default PurchaseCart;
