import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios'; 

function PurchaseCart({ user }) {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user && user.userId) {
          const response = await axios.get(`/carts/${user.userId}`, { withCredentials: true });
          console.log('API Response:', response.data);

          const allBeats = response.data.flatMap(cart => cart.beats || []);
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
  }, [user]);

  const handleRemoveFromCart = async (beatId) => {
    try {
      if (user && user.userId) {
        await axios.delete(`/carts/${beatId}`, { withCredentials: true });
        setBeats(beats.filter(beat => beat.id !== beatId));
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

      await axios.post('/orders', {
        cart: beats.map(beat => beat.id),
        user: user.userId,
      }, { withCredentials: true });

      setBeats([]);
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
      {beats.length === 0 ? (
        <p className="text-lg">Your cart is empty.</p>
      ) : (
        <div>
          {beats.map(beat => (
            <div 
              key={beat.id} 
              className="flex items-center justify-between p-3 mb-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={`http://localhost:3001/${beat.image}`}
                alt={beat.title}
                className="h-16 w-16 object-cover rounded-md"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-lg font-bold">{beat.title}</h3>
                <p className="text-md">${beat.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(beat.id)}
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
