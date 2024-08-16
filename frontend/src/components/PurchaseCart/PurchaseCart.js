import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios';
import { isAuthenticated } from '../../services/auth';

function PurchaseCart() {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const userToken = await isAuthenticated();
        setUser(userToken);

        if (userToken && userToken.userId) {
          const response = await axios.get(`/carts/${userToken.userId}`, { withCredentials: true });
          console.log(response.data);
          // Assuming response.data is an array of cart objects
          const allBeats = response.data.flatMap(cart => cart.beats);
          setBeats(allBeats);
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
  }, []);

  const handleRemoveFromCart = async (beatId) => {
    try {
      await axios.delete(`/carts/${user.userId}/${beatId}`, { withCredentials: true });
      setBeats(beats.filter(item => item._id !== beatId)); // Use _id to match with beatId
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleCheckout = async () => {
    try {
      if (!user) {
        alert('You must be logged in to proceed with checkout.');
        return;
      }

      await axios.post('/orders', {
        cart: beats.map(item => item._id), // Use _id for the checkout request
        user: user.userId,
      }, { withCredentials: true });

      setBeats([]);
      alert('Checkout successful!');
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('Failed to complete checkout.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="p-4 lg:p-8">
        <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
        {beats.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {beats.map(item => (
              <div key={item._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="text-lg">${item.price}</p>
                </div>
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseCart;
