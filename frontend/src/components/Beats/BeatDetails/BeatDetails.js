// components/BeatDetails/BeatDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../../axios/axios';
import { isAuthenticated } from '../../../services/auth';

function BeatDetails({ playTrack }) {
  const [beat, setBeat] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id: beatId } = useParams();

  useEffect(() => {
    const fetchBeatDetails = async () => {
      try {
        const userToken = await isAuthenticated();
        const response = await axios.get(`/beats/${beatId}`);
        setBeat(response.data);
        setUser(userToken);
      } catch (error) {
        console.error('Error fetching beat details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeatDetails();
  }, [beatId]);

  const handleAddToCart = async () => {
    if (!user) {
      alert('You must be logged in to add items to your cart.');
      return;
    }

    try {
      await axios.post('/carts', {
        beat: beat.id,
        user: user.userId
      }, { withCredentials: true });
      alert('Beat added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add beat to cart.');
    }
  };

  const handleBuyNow = async () => {
    try {
      if (!user) {
        alert('You must be logged in to purchase a beat.');
        return;
      }

      await axios.post('/orders', {
        beat: beat.id,
        price: beat.price,
        user: user.userId,
      }, { withCredentials: true });

      alert('Purchase successful!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      } else {
        alert('Failed to place order. Please try again.');
      }
      console.error('Error placing order:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!beat) return <div>Beat not found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-black">
      <div className="flex flex-col lg:flex-row items-center lg:items-start p-4 lg:p-8 text-white">
        <div className="flex justify-center lg:w-1/2 max-w-md lg:max-w-none mb-4 lg:mb-0 lg:mr-8">
          <div className="w-1/2 h-full bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={`http://localhost:3001/${beat.image}`}
              alt={beat.title}
              className="w-full h-full object-cover"
              style={{ aspectRatio: '5/5' }}
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{beat.title}</h2>
          <p className="text-lg text-gray-300 mb-4">By: {beat.owner.name}</p>
          <p className="text-lg mb-4">
            <span className="text-cyan-600 font-bold">${beat.price}</span>
          </p>
          <p className="text-md text-gray-400 mb-4">BPM: {beat.bpm}</p>
          <p className="text-md text-gray-400 mb-4">Tone: {beat.tone}</p>
          <p className="text-md text-gray-300 mb-6">{beat.description}</p>

          <button
            onClick={() => playTrack(`http://localhost:3001/${beat.audioURL}`)}
            className="w-full max-w-xs bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Play Preview
          </button>

          <button
            onClick={handleBuyNow}
            className="w-full max-w-xs bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Buy Now
          </button>
          
          <button
            onClick={handleAddToCart}
            className="w-full max-w-xs bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BeatDetails;
