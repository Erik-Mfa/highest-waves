import React, { useEffect, useState } from 'react';
import axios from '../../axios/axios'; 

function PurchaseCart({user}) {
  const [beats, setBeats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (user && user.userId) {
          const response = await axios.get(`/carts/${user.userId}`, { withCredentials: true });
          console.log('API Response:', response.data);

          // Flatten the array of carts and extract beats
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
  }, []);

  const handleRemoveFromCart = async (beatId) => {
    try {
      if (user && user.userId) {
        await axios.delete(`/carts/${beatId}`, { withCredentials: true });
        setBeats(beats.filter(item => item.id !== beatId)); // Use id to match with beatId
      }
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
        cart: beats.map(item => item.id), // Use id for the checkout request
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
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-[28rem] w-full overflow-y-auto">
      <h2 className="text-4xl font-bold mb-6">Your Cart</h2>
      {beats.length === 0 ? (
        <p className="text-xl">Your cart is empty.</p>
      ) : (
        <div>
          {beats.map(item => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-5 mb-6 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg border border-gray-600"
              />
              <div className="flex-1 ml-6">
                <h3 className="text-2xl font-bold">{item.title}</h3>
                <p className="text-xl">${item.price}</p>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            onClick={handleCheckout}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded mt-6 w-full transition-colors"
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
  
}

export default PurchaseCart;
